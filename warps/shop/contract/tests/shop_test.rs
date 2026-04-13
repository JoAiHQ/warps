use multiversx_sc_scenario::imports::*;

const OWNER: &str = "address:owner";
const OTHER: &str = "address:other";
const SHOP_SC: &str = "sc:shop";
const CODE_PATH: &str = "file:output/shop.wasm";

const SHOP_SLUG: &str = "my-shop";
const SERVICE_SLUG: &str = "haircut";
const SERVICE_NAME: &str = "Haircut";
const PRICE_CENTS: u64 = 2500;
const DURATION_MINUTES: u32 = 30;
const CATEGORY: &str = "hair";

fn world() -> ScenarioWorld {
    let mut blockchain = ScenarioWorld::new();
    blockchain.register_contract(CODE_PATH, shop::ContractBuilder);
    blockchain
}

fn setup_world() -> ScenarioWorld {
    let mut world = world();
    world.set_state_step(
        SetStateStep::new()
            .put_account(OWNER, Account::new().nonce(1))
            .put_account(OTHER, Account::new().nonce(1))
            .new_address(OWNER, 1, SHOP_SC),
    );
    world.sc_deploy(
        ScDeployStep::new()
            .from(OWNER)
            .code(CODE_PATH)
            .gas_limit("50,000,000")
            .expect(TxExpect::ok()),
    );
    world
}

fn register_shop(world: &mut ScenarioWorld, from: &str, slug: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("registerShop")
            .argument(format!("str:{slug}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn register_shop_err(world: &mut ScenarioWorld, from: &str, slug: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("registerShop")
            .argument(format!("str:{slug}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn add_service(world: &mut ScenarioWorld, from: &str, shop_slug: &str, service_slug: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("addService")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{service_slug}").as_str())
            .argument(format!("str:{SERVICE_NAME}").as_str())
            .argument(format!("{PRICE_CENTS}").as_str())
            .argument(format!("{DURATION_MINUTES}").as_str())
            .argument(format!("str:{CATEGORY}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn add_service_err(world: &mut ScenarioWorld, from: &str, shop_slug: &str, service_slug: &str, name: &str, price: u64, duration: u32, category: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("addService")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{service_slug}").as_str())
            .argument(format!("str:{name}").as_str())
            .argument(format!("{price}").as_str())
            .argument(format!("{duration}").as_str())
            .argument(format!("str:{category}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn remove_service(world: &mut ScenarioWorld, from: &str, shop_slug: &str, service_slug: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("removeService")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{service_slug}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn remove_service_err(world: &mut ScenarioWorld, from: &str, shop_slug: &str, service_slug: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("removeService")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{service_slug}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

// ─── registerShop ─────────────────────────────────────────────────────────────

#[test]
fn test_register_shop() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
}

#[test]
fn test_register_shop_any_account() {
    let mut world = setup_world();
    register_shop(&mut world, OTHER, SHOP_SLUG);
}

#[test]
fn test_register_shop_empty_slug_fails() {
    let mut world = setup_world();
    register_shop_err(&mut world, OWNER, "", shop::errors::ERR_INVALID_SLUG);
}

#[test]
fn test_register_shop_duplicate_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    register_shop_err(&mut world, OWNER, SHOP_SLUG, shop::errors::ERR_SHOP_ALREADY_EXISTS);
}

#[test]
fn test_register_shop_different_owner_same_slug_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    register_shop_err(&mut world, OTHER, SHOP_SLUG, shop::errors::ERR_SHOP_ALREADY_EXISTS);
}

// ─── addService ───────────────────────────────────────────────────────────────

#[test]
fn test_add_service() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
}

#[test]
fn test_add_multiple_services() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, "haircut");
    add_service(&mut world, OWNER, SHOP_SLUG, "beard-trim");
    add_service(&mut world, OWNER, SHOP_SLUG, "coloring");
}

#[test]
fn test_add_service_not_owner_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service_err(&mut world, OTHER, SHOP_SLUG, SERVICE_SLUG, SERVICE_NAME, PRICE_CENTS, DURATION_MINUTES, CATEGORY, shop::errors::ERR_NOT_SHOP_OWNER);
}

#[test]
fn test_add_service_shop_not_found_fails() {
    let mut world = setup_world();
    add_service_err(&mut world, OWNER, "nonexistent", SERVICE_SLUG, SERVICE_NAME, PRICE_CENTS, DURATION_MINUTES, CATEGORY, shop::errors::ERR_SHOP_NOT_FOUND);
}

#[test]
fn test_add_service_empty_slug_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service_err(&mut world, OWNER, SHOP_SLUG, "", SERVICE_NAME, PRICE_CENTS, DURATION_MINUTES, CATEGORY, shop::errors::ERR_INVALID_SLUG);
}

#[test]
fn test_add_service_empty_name_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service_err(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG, "", PRICE_CENTS, DURATION_MINUTES, CATEGORY, shop::errors::ERR_INVALID_NAME);
}

#[test]
fn test_add_service_zero_duration_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service_err(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG, SERVICE_NAME, PRICE_CENTS, 0, CATEGORY, shop::errors::ERR_INVALID_DURATION);
}

#[test]
fn test_add_service_exceeds_max_duration_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service_err(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG, SERVICE_NAME, PRICE_CENTS, 1441, CATEGORY, shop::errors::ERR_INVALID_DURATION);
}

#[test]
fn test_add_duplicate_service_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    add_service_err(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG, SERVICE_NAME, PRICE_CENTS, DURATION_MINUTES, CATEGORY, shop::errors::ERR_SERVICE_ALREADY_EXISTS);
}

// ─── removeService ────────────────────────────────────────────────────────────

#[test]
fn test_remove_service() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    remove_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
}

#[test]
fn test_remove_service_not_owner_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    remove_service_err(&mut world, OTHER, SHOP_SLUG, SERVICE_SLUG, shop::errors::ERR_NOT_SHOP_OWNER);
}

#[test]
fn test_remove_service_not_found_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    remove_service_err(&mut world, OWNER, SHOP_SLUG, "nonexistent", shop::errors::ERR_SERVICE_NOT_FOUND);
}

#[test]
fn test_remove_service_shop_not_found_fails() {
    let mut world = setup_world();
    remove_service_err(&mut world, OWNER, "nonexistent", SERVICE_SLUG, shop::errors::ERR_SHOP_NOT_FOUND);
}

#[test]
fn test_remove_then_re_add_service() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    remove_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
}
