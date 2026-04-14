use crate::{
    config,
    errors::{
        ERR_INVALID_CATEGORY, ERR_INVALID_DESCRIPTION, ERR_INVALID_NAME, ERR_INVALID_SLUG,
        ERR_PRODUCT_ALREADY_EXISTS, ERR_PRODUCT_NOT_FOUND, ERR_SHOP_NOT_FOUND,
    },
    events,
    types::ShopProduct,
};

pub const MAX_SLUG_LEN: usize = 64;
pub const MAX_NAME_LEN: usize = 128;
pub const MAX_CATEGORY_LEN: usize = 64;
pub const MAX_DESCRIPTION_LEN: usize = 512;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ProductsModule: config::ConfigModule + events::EventsModule {
    #[endpoint(addProduct)]
    fn add_product(
        &self,
        id: ManagedBuffer,
        product_slug: ManagedBuffer,
        name: ManagedBuffer,
        price: u64,
        category: ManagedBuffer,
        description: ManagedBuffer,
    ) {
        self.require_shop_owner(&id);
        require!(product_slug.len() >= 1 && product_slug.len() <= MAX_SLUG_LEN, ERR_INVALID_SLUG);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(category.len() <= MAX_CATEGORY_LEN, ERR_INVALID_CATEGORY);
        require!(description.len() <= MAX_DESCRIPTION_LEN, ERR_INVALID_DESCRIPTION);
        require!(
            self.shop_product(&id, &product_slug).is_empty(),
            ERR_PRODUCT_ALREADY_EXISTS
        );

        let product = ShopProduct {
            slug: product_slug.clone(),
            name,
            price,
            category,
            description,
            in_stock: true,
        };

        self.shop_product(&id, &product_slug).set(product);
        self.shop_product_slugs(&id).insert(product_slug.clone());

        self.product_added_event(id, product_slug);
    }

    #[endpoint(updateProductStock)]
    fn update_product_stock(&self, id: ManagedBuffer, product_slug: ManagedBuffer, in_stock: bool) {
        self.require_shop_owner(&id);
        require!(!self.shop_product(&id, &product_slug).is_empty(), ERR_PRODUCT_NOT_FOUND);

        let mut product = self.shop_product(&id, &product_slug).get();
        product.in_stock = in_stock;
        self.shop_product(&id, &product_slug).set(product);

        self.product_stock_updated_event(id, product_slug, in_stock);
    }

    #[endpoint(removeProduct)]
    fn remove_product(&self, id: ManagedBuffer, product_slug: ManagedBuffer) {
        self.require_shop_owner(&id);
        require!(!self.shop_product(&id, &product_slug).is_empty(), ERR_PRODUCT_NOT_FOUND);

        self.shop_product(&id, &product_slug).clear();
        self.shop_product_slugs(&id).swap_remove(&product_slug);

        self.product_removed_event(id, product_slug);
    }

    #[view(getProducts)]
    fn get_products(&self, id: ManagedBuffer) -> MultiValueEncoded<ShopProduct<Self::Api>> {
        require!(!self.shop_info(&id).is_empty(), ERR_SHOP_NOT_FOUND);

        let mut result = MultiValueEncoded::new();
        for product_slug in self.shop_product_slugs(&id).iter() {
            if !self.shop_product(&id, &product_slug).is_empty() {
                result.push(self.shop_product(&id, &product_slug).get());
            }
        }
        result
    }
}
