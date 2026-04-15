use crate::{
    config::{self, ESDT_ISSUE_COST},
    errors::*,
    events,
    types::{Collection, CollectionId, CouponData, CouponNonce},
};

pub const MAX_NAME_LEN: usize = 50;
pub const MIN_TICKER_LEN: usize = 3;
pub const MAX_TICKER_LEN: usize = 10;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait CouponModule: config::ConfigModule + events::EventsModule {
    /// Create a new coupon collection by issuing an SFT token on-chain.
    /// Caller must send exactly 0.05 EGLD (the MultiversX ESDT issuance fee).
    /// The collection becomes ready after two async callbacks complete (issue + setRoles).
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

        self.collection(id).set(Collection {
            id,
            creator: caller.clone(),
            name: name.clone(),
        });
        self.creator_collections(&caller).insert(id);

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
                self.collection_created_event(collection_id, collection.creator, token_id);
            }
            ManagedAsyncCallResult::Err(_) => {
                // Issue failed — clean up so the creator can try again
                let collection = self.collection(collection_id).get();
                self.creator_collections(&collection.creator)
                    .swap_remove(&collection_id);
                self.collection(collection_id).clear();
            }
        }
    }

    /// Mint coupon tokens within a collection.
    /// Only the collection creator can mint.
    /// `amount` = number of redemptions available for this coupon type.
    /// `expires_at` = unix timestamp after which the coupon cannot be redeemed (0 = no expiry).
    #[endpoint(createCoupon)]
    fn create_coupon(
        &self,
        collection_id: CollectionId,
        discount_percent: u8,
        amount: BigUint,
        expires_at: u64,
    ) -> CouponNonce {
        require!(
            discount_percent >= 1 && discount_percent <= 100,
            ERR_INVALID_DISCOUNT
        );
        require!(amount > BigUint::zero(), ERR_INVALID_AMOUNT);
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);

        let collection = self.collection(collection_id).get();
        require!(!self.collection_token(collection_id).is_empty(), ERR_COLLECTION_NOT_READY);

        let caller = self.blockchain().get_caller();
        require!(caller == collection.creator, ERR_NOT_CREATOR);

        let token_id = self.collection_token(collection_id).get();
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let coupon_name = ManagedBuffer::from(b"Coupon");

        let nonce = self.send().esdt_nft_create(
            &token_id,
            &amount,
            &coupon_name,
            &BigUint::zero(),
            &ManagedBuffer::new(),
            &discount_percent,
            &ManagedVec::new(),
        );

        self.coupon_data(collection_id, nonce).set(CouponData {
            discount_percent,
            expires_at,
            created_at: now,
            is_revoked: false,
        });

        self.send().direct_esdt(&caller, &token_id, nonce, &amount);

        self.coupon_created_event(
            collection_id,
            nonce,
            caller,
            discount_percent,
            amount,
            expires_at,
        );

        nonce
    }

    /// Redeem a coupon by sending the SFT to this contract.
    /// The token is burned on-chain as irrefutable proof of redemption.
    /// The emitted event carries `discount_percent` for the caller's application.
    #[endpoint(redeemCoupon)]
    #[payable("*")]
    fn redeem_coupon(&self) {
        let payment = self.call_value().single_esdt();
        let token_id = payment.token_identifier.clone();
        let nonce = payment.token_nonce;
        let amount = payment.amount.clone();

        require!(amount > BigUint::zero(), ERR_INVALID_AMOUNT);

        require!(
            !self.token_collection(&token_id).is_empty(),
            ERR_WRONG_TOKEN
        );
        let collection_id = self.token_collection(&token_id).get();

        require!(
            !self.coupon_data(collection_id, nonce).is_empty(),
            ERR_COUPON_NOT_FOUND
        );
        let coupon = self.coupon_data(collection_id, nonce).get();

        require!(!coupon.is_revoked, ERR_COUPON_REVOKED);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if coupon.expires_at != 0 {
            require!(now < coupon.expires_at, ERR_COUPON_EXPIRED);
        }

        self.send().esdt_local_burn(&token_id, nonce, &amount);

        let caller = self.blockchain().get_caller();
        self.coupon_redeemed_event(
            collection_id,
            nonce,
            caller,
            coupon.discount_percent,
            amount,
        );
    }

    /// Mark a coupon nonce as revoked. Holders of existing tokens can no longer redeem them.
    /// Only the collection creator can revoke.
    #[endpoint(revokeCoupon)]
    fn revoke_coupon(&self, collection_id: CollectionId, nonce: CouponNonce) {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        let collection = self.collection(collection_id).get();

        let caller = self.blockchain().get_caller();
        require!(caller == collection.creator, ERR_NOT_CREATOR);

        require!(
            !self.coupon_data(collection_id, nonce).is_empty(),
            ERR_COUPON_NOT_FOUND
        );
        let mut coupon = self.coupon_data(collection_id, nonce).get();
        require!(!coupon.is_revoked, ERR_COUPON_REVOKED);
        coupon.is_revoked = true;
        self.coupon_data(collection_id, nonce).set(&coupon);

        self.coupon_revoked_event(collection_id, nonce, caller);
    }

    // ─── Views ────────────────────────────────────────────────────────────────

    #[view(getCollection)]
    fn get_collection(&self, collection_id: CollectionId) -> Collection<Self::Api> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        self.collection(collection_id).get()
    }

    #[view(getCouponData)]
    fn get_coupon_data(
        &self,
        collection_id: CollectionId,
        nonce: CouponNonce,
    ) -> CouponData {
        require!(
            !self.coupon_data(collection_id, nonce).is_empty(),
            ERR_COUPON_NOT_FOUND
        );
        self.coupon_data(collection_id, nonce).get()
    }

    #[view(getCollectionsByCreator)]
    fn get_collections_by_creator(
        &self,
        creator: ManagedAddress,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<CollectionId, Collection<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        for id in self
            .creator_collections(&creator)
            .iter()
            .skip(offset)
            .take(limit)
        {
            result.push((id, self.collection(id).get()).into());
        }
        result
    }

    /// Returns the ESDT token identifier for a collection.
    /// Empty = collection exists but ESDT not yet issued (still pending async callback).
    #[view(getCollectionToken)]
    fn get_collection_token(&self, collection_id: CollectionId) -> OptionalValue<EsdtTokenIdentifier> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        if self.collection_token(collection_id).is_empty() {
            OptionalValue::None
        } else {
            OptionalValue::Some(self.collection_token(collection_id).get())
        }
    }

    /// Returns true if the collection's ESDT has been issued and roles set.
    #[view(isCollectionReady)]
    fn is_collection_ready(&self, collection_id: CollectionId) -> bool {
        !self.collection(collection_id).is_empty()
            && !self.collection_token(collection_id).is_empty()
    }

    #[view(getNextCollectionId)]
    fn get_next_collection_id(&self) -> CollectionId {
        self.next_collection_id().get()
    }
}
