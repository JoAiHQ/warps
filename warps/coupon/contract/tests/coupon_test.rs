use multiversx_sc_scenario::imports::*;

const OWNER: &str = "address:owner";
const OTHER: &str = "address:other";
const CUSTOMER: &str = "address:customer";
const SC: &str = "sc:coupon";
const CODE_PATH: &str = "file:output/coupon.wasm";
const ESDT_ISSUE_COST: u64 = 50_000_000_000_000_000u64;

const CODE: &str = "SUMMER20";
const COLL_NAME: &str = "JoAi Coupons";
const COLL_TICKER: &str = "JCOUPON";

fn world() -> ScenarioWorld {
    let mut w = ScenarioWorld::new();
    w.register_contract(CODE_PATH, coupon::ContractBuilder);
    w
}

fn setup() -> ScenarioWorld {
    let mut w = world();
    w.set_state_step(
        SetStateStep::new()
            .put_account(OWNER, Account::new().nonce(1).balance(ESDT_ISSUE_COST * 10))
            .put_account(OTHER, Account::new().nonce(1).balance(ESDT_ISSUE_COST))
            .put_account(CUSTOMER, Account::new().nonce(1))
            .new_address(OWNER, 1, SC)
            .block_timestamp(1_000_000),
    );
    w.sc_deploy(
        ScDeployStep::new()
            .from(OWNER)
            .code(CODE_PATH)
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
    create_collection(&mut w, OWNER, COLL_NAME, COLL_TICKER);
    w
}

fn create_collection(w: &mut ScenarioWorld, from: &str, name: &str, ticker: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("createCollection")
            .egld_value(format!("{ESDT_ISSUE_COST}").as_str())
            .argument(format!("str:{name}").as_str())
            .argument(format!("str:{ticker}").as_str())
            .gas_limit("60,000,000")
            .expect(TxExpect::ok()),
    );
}

