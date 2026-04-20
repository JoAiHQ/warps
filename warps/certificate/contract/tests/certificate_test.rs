use multiversx_sc_scenario::imports::*;

const ISSUER: &str = "address:issuer";
const OTHER_ISSUER: &str = "address:other_issuer";
const RECIPIENT: &str = "address:recipient";
const OUTSIDER: &str = "address:outsider";
const CERT_SC: &str = "sc:certificate";
const CODE_PATH: &str = "file:output/certificate.wasm";

const COLLECTION_NAME: &str = "Innovationssiegel";
const COLLECTION_TICKER: &str = "INNO";
const COMPANY: &str = "ACME GmbH";
const PDF_HASH: &str = "abc123def456abc123def456abc123de";
const PDF_URL: &str = "https://example.com/cert.pdf";
const ESDT_ISSUE_COST: u64 = 50_000_000_000_000_000u64;

fn world() -> ScenarioWorld {
    let mut blockchain = ScenarioWorld::new();
    blockchain.register_contract(CODE_PATH, certificate::ContractBuilder);
    blockchain
}

fn setup_world() -> ScenarioWorld {
    let mut world = world();
    world.set_state_step(
        SetStateStep::new()
            .put_account(ISSUER, Account::new().nonce(1).balance(ESDT_ISSUE_COST * 10))
            .put_account(OTHER_ISSUER, Account::new().nonce(1).balance(ESDT_ISSUE_COST * 10))
            .put_account(RECIPIENT, Account::new().nonce(1))
            .put_account(OUTSIDER, Account::new().nonce(1))
            .new_address(ISSUER, 1, CERT_SC),
    );
    world.sc_deploy(
        ScDeployStep::new()
            .from(ISSUER)
            .code(CODE_PATH)
            .gas_limit("50,000,000")
            .expect(TxExpect::ok()),
    );
    world
}

fn create_collection(world: &mut ScenarioWorld, from: &str, name: &str, ticker: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("createCollection")
            .egld_value(format!("{ESDT_ISSUE_COST}").as_str())
            .argument(format!("str:{name}").as_str())
            .argument(format!("str:{ticker}").as_str())
            .gas_limit("50,000,000")
            .expect(TxExpect::ok()),
    );
}

fn create_collection_err(world: &mut ScenarioWorld, from: &str, name: &str, ticker: &str, egld: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("createCollection")
            .egld_value(format!("{egld}").as_str())
            .argument(format!("str:{name}").as_str())
            .argument(format!("str:{ticker}").as_str())
            .gas_limit("50,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn issue(world: &mut ScenarioWorld, from: &str, collection_id: u64, company: &str, pdf_hash: &str, pdf_url: &str, expires_at: u64) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("issue")
            .argument(format!("{collection_id}").as_str())
            .argument(format!("str:{company}").as_str())
            .argument(format!("str:{pdf_hash}").as_str())
            .argument(format!("str:{pdf_url}").as_str())
            .argument(format!("{expires_at}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn issue_err(world: &mut ScenarioWorld, from: &str, collection_id: u64, company: &str, pdf_hash: &str, pdf_url: &str, expires_at: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("issue")
            .argument(format!("{collection_id}").as_str())
            .argument(format!("str:{company}").as_str())
            .argument(format!("str:{pdf_hash}").as_str())
            .argument(format!("str:{pdf_url}").as_str())
            .argument(format!("{expires_at}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn revoke(world: &mut ScenarioWorld, from: &str, cert_id: u64) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("revoke")
            .argument(format!("{cert_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn revoke_err(world: &mut ScenarioWorld, from: &str, cert_id: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("revoke")
            .argument(format!("{cert_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn claim(world: &mut ScenarioWorld, from: &str, cert_id: u64) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("claim")
            .argument(format!("{cert_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn claim_err(world: &mut ScenarioWorld, from: &str, cert_id: u64, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(CERT_SC)
            .function("claim")
            .argument(format!("{cert_id}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

// ─── createCollection ─────────────────────────────────────────────────────────

#[test]
fn test_create_collection_ok() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
}

#[test]
fn test_create_collection_wrong_payment_fails() {
    let mut world = setup_world();
    create_collection_err(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER, 1, certificate::errors::ERR_WRONG_PAYMENT);
}

#[test]
fn test_create_collection_zero_payment_fails() {
    let mut world = setup_world();
    create_collection_err(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER, 0, certificate::errors::ERR_WRONG_PAYMENT);
}

#[test]
fn test_create_collection_empty_name_fails() {
    let mut world = setup_world();
    create_collection_err(&mut world, ISSUER, "", COLLECTION_TICKER, ESDT_ISSUE_COST, certificate::errors::ERR_INVALID_NAME);
}

#[test]
fn test_create_collection_ticker_too_short_fails() {
    let mut world = setup_world();
    create_collection_err(&mut world, ISSUER, COLLECTION_NAME, "AB", ESDT_ISSUE_COST, certificate::errors::ERR_INVALID_TICKER);
}

#[test]
fn test_create_collection_ticker_too_long_fails() {
    let mut world = setup_world();
    create_collection_err(&mut world, ISSUER, COLLECTION_NAME, "TOOLONGTICKER", ESDT_ISSUE_COST, certificate::errors::ERR_INVALID_TICKER);
}

#[test]
fn test_create_multiple_collections_same_issuer() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    create_collection(&mut world, ISSUER, "Bachelor Degree", "BACH");
}

#[test]
fn test_create_collections_different_issuers() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    create_collection(&mut world, OTHER_ISSUER, "Other Cert", "OTHR");
}

// ─── issue ────────────────────────────────────────────────────────────────────

#[test]
fn test_issue_in_ready_collection() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
}

#[test]
fn test_issue_nonexistent_collection_fails() {
    let mut world = setup_world();
    issue_err(&mut world, ISSUER, 99, COMPANY, PDF_HASH, PDF_URL, 0, certificate::errors::ERR_COLLECTION_NOT_FOUND);
}

#[test]
fn test_issue_not_collection_issuer_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue_err(&mut world, OUTSIDER, 1, COMPANY, PDF_HASH, PDF_URL, 0, certificate::errors::ERR_NOT_COLLECTION_ISSUER);
}

#[test]
fn test_issue_empty_company_name_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue_err(&mut world, ISSUER, 1, "", PDF_HASH, PDF_URL, 0, certificate::errors::ERR_INVALID_COMPANY_NAME);
}

#[test]
fn test_issue_empty_pdf_hash_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue_err(&mut world, ISSUER, 1, COMPANY, "", PDF_URL, 0, certificate::errors::ERR_INVALID_PDF_HASH);
}

#[test]
fn test_issue_empty_pdf_url_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue_err(&mut world, ISSUER, 1, COMPANY, PDF_HASH, "", 0, certificate::errors::ERR_INVALID_PDF_URL);
}

#[test]
fn test_issue_past_expiry_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    world.set_state_step(SetStateStep::new().block_timestamp_seconds(1_000_000));
    issue_err(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 1, certificate::errors::ERR_INVALID_EXPIRES_AT);
}

#[test]
fn test_issue_multiple_certs_in_collection() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    issue(&mut world, ISSUER, 1, "Other GmbH", PDF_HASH, PDF_URL, 0);
}

#[test]
fn test_issue_with_future_expiry() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, u64::MAX);
}

// ─── revoke ───────────────────────────────────────────────────────────────────

#[test]
fn test_revoke_unclaimed_cert() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    revoke(&mut world, ISSUER, 1);
}

#[test]
fn test_revoke_nonexistent_fails() {
    let mut world = setup_world();
    revoke_err(&mut world, ISSUER, 99, certificate::errors::ERR_CERT_NOT_FOUND);
}

#[test]
fn test_revoke_by_outsider_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    revoke_err(&mut world, OUTSIDER, 1, certificate::errors::ERR_NOT_ISSUER);
}

