use multiversx_sc_scenario::imports::*;

const CREATOR: &str = "address:creator";
const SIGNER1: &str = "address:signer1";
const SIGNER2: &str = "address:signer2";
const OUTSIDER: &str = "address:outsider";
const SIG_SC: &str = "sc:signature";
const CODE_PATH: &str = "file:output/signature.wasm";

const TITLE: &str = "Service Agreement";
const DOC_HASH: &str = "abc123def456abc123def456abc123de";
const DOC_URL: &str = "https://example.com/doc.pdf";

fn world() -> ScenarioWorld {
    let mut blockchain = ScenarioWorld::new();
    blockchain.register_contract(CODE_PATH, signature::ContractBuilder);
    blockchain
}

fn setup_world() -> ScenarioWorld {
    let mut world = world();
    world.set_state_step(
        SetStateStep::new()
            .put_account(CREATOR, Account::new().nonce(1))
            .put_account(SIGNER1, Account::new().nonce(1))
            .put_account(SIGNER2, Account::new().nonce(1))
            .put_account(OUTSIDER, Account::new().nonce(1))
            .new_address(CREATOR, 1, SIG_SC),
    );
    world.sc_deploy(
        ScDeployStep::new()
            .from(CREATOR)
            .code(CODE_PATH)
            .gas_limit("50,000,000")
            .expect(TxExpect::ok()),
    );
    world
}

fn create_request(world: &mut ScenarioWorld, from: &str, signers: &[&str]) {
    let mut step = ScCallStep::new()
        .from(from)
        .to(SIG_SC)
        .function("createRequest")
        .argument(format!("str:{TITLE}").as_str())
        .argument(format!("str:{DOC_HASH}").as_str())
        .argument(format!("str:{DOC_URL}").as_str())
        .argument("0") // no deadline
        .gas_limit("10,000,000")
        .expect(TxExpect::ok());
    for signer in signers {
        step = step.argument(*signer);
    }
    world.sc_call(step);
}

fn create_request_with_deadline(world: &mut ScenarioWorld, from: &str, deadline_hours: u64, signers: &[&str]) {
    let mut step = ScCallStep::new()
        .from(from)
        .to(SIG_SC)
        .function("createRequest")
        .argument(format!("str:{TITLE}").as_str())
        .argument(format!("str:{DOC_HASH}").as_str())
        .argument(format!("str:{DOC_URL}").as_str())
        .argument(format!("{deadline_hours}").as_str())
        .gas_limit("10,000,000")
        .expect(TxExpect::ok());
    for signer in signers {
        step = step.argument(*signer);
    }
    world.sc_call(step);
}

fn create_request_err(world: &mut ScenarioWorld, title: &str, doc_hash: &str, doc_url: &str, deadline: u64, signers: &[&str], err: &str) {
    let mut step = ScCallStep::new()
        .from(CREATOR)
        .to(SIG_SC)
        .function("createRequest")
        .argument(format!("str:{title}").as_str())
        .argument(format!("str:{doc_hash}").as_str())
        .argument(format!("str:{doc_url}").as_str())
        .argument(format!("{deadline}").as_str())
        .gas_limit("10,000,000")
        .expect(TxExpect::user_error(format!("str:{err}").as_str()));
    for signer in signers {
        step = step.argument(*signer);
    }
    world.sc_call(step);
}

fn sign(world: &mut ScenarioWorld, from: &str, request_id: u64) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SIG_SC)
            .function("sign")
            .argument(format!("{request_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn sign_err(world: &mut ScenarioWorld, from: &str, request_id: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SIG_SC)
            .function("sign")
            .argument(format!("{request_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn cancel_request(world: &mut ScenarioWorld, from: &str, request_id: u64) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SIG_SC)
            .function("cancelRequest")
            .argument(format!("{request_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn cancel_request_err(world: &mut ScenarioWorld, from: &str, request_id: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SIG_SC)
            .function("cancelRequest")
            .argument(format!("{request_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn expire_request(world: &mut ScenarioWorld, from: &str, request_id: u64) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SIG_SC)
            .function("expireRequest")
            .argument(format!("{request_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn expire_request_err(world: &mut ScenarioWorld, from: &str, request_id: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SIG_SC)
            .function("expireRequest")
            .argument(format!("{request_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

// ─── Happy Path ───────────────────────────────────────────────────────────────

#[test]
fn test_create_request_single_signer() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
}

#[test]
fn test_create_request_two_signers() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1, SIGNER2]);
}

#[test]
fn test_create_request_with_deadline() {
    let mut world = setup_world();
    create_request_with_deadline(&mut world, CREATOR, 72, &[SIGNER1]);
}

#[test]
fn test_sign_single_signer() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    sign(&mut world, SIGNER1, 1);
}

#[test]
fn test_sign_first_of_two() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1, SIGNER2]);
    sign(&mut world, SIGNER1, 1);
}

#[test]
fn test_sign_all_two_signers() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1, SIGNER2]);
    sign(&mut world, SIGNER1, 1);
    sign(&mut world, SIGNER2, 1);
}

#[test]
fn test_cancel_request_by_creator() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    cancel_request(&mut world, CREATOR, 1);
}

