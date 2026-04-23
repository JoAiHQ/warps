multiversx_sc::imports!();

use crate::types::{CollectionId, CouponId};

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("collectionCreated")]
    fn collection_created_event(
        &self,
        #[indexed] collection_id: CollectionId,
        #[indexed] owner: &ManagedAddress,
        #[indexed] token_id: &EsdtTokenIdentifier,
    );

    #[event("couponCreated")]
    fn coupon_created_event(
        &self,
        #[indexed] coupon_id: CouponId,
        #[indexed] collection_id: CollectionId,
        #[indexed] code: &ManagedBuffer,
        #[indexed] owner: &ManagedAddress,
        #[indexed] discount_percent: u8,
    );

    #[event("couponClaimed")]
    fn coupon_claimed_event(
        &self,
        #[indexed] coupon_id: CouponId,
        #[indexed] claimer: &ManagedAddress,
        #[indexed] sft_nonce: u64,
    );

    #[event("couponRedeemed")]
    fn coupon_redeemed_event(
        &self,
        #[indexed] coupon_id: CouponId,
        #[indexed] redeemer: &ManagedAddress,
        #[indexed] discount_percent: u8,
    );

    #[event("couponRevoked")]
    fn coupon_revoked_event(
        &self,
        #[indexed] coupon_id: CouponId,
        #[indexed] owner: &ManagedAddress,
    );
}
