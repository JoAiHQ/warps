#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod errors;
pub mod events;
pub mod poll;
pub mod poll_proxy;
pub mod types;

#[multiversx_sc::contract]
pub trait PollContract: config::ConfigModule + events::EventsModule + poll::PollModule {
    #[init]
    fn init(&self) {
        self.next_poll_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}
}
