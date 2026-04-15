multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct ShopInfo<M: ManagedTypeApi> {
    pub owner: ManagedAddress<M>,
    pub created_at: u64,
    pub category: ManagedBuffer<M>,
    pub location: ManagedBuffer<M>,
    pub description: ManagedBuffer<M>,
    pub image_url: ManagedBuffer<M>,
    pub website: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct PaymentDestination<M: ManagedTypeApi> {
    pub chain: ManagedBuffer<M>,
    pub address: ManagedBuffer<M>,
    pub token: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct ShopService<M: ManagedTypeApi> {
    pub slug: ManagedBuffer<M>,
    pub name: ManagedBuffer<M>,
    pub price: u64,
    pub duration_minutes: u32,
    pub category: ManagedBuffer<M>,
    pub description: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct ShopProduct<M: ManagedTypeApi> {
    pub slug: ManagedBuffer<M>,
    pub name: ManagedBuffer<M>,
    pub price: u64,
    pub category: ManagedBuffer<M>,
    pub description: ManagedBuffer<M>,
    pub in_stock: bool,
}
