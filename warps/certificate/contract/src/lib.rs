#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod certificate;
pub mod config;
pub mod errors;
pub mod events;
pub mod types;

#[multiversx_sc::contract]
pub trait CertificateContract: config::ConfigModule + events::EventsModule + certificate::CertificateModule {
    #[init]
    fn init(&self) {
        self.next_collection_id().set(1u64);
        self.next_cert_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}
}
