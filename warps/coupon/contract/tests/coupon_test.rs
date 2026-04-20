use multiversx_sc_scenario::imports::*;

const OWNER: &str = "address:owner";
const OTHER: &str = "address:other";
const CUSTOMER: &str = "address:customer";
const SC: &str = "sc:coupon";
const CODE_PATH: &str = "file:output/coupon.wasm";

const CODE: &str = "SUMMER20";

fn world() -> ScenarioWorld {
    let mut w = ScenarioWorld::new();
    w.register_contract(CODE_PATH, coupon::ContractBuilder);
    w
}

fn setup() -> ScenarioWorld {
    let mut w = world();
    w.set_state_step(
        SetStateStep::new()
            .put_account(OWNER, Account::new().nonce(1))
            .put_account(OTHER, Account::new().nonce(1))
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
    w
}

fn create(w: &mut ScenarioWorld, from: &str, code: &str, discount: u8, max_uses: u64, expiry_days: u64) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("createCoupon")
            .argument(format!("str:{code}").as_str())
            .argument(format!("{discount}").as_str())
            .argument(format!("{max_uses}").as_str())
            .argument(format!("{expiry_days}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::ok()),
    );
}

fn create_err(w: &mut ScenarioWorld, from: &str, code: &str, discount: u8, max_uses: u64, expiry_days: u64, err: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("createCoupon")
            .argument(format!("str:{code}").as_str())
            .argument(format!("{discount}").as_str())
            .argument(format!("{max_uses}").as_str())
            .argument(format!("{expiry_days}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn redeem(w: &mut ScenarioWorld, from: &str, code: &str, expected_discount: u8) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("redeemCoupon")
            .argument(format!("str:{code}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::ok().result(format!("{expected_discount}").as_str())),
    );
}

fn redeem_err(w: &mut ScenarioWorld, from: &str, code: &str, err: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("redeemCoupon")
            .argument(format!("str:{code}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn revoke(w: &mut ScenarioWorld, from: &str, code: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("revokeCoupon")
            .argument(format!("str:{code}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::ok()),
    );
}

fn revoke_err(w: &mut ScenarioWorld, from: &str, code: &str, err: &str) {
    w.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SC)
            .function("revokeCoupon")
            .argument(format!("str:{code}").as_str())
            .gas_limit("5,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

// ─── createCoupon ────────────────────────────────────────────────────────────

#[test]
fn create_succeeds() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 20, 10, 30);
}

#[test]
fn create_with_unlimited_uses_and_no_expiry() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 0, 0);
}

#[test]
fn create_empty_code_fails() {
    let mut w = setup();
    create_err(&mut w, OWNER, "", 10, 5, 0, coupon::errors::ERR_CODE_EMPTY);
}

#[test]
fn create_code_too_long_fails() {
    let mut w = setup();
    let long_code = "A".repeat(33);
    create_err(&mut w, OWNER, &long_code, 10, 5, 0, coupon::errors::ERR_CODE_TOO_LONG);
}

#[test]
fn create_duplicate_code_fails() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 5, 0);
    create_err(&mut w, OTHER, CODE, 20, 1, 0, coupon::errors::ERR_CODE_TAKEN);
}

#[test]
fn create_discount_zero_fails() {
    let mut w = setup();
    create_err(&mut w, OWNER, CODE, 0, 5, 0, coupon::errors::ERR_INVALID_DISCOUNT);
}

#[test]
fn create_discount_over_100_fails() {
    let mut w = setup();
    create_err(&mut w, OWNER, CODE, 101, 5, 0, coupon::errors::ERR_INVALID_DISCOUNT);
}

#[test]
fn create_discount_100_succeeds() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 100, 1, 0);
}

// ─── redeemCoupon ────────────────────────────────────────────────────────────

#[test]
fn redeem_returns_discount() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 25, 10, 0);
    redeem(&mut w, CUSTOMER, CODE, 25);
}

#[test]
fn redeem_unlimited_uses_allows_many() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 5, 0, 0);
    redeem(&mut w, CUSTOMER, CODE, 5);
    redeem(&mut w, CUSTOMER, CODE, 5);
    redeem(&mut w, CUSTOMER, CODE, 5);
}

