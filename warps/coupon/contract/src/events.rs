multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("couponCreated")]
    fn coupon_created_event(
        &self,
        #[indexed] code: &ManagedBuffer,
        #[indexed] owner: &ManagedAddress,
        #[indexed] discount_percent: u8,
        #[indexed] max_uses: u64,
        #[indexed] expires_at: u64,
    );

    #[event("couponRedeemed")]
    fn coupon_redeemed_event(
        &self,
        #[indexed] code: &ManagedBuffer,
        #[indexed] redeemer: &ManagedAddress,
        #[indexed] discount_percent: u8,
        #[indexed] used_count: u64,
    );

    #[event("couponRevoked")]
    fn coupon_revoked_event(
        &self,
        #[indexed] code: &ManagedBuffer,
        #[indexed] owner: &ManagedAddress,
    );
}
