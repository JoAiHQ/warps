#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod coupon;
pub mod errors;
pub mod events;
pub mod types;

#[multiversx_sc::contract]
pub trait CouponContract:
    config::ConfigModule + events::EventsModule + coupon::CouponModule
{
    #[init]
    fn init(&self) {
        self.next_collection_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}
}