#[test]
fn redeem_respects_max_uses() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 2, 0);
    redeem(&mut w, CUSTOMER, CODE, 10);
    redeem(&mut w, CUSTOMER, CODE, 10);
    redeem_err(&mut w, CUSTOMER, CODE, coupon::errors::ERR_COUPON_FULLY_USED);
}

#[test]
fn redeem_unknown_code_fails() {
    let mut w = setup();
    redeem_err(&mut w, CUSTOMER, "NOPE", coupon::errors::ERR_COUPON_NOT_FOUND);
}

#[test]
fn redeem_revoked_fails() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 5, 0);
    revoke(&mut w, OWNER, CODE);
    redeem_err(&mut w, CUSTOMER, CODE, coupon::errors::ERR_COUPON_REVOKED);
}

#[test]
fn redeem_expired_fails() {
    let mut w = setup();
    // Coupon created at block_timestamp = 1_000_000, expires 1 day later (86_400 seconds).
    create(&mut w, OWNER, CODE, 10, 0, 1);
    // Advance time past the expiry.
    w.set_state_step(SetStateStep::new().block_timestamp(1_000_000 + 86_400 + 1));
    redeem_err(&mut w, CUSTOMER, CODE, coupon::errors::ERR_COUPON_EXPIRED);
}

#[test]
fn redeem_just_before_expiry_succeeds() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 0, 1);
    // One second before expiry.
    w.set_state_step(SetStateStep::new().block_timestamp(1_000_000 + 86_400 - 1));
    redeem(&mut w, CUSTOMER, CODE, 10);
}

// ─── revokeCoupon ────────────────────────────────────────────────────────────

#[test]
fn revoke_by_owner_succeeds() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 5, 0);
    revoke(&mut w, OWNER, CODE);
}

#[test]
fn revoke_by_non_owner_fails() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 5, 0);
    revoke_err(&mut w, OTHER, CODE, coupon::errors::ERR_NOT_OWNER);
}

#[test]
fn revoke_unknown_code_fails() {
    let mut w = setup();
    revoke_err(&mut w, OWNER, "NOPE", coupon::errors::ERR_COUPON_NOT_FOUND);
}

#[test]
fn revoke_twice_fails() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 10, 5, 0);
    revoke(&mut w, OWNER, CODE);
    revoke_err(&mut w, OWNER, CODE, coupon::errors::ERR_COUPON_REVOKED);
}

// ─── views ───────────────────────────────────────────────────────────────────

#[test]
fn get_coupon_unknown_fails() {
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
    create(&mut w, OWNER, CODE, 10, 5, 0);
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("couponExists")
            .argument(format!("str:{CODE}").as_str())
            .expect(TxExpect::ok().result("01")),
    );
}

#[test]
fn get_owner_coupons_returns_all_codes() {
    let mut w = setup();
    create(&mut w, OWNER, "CODE1", 10, 5, 0);
    create(&mut w, OWNER, "CODE2", 20, 10, 0);
    create(&mut w, OTHER, "OTHER1", 5, 3, 0);

    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("getOwnerCoupons")
            .argument(OWNER)
            .expect(TxExpect::ok().result("str:CODE1").result("str:CODE2")),
    );
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("getOwnerCoupons")
            .argument(OTHER)
            .expect(TxExpect::ok().result("str:OTHER1")),
    );
    w.sc_query(
        ScQueryStep::new()
            .to(SC)
            .function("getOwnerCoupons")
            .argument(CUSTOMER)
            .expect(TxExpect::ok()),
    );
}

// ─── full flow ───────────────────────────────────────────────────────────────

#[test]
fn full_flow_create_redeem_cap_revoke() {
    let mut w = setup();
    create(&mut w, OWNER, CODE, 15, 3, 30);
    redeem(&mut w, CUSTOMER, CODE, 15);
    redeem(&mut w, CUSTOMER, CODE, 15);
    revoke(&mut w, OWNER, CODE);
    redeem_err(&mut w, CUSTOMER, CODE, coupon::errors::ERR_COUPON_REVOKED);
}
