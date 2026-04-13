#![no_std]

use errors::{ERR_INVALID_SLUG, ERR_SHOP_ALREADY_EXISTS, ERR_SHOP_NOT_FOUND};
use types::ShopInfo;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod errors;
pub mod events;
pub mod products;
pub mod services;
pub mod shop_proxy;
pub mod types;

#[multiversx_sc::contract]
pub trait ShopContract: config::ConfigModule + events::EventsModule + services::ServicesModule + products::ProductsModule {
    #[init]
    fn init(&self) {}

    #[upgrade]
    fn upgrade(&self) {}

    #[endpoint(registerShop)]
    fn register_shop(&self, slug: ManagedBuffer) {
        require!(slug.len() >= 1 && slug.len() <= 64, ERR_INVALID_SLUG);
        require!(self.shop_info(&slug).is_empty(), ERR_SHOP_ALREADY_EXISTS);

        let caller = self.blockchain().get_caller();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        let info = ShopInfo {
            owner: caller.clone(),
            created_at: timestamp,
        };

        self.shop_info(&slug).set(info);
        self.shop_registered_event(slug, caller);
    }

    #[view(getShopInfo)]
    fn get_shop_info(&self, slug: ManagedBuffer) -> ShopInfo<Self::Api> {
        require!(!self.shop_info(&slug).is_empty(), ERR_SHOP_NOT_FOUND);
        self.shop_info(&slug).get()
    }
}
