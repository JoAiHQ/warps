use crate::types::CouponData;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    #[storage_mapper("coupon")]
    fn coupon(&self, code: &ManagedBuffer) -> SingleValueMapper<CouponData<Self::Api>>;

    #[storage_mapper("owner_coupons")]
    fn owner_coupons(&self, owner: &ManagedAddress) -> UnorderedSetMapper<ManagedBuffer>;
}
