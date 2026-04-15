multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("requestCreated")]
    fn request_created_event(
        &self,
        #[indexed] id: u64,
        #[indexed] creator: ManagedAddress,
        #[indexed] title: ManagedBuffer,
        #[indexed] document_hash: ManagedBuffer,
        #[indexed] deadline: u64,
    );

    #[event("documentSigned")]
    fn document_signed_event(
        &self,
        #[indexed] id: u64,
        #[indexed] signer: ManagedAddress,
        #[indexed] signed_count: u64,
        #[indexed] signer_count: u64,
    );

    #[event("requestCompleted")]
    fn request_completed_event(&self, #[indexed] id: u64, #[indexed] creator: ManagedAddress);

    #[event("requestCancelled")]
    fn request_cancelled_event(&self, #[indexed] id: u64, #[indexed] creator: ManagedAddress);

    #[event("requestExpired")]
    fn request_expired_event(&self, #[indexed] id: u64);
}
