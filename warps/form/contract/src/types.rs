// Types used only as view return values — NOT stored directly on-chain.
// Storage uses individual SingleValueMappers in config.rs for forward-compatibility.
multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct FormInfo<M: ManagedTypeApi> {
    pub owner: ManagedAddress<M>,
    pub agent_id: ManagedBuffer<M>,
    pub title: ManagedBuffer<M>,
    pub description: ManagedBuffer<M>,
    pub form_type: ManagedBuffer<M>,
    pub complete_message: ManagedBuffer<M>,
    pub created_at: u64,
    pub active: bool,
    pub submission_count: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct FormField<M: ManagedTypeApi> {
    pub slug: ManagedBuffer<M>,
    pub label: ManagedBuffer<M>,
    pub r#type: ManagedBuffer<M>,
    pub required: bool,
    pub position: u32,
}
