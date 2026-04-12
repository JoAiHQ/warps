multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type ChallengeId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, PartialEq, Clone)]
pub enum ChallengeStatus {
    Open,
    Accepted,
    CreatorSucceeded,
    CreatorFailed,
    Cancelled,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct Challenge<M: ManagedTypeApi> {
    pub creator: ManagedAddress<M>,
    pub title: ManagedBuffer<M>,
    pub token: EgldOrEsdtTokenIdentifier<M>,
    pub stake: BigUint<M>,
    pub ends_at: u64,
    pub created_at: u64,
    pub acceptor: ManagedAddress<M>,
    pub status: ChallengeStatus,
}
