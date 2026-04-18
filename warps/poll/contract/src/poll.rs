use crate::{
    config,
    errors::*,
    events,
    types::{InviteInfo, MemberInfo, MemberRequest, PollId, PollInfo, PollResult, GroupInfo},
};

pub const MAX_SLUG_LEN: usize = 64;
pub const MAX_NAME_LEN: usize = 64;
pub const MAX_DISPLAY_NAME_LEN: usize = 64;
pub const MAX_QUESTION_LEN: usize = 256;
pub const MAX_OPTION_LABEL_LEN: usize = 64;
pub const MAX_OPTION_COUNT: u32 = 10;
pub const MIN_OPTION_COUNT: u32 = 2;
pub const MAX_INVITE_CODE_LEN: usize = 64;
pub const MAX_INVITE_USES: u32 = 1000;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait PollModule: config::ConfigModule + events::EventsModule {
    // -------------------------------------------------------------------------
    // Group management
    // -------------------------------------------------------------------------

    #[endpoint(createGroup)]
    fn create_group(&self, slug: ManagedBuffer, name: ManagedBuffer, open_membership: bool) {
        require!(slug.len() >= 1 && slug.len() <= MAX_SLUG_LEN, ERR_INVALID_SLUG);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(self.group_info(&slug).is_empty(), ERR_GROUP_ALREADY_EXISTS);

        let caller = self.blockchain().get_caller();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        self.group_info(&slug).set(GroupInfo {
            admin: caller.clone(),
            name,
            open_membership,
            created_at: timestamp,
        });

        // Admin is automatically a member
        self.group_members(&slug).insert(caller.clone());
        self.member_display_name(&slug, &caller).set(ManagedBuffer::new());
        self.member_joined_at(&slug, &caller).set(timestamp);

        self.group_created_event(slug, caller);
    }

    #[endpoint(transferAdmin)]
    fn transfer_admin(&self, slug: ManagedBuffer, new_admin: ManagedAddress) {
        let old_admin = self.require_group_admin(&slug);
        require!(self.group_members(&slug).contains(&new_admin), ERR_NOT_MEMBER);

        let mut info = self.group_info(&slug).get();
        info.admin = new_admin.clone();
        self.group_info(&slug).set(info);

        self.admin_transferred_event(slug, old_admin, new_admin);
    }

    // -------------------------------------------------------------------------
    // Membership — invite path
    // -------------------------------------------------------------------------

    #[endpoint(createInvite)]
    fn create_invite(&self, slug: ManagedBuffer, code: ManagedBuffer, max_uses: u32, expires_at: u64) {
        self.require_group_admin(&slug);
        require!(code.len() >= 1 && code.len() <= MAX_INVITE_CODE_LEN, ERR_INVALID_INVITE_CODE);
        require!(max_uses >= 1 && max_uses <= MAX_INVITE_USES, ERR_INVALID_MAX_USES);
        require!(self.invite_max_uses(&slug, &code).is_empty(), ERR_INVITE_ALREADY_EXISTS);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if expires_at > 0 {
            require!(expires_at > now, ERR_INVALID_DEADLINE);
        }

        self.invite_max_uses(&slug, &code).set(max_uses);
        self.invite_uses_left(&slug, &code).set(max_uses);
        self.invite_expires_at(&slug, &code).set(expires_at);

        self.invite_created_event(slug, code, max_uses);
    }

    #[endpoint(revokeInvite)]
    fn revoke_invite(&self, slug: ManagedBuffer, code: ManagedBuffer) {
        self.require_group_admin(&slug);
        require!(!self.invite_max_uses(&slug, &code).is_empty(), ERR_INVITE_NOT_FOUND);

        self.invite_max_uses(&slug, &code).clear();
        self.invite_uses_left(&slug, &code).clear();
        self.invite_expires_at(&slug, &code).clear();

        self.invite_revoked_event(slug, code);
    }

    #[endpoint(joinWithInvite)]
    fn join_with_invite(&self, slug: ManagedBuffer, code: ManagedBuffer, display_name: ManagedBuffer) {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        require!(display_name.len() >= 1 && display_name.len() <= MAX_DISPLAY_NAME_LEN, ERR_INVALID_DISPLAY_NAME);
        require!(!self.invite_max_uses(&slug, &code).is_empty(), ERR_INVITE_NOT_FOUND);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let expires_at = self.invite_expires_at(&slug, &code).get();
        if expires_at > 0 {
            require!(expires_at > now, ERR_INVITE_EXPIRED);
        }

        let uses_left = self.invite_uses_left(&slug, &code).get();
        require!(uses_left > 0, ERR_INVITE_EXHAUSTED);

        let caller = self.blockchain().get_caller();
        require!(!self.group_members(&slug).contains(&caller), ERR_ALREADY_MEMBER);

        self.invite_uses_left(&slug, &code).set(uses_left - 1);

        self.do_add_member(&slug, &caller, display_name, now);
    }

    // -------------------------------------------------------------------------
    // Membership — request/approval path
    // -------------------------------------------------------------------------

    #[endpoint(requestMembership)]
    fn request_membership(&self, slug: ManagedBuffer, display_name: ManagedBuffer) {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        require!(display_name.len() >= 1 && display_name.len() <= MAX_DISPLAY_NAME_LEN, ERR_INVALID_DISPLAY_NAME);

        let caller = self.blockchain().get_caller();
        require!(!self.group_members(&slug).contains(&caller), ERR_ALREADY_MEMBER);
        require!(!self.group_pending_requests(&slug).contains(&caller), ERR_REQUEST_ALREADY_PENDING);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        // If group has open membership, auto-approve
        let open = self.group_info(&slug).get().open_membership;
        if open {
            self.do_add_member(&slug, &caller, display_name.clone(), now);
        } else {
            self.group_pending_requests(&slug).insert(caller.clone());
            self.request_display_name(&slug, &caller).set(display_name.clone());
            self.request_timestamp(&slug, &caller).set(now);
            self.membership_requested_event(slug, caller, display_name);
        }
    }

    #[endpoint(approveMember)]
    fn approve_member(&self, slug: ManagedBuffer, address: ManagedAddress) {
        self.require_group_admin(&slug);
        require!(self.group_pending_requests(&slug).contains(&address), ERR_NO_PENDING_REQUEST);

        let display_name = self.request_display_name(&slug, &address).get();
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        self.group_pending_requests(&slug).swap_remove(&address);
        self.request_display_name(&slug, &address).clear();
        self.request_timestamp(&slug, &address).clear();

        self.do_add_member(&slug, &address, display_name, now);
        self.member_approved_event(slug, address);
    }

    #[endpoint(denyRequest)]
    fn deny_request(&self, slug: ManagedBuffer, address: ManagedAddress) {
        self.require_group_admin(&slug);
        require!(self.group_pending_requests(&slug).contains(&address), ERR_NO_PENDING_REQUEST);

        self.group_pending_requests(&slug).swap_remove(&address);
        self.request_display_name(&slug, &address).clear();
        self.request_timestamp(&slug, &address).clear();

        self.member_denied_event(slug, address);
    }

    #[endpoint(removeMember)]
    fn remove_member(&self, slug: ManagedBuffer, address: ManagedAddress) {
        self.require_group_admin(&slug);
        let info = self.group_info(&slug).get();
        require!(info.admin != address, ERR_ADMIN_CANNOT_LEAVE);
        require!(self.group_members(&slug).contains(&address), ERR_NOT_MEMBER);

        self.group_members(&slug).swap_remove(&address);
        self.member_display_name(&slug, &address).clear();
        self.member_joined_at(&slug, &address).clear();

        self.member_removed_event(slug, address);
    }

    // -------------------------------------------------------------------------
    // Polls
    // -------------------------------------------------------------------------

    #[endpoint(createPoll)]
    fn create_poll(
        &self,
        group_slug: ManagedBuffer,
        question: ManagedBuffer,
        deadline: u64,
        options: MultiValueEncoded<ManagedBuffer>,
    ) {
        require!(!self.group_info(&group_slug).is_empty(), ERR_GROUP_NOT_FOUND);
        require!(question.len() >= 1 && question.len() <= MAX_QUESTION_LEN, ERR_INVALID_QUESTION);

        let mut options_vec: ManagedVec<ManagedBuffer> = ManagedVec::new();
        for opt in options.into_vec_of_buffers().iter() {
            if opt.len() > 0 {
                require!(opt.len() <= MAX_OPTION_LABEL_LEN, ERR_INVALID_OPTION_LABEL);
                options_vec.push(opt.clone_value());
            }
        }
        let option_count = options_vec.len() as u32;
        require!(
            option_count >= MIN_OPTION_COUNT && option_count <= MAX_OPTION_COUNT,
            ERR_INVALID_OPTIONS_COUNT
        );

        let caller = self.blockchain().get_caller();
        require!(self.group_members(&group_slug).contains(&caller), ERR_NOT_MEMBER);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if deadline > 0 {
            require!(deadline > now, ERR_INVALID_DEADLINE);
        }

        let poll_id = self.next_poll_id().get();
        self.next_poll_id().set(poll_id + 1);

        self.poll_info(poll_id).set(PollInfo {
            group_slug: group_slug.clone(),
            question: question.clone(),
            creator: caller,
            created_at: now,
            deadline,
            option_count,
        });

        for (i, label) in options_vec.iter().enumerate() {
            self.poll_option_label(poll_id, i as u32).set(label);
            self.poll_option_votes(poll_id, i as u32).set(0u64);
        }

        self.poll_total_votes(poll_id).set(0u64);
        self.group_polls(&group_slug).insert(poll_id);

        self.poll_created_event(group_slug, poll_id, question);
    }

    #[endpoint(vote)]
    fn vote(&self, poll_id: PollId, option_index: u32) {
        require!(!self.poll_info(poll_id).is_empty(), ERR_POLL_NOT_FOUND);

        let poll = self.poll_info(poll_id).get();
        require!(option_index < poll.option_count, ERR_INVALID_OPTION);

        let caller = self.blockchain().get_caller();
        require!(self.group_members(&poll.group_slug).contains(&caller), ERR_NOT_MEMBER);
        require!(self.poll_voter_choice(poll_id, &caller).get() == 0, ERR_ALREADY_VOTED);

        if poll.deadline > 0 {
            let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
            require!(now <= poll.deadline, ERR_POLL_EXPIRED);
        }

        // Store choice as option_index + 1 so 0 unambiguously means "not voted"
        self.poll_voter_choice(poll_id, &caller).set(option_index + 1);

        let current = self.poll_option_votes(poll_id, option_index).get();
        self.poll_option_votes(poll_id, option_index).set(current + 1);

        let total = self.poll_total_votes(poll_id).get();
        self.poll_total_votes(poll_id).set(total + 1);

        self.voted_event(poll_id, caller, option_index);
    }

    // -------------------------------------------------------------------------
    // Views
    // -------------------------------------------------------------------------

    #[view(getGroup)]
    fn get_group(&self, slug: ManagedBuffer) -> GroupInfo<Self::Api> {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        self.group_info(&slug).get()
    }

    #[view(getMembers)]
    fn get_members(&self, slug: ManagedBuffer) -> MultiValueEncoded<MemberInfo<Self::Api>> {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        let mut result = MultiValueEncoded::new();
        for address in self.group_members(&slug).iter() {
            result.push(MemberInfo {
                display_name: self.member_display_name(&slug, &address).get(),
                joined_at: self.member_joined_at(&slug, &address).get(),
                address,
            });
        }
        result
    }

    #[view(getPendingRequests)]
    fn get_pending_requests(&self, slug: ManagedBuffer) -> MultiValueEncoded<MemberRequest<Self::Api>> {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        let mut result = MultiValueEncoded::new();
        for address in self.group_pending_requests(&slug).iter() {
            result.push(MemberRequest {
                display_name: self.request_display_name(&slug, &address).get(),
                requested_at: self.request_timestamp(&slug, &address).get(),
                address,
            });
        }
        result
    }

    #[view(getInvite)]
    fn get_invite(&self, slug: ManagedBuffer, code: ManagedBuffer) -> InviteInfo {
        if self.invite_max_uses(&slug, &code).is_empty() {
            return InviteInfo { max_uses: 0, uses_left: 0, expires_at: 0, valid: false };
        }
        let expires_at = self.invite_expires_at(&slug, &code).get();
        let uses_left = self.invite_uses_left(&slug, &code).get();
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let expired = expires_at > 0 && now > expires_at;
        InviteInfo {
            max_uses: self.invite_max_uses(&slug, &code).get(),
            uses_left,
            expires_at,
            valid: uses_left > 0 && !expired,
        }
    }

    #[view(getPoll)]
    fn get_poll(&self, poll_id: PollId) -> PollInfo<Self::Api> {
        require!(!self.poll_info(poll_id).is_empty(), ERR_POLL_NOT_FOUND);
        self.poll_info(poll_id).get()
    }

    #[view(getPollResults)]
    fn get_poll_results(&self, poll_id: PollId) -> MultiValueEncoded<PollResult<Self::Api>> {
        require!(!self.poll_info(poll_id).is_empty(), ERR_POLL_NOT_FOUND);
        let poll = self.poll_info(poll_id).get();
        let mut result = MultiValueEncoded::new();
        for i in 0..poll.option_count {
            result.push(PollResult {
                option_index: i,
                label: self.poll_option_label(poll_id, i).get(),
                vote_count: self.poll_option_votes(poll_id, i).get(),
            });
        }
        result
    }

    #[view(getGroupPolls)]
    fn get_group_polls(&self, slug: ManagedBuffer) -> MultiValueEncoded<PollId> {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        let mut result = MultiValueEncoded::new();
        for poll_id in self.group_polls(&slug).iter() {
            result.push(poll_id);
        }
        result
    }

    #[view(getActivePolls)]
    fn get_active_polls(&self, slug: ManagedBuffer) -> MultiValueEncoded<PollId> {
        require!(!self.group_info(&slug).is_empty(), ERR_GROUP_NOT_FOUND);
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let mut result = MultiValueEncoded::new();
        for poll_id in self.group_polls(&slug).iter() {
            let poll = self.poll_info(poll_id).get();
            if poll.deadline == 0 || poll.deadline > now {
                result.push(poll_id);
            }
        }
        result
    }

    #[view(isMember)]
    fn is_member(&self, slug: ManagedBuffer, address: ManagedAddress) -> bool {
        if self.group_info(&slug).is_empty() {
            return false;
        }
        self.group_members(&slug).contains(&address)
    }

    #[view(hasVoted)]
    fn has_voted(&self, poll_id: PollId, address: ManagedAddress) -> bool {
        self.poll_voter_choice(poll_id, &address).get() != 0
    }

    #[view(getMemberVote)]
    fn get_member_vote(&self, poll_id: PollId, address: ManagedAddress) -> OptionalValue<u32> {
        let stored = self.poll_voter_choice(poll_id, &address).get();
        if stored == 0 {
            OptionalValue::None
        } else {
            OptionalValue::Some(stored - 1)
        }
    }

    // -------------------------------------------------------------------------
    // Internal helpers
    // -------------------------------------------------------------------------

    fn require_group_admin(&self, slug: &ManagedBuffer) -> ManagedAddress {
        require!(!self.group_info(slug).is_empty(), ERR_GROUP_NOT_FOUND);
        let info = self.group_info(slug).get();
        let caller = self.blockchain().get_caller();
        require!(info.admin == caller, ERR_NOT_GROUP_ADMIN);
        caller
    }

    fn do_add_member(&self, slug: &ManagedBuffer, address: &ManagedAddress, display_name: ManagedBuffer, timestamp: u64) {
        self.group_members(slug).insert(address.clone());
        self.member_display_name(slug, address).set(display_name.clone());
        self.member_joined_at(slug, address).set(timestamp);
        self.member_joined_event(slug.clone(), address.clone(), display_name);
    }
}
