use crate::types::{CustomerId, LoyaltyConfig, LoyaltyInfo};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    // Loyalty program storage (keyed by slug)
    #[storage_mapper("loyalty_info")]
    fn loyalty_info(&self, slug: &ManagedBuffer) -> SingleValueMapper<LoyaltyInfo<Self::Api>>;

    // Loyalty config per program
    #[storage_mapper("loyalty_config")]
    fn loyalty_config(&self, slug: &ManagedBuffer) -> SingleValueMapper<LoyaltyConfig<Self::Api>>;

    // Card → Customer mapping (scoped per program)
    #[storage_mapper("card_customer")]
    fn card_customer(&self, slug: &ManagedBuffer, card_uuid: &ManagedBuffer) -> SingleValueMapper<CustomerId>;

    // Customer → Card reverse lookup
    #[storage_mapper("customer_card")]
    fn customer_card(&self, customer_id: CustomerId) -> SingleValueMapper<ManagedBuffer>;

    // Customer data
    #[storage_mapper("next_customer_id")]
    fn next_customer_id(&self) -> SingleValueMapper<CustomerId>;

    #[storage_mapper("customer_slug")]
    fn customer_slug(&self, customer_id: CustomerId) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("customer_name")]
    fn customer_name(&self, customer_id: CustomerId) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("customer_stamps")]
    fn customer_stamps(&self, customer_id: CustomerId) -> SingleValueMapper<u32>;

    #[storage_mapper("customer_last_visit")]
    fn customer_last_visit(&self, customer_id: CustomerId) -> SingleValueMapper<u64>;

    #[storage_mapper("customer_discount")]
    fn customer_discount(&self, customer_id: CustomerId) -> SingleValueMapper<u8>;

    #[storage_mapper("customer_reward_ready")]
    fn customer_reward_ready(&self, customer_id: CustomerId) -> SingleValueMapper<bool>;

    // Program → Customers index
    #[storage_mapper("loyalty_customers")]
    fn loyalty_customers(&self, slug: &ManagedBuffer) -> UnorderedSetMapper<CustomerId>;
}
