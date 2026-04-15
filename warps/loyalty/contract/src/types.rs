multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type CustomerId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct LoyaltyInfo<M: ManagedTypeApi> {
    pub owner: ManagedAddress<M>,
    pub created_at: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct LoyaltyConfig<M: ManagedTypeApi> {
    pub stamps_for_reward: u32,
    pub reward_label: ManagedBuffer<M>,
    pub review_url: ManagedBuffer<M>,
    pub review_discount: u8,
    pub reminder_days: u32,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct CustomerStatus<M: ManagedTypeApi> {
    pub name: ManagedBuffer<M>,
    pub stamps: u32,
    pub stamps_for_reward: u32,
    pub discount: u8,
    pub reward_ready: bool,
    pub last_visit: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct StaleCustomer<M: ManagedTypeApi> {
    pub customer_id: CustomerId,
    pub card_uuid: ManagedBuffer<M>,
    pub last_visit: u64,
}
