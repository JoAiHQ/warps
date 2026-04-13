multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct ShopInfo<M: ManagedTypeApi> {
    pub owner: ManagedAddress<M>,
    pub created_at: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct ShopService<M: ManagedTypeApi> {
    pub slug: ManagedBuffer<M>,
    pub name: ManagedBuffer<M>,
    pub price_cents: u64,
    pub duration_minutes: u32,
    pub category: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct ShopProduct<M: ManagedTypeApi> {
    pub slug: ManagedBuffer<M>,
    pub name: ManagedBuffer<M>,
    pub price_cents: u64,
    pub category: ManagedBuffer<M>,
    pub description: ManagedBuffer<M>,
    pub in_stock: bool,
}
