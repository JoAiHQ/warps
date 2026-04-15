multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("loyaltyCreated")]
    fn loyalty_created_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] owner: ManagedAddress);

    #[event("customerRegistered")]
    fn customer_registered_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] card_uuid: ManagedBuffer, #[indexed] customer_id: u64);

    #[event("stampAdded")]
    fn stamp_added_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] card_uuid: ManagedBuffer, #[indexed] stamps: u32);

    #[event("rewardRedeemed")]
    fn reward_redeemed_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] card_uuid: ManagedBuffer);

    #[event("discountSet")]
    fn discount_set_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] card_uuid: ManagedBuffer, #[indexed] percent: u8);
}
