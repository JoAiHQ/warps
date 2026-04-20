multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type CollectionId = u64;
pub type CertId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct CertCollection<M: ManagedTypeApi> {
    pub id: CollectionId,
    pub issuer: ManagedAddress<M>,
    pub name: ManagedBuffer<M>,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, PartialEq, Clone)]
pub enum CertificateStatus {
    Active,
    Revoked,
    Expired,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct Certificate<M: ManagedTypeApi> {
    pub id: CertId,
    pub collection_id: CollectionId,
    pub nft_nonce: u64,
    pub issuer: ManagedAddress<M>,
    pub company_name: ManagedBuffer<M>,
    pub pdf_hash: ManagedBuffer<M>,
    pub pdf_url: ManagedBuffer<M>,
    pub issued_at: u64,
    pub expires_at: u64, // 0 = never expires
    pub status: CertificateStatus,
    pub recipient: ManagedOption<M, ManagedAddress<M>>, // set when claimed
}
