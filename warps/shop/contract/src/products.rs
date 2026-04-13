use crate::{
    config,
    errors::{
        ERR_INVALID_CATEGORY, ERR_INVALID_NAME, ERR_INVALID_SLUG, ERR_NOT_SHOP_OWNER,
        ERR_PRODUCT_ALREADY_EXISTS, ERR_PRODUCT_NOT_FOUND, ERR_SHOP_NOT_FOUND,
    },
    events,
    types::ShopProduct,
};

pub const MAX_DESCRIPTION_LEN: usize = 512;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ProductsModule: config::ConfigModule + events::EventsModule {
    #[endpoint(addProduct)]
    fn add_product(
        &self,
        shop_slug: ManagedBuffer,
        product_slug: ManagedBuffer,
        name: ManagedBuffer,
        price_cents: u64,
        category: ManagedBuffer,
        description: ManagedBuffer,
    ) {
        self.require_product_shop_owner(&shop_slug);
        require!(product_slug.len() >= 1 && product_slug.len() <= 64, ERR_INVALID_SLUG);
        require!(name.len() >= 1 && name.len() <= 128, ERR_INVALID_NAME);
        require!(category.len() <= 64, ERR_INVALID_CATEGORY);
        require!(description.len() <= MAX_DESCRIPTION_LEN, "description too long");
        require!(
            self.shop_product(&shop_slug, &product_slug).is_empty(),
            ERR_PRODUCT_ALREADY_EXISTS
        );

        let product = ShopProduct {
            slug: product_slug.clone(),
            name,
            price_cents,
            category,
            description,
            in_stock: true,
        };

        self.shop_product(&shop_slug, &product_slug).set(product);
        self.shop_product_slugs(&shop_slug).insert(product_slug.clone());

        self.product_added_event(shop_slug, product_slug);
    }

    #[endpoint(updateProductStock)]
    fn update_product_stock(&self, shop_slug: ManagedBuffer, product_slug: ManagedBuffer, in_stock: bool) {
        self.require_product_shop_owner(&shop_slug);
        require!(!self.shop_product(&shop_slug, &product_slug).is_empty(), ERR_PRODUCT_NOT_FOUND);

        let mut product = self.shop_product(&shop_slug, &product_slug).get();
        product.in_stock = in_stock;
        self.shop_product(&shop_slug, &product_slug).set(product);
    }

    #[endpoint(removeProduct)]
    fn remove_product(&self, shop_slug: ManagedBuffer, product_slug: ManagedBuffer) {
        self.require_product_shop_owner(&shop_slug);
        require!(!self.shop_product(&shop_slug, &product_slug).is_empty(), ERR_PRODUCT_NOT_FOUND);

        self.shop_product(&shop_slug, &product_slug).clear();
        self.shop_product_slugs(&shop_slug).swap_remove(&product_slug);

        self.product_removed_event(shop_slug, product_slug);
    }

    #[view(getProducts)]
    fn get_products(&self, shop_slug: ManagedBuffer) -> MultiValueEncoded<ShopProduct<Self::Api>> {
        require!(!self.shop_info(&shop_slug).is_empty(), ERR_SHOP_NOT_FOUND);

        let mut result = MultiValueEncoded::new();

        for product_slug in self.shop_product_slugs(&shop_slug).iter() {
            if !self.shop_product(&shop_slug, &product_slug).is_empty() {
                result.push(self.shop_product(&shop_slug, &product_slug).get());
            }
        }

        result
    }

    fn require_product_shop_owner(&self, slug: &ManagedBuffer) {
        require!(!self.shop_info(slug).is_empty(), ERR_SHOP_NOT_FOUND);
        let info = self.shop_info(slug).get();
        let caller = self.blockchain().get_caller();
        require!(info.owner == caller, ERR_NOT_SHOP_OWNER);
    }
}
