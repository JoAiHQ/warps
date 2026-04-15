multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    // Group
    #[event("groupCreated")]
    fn group_created_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] admin: ManagedAddress);

    #[event("adminTransferred")]
    fn admin_transferred_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] old_admin: ManagedAddress, #[indexed] new_admin: ManagedAddress);

    // Membership - join path
    #[event("memberJoined")]
    fn member_joined_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] address: ManagedAddress, display_name: ManagedBuffer);

    // Membership - request/approval path
    #[event("membershipRequested")]
    fn membership_requested_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] address: ManagedAddress, display_name: ManagedBuffer);

    #[event("memberApproved")]
    fn member_approved_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] address: ManagedAddress);

    #[event("memberDenied")]
    fn member_denied_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] address: ManagedAddress);

    #[event("memberRemoved")]
    fn member_removed_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] address: ManagedAddress);

    // Invites
    #[event("inviteCreated")]
    fn invite_created_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] code: ManagedBuffer, max_uses: u32);

    #[event("inviteRevoked")]
    fn invite_revoked_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] code: ManagedBuffer);

    // Polls
    #[event("pollCreated")]
    fn poll_created_event(&self, #[indexed] slug: ManagedBuffer, #[indexed] poll_id: u64, question: ManagedBuffer);

    #[event("voted")]
    fn voted_event(&self, #[indexed] poll_id: u64, #[indexed] address: ManagedAddress, option_index: u32);
}
