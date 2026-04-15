use crate::types::{PollId, PollInfo, GroupInfo};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    // ---- Group ----

    #[storage_mapper("group_info")]
    fn group_info(&self, slug: &ManagedBuffer) -> SingleValueMapper<GroupInfo<Self::Api>>;

    // ---- Members ----

    #[storage_mapper("group_members")]
    fn group_members(&self, slug: &ManagedBuffer) -> UnorderedSetMapper<ManagedAddress>;

    #[storage_mapper("member_display_name")]
    fn member_display_name(&self, slug: &ManagedBuffer, address: &ManagedAddress) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("member_joined_at")]
    fn member_joined_at(&self, slug: &ManagedBuffer, address: &ManagedAddress) -> SingleValueMapper<u64>;

    // ---- Pending requests ----

    #[storage_mapper("group_pending_requests")]
    fn group_pending_requests(&self, slug: &ManagedBuffer) -> UnorderedSetMapper<ManagedAddress>;

    #[storage_mapper("request_display_name")]
    fn request_display_name(&self, slug: &ManagedBuffer, address: &ManagedAddress) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("request_timestamp")]
    fn request_timestamp(&self, slug: &ManagedBuffer, address: &ManagedAddress) -> SingleValueMapper<u64>;

    // ---- Invites (keyed by slug + code) ----

    #[storage_mapper("invite_max_uses")]
    fn invite_max_uses(&self, slug: &ManagedBuffer, code: &ManagedBuffer) -> SingleValueMapper<u32>;

    #[storage_mapper("invite_uses_left")]
    fn invite_uses_left(&self, slug: &ManagedBuffer, code: &ManagedBuffer) -> SingleValueMapper<u32>;

    #[storage_mapper("invite_expires_at")]
    fn invite_expires_at(&self, slug: &ManagedBuffer, code: &ManagedBuffer) -> SingleValueMapper<u64>;

    // ---- Polls ----

    #[storage_mapper("next_poll_id")]
    fn next_poll_id(&self) -> SingleValueMapper<PollId>;

    #[storage_mapper("poll_info")]
    fn poll_info(&self, poll_id: PollId) -> SingleValueMapper<PollInfo<Self::Api>>;

    #[storage_mapper("poll_option_label")]
    fn poll_option_label(&self, poll_id: PollId, option_index: u32) -> SingleValueMapper<ManagedBuffer>;

    #[storage_mapper("poll_option_votes")]
    fn poll_option_votes(&self, poll_id: PollId, option_index: u32) -> SingleValueMapper<u64>;

    // 0 = not voted; stores option_index + 1 so 0 is unambiguous default
    #[storage_mapper("poll_voter_choice")]
    fn poll_voter_choice(&self, poll_id: PollId, address: &ManagedAddress) -> SingleValueMapper<u32>;

    #[storage_mapper("poll_total_votes")]
    fn poll_total_votes(&self, poll_id: PollId) -> SingleValueMapper<u64>;

    // group → poll ids
    #[storage_mapper("group_polls")]
    fn group_polls(&self, slug: &ManagedBuffer) -> UnorderedSetMapper<PollId>;
}
