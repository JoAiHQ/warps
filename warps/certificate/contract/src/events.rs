multiversx_sc::imports!();

use crate::types::{CertId, CollectionId};

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("collection_created")]
    fn collection_created_event(
        &self,
        #[indexed] collection_id: CollectionId,
        #[indexed] issuer: &ManagedAddress,
        #[indexed] token_id: &EsdtTokenIdentifier,
    );

    #[event("certificate_issued")]
    fn certificate_issued_event(
        &self,
        #[indexed] cert_id: CertId,
        #[indexed] collection_id: CollectionId,
        #[indexed] issuer: &ManagedAddress,
        #[indexed] company_name: &ManagedBuffer,
    );

    #[event("certificate_revoked")]
    fn certificate_revoked_event(
        &self,
        #[indexed] cert_id: CertId,
        #[indexed] issuer: &ManagedAddress,
    );

    #[event("certificate_claimed")]
    fn certificate_claimed_event(
        &self,
        #[indexed] cert_id: CertId,
        #[indexed] recipient: &ManagedAddress,
    );
}
