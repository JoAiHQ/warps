#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod challenge;
pub mod config;
pub mod errors;
pub mod events;
pub mod types;

#[multiversx_sc::contract]
pub trait ChallengeContract: config::ConfigModule + events::EventsModule + challenge::ChallengeModule {
    #[init]
    fn init(&self) {
        self.next_challenge_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}
}
