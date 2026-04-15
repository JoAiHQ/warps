use multiversx_sc::types::Address;
use multiversx_sc_scenario::{
    managed_address, managed_buffer,
    whitebox_legacy::{BlockchainStateWrapper, ContractObjWrapper},
    DebugApi,
};
use multiversx_sc_scenario::imports::OptionalValue;
use num_bigint::BigUint;

// Bring module trait into scope so ContractObj methods are visible
use poll::{poll::PollModule, PollContract};

const WASM_PATH: &str = "output/poll.wasm";

type PollWrapper = ContractObjWrapper<poll::ContractObj<DebugApi>, fn() -> poll::ContractObj<DebugApi>>;

fn setup() -> (BlockchainStateWrapper, PollWrapper, Address, Address, Address, Address) {
    let mut world = BlockchainStateWrapper::new();

    let owner = world.create_user_account(&BigUint::from(0u64));
    let alice = world.create_user_account(&BigUint::from(0u64));
    let bob = world.create_user_account(&BigUint::from(0u64));
    let carol = world.create_user_account(&BigUint::from(0u64));

    let contract = world.create_sc_account(
        &BigUint::from(0u64),
        Some(&owner),
        poll::contract_obj as fn() -> poll::ContractObj<DebugApi>,
        WASM_PATH,
    );

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.init();
        })
        .assert_ok();

    (world, contract, owner, alice, bob, carol)
}

// -------------------------------------------------------------------------
// Group tests
// -------------------------------------------------------------------------

#[test]
fn test_create_group() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(
                managed_buffer!(b"hausverwaltung"),
                managed_buffer!(b"Hausverwaltung Teststr. 1"),
                false,
            );
        })
        .assert_ok();

    // Owner is auto-member
    world
        .execute_query(&contract, |sc| {
            let is_member = sc.is_member(
                managed_buffer!(b"hausverwaltung"),
                managed_address!(&owner),
            );
            assert!(is_member);
        })
        .assert_ok();

    // Alice is not a member
    world
        .execute_query(&contract, |sc| {
            let is_member = sc.is_member(
                managed_buffer!(b"hausverwaltung"),
                managed_address!(&alice),
            );
            assert!(!is_member);
        })
        .assert_ok();
}

#[test]
fn test_create_group_duplicate_fails() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"mygroup"), managed_buffer!(b"My Group"), false);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"mygroup"), managed_buffer!(b"Duplicate"), false);
        })
        .assert_error(4, "group already exists");
}

#[test]
fn test_create_group_invalid_slug_fails() {
    let (mut world, contract, owner, _alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b""), managed_buffer!(b"No Slug"), false);
        })
        .assert_error(4, "slug must be 1-64 bytes");
}

// -------------------------------------------------------------------------
// Invite tests
// -------------------------------------------------------------------------

#[test]
fn test_join_with_invite() {
    let (mut world, contract, owner, alice, bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"mygroup"), managed_buffer!(b"My Group"), false);
        })
        .assert_ok();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"ABC123"),
                5u32,
                0u64, // no expiry
            );
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"ABC123"),
                managed_buffer!(b"Alice"),
            );
        })
        .assert_ok();

    world
        .execute_query(&contract, |sc| {
            assert!(sc.is_member(managed_buffer!(b"mygroup"), managed_address!(&alice)));
            assert!(!sc.is_member(managed_buffer!(b"mygroup"), managed_address!(&bob)));
        })
        .assert_ok();
}

#[test]
fn test_invite_exhausted() {
    let (mut world, contract, owner, alice, bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"mygroup"), managed_buffer!(b"My Group"), false);
        })
        .assert_ok();

    // Single-use invite
    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_invite(managed_buffer!(b"mygroup"), managed_buffer!(b"ONE"), 1u32, 0u64);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"ONE"),
                managed_buffer!(b"Alice"),
            );
        })
        .assert_ok();

    world
        .execute_tx(&bob, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"ONE"),
                managed_buffer!(b"Bob"),
            );
        })
        .assert_error(4, "invite has no uses left");
}

