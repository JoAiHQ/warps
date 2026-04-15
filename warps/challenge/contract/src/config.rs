use crate::types::{Challenge, ChallengeId};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    #[storage_mapper("next_challenge_id")]
    fn next_challenge_id(&self) -> SingleValueMapper<ChallengeId>;

    #[storage_mapper("challenge")]
    fn challenge(&self, id: ChallengeId) -> SingleValueMapper<Challenge<Self::Api>>;

    #[storage_mapper("open_challenges")]
    fn open_challenges(&self) -> UnorderedSetMapper<ChallengeId>;

    #[storage_mapper("creator_challenges")]
    fn creator_challenges(&self, creator: &ManagedAddress) -> UnorderedSetMapper<ChallengeId>;
}
