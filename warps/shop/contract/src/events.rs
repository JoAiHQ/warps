multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("shopRegistered")]
    fn shop_registered_event(&self, #[indexed] id: ManagedBuffer, #[indexed] owner: ManagedAddress, #[indexed] category: ManagedBuffer);

    #[event("shopUpdated")]
    fn shop_updated_event(&self, #[indexed] id: ManagedBuffer);

    #[event("paymentDestinationSet")]
    fn payment_destination_set_event(&self, #[indexed] id: ManagedBuffer, #[indexed] chain: ManagedBuffer, #[indexed] address: ManagedBuffer);

    #[event("serviceAdded")]
    fn service_added_event(&self, #[indexed] id: ManagedBuffer, #[indexed] service_slug: ManagedBuffer);

    #[event("serviceRemoved")]
    fn service_removed_event(&self, #[indexed] id: ManagedBuffer, #[indexed] service_slug: ManagedBuffer);

    #[event("productAdded")]
    fn product_added_event(&self, #[indexed] id: ManagedBuffer, #[indexed] product_slug: ManagedBuffer);

    #[event("productRemoved")]
    fn product_removed_event(&self, #[indexed] id: ManagedBuffer, #[indexed] product_slug: ManagedBuffer);

    #[event("productStockUpdated")]
    fn product_stock_updated_event(&self, #[indexed] id: ManagedBuffer, #[indexed] product_slug: ManagedBuffer, in_stock: bool);

    #[event("shopSettingSet")]
    fn shop_setting_set_event(&self, #[indexed] id: ManagedBuffer, #[indexed] key: ManagedBuffer, value: bool);
}
