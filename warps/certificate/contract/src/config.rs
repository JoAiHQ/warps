multiversx_sc::imports!();

use crate::types::{CertCollection, CertId, Certificate, CollectionId};

pub const ESDT_ISSUE_COST: u64 = 50_000_000_000_000_000; // 0.05 EGLD

#[multiversx_sc::module]
pub trait ConfigModule {
    // ─── Collections ─────────────────────────────────────────────────────────

    #[storage_mapper("next_collection_id")]
    fn next_collection_id(&self) -> SingleValueMapper<CollectionId>;

    #[storage_mapper("collection")]
    fn collection(&self, id: CollectionId) -> SingleValueMapper<CertCollection<Self::Api>>;

    #[storage_mapper("collection_token")]
    fn collection_token(&self, id: CollectionId) -> SingleValueMapper<EsdtTokenIdentifier>;

    #[storage_mapper("token_collection")]
    fn token_collection(&self, token_id: &EsdtTokenIdentifier) -> SingleValueMapper<CollectionId>;

    #[storage_mapper("issuer_collections")]
    fn issuer_collections(&self, issuer: &ManagedAddress) -> UnorderedSetMapper<CollectionId>;

    // ─── Certificates ─────────────────────────────────────────────────────────

    #[storage_mapper("next_cert_id")]
    fn next_cert_id(&self) -> SingleValueMapper<CertId>;

    #[storage_mapper("certificate")]
    fn certificate(&self, cert_id: CertId) -> SingleValueMapper<Certificate<Self::Api>>;

    #[storage_mapper("issuer_certs")]
    fn issuer_certs(&self, issuer: &ManagedAddress) -> UnorderedSetMapper<CertId>;

    #[storage_mapper("collection_certs")]
    fn collection_certs(&self, collection_id: CollectionId) -> UnorderedSetMapper<CertId>;
}
