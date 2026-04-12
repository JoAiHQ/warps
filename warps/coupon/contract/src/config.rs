use crate::types::{Collection, CollectionId, CouponData, CouponNonce};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub const ESDT_ISSUE_COST: u64 = 50_000_000_000_000_000; // 0.05 EGLD in attoEGLD

#[multiversx_sc::module]
pub trait ConfigModule {
    #[storage_mapper("next_collection_id")]
    fn next_collection_id(&self) -> SingleValueMapper<CollectionId>;

    #[storage_mapper("collection")]
    fn collection(&self, id: CollectionId) -> SingleValueMapper<Collection<Self::Api>>;

    // Set only after the ESDT issue callback succeeds. Empty = not yet ready.
    #[storage_mapper("collection_token")]
    fn collection_token(&self, id: CollectionId) -> SingleValueMapper<EsdtTokenIdentifier>;

    #[storage_mapper("token_collection")]
    fn token_collection(&self, token_id: &EsdtTokenIdentifier) -> SingleValueMapper<CollectionId>;

    #[storage_mapper("creator_collections")]
    fn creator_collections(&self, creator: &ManagedAddress) -> UnorderedSetMapper<CollectionId>;

    #[storage_mapper("coupon_data")]
    fn coupon_data(&self, collection_id: CollectionId, nonce: CouponNonce) -> SingleValueMapper<CouponData>;
}
