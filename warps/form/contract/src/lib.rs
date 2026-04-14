#![no_std]

use errors::{
    ERR_FORM_ALREADY_EXISTS, ERR_FORM_INACTIVE, ERR_FORM_NOT_FOUND,
    ERR_INVALID_ID, ERR_INVALID_TITLE, ERR_INVALID_TYPE,
};
use types::FormInfo;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod config;
pub mod errors;
pub mod events;
pub mod fields;
pub mod form_proxy;
pub mod types;

const MAX_ID_LEN: usize = 64;
const MAX_TITLE_LEN: usize = 128;
const MAX_DESCRIPTION_LEN: usize = 512;
const MAX_AGENT_ID_LEN: usize = 128;
const MAX_COMPLETE_MESSAGE_LEN: usize = 256;
const VALID_FORM_TYPES: [&str; 4] = ["lead", "feedback", "rsvp", "custom"];

#[multiversx_sc::contract]
pub trait FormContract:
    config::ConfigModule + events::EventsModule + fields::FieldsModule
{
    #[init]
    fn init(&self) {}

    #[upgrade]
    fn upgrade(&self) {}

    // ── Form management ───────────────────────────────────────────────────

    #[endpoint(createForm)]
    fn create_form(
        &self,
        form_id: ManagedBuffer,
        agent_id: ManagedBuffer,
        title: ManagedBuffer,
        description: ManagedBuffer,
        form_type: ManagedBuffer,
    ) {
        require!(form_id.len() >= 1 && form_id.len() <= MAX_ID_LEN, ERR_INVALID_ID);
        require!(!self.form_exists(&form_id), ERR_FORM_ALREADY_EXISTS);
        require!(title.len() >= 1 && title.len() <= MAX_TITLE_LEN, ERR_INVALID_TITLE);
        require!(agent_id.len() >= 1 && agent_id.len() <= MAX_AGENT_ID_LEN, ERR_INVALID_ID);
        require!(self.is_valid_form_type(&form_type), ERR_INVALID_TYPE);

        let caller = self.blockchain().get_caller();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        self.form_owner(&form_id).set(&caller);
        self.form_agent_id(&form_id).set(&agent_id);
        self.form_title(&form_id).set(&title);
        self.form_description(&form_id).set(&description);
        self.form_type(&form_id).set(&form_type);
        self.form_created_at(&form_id).set(timestamp);
        self.form_active(&form_id).set(true);
        self.form_submission_count(&form_id).set(0u64);

        self.all_forms().insert(form_id.clone());
        self.forms_by_agent(&agent_id).insert(form_id.clone());

        self.form_created_event(form_id, caller, form_type);
    }

    #[endpoint(updateForm)]
    fn update_form(
        &self,
        form_id: ManagedBuffer,
        title: ManagedBuffer,
        description: ManagedBuffer,
    ) {
        self.require_form_owner(&form_id);
        require!(title.len() >= 1 && title.len() <= MAX_TITLE_LEN, ERR_INVALID_TITLE);
        require!(description.len() <= MAX_DESCRIPTION_LEN, ERR_INVALID_TITLE);

        self.form_title(&form_id).set(&title);
        self.form_description(&form_id).set(&description);

        self.form_updated_event(form_id);
    }

    /// Set the custom message shown on the completion screen.
    /// Pass an empty string to fall back to the warp's default message.
    #[endpoint(setCompleteMessage)]
    fn set_complete_message(&self, form_id: ManagedBuffer, message: ManagedBuffer) {
        self.require_form_owner(&form_id);
        require!(message.len() <= MAX_COMPLETE_MESSAGE_LEN, ERR_INVALID_TITLE);

        self.form_complete_message(&form_id).set(&message);
        self.form_updated_event(form_id);
    }

    #[endpoint(setActive)]
    fn set_active(&self, form_id: ManagedBuffer, active: bool) {
        self.require_form_owner(&form_id);

        self.form_active(&form_id).set(active);
        self.form_activation_changed_event(form_id, active);
    }

    /// Records a submission count increment on-chain.
    /// The actual submission data (PII) is NOT stored on-chain — it flows
    /// through the warp's next chain to @joai-contact-create or similar.
    #[endpoint(recordSubmission)]
    fn record_submission(&self, form_id: ManagedBuffer) {
        require!(self.form_exists(&form_id), ERR_FORM_NOT_FOUND);
        require!(self.form_active(&form_id).get(), ERR_FORM_INACTIVE);

        let count = self.form_submission_count(&form_id).get() + 1;
        self.form_submission_count(&form_id).set(count);

        let caller = self.blockchain().get_caller();
        self.submission_recorded_event(form_id, caller, count);
    }

    // ── Views ─────────────────────────────────────────────────────────────

    #[view(getForm)]
    fn get_form(&self, form_id: ManagedBuffer) -> FormInfo<Self::Api> {
        require!(self.form_exists(&form_id), ERR_FORM_NOT_FOUND);
        FormInfo {
            owner: self.form_owner(&form_id).get(),
            agent_id: self.form_agent_id(&form_id).get(),
            title: self.form_title(&form_id).get(),
            description: self.form_description(&form_id).get(),
            form_type: self.form_type(&form_id).get(),
            complete_message: if self.form_complete_message(&form_id).is_empty() { ManagedBuffer::new() } else { self.form_complete_message(&form_id).get() },
            created_at: self.form_created_at(&form_id).get(),
            active: self.form_active(&form_id).get(),
            submission_count: self.form_submission_count(&form_id).get(),
        }
    }

    #[view(getFormsByAgent)]
    fn get_forms_by_agent(&self, agent_id: ManagedBuffer) -> MultiValueEncoded<ManagedBuffer> {
        let mut result = MultiValueEncoded::new();
        for form_id in self.forms_by_agent(&agent_id).iter() {
            result.push(form_id);
        }
        result
    }

    #[view(getAllForms)]
    fn get_all_forms(&self) -> MultiValueEncoded<ManagedBuffer> {
        let mut result = MultiValueEncoded::new();
        for form_id in self.all_forms().iter() {
            result.push(form_id);
        }
        result
    }

    fn is_valid_form_type(&self, form_type: &ManagedBuffer) -> bool {
        VALID_FORM_TYPES.iter().any(|v| form_type == &ManagedBuffer::from(*v))
    }
}