#[test]
fn test_revoke_already_revoked_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    revoke(&mut world, ISSUER, 1);
    revoke_err(&mut world, ISSUER, 1, certificate::errors::ERR_ALREADY_REVOKED);
}

#[test]
fn test_revoke_after_claim() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    claim(&mut world, RECIPIENT, 1);
    revoke(&mut world, ISSUER, 1);
}

// ─── claim ────────────────────────────────────────────────────────────────────

#[test]
fn test_claim_cert() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    claim(&mut world, RECIPIENT, 1);
}

#[test]
fn test_claim_nonexistent_fails() {
    let mut world = setup_world();
    claim_err(&mut world, RECIPIENT, 99, certificate::errors::ERR_CERT_NOT_FOUND);
}

#[test]
fn test_claim_revoked_cert_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    revoke(&mut world, ISSUER, 1);
    claim_err(&mut world, RECIPIENT, 1, certificate::errors::ERR_NOT_ACTIVE);
}

#[test]
fn test_claim_twice_fails() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    claim(&mut world, RECIPIENT, 1);
    claim_err(&mut world, OUTSIDER, 1, certificate::errors::ERR_ALREADY_CLAIMED);
}

#[test]
fn test_issuer_can_claim_own_cert() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    claim(&mut world, ISSUER, 1);
}

// ─── Full flows ───────────────────────────────────────────────────────────────

#[test]
fn test_full_issue_claim_flow() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    claim(&mut world, RECIPIENT, 1);
}

#[test]
fn test_multiple_issuers_independent_collections() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    create_collection(&mut world, OTHER_ISSUER, "Other Cert", "OTHR");
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    issue_err(&mut world, ISSUER, 2, COMPANY, PDF_HASH, PDF_URL, 0, certificate::errors::ERR_NOT_COLLECTION_ISSUER);
}

#[test]
fn test_issue_revoke_claim_blocked() {
    let mut world = setup_world();
    create_collection(&mut world, ISSUER, COLLECTION_NAME, COLLECTION_TICKER);
    issue(&mut world, ISSUER, 1, COMPANY, PDF_HASH, PDF_URL, 0);
    revoke(&mut world, ISSUER, 1);
    claim_err(&mut world, RECIPIENT, 1, certificate::errors::ERR_NOT_ACTIVE);
}
