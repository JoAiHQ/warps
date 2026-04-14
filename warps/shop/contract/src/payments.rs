use crate::{
    config,
    errors::{ERR_INVALID_ADDRESS, ERR_INVALID_CHAIN, ERR_INVALID_TOKEN, ERR_NO_PAYMENT_DESTINATION},
    events,
    types::PaymentDestination,
};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub const MAX_CHAIN_LEN: usize = 32;
pub const MAX_ADDRESS_LEN: usize = 128;
pub const MAX_TOKEN_LEN: usize = 64;

#[multiversx_sc::module]
pub trait PaymentsModule: config::ConfigModule + events::EventsModule {
    #[endpoint(setPaymentDestination)]
    fn set_payment_destination(
        &self,
        id: ManagedBuffer,
        chain: ManagedBuffer,
        address: ManagedBuffer,
        token: ManagedBuffer,
    ) {
        self.require_shop_owner(&id);
        require!(chain.len() >= 1 && chain.len() <= MAX_CHAIN_LEN, ERR_INVALID_CHAIN);
        require!(address.len() >= 1 && address.len() <= MAX_ADDRESS_LEN, ERR_INVALID_ADDRESS);
        require!(token.len() >= 1 && token.len() <= MAX_TOKEN_LEN, ERR_INVALID_TOKEN);

        let destination = PaymentDestination {
            chain: chain.clone(),
            address: address.clone(),
            token: token.clone(),
        };

        self.payment_destination(&id).set(destination);
        self.payment_destination_set_event(id, chain, address);
    }

    #[view(getPaymentDestination)]
    fn get_payment_destination(&self, id: ManagedBuffer) -> PaymentDestination<Self::Api> {
        require!(!self.payment_destination(&id).is_empty(), ERR_NO_PAYMENT_DESTINATION);
        self.payment_destination(&id).get()
    }
}
