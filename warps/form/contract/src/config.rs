/// Storage uses flat SingleValueMappers per field rather than a single struct mapper.
/// This allows new fields to be added in future upgrades without breaking existing
/// on-chain data — each key is independent and defaults cleanly when absent.
use crate::errors::{ERR_FORM_NOT_FOUND, ERR_NOT_FORM_OWNER};

multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    // ── Form registry ─────────────────────────────────────────────────────

    #[storage_mapper("form_owner")]
    fn form_owner(&self, form_id: &ManagedBuffer) -> SingleValueMapper<ManagedAddress>;

    #[storage_mapper("form_agent_id")]
    fn form_agent_id(&self, form_id: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("form_title")]
    fn form_title(&self, form_id: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("form_description")]
    fn form_description(&self, form_id: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("form_type")]
    fn form_type(&self, form_id: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    /// Custom message shown on the completion screen after a successful submission.
    /// Falls back to the warp's default messages.success if empty.
    #[storage_mapper("form_complete_message")]
    fn form_complete_message(&self, form_id: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("form_created_at")]
    fn form_created_at(&self, form_id: &ManagedBuffer) -> SingleValueMapper<u64>;

    #[storage_mapper("form_active")]
    fn form_active(&self, form_id: &ManagedBuffer) -> SingleValueMapper<bool>;

    #[storage_mapper("form_submission_count")]
    fn form_submission_count(&self, form_id: &ManagedBuffer) -> SingleValueMapper<u64>;

    // ── Form index ────────────────────────────────────────────────────────

    #[storage_mapper("all_forms")]
    fn all_forms(&self) -> UnorderedSetMapper<ManagedBuffer>;

    #[storage_mapper("forms_by_agent")]
    fn forms_by_agent(&self, agent_id: &ManagedBuffer) -> UnorderedSetMapper<ManagedBuffer>;

    // ── Field storage ─────────────────────────────────────────────────────

    #[storage_mapper("form_field_slugs")]
    fn form_field_slugs(&self, form_id: &ManagedBuffer) -> UnorderedSetMapper<ManagedBuffer>;

    #[storage_mapper("field_label")]
    fn field_label(&self, form_id: &ManagedBuffer, slug: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("field_type")]
    fn field_type(&self, form_id: &ManagedBuffer, slug: &ManagedBuffer) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("field_required")]
    fn field_required(&self, form_id: &ManagedBuffer, slug: &ManagedBuffer) -> SingleValueMapper<bool>;

    #[storage_mapper("field_position")]
    fn field_position(&self, form_id: &ManagedBuffer, slug: &ManagedBuffer) -> SingleValueMapper<u32>;

    // ── Helpers ───────────────────────────────────────────────────────────

    fn form_exists(&self, form_id: &ManagedBuffer) -> bool {
        !self.form_owner(form_id).is_empty()
    }

    fn require_form_owner(&self, form_id: &ManagedBuffer) {
        require!(self.form_exists(form_id), ERR_FORM_NOT_FOUND);
        let caller = self.blockchain().get_caller();
        require!(self.form_owner(form_id).get() == caller, ERR_NOT_FORM_OWNER);
    }
}
