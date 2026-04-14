multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("formCreated")]
    fn form_created_event(
        &self,
        #[indexed] form_id: ManagedBuffer,
        #[indexed] owner: ManagedAddress,
        #[indexed] form_type: ManagedBuffer,
    );

    #[event("formUpdated")]
    fn form_updated_event(&self, #[indexed] form_id: ManagedBuffer);

    #[event("formActivationChanged")]
    fn form_activation_changed_event(&self, #[indexed] form_id: ManagedBuffer, active: bool);

    #[event("fieldAdded")]
    fn field_added_event(&self, #[indexed] form_id: ManagedBuffer, #[indexed] slug: ManagedBuffer);

    #[event("fieldUpdated")]
    fn field_updated_event(&self, #[indexed] form_id: ManagedBuffer, #[indexed] slug: ManagedBuffer);

    #[event("fieldRemoved")]
    fn field_removed_event(&self, #[indexed] form_id: ManagedBuffer, #[indexed] slug: ManagedBuffer);

    #[event("submissionRecorded")]
    fn submission_recorded_event(
        &self,
        #[indexed] form_id: ManagedBuffer,
        #[indexed] submitter: ManagedAddress,
        submission_count: u64,
    );
}
