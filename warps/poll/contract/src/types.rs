multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type PollId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct GroupInfo<M: ManagedTypeApi> {
    pub admin: ManagedAddress<M>,
    pub name: ManagedBuffer<M>,
    pub open_membership: bool,
    pub created_at: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct PollInfo<M: ManagedTypeApi> {
    pub group_slug: ManagedBuffer<M>,
    pub question: ManagedBuffer<M>,
    pub creator: ManagedAddress<M>,
    pub created_at: u64,
    pub deadline: u64,
    pub option_count: u32,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct PollResult<M: ManagedTypeApi> {
    pub option_index: u32,
    pub label: ManagedBuffer<M>,
    pub vote_count: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct MemberInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub display_name: ManagedBuffer<M>,
    pub joined_at: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct MemberRequest<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub display_name: ManagedBuffer<M>,
    pub requested_at: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct InviteInfo {
    pub max_uses: u32,
    pub uses_left: u32,
    pub expires_at: u64,
    pub valid: bool,
}
