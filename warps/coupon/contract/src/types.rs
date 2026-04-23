multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type CollectionId = u64;
pub type CouponId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct CouponCollection<M: ManagedTypeApi> {
    pub id: CollectionId,
    pub owner: ManagedAddress<M>,
    pub name: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, PartialEq, Clone)]
pub enum CouponStatus {
    Active,
    Revoked,
    Expired,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct CouponData<M: ManagedTypeApi> {
    pub id: CouponId,
    pub collection_id: CollectionId,
    pub sft_nonce: u64,
    pub code: ManagedBuffer<M>,
    pub owner: ManagedAddress<M>,
    pub discount_percent: u8,
    pub max_uses: u64,
    pub used_count: u64,
    pub expires_at: u64,
    pub created_at: u64,
    pub status: CouponStatus,
}