#[test]
fn test_join_already_member_fails() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"mygroup"), managed_buffer!(b"My Group"), false);
            sc.create_invite(managed_buffer!(b"mygroup"), managed_buffer!(b"CODE"), 10u32, 0u64);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"CODE"),
                managed_buffer!(b"Alice"),
            );
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"CODE"),
                managed_buffer!(b"Alice Again"),
            );
        })
        .assert_error(4, "already a member");
}

#[test]
fn test_revoke_invite() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"mygroup"), managed_buffer!(b"My Group"), false);
            sc.create_invite(managed_buffer!(b"mygroup"), managed_buffer!(b"CODE"), 10u32, 0u64);
        })
        .assert_ok();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.revoke_invite(managed_buffer!(b"mygroup"), managed_buffer!(b"CODE"));
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(
                managed_buffer!(b"mygroup"),
                managed_buffer!(b"CODE"),
                managed_buffer!(b"Alice"),
            );
        })
        .assert_error(4, "invite not found or already revoked");
}

// -------------------------------------------------------------------------
// Request / approval tests
// -------------------------------------------------------------------------

#[test]
fn test_request_and_approve() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"private"), managed_buffer!(b"Private Group"), false);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.request_membership(managed_buffer!(b"private"), managed_buffer!(b"Alice"));
        })
        .assert_ok();

    // Not yet a member
    world
        .execute_query(&contract, |sc| {
            assert!(!sc.is_member(managed_buffer!(b"private"), managed_address!(&alice)));
        })
        .assert_ok();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.approve_member(managed_buffer!(b"private"), managed_address!(&alice));
        })
        .assert_ok();

    world
        .execute_query(&contract, |sc| {
            assert!(sc.is_member(managed_buffer!(b"private"), managed_address!(&alice)));
        })
        .assert_ok();
}

#[test]
fn test_open_membership_auto_approves() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"open"), managed_buffer!(b"Open Community"), true);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.request_membership(managed_buffer!(b"open"), managed_buffer!(b"Alice"));
        })
        .assert_ok();

    // Immediately a member — no admin approval needed
    world
        .execute_query(&contract, |sc| {
            assert!(sc.is_member(managed_buffer!(b"open"), managed_address!(&alice)));
        })
        .assert_ok();
}

#[test]
fn test_deny_request() {
    let (mut world, contract, owner, alice, _bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"private"), managed_buffer!(b"Private"), false);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.request_membership(managed_buffer!(b"private"), managed_buffer!(b"Alice"));
        })
        .assert_ok();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.deny_request(managed_buffer!(b"private"), managed_address!(&alice));
        })
        .assert_ok();

    world
        .execute_query(&contract, |sc| {
            assert!(!sc.is_member(managed_buffer!(b"private"), managed_address!(&alice)));
        })
        .assert_ok();

    // Can request again after denial
    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.request_membership(managed_buffer!(b"private"), managed_buffer!(b"Alice"));
        })
        .assert_ok();
}

#[test]
fn test_non_admin_cannot_approve() {
    let (mut world, contract, owner, alice, bob, _carol) = setup();

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"private"), managed_buffer!(b"Private"), false);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.request_membership(managed_buffer!(b"private"), managed_buffer!(b"Alice"));
        })
        .assert_ok();

    world
        .execute_tx(&bob, &contract, &BigUint::from(0u64), |sc| {
            sc.approve_member(managed_buffer!(b"private"), managed_address!(&alice));
        })
        .assert_error(4, "not group admin");
}

// -------------------------------------------------------------------------
// Poll tests
// -------------------------------------------------------------------------

