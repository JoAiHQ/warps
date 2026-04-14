use crate::errors::{ERR_NOT_SHOP_OWNER, ERR_SHOP_NOT_FOUND};
use crate::types::{PaymentDestination, ShopInfo, ShopProduct, ShopService};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    // Shop registry
    #[storage_mapper("shop_info")]
    fn shop_info(&self, id: &ManagedBuffer) -> SingleValueMapper<ShopInfo<Self::Api>>;

    #[storage_mapper("all_shops")]
    fn all_shops(&self) -> UnorderedSetMapper<ManagedBuffer>;

    #[storage_mapper("shops_by_category")]
    fn shops_by_category(&self, category: &ManagedBuffer) -> UnorderedSetMapper<ManagedBuffer>;

    // Payment
    #[storage_mapper("payment_destination")]
    fn payment_destination(&self, id: &ManagedBuffer) -> SingleValueMapper<PaymentDestination<Self::Api>>;

    // Services
    #[storage_mapper("shop_service_slugs")]
    fn shop_service_slugs(&self, shop_id: &ManagedBuffer) -> UnorderedSetMapper<ManagedBuffer>;

    #[storage_mapper("shop_service")]
    fn shop_service(&self, shop_id: &ManagedBuffer, service_slug: &ManagedBuffer) -> SingleValueMapper<ShopService<Self::Api>>;

    // Products
    #[storage_mapper("shop_product_slugs")]
    fn shop_product_slugs(&self, shop_id: &ManagedBuffer) -> UnorderedSetMapper<ManagedBuffer>;

    #[storage_mapper("shop_product")]
    fn shop_product(&self, shop_id: &ManagedBuffer, product_slug: &ManagedBuffer) -> SingleValueMapper<ShopProduct<Self::Api>>;

    // Shared validation
    fn require_shop_owner(&self, id: &ManagedBuffer) {
        require!(!self.shop_info(id).is_empty(), ERR_SHOP_NOT_FOUND);
        let info = self.shop_info(id).get();
        let caller = self.blockchain().get_caller();
        require!(info.owner == caller, ERR_NOT_SHOP_OWNER);
    }
}
