use crate::types::{RequestId, SignatureRequest};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    #[storage_mapper("next_request_id")]
    fn next_request_id(&self) -> SingleValueMapper<RequestId>;

    #[storage_mapper("request")]
    fn request(&self, id: RequestId) -> SingleValueMapper<SignatureRequest<Self::Api>>;

    #[storage_mapper("request_signers")]
    fn request_signers(&self, id: RequestId) -> UnorderedSetMapper<ManagedAddress>;

    #[storage_mapper("request_signed_by")]
    fn request_signed_by(&self, id: RequestId) -> UnorderedSetMapper<ManagedAddress>;

    #[storage_mapper("creator_requests")]
    fn creator_requests(&self, creator: &ManagedAddress) -> UnorderedSetMapper<RequestId>;
}
