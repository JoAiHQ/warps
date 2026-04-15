multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type CollectionId = u64;
pub type CouponNonce = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct Collection<M: ManagedTypeApi> {
    pub id: CollectionId,
    pub creator: ManagedAddress<M>,
    pub name: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct CouponData {
    pub discount_percent: u8,
    pub expires_at: u64,
    pub created_at: u64,
    pub is_revoked: bool,
}
