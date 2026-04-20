multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct CouponData<M: ManagedTypeApi> {
    pub owner: ManagedAddress<M>,
    pub discount_percent: u8,
    pub max_uses: u64,
    pub used_count: u64,
    pub expires_at: u64,
    pub created_at: u64,
    pub is_revoked: bool,
}
