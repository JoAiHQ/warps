#![no_std]

use errors::{ERR_INVALID_SLUG, ERR_LOYALTY_ALREADY_EXISTS, ERR_LOYALTY_NOT_FOUND};
use types::LoyaltyInfo;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod errors;
pub mod events;
pub mod loyalty;
pub mod loyalty_proxy;
pub mod types;

#[multiversx_sc::contract]
pub trait LoyaltyContract: config::ConfigModule + events::EventsModule + loyalty::LoyaltyModule {
    #[init]
    fn init(&self) {
        self.next_customer_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}

    #[endpoint(createLoyalty)]
    fn create_loyalty(&self, slug: ManagedBuffer) {
        require!(slug.len() >= 1 && slug.len() <= 64, ERR_INVALID_SLUG);
        require!(self.loyalty_info(&slug).is_empty(), ERR_LOYALTY_ALREADY_EXISTS);

        let caller = self.blockchain().get_caller();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        let info = LoyaltyInfo {
            owner: caller.clone(),
            created_at: timestamp,
        };

        self.loyalty_info(&slug).set(info);
        self.loyalty_created_event(slug, caller);
    }

    #[view(getLoyaltyInfo)]
    fn get_loyalty_info(&self, slug: ManagedBuffer) -> LoyaltyInfo<Self::Api> {
        require!(!self.loyalty_info(&slug).is_empty(), ERR_LOYALTY_NOT_FOUND);
        self.loyalty_info(&slug).get()
    }
}
