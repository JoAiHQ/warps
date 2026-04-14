#![no_std]

use errors::{
    ERR_INVALID_CATEGORY, ERR_INVALID_DESCRIPTION, ERR_INVALID_LOCATION, ERR_INVALID_SLUG,
    ERR_INVALID_URL, ERR_SHOP_ALREADY_EXISTS, ERR_SHOP_NOT_FOUND,
};
use types::ShopInfo;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod errors;
pub mod events;
pub mod payments;
pub mod products;
pub mod services;
pub mod shop_proxy;
pub mod types;

const MAX_SLUG_LEN: usize = 64;
const MAX_CATEGORY_LEN: usize = 64;
const MAX_LOCATION_LEN: usize = 128;
const MAX_DESCRIPTION_LEN: usize = 512;
const MAX_URL_LEN: usize = 256;

#[multiversx_sc::contract]
pub trait ShopContract:
    config::ConfigModule
    + events::EventsModule
    + services::ServicesModule
    + products::ProductsModule
    + payments::PaymentsModule
{
    #[init]
    fn init(&self) {}

    #[upgrade]
    fn upgrade(&self) {}

    // --- Shop Registration & Management ---

    #[endpoint(registerShop)]
    fn register_shop(
        &self,
        slug: ManagedBuffer,
        category: ManagedBuffer,
        location: ManagedBuffer,
        description: ManagedBuffer,
        image_url: ManagedBuffer,
        website: ManagedBuffer,
    ) {
        require!(slug.len() >= 1 && slug.len() <= MAX_SLUG_LEN, ERR_INVALID_SLUG);
        require!(self.shop_info(&slug).is_empty(), ERR_SHOP_ALREADY_EXISTS);
        require!(category.len() >= 1 && category.len() <= MAX_CATEGORY_LEN, ERR_INVALID_CATEGORY);
        require!(location.len() >= 1 && location.len() <= MAX_LOCATION_LEN, ERR_INVALID_LOCATION);
        require!(description.len() <= MAX_DESCRIPTION_LEN, ERR_INVALID_DESCRIPTION);
        require!(image_url.len() <= MAX_URL_LEN, ERR_INVALID_URL);
        require!(website.len() <= MAX_URL_LEN, ERR_INVALID_URL);

        let caller = self.blockchain().get_caller();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        let info = ShopInfo {
            owner: caller.clone(),
            created_at: timestamp,
            category: category.clone(),
            location,
            description,
            image_url,
            website,
        };

        self.shop_info(&slug).set(info);
        self.all_shops().insert(slug.clone());
        self.shops_by_category(&category).insert(slug.clone());

        self.shop_registered_event(slug, caller, category);
    }

    #[endpoint(updateShop)]
    fn update_shop(
        &self,
        slug: ManagedBuffer,
        category: ManagedBuffer,
        location: ManagedBuffer,
        description: ManagedBuffer,
        image_url: ManagedBuffer,
        website: ManagedBuffer,
    ) {
        self.require_shop_owner(&slug);
        require!(category.len() >= 1 && category.len() <= MAX_CATEGORY_LEN, ERR_INVALID_CATEGORY);
        require!(location.len() >= 1 && location.len() <= MAX_LOCATION_LEN, ERR_INVALID_LOCATION);
        require!(description.len() <= MAX_DESCRIPTION_LEN, ERR_INVALID_DESCRIPTION);
        require!(image_url.len() <= MAX_URL_LEN, ERR_INVALID_URL);
        require!(website.len() <= MAX_URL_LEN, ERR_INVALID_URL);

        let mut info = self.shop_info(&slug).get();

        if info.category != category {
            self.shops_by_category(&info.category).swap_remove(&slug);
            self.shops_by_category(&category).insert(slug.clone());
        }

        info.category = category;
        info.location = location;
        info.description = description;
        info.image_url = image_url;
        info.website = website;

        self.shop_info(&slug).set(info);
        self.shop_updated_event(slug);
    }

    // --- Views ---

    #[view(getShopInfo)]
    fn get_shop_info(&self, slug: ManagedBuffer) -> ShopInfo<Self::Api> {
        require!(!self.shop_info(&slug).is_empty(), ERR_SHOP_NOT_FOUND);
        self.shop_info(&slug).get()
    }

    #[view(getShopCount)]
    fn get_shop_count(&self) -> usize {
        self.all_shops().len()
    }

    #[view(getShops)]
    fn get_shops(&self, offset: usize, limit: usize) -> MultiValueEncoded<MultiValue2<ManagedBuffer, ShopInfo<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        let mut skipped = 0usize;
        let mut collected = 0usize;

        for slug in self.all_shops().iter() {
            if skipped < offset {
                skipped += 1;
                continue;
            }
            if collected >= limit {
                break;
            }
            if !self.shop_info(&slug).is_empty() {
                let info = self.shop_info(&slug).get();
                result.push(MultiValue2::from((slug, info)));
                collected += 1;
            }
        }

        result
    }

    #[view(getShopsByCategory)]
    fn get_shops_by_category(
        &self,
        category: ManagedBuffer,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<ManagedBuffer, ShopInfo<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        let mut skipped = 0usize;
        let mut collected = 0usize;

        for slug in self.shops_by_category(&category).iter() {
            if skipped < offset {
                skipped += 1;
                continue;
            }
            if collected >= limit {
                break;
            }
            if !self.shop_info(&slug).is_empty() {
                let info = self.shop_info(&slug).get();
                result.push(MultiValue2::from((slug, info)));
                collected += 1;
            }
        }

        result
    }
}
