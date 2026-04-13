use crate::{
    config,
    errors::{
        ERR_INVALID_CATEGORY, ERR_INVALID_DURATION, ERR_INVALID_NAME, ERR_INVALID_SLUG, ERR_NOT_SHOP_OWNER,
        ERR_SERVICE_ALREADY_EXISTS, ERR_SERVICE_NOT_FOUND, ERR_SHOP_NOT_FOUND,
    },
    events,
    types::ShopService,
};

pub const MAX_SLUG_LEN: usize = 64;
pub const MAX_NAME_LEN: usize = 128;
pub const MAX_CATEGORY_LEN: usize = 64;
pub const MAX_DURATION_MINUTES: u32 = 1440;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ServicesModule: config::ConfigModule + events::EventsModule {
    #[endpoint(addService)]
    fn add_service(
        &self,
        shop_slug: ManagedBuffer,
        service_slug: ManagedBuffer,
        name: ManagedBuffer,
        price_cents: u64,
        duration_minutes: u32,
        category: ManagedBuffer,
    ) {
        self.require_shop_owner(&shop_slug);
        require!(service_slug.len() >= 1 && service_slug.len() <= MAX_SLUG_LEN, ERR_INVALID_SLUG);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(duration_minutes >= 1 && duration_minutes <= MAX_DURATION_MINUTES, ERR_INVALID_DURATION);
        require!(category.len() <= MAX_CATEGORY_LEN, ERR_INVALID_CATEGORY);
        require!(
            self.shop_service(&shop_slug, &service_slug).is_empty(),
            ERR_SERVICE_ALREADY_EXISTS
        );

        let service = ShopService {
            slug: service_slug.clone(),
            name,
            price_cents,
            duration_minutes,
            category,
        };

        self.shop_service(&shop_slug, &service_slug).set(service);
        self.shop_service_slugs(&shop_slug).insert(service_slug.clone());

        self.service_added_event(shop_slug, service_slug);
    }

    #[endpoint(removeService)]
    fn remove_service(&self, shop_slug: ManagedBuffer, service_slug: ManagedBuffer) {
        self.require_shop_owner(&shop_slug);
        require!(!self.shop_service(&shop_slug, &service_slug).is_empty(), ERR_SERVICE_NOT_FOUND);

        self.shop_service(&shop_slug, &service_slug).clear();
        self.shop_service_slugs(&shop_slug).swap_remove(&service_slug);

        self.service_removed_event(shop_slug, service_slug);
    }

    #[view(getServices)]
    fn get_services(&self, shop_slug: ManagedBuffer) -> MultiValueEncoded<ShopService<Self::Api>> {
        require!(!self.shop_info(&shop_slug).is_empty(), ERR_SHOP_NOT_FOUND);

        let mut result = MultiValueEncoded::new();

        for service_slug in self.shop_service_slugs(&shop_slug).iter() {
            if !self.shop_service(&shop_slug, &service_slug).is_empty() {
                result.push(self.shop_service(&shop_slug, &service_slug).get());
            }
        }

        result
    }

    fn require_shop_owner(&self, slug: &ManagedBuffer) {
        require!(!self.shop_info(slug).is_empty(), ERR_SHOP_NOT_FOUND);
        let info = self.shop_info(slug).get();
        let caller = self.blockchain().get_caller();
        require!(info.owner == caller, ERR_NOT_SHOP_OWNER);
    }
}
