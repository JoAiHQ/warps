extern crate alloc;
use alloc::vec::Vec;

use crate::{
    config,
    errors::{
        ERR_FIELD_ALREADY_EXISTS, ERR_FIELD_NOT_FOUND, ERR_FORM_NOT_FOUND,
        ERR_INVALID_FIELD_TYPE, ERR_INVALID_LABEL, ERR_INVALID_SLUG,
    },
    events,
    types::FormField,
};

pub const MAX_SLUG_LEN: usize = 64;
pub const MAX_LABEL_LEN: usize = 128;
pub const VALID_FIELD_TYPES: [&str; 5] = ["string", "email", "phone", "text", "select"];

multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait FieldsModule: config::ConfigModule + events::EventsModule {
    #[endpoint(addField)]
    fn add_field(
        &self,
        form_id: ManagedBuffer,
        slug: ManagedBuffer,
        label: ManagedBuffer,
        field_type: ManagedBuffer,
        required: bool,
        position: u32,
    ) {
        self.require_form_owner(&form_id);
        require!(self.form_exists(&form_id), ERR_FORM_NOT_FOUND);
        require!(slug.len() >= 1 && slug.len() <= MAX_SLUG_LEN, ERR_INVALID_SLUG);
        require!(label.len() >= 1 && label.len() <= MAX_LABEL_LEN, ERR_INVALID_LABEL);
        require!(self.is_valid_field_type(&field_type), ERR_INVALID_FIELD_TYPE);
        require!(
            !self.form_field_slugs(&form_id).contains(&slug),
            ERR_FIELD_ALREADY_EXISTS
        );

        self.field_label(&form_id, &slug).set(&label);
        self.field_type(&form_id, &slug).set(&field_type);
        self.field_required(&form_id, &slug).set(required);
        self.field_position(&form_id, &slug).set(position);
        self.form_field_slugs(&form_id).insert(slug.clone());

        self.field_added_event(form_id, slug);
    }

    #[endpoint(updateField)]
    fn update_field(
        &self,
        form_id: ManagedBuffer,
        slug: ManagedBuffer,
        label: ManagedBuffer,
        required: bool,
        position: u32,
    ) {
        self.require_form_owner(&form_id);
        require!(
            self.form_field_slugs(&form_id).contains(&slug),
            ERR_FIELD_NOT_FOUND
        );
        require!(label.len() >= 1 && label.len() <= MAX_LABEL_LEN, ERR_INVALID_LABEL);

        self.field_label(&form_id, &slug).set(&label);
        self.field_required(&form_id, &slug).set(required);
        self.field_position(&form_id, &slug).set(position);

        self.field_updated_event(form_id, slug);
    }

    #[endpoint(removeField)]
    fn remove_field(&self, form_id: ManagedBuffer, slug: ManagedBuffer) {
        self.require_form_owner(&form_id);
        require!(
            self.form_field_slugs(&form_id).contains(&slug),
            ERR_FIELD_NOT_FOUND
        );

        self.field_label(&form_id, &slug).clear();
        self.field_type(&form_id, &slug).clear();
        self.field_required(&form_id, &slug).clear();
        self.field_position(&form_id, &slug).clear();
        self.form_field_slugs(&form_id).swap_remove(&slug);

        self.field_removed_event(form_id, slug);
    }

    // ── Views ─────────────────────────────────────────────────────────────

    #[view(getFields)]
    fn get_fields(&self, form_id: ManagedBuffer) -> MultiValueEncoded<FormField<Self::Api>> {
        let mut fields: Vec<FormField<Self::Api>> = self
            .form_field_slugs(&form_id)
            .iter()
            .map(|slug| FormField {
                slug: slug.clone(),
                label: self.field_label(&form_id, &slug).get(),
                r#type: self.field_type(&form_id, &slug).get(),
                required: self.field_required(&form_id, &slug).get(),
                position: self.field_position(&form_id, &slug).get(),
            })
            .collect();
        fields.sort_by_key(|f| f.position);

        let mut result = MultiValueEncoded::new();
        for field in fields {
            result.push(field);
        }
        result
    }

    fn is_valid_field_type(&self, field_type: &ManagedBuffer) -> bool {
        VALID_FIELD_TYPES.iter().any(|v| field_type == &ManagedBuffer::from(*v))
    }
}
