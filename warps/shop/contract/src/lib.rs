#![no_std]

use errors::{
    ERR_INVALID_CATEGORY, ERR_INVALID_DESCRIPTION,     ERR_INVALID_SETTING_KEY, ERR_INVALID_LOCATION, ERR_INVALID_ID,
    ERR_INVALID_URL, ERR_SHOP_ALREADY_EXISTS, ERR_SHOP_NOT_FOUND,
};
use types::{ShopInfo, ShopService};

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

const MAX_ID_LEN: usize = 64;
const MAX_CATEGORY_LEN: usize = 64;
const MAX_LOCATION_LEN: usize = 128;
const MAX_DESCRIPTION_LEN: usize = 512;
const MAX_URL_LEN: usize = 256;
const MAX_FLAG_KEY_LEN: usize = 64;

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
        id: ManagedBuffer,
        category: ManagedBuffer,
        location: ManagedBuffer,
        description: ManagedBuffer,
        image_url: ManagedBuffer,
        website: ManagedBuffer,
    ) {
        require!(id.len() >= 1 && id.len() <= MAX_ID_LEN, ERR_INVALID_ID);
        require!(self.shop_info(&id).is_empty(), ERR_SHOP_ALREADY_EXISTS);
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

        self.shop_info(&id).set(info);
        self.all_shops().insert(id.clone());
        self.shops_by_category(&category).insert(id.clone());

        self.shop_registered_event(id, caller, category);
    }

    #[endpoint(updateShop)]
    fn update_shop(
        &self,
        id: ManagedBuffer,
        category: ManagedBuffer,
        location: ManagedBuffer,
        description: ManagedBuffer,
        image_url: ManagedBuffer,
        website: ManagedBuffer,
    ) {
        self.require_shop_owner(&id);
        require!(category.len() >= 1 && category.len() <= MAX_CATEGORY_LEN, ERR_INVALID_CATEGORY);
        require!(location.len() >= 1 && location.len() <= MAX_LOCATION_LEN, ERR_INVALID_LOCATION);
        require!(description.len() <= MAX_DESCRIPTION_LEN, ERR_INVALID_DESCRIPTION);
        require!(image_url.len() <= MAX_URL_LEN, ERR_INVALID_URL);
        require!(website.len() <= MAX_URL_LEN, ERR_INVALID_URL);

        let mut info = self.shop_info(&id).get();

        if info.category != category {
            self.shops_by_category(&info.category).swap_remove(&id);
            self.shops_by_category(&category).insert(id.clone());
        }

        info.category = category;
        info.location = location;
        info.description = description;
        info.image_url = image_url;
        info.website = website;

        self.shop_info(&id).set(info);
        self.shop_updated_event(id);
    }

    // --- Views ---

    #[view(getServiceWithPayment)]
    fn get_service_with_payment(
        &self,
        id: ManagedBuffer,
        slug: ManagedBuffer,
    ) -> MultiValue2<ShopService<Self::Api>, types::PaymentDestination<Self::Api>> {
        let service = self.get_service(id.clone(), slug);
        let payment = self.get_payment_destination(id);
        (service, payment).into()
    }

    #[view(getShopInfo)]
    fn get_shop_info(&self, id: ManagedBuffer) -> ShopInfo<Self::Api> {
        require!(!self.shop_info(&id).is_empty(), ERR_SHOP_NOT_FOUND);
        self.shop_info(&id).get()
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

        for id in self.all_shops().iter() {
            if skipped < offset {
                skipped += 1;
                continue;
            }
            if collected >= limit {
                break;
            }
            if !self.shop_info(&id).is_empty() {
                let info = self.shop_info(&id).get();
                result.push(MultiValue2::from((id, info)));
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

        for id in self.shops_by_category(&category).iter() {
            if skipped < offset {
                skipped += 1;
                continue;
            }
            if collected >= limit {
                break;
            }
            if !self.shop_info(&id).is_empty() {
                let info = self.shop_info(&id).get();
                result.push(MultiValue2::from((id, info)));
                collected += 1;
            }
        }

        result
    }

    // --- Flags ---

    #[endpoint(setShopSetting)]
    fn set_shop_setting(&self, id: ManagedBuffer, key: ManagedBuffer, value: bool) {
        self.require_shop_owner(&id);
        require!(key.len() >= 1 && key.len() <= MAX_FLAG_KEY_LEN, ERR_INVALID_SETTING_KEY);

        self.shop_setting(&id, &key).set(value);

        self.shop_setting_set_event(id, key, value);
    }

    #[view(getShopSetting)]
    fn get_shop_setting(&self, id: ManagedBuffer, key: ManagedBuffer) -> bool {
        require!(!self.shop_info(&id).is_empty(), ERR_SHOP_NOT_FOUND);

        if self.shop_setting(&id, &key).is_empty() {
            return false;
        }

        self.shop_setting(&id, &key).get()
    }
}
