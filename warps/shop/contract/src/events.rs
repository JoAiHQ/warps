multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("shopRegistered")]
    fn shop_registered_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] owner: ManagedAddress);

    #[event("serviceAdded")]
    fn service_added_event(&self, #[indexed] shop_slug: ManagedBuffer, #[indexed] service_slug: ManagedBuffer);

    #[event("serviceRemoved")]
    fn service_removed_event(&self, #[indexed] shop_slug: ManagedBuffer, #[indexed] service_slug: ManagedBuffer);

    #[event("productAdded")]
    fn product_added_event(&self, #[indexed] shop_slug: ManagedBuffer, #[indexed] product_slug: ManagedBuffer);

    #[event("productRemoved")]
    fn product_removed_event(&self, #[indexed] shop_slug: ManagedBuffer, #[indexed] product_slug: ManagedBuffer);
}
