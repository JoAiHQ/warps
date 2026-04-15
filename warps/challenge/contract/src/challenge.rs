use crate::{
    config,
    errors::*,
    events,
    types::{Challenge, ChallengeId, ChallengeStatus},
};

pub const MAX_TITLE_LEN: usize = 128;
pub const MAX_DURATION_HOURS: u64 = 720; // 30 days
pub const HOURS_TO_SECONDS: u64 = 3600;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ChallengeModule: config::ConfigModule + events::EventsModule {
    /// Create a challenge. Send EGLD or a stablecoin as the stake.
    /// duration_hours: how long the challenge runs (1–720)
    #[payable("*")]
    #[endpoint(create)]
    fn create_challenge(&self, title: ManagedBuffer, duration_hours: u64) -> ChallengeId {
        let payment = self.call_value().egld_or_single_esdt();
        let token = payment.token_identifier.clone();
        let stake = payment.amount.clone();

        require!(stake > BigUint::zero(), ERR_STAKE_REQUIRED);
        require!(title.len() >= 1 && title.len() <= MAX_TITLE_LEN, ERR_INVALID_TITLE);
        require!(duration_hours >= 1 && duration_hours <= MAX_DURATION_HOURS, ERR_INVALID_DURATION);

        let caller = self.blockchain().get_caller();
        let now = self.blockchain().get_block_timestamp();
        let ends_at = now + duration_hours * HOURS_TO_SECONDS;
        let id = self.next_challenge_id().get();

        let zero_address = ManagedAddress::zero();

        let challenge = Challenge {
            creator: caller.clone(),
            title: title.clone(),
            token: token.clone(),
            stake: stake.clone(),
            ends_at,
            created_at: now,
            acceptor: zero_address,
            status: ChallengeStatus::Open,
        };

        self.challenge(id).set(challenge);
        self.open_challenges().insert(id);
        self.creator_challenges(&caller).insert(id);
        self.next_challenge_id().set(id + 1);

        self.challenge_created_event(id, caller, token, stake, ends_at, title);

        id
    }

    /// Accept an open challenge. Send the same token and amount as the creator's stake exactly.
    #[payable("*")]
    #[endpoint(accept)]
    fn accept_challenge(&self, challenge_id: ChallengeId) {
        let payment = self.call_value().egld_or_single_esdt();
        require!(!self.challenge(challenge_id).is_empty(), ERR_CHALLENGE_NOT_FOUND);

        let mut challenge = self.challenge(challenge_id).get();
        require!(challenge.status == ChallengeStatus::Open, ERR_NOT_OPEN);

        let caller = self.blockchain().get_caller();
        require!(caller != challenge.creator, ERR_CANNOT_ACCEPT_OWN);
        require!(payment.token_identifier == challenge.token, ERR_TOKEN_MISMATCH);
        require!(payment.amount == challenge.stake, ERR_STAKE_MISMATCH);

        challenge.acceptor = caller.clone();
        challenge.status = ChallengeStatus::Accepted;

        self.challenge(challenge_id).set(challenge);
        self.open_challenges().swap_remove(&challenge_id);

        self.challenge_accepted_event(challenge_id, caller);
    }

    /// Resolve the outcome of an accepted challenge after it has ended.
    /// Only callable by the contract owner (JoAi agent verifies off-chain).
    /// If creator_succeeded: both parties get their stake back.
    /// If !creator_succeeded: acceptor wins both stakes.
    #[endpoint(resolve)]
    fn resolve_challenge(&self, challenge_id: ChallengeId, creator_succeeded: bool) {
        let owner = self.blockchain().get_owner_address();
        let caller = self.blockchain().get_caller();
        require!(caller == owner, ERR_NOT_OWNER);
        require!(!self.challenge(challenge_id).is_empty(), ERR_CHALLENGE_NOT_FOUND);

        let mut challenge = self.challenge(challenge_id).get();
        require!(challenge.status == ChallengeStatus::Accepted, ERR_NOT_ACCEPTED);
        require!(self.blockchain().get_block_timestamp() >= challenge.ends_at, ERR_NOT_ENDED);

        let token = challenge.token.clone();
        let nonce = 0u64;

        let winner: ManagedAddress;

        if creator_succeeded {
            self.send().direct(&challenge.creator, &token, nonce, &challenge.stake);
            self.send().direct(&challenge.acceptor, &token, nonce, &challenge.stake);
            challenge.status = ChallengeStatus::CreatorSucceeded;
            winner = challenge.creator.clone();
        } else {
            let total = challenge.stake.clone() * 2u32;
            self.send().direct(&challenge.acceptor, &token, nonce, &total);
            challenge.status = ChallengeStatus::CreatorFailed;
            winner = challenge.acceptor.clone();
        }

        self.challenge(challenge_id).set(challenge);
        self.challenge_resolved_event(challenge_id, creator_succeeded, winner);
    }

    /// Cancel an open challenge before it is accepted. Refunds the stake.
    #[endpoint(cancel)]
    fn cancel_challenge(&self, challenge_id: ChallengeId) {
        require!(!self.challenge(challenge_id).is_empty(), ERR_CHALLENGE_NOT_FOUND);

        let mut challenge = self.challenge(challenge_id).get();
        require!(challenge.status == ChallengeStatus::Open, ERR_NOT_OPEN);

        let caller = self.blockchain().get_caller();
        require!(caller == challenge.creator, ERR_NOT_CREATOR);

        let token = challenge.token.clone();
        self.send().direct(&challenge.creator, &token, 0u64, &challenge.stake);

        challenge.status = ChallengeStatus::Cancelled;
        self.challenge(challenge_id).set(challenge);
        self.open_challenges().swap_remove(&challenge_id);

        self.challenge_cancelled_event(challenge_id, caller);
    }

    // ─── Views ───────────────────────────────────────────────────────────────

    #[view(get)]
    fn get_challenge(&self, challenge_id: ChallengeId) -> Challenge<Self::Api> {
        require!(!self.challenge(challenge_id).is_empty(), ERR_CHALLENGE_NOT_FOUND);
        self.challenge(challenge_id).get()
    }

    #[view(getOpen)]
    fn get_open_challenges(
        &self,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<ChallengeId, Challenge<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        for id in self.open_challenges().iter().skip(offset).take(limit) {
            result.push((id, self.challenge(id).get()).into());
        }
        result
    }

    #[view(getByCreator)]
    fn get_challenges_by_creator(
        &self,
        creator: ManagedAddress,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<ChallengeId, Challenge<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        for id in self.creator_challenges(&creator).iter().skip(offset).take(limit) {
            result.push((id, self.challenge(id).get()).into());
        }
        result
    }

    #[view(getNextId)]
    fn get_next_challenge_id(&self) -> ChallengeId {
        self.next_challenge_id().get()
    }
}
