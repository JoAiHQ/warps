use crate::{config, errors::*, events, types::CouponData};

pub const MAX_CODE_LEN: usize = 32;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait CouponModule: config::ConfigModule + events::EventsModule {
    /// Create a new discount coupon identified by a human-readable code.
    /// `expiry_days` — days from now before the coupon expires; 0 = never expires.
    /// `max_uses` — total redemptions allowed; 0 = unlimited.
    #[endpoint(createCoupon)]
    fn create_coupon(
        &self,
        code: ManagedBuffer,
        discount_percent: u8,
        max_uses: u64,
        expiry_days: u64,
    ) {
        require!(code.len() > 0, ERR_CODE_EMPTY);
        require!(code.len() <= MAX_CODE_LEN, ERR_CODE_TOO_LONG);
        require!(
            discount_percent >= 1 && discount_percent <= 100,
            ERR_INVALID_DISCOUNT
        );
        require!(self.coupon(&code).is_empty(), ERR_CODE_TAKEN);

        let caller = self.blockchain().get_caller();
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let expires_at = if expiry_days == 0 {
            0u64
        } else {
            now + expiry_days * 86400
        };

        self.coupon(&code).set(CouponData {
            owner: caller.clone(),
            discount_percent,
            max_uses,
            used_count: 0,
            expires_at,
            created_at: now,
            is_revoked: false,
        });
        self.owner_coupons(&caller).insert(code.clone());

        self.coupon_created_event(&code, &caller, discount_percent, max_uses, expires_at);
    }

    /// Redeem a coupon by code. Validates limits, increments the usage counter, and returns the
    /// discount percentage so the caller can apply it immediately.
    #[endpoint(redeemCoupon)]
    fn redeem_coupon(&self, code: ManagedBuffer) -> u8 {
        require!(!self.coupon(&code).is_empty(), ERR_COUPON_NOT_FOUND);

        let mut coupon = self.coupon(&code).get();

        require!(!coupon.is_revoked, ERR_COUPON_REVOKED);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if coupon.expires_at != 0 {
            require!(now < coupon.expires_at, ERR_COUPON_EXPIRED);
        }
        if coupon.max_uses != 0 {
            require!(coupon.used_count < coupon.max_uses, ERR_COUPON_FULLY_USED);
        }

        coupon.used_count += 1;
        let discount = coupon.discount_percent;
        self.coupon(&code).set(&coupon);

        let caller = self.blockchain().get_caller();
        self.coupon_redeemed_event(&code, &caller, discount, coupon.used_count);

        discount
    }

    /// Permanently revoke a coupon. Only the original creator can revoke.
    #[endpoint(revokeCoupon)]
    fn revoke_coupon(&self, code: ManagedBuffer) {
        require!(!self.coupon(&code).is_empty(), ERR_COUPON_NOT_FOUND);

        let mut coupon = self.coupon(&code).get();
        let caller = self.blockchain().get_caller();
        require!(caller == coupon.owner, ERR_NOT_OWNER);
        require!(!coupon.is_revoked, ERR_COUPON_REVOKED);

        coupon.is_revoked = true;
        self.coupon(&code).set(&coupon);

        self.coupon_revoked_event(&code, &caller);
    }

    #[view(getCoupon)]
    fn get_coupon(&self, code: ManagedBuffer) -> CouponData<Self::Api> {
        require!(!self.coupon(&code).is_empty(), ERR_COUPON_NOT_FOUND);
        self.coupon(&code).get()
    }

    /// Returns all coupon codes created by the given owner address.
    #[view(getOwnerCoupons)]
    fn get_owner_coupons(&self, owner: ManagedAddress) -> MultiValueEncoded<ManagedBuffer> {
        let mut result = MultiValueEncoded::new();
        for code in self.owner_coupons(&owner).iter() {
            result.push(code);
        }
        result
    }

    #[view(couponExists)]
    fn coupon_exists(&self, code: ManagedBuffer) -> bool {
        !self.coupon(&code).is_empty()
    }
}
