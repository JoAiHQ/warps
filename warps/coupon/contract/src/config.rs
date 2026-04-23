multiversx_sc::imports!();

use crate::types::{CollectionId, CouponCollection, CouponData, CouponId};

pub const ESDT_ISSUE_COST: u64 = 50_000_000_000_000_000;

#[multiversx_sc::module]
pub trait ConfigModule {
    #[storage_mapper("next_collection_id")]
    fn next_collection_id(&self) -> SingleValueMapper<CollectionId>;

    #[storage_mapper("collection")]
    fn collection(&self, id: CollectionId) -> SingleValueMapper<CouponCollection<Self::Api>>;

    #[storage_mapper("collection_token")]
    fn collection_token(&self, id: CollectionId) -> SingleValueMapper<EsdtTokenIdentifier>;

    #[storage_mapper("token_collection")]
    fn token_collection(&self, token_id: &EsdtTokenIdentifier) -> SingleValueMapper<CollectionId>;

    #[storage_mapper("owner_collections")]
    fn owner_collections(&self, owner: &ManagedAddress) -> UnorderedSetMapper<CollectionId>;

    #[storage_mapper("next_coupon_id")]
    fn next_coupon_id(&self) -> SingleValueMapper<CouponId>;

    #[storage_mapper("coupon_by_id")]
    fn coupon_by_id(&self, coupon_id: CouponId) -> SingleValueMapper<CouponData<Self::Api>>;

    #[storage_mapper("coupon_by_code")]
    fn coupon_by_code(&self, code: &ManagedBuffer) -> SingleValueMapper<CouponId>;

    #[storage_mapper("owner_coupons")]
    fn owner_coupons(&self, owner: &ManagedAddress) -> UnorderedSetMapper<CouponId>;

    #[storage_mapper("collection_coupons")]
    fn collection_coupons(&self, collection_id: CollectionId) -> UnorderedSetMapper<CouponId>;
}
