multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type RequestId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, PartialEq, Clone)]
pub enum SignatureStatus {
    Pending,
    Completed,
    Cancelled,
    Expired,
    Declined,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct SignatureRequest<M: ManagedTypeApi> {
    pub id: RequestId,
    pub creator: ManagedAddress<M>,
    pub title: ManagedBuffer<M>,
    pub document_hash: ManagedBuffer<M>,
    pub document_url: ManagedBuffer<M>,
    pub signer_count: u64,
    pub signed_count: u64,
    pub deadline: u64,   // unix timestamp seconds; 0 = no deadline
    pub created_at: u64, // unix timestamp seconds
    pub status: SignatureStatus,
}
