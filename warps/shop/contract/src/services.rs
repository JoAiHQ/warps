use crate::{
    config,
    errors::{
        ERR_INVALID_CATEGORY, ERR_INVALID_DESCRIPTION, ERR_INVALID_DURATION, ERR_INVALID_NAME,
        ERR_INVALID_SLUG, ERR_SERVICE_ALREADY_EXISTS, ERR_SERVICE_NOT_FOUND, ERR_SHOP_NOT_FOUND,
    },
    events,
    types::ShopService,
};

pub const MAX_SLUG_LEN: usize = 64;
pub const MAX_NAME_LEN: usize = 128;
pub const MAX_CATEGORY_LEN: usize = 64;
pub const MAX_DESCRIPTION_LEN: usize = 512;
pub const MAX_DURATION_MINUTES: u32 = 1440;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ServicesModule: config::ConfigModule + events::EventsModule {
    #[endpoint(addService)]
    fn add_service(
        &self,
        id: ManagedBuffer,
        service_slug: ManagedBuffer,
        name: ManagedBuffer,
        price: u64,
        duration_minutes: u32,
        category: ManagedBuffer,
        description: ManagedBuffer,
    ) {
        self.require_shop_owner(&id);
        require!(service_slug.len() >= 1 && service_slug.len() <= MAX_SLUG_LEN, ERR_INVALID_SLUG);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(duration_minutes >= 1 && duration_minutes <= MAX_DURATION_MINUTES, ERR_INVALID_DURATION);
        require!(category.len() <= MAX_CATEGORY_LEN, ERR_INVALID_CATEGORY);
        require!(description.len() <= MAX_DESCRIPTION_LEN, ERR_INVALID_DESCRIPTION);
        require!(
            self.shop_service(&id, &service_slug).is_empty(),
            ERR_SERVICE_ALREADY_EXISTS
        );

        let service = ShopService {
            slug: service_slug.clone(),
            name,
            price,
            duration_minutes,
            category,
            description,
        };

        self.shop_service(&id, &service_slug).set(service);
        self.shop_service_slugs(&id).insert(service_slug.clone());

        self.service_added_event(id, service_slug);
    }

    #[endpoint(removeService)]
    fn remove_service(&self, id: ManagedBuffer, service_slug: ManagedBuffer) {
        self.require_shop_owner(&id);
        require!(!self.shop_service(&id, &service_slug).is_empty(), ERR_SERVICE_NOT_FOUND);

        self.shop_service(&id, &service_slug).clear();
        self.shop_service_slugs(&id).swap_remove(&service_slug);

        self.service_removed_event(id, service_slug);
    }

    #[view(getService)]
    fn get_service(&self, id: ManagedBuffer, slug: ManagedBuffer) -> ShopService<Self::Api> {
        require!(!self.shop_info(&id).is_empty(), ERR_SHOP_NOT_FOUND);
        require!(!self.shop_service(&id, &slug).is_empty(), ERR_SERVICE_NOT_FOUND);
        self.shop_service(&id, &slug).get()
    }

    #[view(getServices)]
    fn get_services(&self, id: ManagedBuffer) -> MultiValueEncoded<ShopService<Self::Api>> {
        require!(!self.shop_info(&id).is_empty(), ERR_SHOP_NOT_FOUND);

        let mut result = MultiValueEncoded::new();
        for service_slug in self.shop_service_slugs(&id).iter() {
            if !self.shop_service(&id, &service_slug).is_empty() {
                result.push(self.shop_service(&id, &service_slug).get());
            }
        }
        result
    }
}
