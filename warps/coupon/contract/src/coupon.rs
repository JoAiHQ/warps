use crate::{
    config::{self, ESDT_ISSUE_COST},
    errors::*,
    events,
    types::{CollectionId, CouponCollection, CouponData, CouponId, CouponStatus},
};

pub const MAX_CODE_LEN: usize = 32;
pub const MAX_NAME_LEN: usize = 64;
pub const MIN_TICKER_LEN: usize = 3;
pub const MAX_TICKER_LEN: usize = 10;
pub const UNLIMITED_USES_SUPPLY: u64 = 100_000_000;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait CouponModule: config::ConfigModule + events::EventsModule {
    // ─── Collections ─────────────────────────────────────────────────────────

    #[endpoint(createCollection)]
    #[payable("EGLD")]
    fn create_collection(&self, name: ManagedBuffer, ticker: ManagedBuffer) {
        let payment = self.call_value().egld();
        require!(*payment == BigUint::from(ESDT_ISSUE_COST), ERR_WRONG_PAYMENT);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(
            ticker.len() >= MIN_TICKER_LEN && ticker.len() <= MAX_TICKER_LEN,
            ERR_INVALID_TICKER
        );

        let caller = self.blockchain().get_caller();
        let id = self.next_collection_id().get();
        self.next_collection_id().set(id + 1);

        self.collection(id).set(CouponCollection {
            id,
            owner: caller.clone(),
            name: name.clone(),
        });
        self.owner_collections(&caller).insert(id);

        self.tx()
            .to(ESDTSystemSCAddress)
            .typed(system_proxy::ESDTSystemSCProxy)
            .issue_and_set_all_roles(
                BigUint::from(ESDT_ISSUE_COST),
                name,
                ticker,
                EsdtTokenType::SemiFungible,
                0,
            )
            .with_callback(self.callbacks().on_collection_issued(id))
            .async_call_and_exit()
    }

    #[callback]
    fn on_collection_issued(
        &self,
        collection_id: CollectionId,
        #[call_result] result: ManagedAsyncCallResult<EsdtTokenIdentifier>,
    ) {
        match result {
            ManagedAsyncCallResult::Ok(token_id) => {
                self.collection_token(collection_id).set(&token_id);
                self.token_collection(&token_id).set(collection_id);
                let collection = self.collection(collection_id).get();
                self.collection_created_event(collection_id, &collection.owner, &token_id);
            }
            ManagedAsyncCallResult::Err(_) => {
                let collection = self.collection(collection_id).get();
                self.owner_collections(&collection.owner)
                    .swap_remove(&collection_id);
                self.collection(collection_id).clear();
            }
        }
    }

    // ─── Coupons ──────────────────────────────────────────────────────────────

    #[endpoint(createCoupon)]
    fn create_coupon(
        &self,
        collection_id: CollectionId,
        code: ManagedBuffer,
        discount_percent: u8,
        max_uses: u64,
        expiry_days: u64,
    ) -> CouponId {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        require!(!self.collection_token(collection_id).is_empty(), ERR_COLLECTION_NOT_READY);

        let collection = self.collection(collection_id).get();
        let caller = self.blockchain().get_caller();
        require!(caller == collection.owner, ERR_NOT_COLLECTION_OWNER);

        require!(code.len() > 0, ERR_CODE_EMPTY);
        require!(code.len() <= MAX_CODE_LEN, ERR_CODE_TOO_LONG);
        require!(
            discount_percent >= 1 && discount_percent <= 100,
            ERR_INVALID_DISCOUNT
        );
        require!(self.coupon_by_code(&code).is_empty(), ERR_CODE_TAKEN);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let expires_at = if expiry_days == 0 {
            0u64
        } else {
            now + expiry_days * 86400
        };

        let token_id = self.collection_token(collection_id).get();
        let coupon_id = self.next_coupon_id().get();

        let supply = if max_uses == 0 {
            UNLIMITED_USES_SUPPLY
        } else {
            max_uses
        };

        let mut attributes = ManagedBuffer::new();
        attributes.append(&ManagedBuffer::from(b"code:"));
        attributes.append(&code);
        attributes.append(&ManagedBuffer::from(b";discount:"));
        attributes.append(&self.u64_to_ascii(discount_percent as u64));
        attributes.append(&ManagedBuffer::from(b"%"));
        if expires_at != 0 {
            attributes.append(&ManagedBuffer::from(b";expires:"));
            attributes.append(&self.u64_to_ascii(expires_at));
        }

        let sft_nonce = self.send().esdt_nft_create(
            &token_id,
            &BigUint::from(supply),
            &code,
            &BigUint::zero(),
            &ManagedBuffer::new(),
            &attributes,
            &ManagedVec::new(),
        );

        let coupon = CouponData {
            id: coupon_id,
            collection_id,
            sft_nonce,
            code: code.clone(),
            owner: caller.clone(),
            discount_percent,
            max_uses,
            used_count: 0,
            expires_at,
            created_at: now,
            status: CouponStatus::Active,
        };

        self.coupon_by_id(coupon_id).set(&coupon);
        self.coupon_by_code(&code).set(coupon_id);
        self.owner_coupons(&caller).insert(coupon_id);
        self.collection_coupons(collection_id).insert(coupon_id);
        self.next_coupon_id().set(coupon_id + 1);

        self.coupon_created_event(coupon_id, collection_id, &code, &caller, discount_percent);

        coupon_id
    }

    #[endpoint(claimCoupon)]
    fn claim_coupon(&self, coupon_id: CouponId) {
        require!(!self.coupon_by_id(coupon_id).is_empty(), ERR_COUPON_NOT_FOUND);

        let coupon = self.coupon_by_id(coupon_id).get();
        require!(coupon.status == CouponStatus::Active, ERR_COUPON_REVOKED);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if coupon.expires_at != 0 {
            require!(now < coupon.expires_at, ERR_COUPON_EXPIRED);
        }

        let token_id = self.collection_token(coupon.collection_id).get();
        let caller = self.blockchain().get_caller();

        self.send()
            .direct_esdt(&caller, &token_id, coupon.sft_nonce, &BigUint::from(1u64));

        self.coupon_claimed_event(coupon_id, &caller, coupon.sft_nonce);
    }

    #[endpoint(redeemCoupon)]
    #[payable("*")]
    fn redeem_coupon(&self, coupon_id: CouponId) -> u8 {
        let payment = self.call_value().single_esdt();
        let token = payment.token_identifier.clone();
        let nonce = payment.token_nonce;
        let amount = payment.amount.clone();
        require!(amount == BigUint::from(1u64), ERR_NO_SFT_SENT);

        require!(!self.coupon_by_id(coupon_id).is_empty(), ERR_COUPON_NOT_FOUND);
        let mut coupon = self.coupon_by_id(coupon_id).get();
        require!(coupon.status == CouponStatus::Active, ERR_COUPON_REVOKED);

        let token_id = self.collection_token(coupon.collection_id).get();
        require!(token == token_id, ERR_WRONG_TOKEN);
        require!(nonce == coupon.sft_nonce, ERR_WRONG_TOKEN);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if coupon.expires_at != 0 {
            require!(now < coupon.expires_at, ERR_COUPON_EXPIRED);
        }
        if coupon.max_uses != 0 {
            require!(coupon.used_count < coupon.max_uses, ERR_COUPON_FULLY_USED);
        }

        self.send()
            .esdt_local_burn(&token_id, coupon.sft_nonce, &BigUint::from(1u64));

        coupon.used_count += 1;
        let discount = coupon.discount_percent;
        self.coupon_by_id(coupon_id).set(&coupon);

        let caller = self.blockchain().get_caller();
        self.coupon_redeemed_event(coupon_id, &caller, coupon.discount_percent);

        discount
    }

    #[endpoint(revokeCoupon)]
    fn revoke_coupon(&self, coupon_id: CouponId) {
        require!(!self.coupon_by_id(coupon_id).is_empty(), ERR_COUPON_NOT_FOUND);

        let mut coupon = self.coupon_by_id(coupon_id).get();
        require!(coupon.status != CouponStatus::Revoked, ERR_ALREADY_REVOKED);

        let caller = self.blockchain().get_caller();
        require!(caller == coupon.owner, ERR_NOT_COUPON_OWNER);

        let token_id = self.collection_token(coupon.collection_id).get();

        let remaining = self.blockchain().get_esdt_balance(
            &self.blockchain().get_sc_address(),
            &token_id,
            coupon.sft_nonce,
        );
        if remaining > 0u64 {
            self.send()
                .esdt_local_burn(&token_id, coupon.sft_nonce, &remaining);
        }

        coupon.status = CouponStatus::Revoked;
        self.coupon_by_id(coupon_id).set(&coupon);

        self.coupon_revoked_event(coupon_id, &caller);
    }

    // ─── Views ────────────────────────────────────────────────────────────────

    #[view(getCollection)]
    fn get_collection(&self, collection_id: CollectionId) -> CouponCollection<Self::Api> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        self.collection(collection_id).get()
    }

    #[view(getCollectionToken)]
    fn get_collection_token(&self, collection_id: CollectionId) -> OptionalValue<EsdtTokenIdentifier> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        if self.collection_token(collection_id).is_empty() {
            OptionalValue::None
        } else {
            OptionalValue::Some(self.collection_token(collection_id).get())
        }
    }

    #[view(getCoupon)]
    fn get_coupon_by_code(&self, code: ManagedBuffer) -> CouponData<Self::Api> {
        require!(!self.coupon_by_code(&code).is_empty(), ERR_COUPON_NOT_FOUND);
        let coupon_id = self.coupon_by_code(&code).get();
        let mut coupon = self.coupon_by_id(coupon_id).get();
        self.maybe_expire(&mut coupon);
        coupon
    }

    #[view(getCouponById)]
    fn get_coupon_by_id(&self, coupon_id: CouponId) -> CouponData<Self::Api> {
        require!(!self.coupon_by_id(coupon_id).is_empty(), ERR_COUPON_NOT_FOUND);
        let mut coupon = self.coupon_by_id(coupon_id).get();
        self.maybe_expire(&mut coupon);
        coupon
    }

    #[view(getOwnerCoupons)]
    fn get_owner_coupons(
        &self,
        owner: ManagedAddress,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<CouponId, CouponData<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        for id in self.owner_coupons(&owner).iter().skip(offset).take(limit) {
            let mut coupon = self.coupon_by_id(id).get();
            self.maybe_expire(&mut coupon);
            result.push((id, coupon).into());
        }
        result
    }

    #[view(getCollectionCoupons)]
    fn get_collection_coupons(
        &self,
        collection_id: CollectionId,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<CouponId, CouponData<Self::Api>>> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        let mut result = MultiValueEncoded::new();
        for id in self.collection_coupons(collection_id).iter().skip(offset).take(limit) {
            let mut coupon = self.coupon_by_id(id).get();
            self.maybe_expire(&mut coupon);
            result.push((id, coupon).into());
        }
        result
    }

    #[view(couponExists)]
    fn coupon_exists(&self, code: ManagedBuffer) -> bool {
        !self.coupon_by_code(&code).is_empty()
    }

    #[view(isCollectionReady)]
    fn is_collection_ready(&self, collection_id: CollectionId) -> bool {
        !self.collection(collection_id).is_empty()
            && !self.collection_token(collection_id).is_empty()
    }

    #[view(getNextCollectionId)]
    fn get_next_collection_id_view(&self) -> CollectionId {
        self.next_collection_id().get()
    }

    #[view(getNextCouponId)]
    fn get_next_coupon_id_view(&self) -> CouponId {
        self.next_coupon_id().get()
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    fn maybe_expire(&self, coupon: &mut CouponData<Self::Api>) {
        if coupon.status == CouponStatus::Active && coupon.expires_at != 0 {
            let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
            if now > coupon.expires_at {
                coupon.status = CouponStatus::Expired;
            }
        }
    }

    fn u64_to_ascii(&self, mut n: u64) -> ManagedBuffer {
        if n == 0 {
            return ManagedBuffer::from(b"0");
        }
        let mut digits = [0u8; 20];
        let mut len = 0usize;
        while n > 0 {
            digits[len] = b'0' + (n % 10) as u8;
            n /= 10;
            len += 1;
        }
        let mut result = ManagedBuffer::new();
        for i in (0..len).rev() {
            result.append_bytes(&[digits[i]]);
        }
        result
    }
}
