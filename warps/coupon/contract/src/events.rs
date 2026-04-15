multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("collectionCreated")]
    fn collection_created_event(
        &self,
        #[indexed] collection_id: u64,
        #[indexed] creator: ManagedAddress,
        #[indexed] token_identifier: EsdtTokenIdentifier,
    );

    #[event("couponCreated")]
    fn coupon_created_event(
        &self,
        #[indexed] collection_id: u64,
        #[indexed] nonce: u64,
        #[indexed] creator: ManagedAddress,
        #[indexed] discount_percent: u8,
        #[indexed] amount: BigUint,
        #[indexed] expires_at: u64,
    );

    #[event("couponRedeemed")]
    fn coupon_redeemed_event(
        &self,
        #[indexed] collection_id: u64,
        #[indexed] nonce: u64,
        #[indexed] redeemer: ManagedAddress,
        #[indexed] discount_percent: u8,
        #[indexed] amount: BigUint,
    );

    #[event("couponRevoked")]
    fn coupon_revoked_event(
        &self,
        #[indexed] collection_id: u64,
        #[indexed] nonce: u64,
        #[indexed] creator: ManagedAddress,
    );
}