#[test]
fn test_multiple_requests_increment_id() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    create_request(&mut world, CREATOR, &[SIGNER1]);
}

#[test]
fn test_any_account_can_create_request() {
    let mut world = setup_world();
    create_request(&mut world, OUTSIDER, &[SIGNER1]);
}

// ─── Validation Errors ───────────────────────────────────────────────────────

#[test]
fn test_create_request_empty_title_fails() {
    let mut world = setup_world();
    create_request_err(&mut world, "", DOC_HASH, DOC_URL, 0, &[SIGNER1], signature::errors::ERR_INVALID_TITLE);
}

#[test]
fn test_create_request_empty_hash_fails() {
    let mut world = setup_world();
    create_request_err(&mut world, TITLE, "", DOC_URL, 0, &[SIGNER1], signature::errors::ERR_INVALID_DOCUMENT_HASH);
}

#[test]
fn test_create_request_empty_url_fails() {
    let mut world = setup_world();
    create_request_err(&mut world, TITLE, DOC_HASH, "", 0, &[SIGNER1], signature::errors::ERR_INVALID_DOCUMENT_URL);
}

#[test]
fn test_create_request_no_signers_fails() {
    let mut world = setup_world();
    create_request_err(&mut world, TITLE, DOC_HASH, DOC_URL, 0, &[], signature::errors::ERR_NO_SIGNERS);
}

#[test]
fn test_create_request_duplicate_signer_fails() {
    let mut world = setup_world();
    create_request_err(&mut world, TITLE, DOC_HASH, DOC_URL, 0, &[SIGNER1, SIGNER1], signature::errors::ERR_DUPLICATE_SIGNER);
}

#[test]
fn test_sign_nonexistent_request_fails() {
    let mut world = setup_world();
    sign_err(&mut world, SIGNER1, 99, signature::errors::ERR_REQUEST_NOT_FOUND);
}

#[test]
fn test_sign_as_outsider_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    sign_err(&mut world, OUTSIDER, 1, signature::errors::ERR_NOT_ELIGIBLE_SIGNER);
}

#[test]
fn test_sign_twice_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1, SIGNER2]);
    sign(&mut world, SIGNER1, 1);
    sign_err(&mut world, SIGNER1, 1, signature::errors::ERR_ALREADY_SIGNED);
}

#[test]
fn test_sign_cancelled_request_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    cancel_request(&mut world, CREATOR, 1);
    sign_err(&mut world, SIGNER1, 1, signature::errors::ERR_NOT_PENDING);
}

#[test]
fn test_cancel_by_non_creator_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    cancel_request_err(&mut world, SIGNER1, 1, signature::errors::ERR_NOT_CREATOR);
}

#[test]
fn test_cancel_nonexistent_fails() {
    let mut world = setup_world();
    cancel_request_err(&mut world, CREATOR, 99, signature::errors::ERR_REQUEST_NOT_FOUND);
}

#[test]
fn test_cancel_already_cancelled_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    cancel_request(&mut world, CREATOR, 1);
    cancel_request_err(&mut world, CREATOR, 1, signature::errors::ERR_NOT_PENDING);
}

#[test]
fn test_cancel_completed_request_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    sign(&mut world, SIGNER1, 1);
    cancel_request_err(&mut world, CREATOR, 1, signature::errors::ERR_NOT_PENDING);
}

#[test]
fn test_expire_no_deadline_fails() {
    let mut world = setup_world();
    create_request(&mut world, CREATOR, &[SIGNER1]);
    expire_request_err(&mut world, OUTSIDER, 1, signature::errors::ERR_NO_DEADLINE);
}

#[test]
fn test_expire_nonexistent_fails() {
    let mut world = setup_world();
    expire_request_err(&mut world, OUTSIDER, 99, signature::errors::ERR_REQUEST_NOT_FOUND);
}
