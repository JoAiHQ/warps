multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("challengeCreated")]
    fn challenge_created_event(
        &self,
        #[indexed] challenge_id: u64,
        #[indexed] creator: ManagedAddress,
        #[indexed] token: EgldOrEsdtTokenIdentifier,
        #[indexed] stake: BigUint,
        #[indexed] ends_at: u64,
        title: ManagedBuffer,
    );

    #[event("challengeAccepted")]
    fn challenge_accepted_event(&self, #[indexed] challenge_id: u64, #[indexed] acceptor: ManagedAddress);

    #[event("challengeResolved")]
    fn challenge_resolved_event(
        &self,
        #[indexed] challenge_id: u64,
        #[indexed] creator_succeeded: bool,
        winner: ManagedAddress,
    );

    #[event("challengeCancelled")]
    fn challenge_cancelled_event(&self, #[indexed] challenge_id: u64, #[indexed] creator: ManagedAddress);
}