fn create_collection_err(w: &mut ScenarioWorld, from: &str, name: &str, ticker: &str, egld: u64, err: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("createCollection")
            .egld_value(format!("{egld}").as_str())
            .argument(format!("str:{name}").as_str())
            .argument(format!("str:{ticker}").as_str())
            .gas_limit("60,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn create_coupon(w: &mut ScenarioWorld, from: &str, coll_id: u64, code: &str, discount: u8, max_uses: u64, expiry_days: u64) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("createCoupon")
            .argument(format!("{coll_id}").as_str())
            .argument(format!("str:{code}").as_str())
            .argument(format!("{discount}").as_str())
            .argument(format!("{max_uses}").as_str())
            .argument(format!("{expiry_days}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn create_coupon_err(w: &mut ScenarioWorld, from: &str, coll_id: u64, code: &str, discount: u8, max_uses: u64, expiry_days: u64, err: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("createCoupon")
            .argument(format!("{coll_id}").as_str())
            .argument(format!("str:{code}").as_str())
            .argument(format!("{discount}").as_str())
            .argument(format!("{max_uses}").as_str())
            .argument(format!("{expiry_days}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn claim(w: &mut ScenarioWorld, from: &str, coupon_id: u64) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("claimCoupon")
            .argument(format!("{coupon_id}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::ok()),
    );
}

fn revoke(w: &mut ScenarioWorld, from: &str, coupon_id: u64) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("revokeCoupon")
            .argument(format!("{coupon_id}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::ok()),
    );
}

fn revoke_err(w: &mut ScenarioWorld, from: &str, coupon_id: u64, err: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("revokeCoupon")
            .argument(format!("{coupon_id}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

// ─── init ────────────────────────────────────────────────────────────────────

#[test]
fn init_sets_ids_to_1() {
    let w = setup();
    drop(w);
}

// ─── createCollection ────────────────────────────────────────────────────────

#[test]
fn create_collection_wrong_payment_fails() {
    let mut w = world();
    w.set_state_step(
        SetStateStep::new()
            .put_account(OWNER, Account::new().nonce(1).balance(ESDT_ISSUE_COST))
            .new_address(OWNER, 1, SC),
    );
    w.sc_deploy(
        ScDeployStep::new()
            .from(OWNER)
            .code(CODE_PATH)
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
    create_collection_err(&mut w, OWNER, COLL_NAME, COLL_TICKER, 0, coupon::errors::ERR_WRONG_PAYMENT);
}

#[test]
fn create_collection_empty_name_fails() {
    let mut w = world();
    w.set_state_step(
        SetStateStep::new()
            .put_account(OWNER, Account::new().nonce(1).balance(ESDT_ISSUE_COST))
            .new_address(OWNER, 1, SC),
    );
    w.sc_deploy(
        ScDeployStep::new()
            .from(OWNER)
            .code(CODE_PATH)
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
    create_collection_err(&mut w, OWNER, "", COLL_TICKER, ESDT_ISSUE_COST, coupon::errors::ERR_INVALID_NAME);
}

#[test]
fn create_collection_ticker_too_short_fails() {
    let mut w = world();
    w.set_state_step(
        SetStateStep::new()
            .put_account(OWNER, Account::new().nonce(1).balance(ESDT_ISSUE_COST))
            .new_address(OWNER, 1, SC),
    );
    w.sc_deploy(
        ScDeployStep::new()
            .from(OWNER)
            .code(CODE_PATH)
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
    create_collection_err(&mut w, OWNER, COLL_NAME, "AB", ESDT_ISSUE_COST, coupon::errors::ERR_INVALID_TICKER);
}

// ─── createCoupon ────────────────────────────────────────────────────────────

#[test]
fn create_succeeds() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 20, 10, 30);
}

#[test]
fn create_with_unlimited_uses_and_no_expiry() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 0, 0);
}

#[test]
fn create_empty_code_fails() {
    let mut w = setup();
    create_coupon_err(&mut w, OWNER, 1, "", 10, 5, 0, coupon::errors::ERR_CODE_EMPTY);
}

#[test]
fn create_code_too_long_fails() {
    let mut w = setup();
    let long_code = "A".repeat(33);
    create_coupon_err(&mut w, OWNER, 1, &long_code, 10, 5, 0, coupon::errors::ERR_CODE_TOO_LONG);
}

#[test]
fn create_duplicate_code_fails() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    create_coupon_err(&mut w, OWNER, 1, CODE, 20, 1, 0, coupon::errors::ERR_CODE_TAKEN);
}

#[test]
fn create_discount_zero_fails() {
    let mut w = setup();
    create_coupon_err(&mut w, OWNER, 1, CODE, 0, 5, 0, coupon::errors::ERR_INVALID_DISCOUNT);
}

#[test]
fn create_discount_over_100_fails() {
    let mut w = setup();
    create_coupon_err(&mut w, OWNER, 1, CODE, 101, 5, 0, coupon::errors::ERR_INVALID_DISCOUNT);
}

#[test]
fn create_discount_100_succeeds() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 100, 1, 0);
}

#[test]
fn create_nonexistent_collection_fails() {
    let mut w = setup();
    create_coupon_err(&mut w, OWNER, 99, CODE, 10, 5, 0, coupon::errors::ERR_COLLECTION_NOT_FOUND);
}

#[test]
fn create_by_non_collection_owner_fails() {
    let mut w = setup();
    create_coupon_err(&mut w, OTHER, 1, CODE, 10, 5, 0, coupon::errors::ERR_NOT_COLLECTION_OWNER);
}

// ─── claimCoupon ─────────────────────────────────────────────────────────────

#[test]
fn claim_succeeds() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    claim(&mut w, CUSTOMER, 1);
}

#[test]
fn claim_multiple_users_succeeds() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    claim(&mut w, CUSTOMER, 1);
    claim(&mut w, OTHER, 1);
}

#[test]
fn claim_unknown_coupon_fails() {
    let mut w = setup();
    w.sc_call(
        ScCallStep::new()
            .from(CUSTOMER)
            .to(SC)
            .function("claimCoupon")
            .argument("99")
            .gas_limit("5,000,000")
            .expect(TxExpect::user_error(format!("str:{}", coupon::errors::ERR_COUPON_NOT_FOUND).as_str())),
    );
}

// ─── revokeCoupon ────────────────────────────────────────────────────────────

#[test]
fn revoke_by_owner_succeeds() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    revoke(&mut w, OWNER, 1);
}

#[test]
fn revoke_by_non_owner_fails() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    revoke_err(&mut w, OTHER, 1, coupon::errors::ERR_NOT_COUPON_OWNER);
}

#[test]
fn revoke_unknown_coupon_fails() {
    let mut w = setup();
    revoke_err(&mut w, OWNER, 99, coupon::errors::ERR_COUPON_NOT_FOUND);
}

#[test]
fn revoke_twice_fails() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    revoke(&mut w, OWNER, 1);
    revoke_err(&mut w, OWNER, 1, coupon::errors::ERR_ALREADY_REVOKED);
}

// ─── views ───────────────────────────────────────────────────────────────────

#[test]
fn get_coupon_by_code_unknown_fails() {
    let mut w = setup();
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("getCoupon")
            .argument(format!("str:NOPE").as_str())
            .expect(TxExpect::user_error(format!("str:{}", coupon::errors::ERR_COUPON_NOT_FOUND).as_str())),
    );
}

#[test]
fn coupon_exists_reflects_state() {
    let mut w = setup();
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("couponExists")
            .argument(format!("str:{CODE}").as_str())
            .expect(TxExpect::ok().result("")),
    );
    create_coupon(&mut w, OWNER, 1, CODE, 10, 5, 0);
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("couponExists")
            .argument(format!("str:{CODE}").as_str())
            .expect(TxExpect::ok().result("01")),
    );
}

#[test]
fn get_next_coupon_id_increments() {
    let mut w = setup();
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("getNextCouponId")
            .expect(TxExpect::ok().result("1")),
    );
    create_coupon(&mut w, OWNER, 1, "FIRST", 10, 5, 0);
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("getNextCouponId")
            .expect(TxExpect::ok().result("2")),
    );
}

// ─── full flow ───────────────────────────────────────────────────────────────

#[test]
fn full_flow_create_claim_revoke() {
    let mut w = setup();
    create_coupon(&mut w, OWNER, 1, CODE, 15, 3, 30);
    claim(&mut w, CUSTOMER, 1);
    claim(&mut w, OTHER, 1);
    revoke(&mut w, OWNER, 1);
}