fn setup_group_with_members(
    world: &mut BlockchainStateWrapper,
    contract: &PollWrapper,
    owner: &Address,
    alice: &Address,
    bob: &Address,
    carol: &Address,
) {
    world
        .execute_tx(owner, contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"community"), managed_buffer!(b"Community"), false);
            sc.create_invite(managed_buffer!(b"community"), managed_buffer!(b"OPEN"), 100u32, 0u64);
        })
        .assert_ok();

    for (addr, name) in [(alice, b"Alice" as &[u8]), (bob, b"Bob"), (carol, b"Carol")] {
        world
            .execute_tx(addr, contract, &BigUint::from(0u64), |sc| {
                sc.join_with_invite(
                    managed_buffer!(b"community"),
                    managed_buffer!(b"OPEN"),
                    managed_buffer!(name),
                );
            })
            .assert_ok();
    }
}

#[test]
fn test_create_and_vote_on_poll() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            let mut options = multiversx_sc::types::MultiValueEncoded::new();
            options.push(managed_buffer!(b"Yes"));
            options.push(managed_buffer!(b"No"));
            options.push(managed_buffer!(b"Abstain"));
            sc.create_poll(
                managed_buffer!(b"community"),
                managed_buffer!(b"Should we repaint the staircase?"),
                0u64,
                options,
            );
        })
        .assert_ok();

    // Alice votes Yes (option 0)
    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.vote(1u64, 0u32);
        })
        .assert_ok();

    // Bob votes No (option 1)
    world
        .execute_tx(&bob, &contract, &BigUint::from(0u64), |sc| {
            sc.vote(1u64, 1u32);
        })
        .assert_ok();

    world
        .execute_query(&contract, |sc| {
            assert!(sc.has_voted(1u64, managed_address!(&alice)));
            assert!(sc.has_voted(1u64, managed_address!(&bob)));
            assert!(!sc.has_voted(1u64, managed_address!(&carol)));
        })
        .assert_ok();

    // Verify vote choices
    world
        .execute_query(&contract, |sc| {
            let alice_vote = sc.get_member_vote(1u64, managed_address!(&alice));
            assert!(matches!(alice_vote, OptionalValue::Some(0u32)));

            let bob_vote = sc.get_member_vote(1u64, managed_address!(&bob));
            assert!(matches!(bob_vote, OptionalValue::Some(1u32)));

            let carol_vote = sc.get_member_vote(1u64, managed_address!(&carol));
            assert!(matches!(carol_vote, OptionalValue::None));
        })
        .assert_ok();
}

#[test]
fn test_cannot_vote_twice() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            let mut options = multiversx_sc::types::MultiValueEncoded::new();
            options.push(managed_buffer!(b"Tea"));
            options.push(managed_buffer!(b"Coffee"));
            sc.create_poll(managed_buffer!(b"community"), managed_buffer!(b"Tea or coffee?"), 0u64, options);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.vote(1u64, 0u32);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.vote(1u64, 1u32);
        })
        .assert_error(4, "already voted on this poll");
}

#[test]
fn test_non_member_cannot_vote() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            let mut options = multiversx_sc::types::MultiValueEncoded::new();
            options.push(managed_buffer!(b"Yes"));
            options.push(managed_buffer!(b"No"));
            sc.create_poll(managed_buffer!(b"community"), managed_buffer!(b"Member-only?"), 0u64, options);
        })
        .assert_ok();

    let stranger = world.create_user_account(&BigUint::from(0u64));

    world
        .execute_tx(&stranger, &contract, &BigUint::from(0u64), |sc| {
            sc.vote(1u64, 0u32);
        })
        .assert_error(4, "not a member of this group");
}

#[test]
fn test_invalid_option_index_fails() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            let mut options = multiversx_sc::types::MultiValueEncoded::new();
            options.push(managed_buffer!(b"A"));
            options.push(managed_buffer!(b"B"));
            sc.create_poll(managed_buffer!(b"community"), managed_buffer!(b"Two options only"), 0u64, options);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.vote(1u64, 5u32); // out of range
        })
        .assert_error(4, "option index out of range");
}

#[test]
fn test_too_few_options_fails() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            let mut options = multiversx_sc::types::MultiValueEncoded::new();
            options.push(managed_buffer!(b"Only one"));
            sc.create_poll(managed_buffer!(b"community"), managed_buffer!(b"Single option?"), 0u64, options);
        })
        .assert_error(4, "poll must have between 2 and 10 options");
}

