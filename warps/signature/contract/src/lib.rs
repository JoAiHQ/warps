#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod errors;
pub mod events;
pub mod signature;
pub mod types;

#[multiversx_sc::contract]
pub trait SignatureContract: config::ConfigModule + events::EventsModule + signature::SignatureModule {
    #[init]
    fn init(&self) {
        self.next_request_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}
}