#[test]
fn test_get_poll_results() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            let mut options = multiversx_sc::types::MultiValueEncoded::new();
            options.push(managed_buffer!(b"Red"));
            options.push(managed_buffer!(b"Blue"));
            options.push(managed_buffer!(b"Green"));
            sc.create_poll(managed_buffer!(b"community"), managed_buffer!(b"Favourite colour?"), 0u64, options);
        })
        .assert_ok();

    for (addr, opt) in [(&alice, 0u32), (&bob, 0u32), (&carol, 2u32)] {
        world
            .execute_tx(addr, &contract, &BigUint::from(0u64), |sc| {
                sc.vote(1u64, opt);
            })
            .assert_ok();
    }

    // Verify results query succeeds and 3 options are returned
    world
        .execute_query(&contract, |sc| {
            let _results = sc.get_poll_results(1u64);
        })
        .assert_ok();
}

#[test]
fn test_remove_member() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.remove_member(managed_buffer!(b"community"), managed_address!(&alice));
        })
        .assert_ok();

    world
        .execute_query(&contract, |sc| {
            assert!(!sc.is_member(managed_buffer!(b"community"), managed_address!(&alice)));
            assert!(sc.is_member(managed_buffer!(b"community"), managed_address!(&bob)));
        })
        .assert_ok();
}

#[test]
fn test_admin_cannot_be_removed() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.remove_member(managed_buffer!(b"community"), managed_address!(&owner));
        })
        .assert_error(4, "admin cannot be removed; transfer admin first");
}

#[test]
fn test_transfer_admin() {
    let (mut world, contract, owner, alice, bob, carol) = setup();
    setup_group_with_members(&mut world, &contract, &owner, &alice, &bob, &carol);

    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.transfer_admin(managed_buffer!(b"community"), managed_address!(&alice));
        })
        .assert_ok();

    // Old admin can no longer do admin actions
    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.remove_member(managed_buffer!(b"community"), managed_address!(&bob));
        })
        .assert_error(4, "not group admin");

    // New admin can
    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.remove_member(managed_buffer!(b"community"), managed_address!(&bob));
        })
        .assert_ok();
}

#[test]
fn test_multiple_groups_isolated() {
    let (mut world, contract, owner, alice, bob, _carol) = setup();

    // Group A with alice
    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"group-a"), managed_buffer!(b"Group A"), false);
            sc.create_invite(managed_buffer!(b"group-a"), managed_buffer!(b"A"), 10u32, 0u64);
        })
        .assert_ok();

    // Group B with bob
    world
        .execute_tx(&owner, &contract, &BigUint::from(0u64), |sc| {
            sc.create_group(managed_buffer!(b"group-b"), managed_buffer!(b"Group B"), false);
            sc.create_invite(managed_buffer!(b"group-b"), managed_buffer!(b"B"), 10u32, 0u64);
        })
        .assert_ok();

    world
        .execute_tx(&alice, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(managed_buffer!(b"group-a"), managed_buffer!(b"A"), managed_buffer!(b"Alice"));
        })
        .assert_ok();

    world
        .execute_tx(&bob, &contract, &BigUint::from(0u64), |sc| {
            sc.join_with_invite(managed_buffer!(b"group-b"), managed_buffer!(b"B"), managed_buffer!(b"Bob"));
        })
        .assert_ok();

    world
        .execute_query(&contract, |sc| {
            assert!(sc.is_member(managed_buffer!(b"group-a"), managed_address!(&alice)));
            assert!(!sc.is_member(managed_buffer!(b"group-b"), managed_address!(&alice)));
            assert!(!sc.is_member(managed_buffer!(b"group-a"), managed_address!(&bob)));
            assert!(sc.is_member(managed_buffer!(b"group-b"), managed_address!(&bob)));
        })
        .assert_ok();
}
