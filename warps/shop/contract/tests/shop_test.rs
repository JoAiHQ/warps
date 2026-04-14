use multiversx_sc_scenario::imports::*;

const OWNER: &str = "address:owner";
const OTHER: &str = "address:other";
const SHOP_SC: &str = "sc:shop";
const CODE_PATH: &str = "file:output/shop.wasm";

const SHOP_SLUG: &str = "my-shop";
const CATEGORY: &str = "hotel";
const LOCATION: &str = "Vienna, AT";
const DESCRIPTION: &str = "A lovely hotel in Vienna";
const IMAGE_URL: &str = "https://example.com/image.jpg";
const WEBSITE: &str = "https://example.com";

const SERVICE_SLUG: &str = "spa-60min";
const SERVICE_NAME: &str = "Spa Session (60 min)";
const SERVICE_PRICE: u64 = 89000000;
const SERVICE_DURATION: u32 = 60;
const SERVICE_CATEGORY: &str = "spa";
const SERVICE_DESCRIPTION: &str = "Relaxing 60-minute spa session";

const PRODUCT_SLUG: &str = "double-room";
const PRODUCT_NAME: &str = "Double Room";
const PRODUCT_PRICE: u64 = 149000000;
const PRODUCT_CATEGORY: &str = "room";
const PRODUCT_DESCRIPTION: &str = "Spacious double room with city view";

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

fn register_shop(world: &mut ScenarioWorld, from: &str, slug: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("registerShop")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{CATEGORY}").as_str())
            .argument(format!("str:{LOCATION}").as_str())
            .argument(format!("str:{DESCRIPTION}").as_str())
            .argument(format!("str:{IMAGE_URL}").as_str())
            .argument(format!("str:{WEBSITE}").as_str())
            .gas_limit("15,000,000")
            .expect(TxExpect::ok()),
    );
}

fn register_shop_full(world: &mut ScenarioWorld, from: &str, slug: &str, category: &str, location: &str, description: &str, image_url: &str, website: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("registerShop")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{category}").as_str())
            .argument(format!("str:{location}").as_str())
            .argument(format!("str:{description}").as_str())
            .argument(format!("str:{image_url}").as_str())
            .argument(format!("str:{website}").as_str())
            .gas_limit("15,000,000")
            .expect(TxExpect::ok()),
    );
}

fn register_shop_err(world: &mut ScenarioWorld, from: &str, slug: &str, category: &str, location: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("registerShop")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{category}").as_str())
            .argument(format!("str:{location}").as_str())
            .argument("str:")
            .argument("str:")
            .argument("str:")
            .gas_limit("15,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn update_shop(world: &mut ScenarioWorld, from: &str, slug: &str, category: &str, location: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("updateShop")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{category}").as_str())
            .argument(format!("str:{location}").as_str())
            .argument(format!("str:{DESCRIPTION}").as_str())
            .argument(format!("str:{IMAGE_URL}").as_str())
            .argument(format!("str:{WEBSITE}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn update_shop_err(world: &mut ScenarioWorld, from: &str, slug: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("updateShop")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{CATEGORY}").as_str())
            .argument(format!("str:{LOCATION}").as_str())
            .argument("str:")
            .argument("str:")
            .argument("str:")
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn set_payment(world: &mut ScenarioWorld, from: &str, slug: &str, chain: &str, address: &str, token: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("setPaymentDestination")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{chain}").as_str())
            .argument(format!("str:{address}").as_str())
            .argument(format!("str:{token}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn set_payment_err(world: &mut ScenarioWorld, from: &str, slug: &str, chain: &str, address: &str, token: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("setPaymentDestination")
            .argument(format!("str:{slug}").as_str())
            .argument(format!("str:{chain}").as_str())
            .argument(format!("str:{address}").as_str())
            .argument(format!("str:{token}").as_str())
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
            .argument(format!("{SERVICE_PRICE}").as_str())
            .argument(format!("{SERVICE_DURATION}").as_str())
            .argument(format!("str:{SERVICE_CATEGORY}").as_str())
            .argument(format!("str:{SERVICE_DESCRIPTION}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn add_service_err(world: &mut ScenarioWorld, from: &str, shop_slug: &str, service_slug: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("addService")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{service_slug}").as_str())
            .argument(format!("str:{SERVICE_NAME}").as_str())
            .argument(format!("{SERVICE_PRICE}").as_str())
            .argument(format!("{SERVICE_DURATION}").as_str())
            .argument(format!("str:{SERVICE_CATEGORY}").as_str())
            .argument(format!("str:{SERVICE_DESCRIPTION}").as_str())
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

fn add_product(world: &mut ScenarioWorld, from: &str, shop_slug: &str, product_slug: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("addProduct")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{product_slug}").as_str())
            .argument(format!("str:{PRODUCT_NAME}").as_str())
            .argument(format!("{PRODUCT_PRICE}").as_str())
            .argument(format!("str:{PRODUCT_CATEGORY}").as_str())
            .argument(format!("str:{PRODUCT_DESCRIPTION}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn add_product_err(world: &mut ScenarioWorld, from: &str, shop_slug: &str, product_slug: &str, err: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("addProduct")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{product_slug}").as_str())
            .argument(format!("str:{PRODUCT_NAME}").as_str())
            .argument(format!("{PRODUCT_PRICE}").as_str())
            .argument(format!("str:{PRODUCT_CATEGORY}").as_str())
            .argument(format!("str:{PRODUCT_DESCRIPTION}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::user_error(format!("str:{err}").as_str())),
    );
}

fn remove_product(world: &mut ScenarioWorld, from: &str, shop_slug: &str, product_slug: &str) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("removeProduct")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{product_slug}").as_str())
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

fn update_product_stock(world: &mut ScenarioWorld, from: &str, shop_slug: &str, product_slug: &str, in_stock: bool) {
    world.sc_call(
        ScCallStep::new()
            .from(from)
            .to(SHOP_SC)
            .function("updateProductStock")
            .argument(format!("str:{shop_slug}").as_str())
            .argument(format!("str:{product_slug}").as_str())
            .argument(if in_stock { "1" } else { "0" })
            .gas_limit("10,000,000")
            .expect(TxExpect::ok()),
    );
}

// ─── registerShop ────────────────────────────────────────────────────────────

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
    register_shop_err(&mut world, OWNER, "", CATEGORY, LOCATION, shop::errors::ERR_INVALID_SLUG);
}

#[test]
fn test_register_shop_empty_category_fails() {
    let mut world = setup_world();
    register_shop_err(&mut world, OWNER, SHOP_SLUG, "", LOCATION, shop::errors::ERR_INVALID_CATEGORY);
}

#[test]
fn test_register_shop_empty_location_fails() {
    let mut world = setup_world();
    register_shop_err(&mut world, OWNER, SHOP_SLUG, CATEGORY, "", shop::errors::ERR_INVALID_LOCATION);
}

#[test]
fn test_register_shop_duplicate_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    register_shop_err(&mut world, OWNER, SHOP_SLUG, CATEGORY, LOCATION, shop::errors::ERR_SHOP_ALREADY_EXISTS);
}

#[test]
fn test_register_multiple_shops() {
    let mut world = setup_world();
    register_shop_full(&mut world, OWNER, "hotel-a", "hotel", "Vienna, AT", "", "", "");
    register_shop_full(&mut world, OWNER, "hotel-b", "hotel", "Salzburg, AT", "", "", "");
    register_shop_full(&mut world, OTHER, "restaurant-c", "restaurant", "Graz, AT", "", "", "");
}

// ─── updateShop ──────────────────────────────────────────────────────────────

#[test]
fn test_update_shop() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    update_shop(&mut world, OWNER, SHOP_SLUG, "restaurant", "Salzburg, AT");
}

#[test]
fn test_update_shop_not_owner_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    update_shop_err(&mut world, OTHER, SHOP_SLUG, shop::errors::ERR_NOT_SHOP_OWNER);
}

#[test]
fn test_update_shop_not_found_fails() {
    let mut world = setup_world();
    update_shop_err(&mut world, OWNER, "nonexistent", shop::errors::ERR_SHOP_NOT_FOUND);
}

// ─── setPaymentDestination ───────────────────────────────────────────────────

#[test]
fn test_set_payment_destination() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment(&mut world, OWNER, SHOP_SLUG, "base", "0x1234567890abcdef", "USDC");
}

#[test]
fn test_set_payment_multiversx() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment(&mut world, OWNER, SHOP_SLUG, "multiversx", "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th", "USDC-c76f8e");
}

#[test]
fn test_set_payment_not_owner_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment_err(&mut world, OTHER, SHOP_SLUG, "base", "0x123", "USDC", shop::errors::ERR_NOT_SHOP_OWNER);
}

#[test]
fn test_set_payment_empty_chain_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment_err(&mut world, OWNER, SHOP_SLUG, "", "0x123", "USDC", shop::errors::ERR_INVALID_CHAIN);
}

#[test]
fn test_set_payment_empty_address_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment_err(&mut world, OWNER, SHOP_SLUG, "base", "", "USDC", shop::errors::ERR_INVALID_ADDRESS);
}

#[test]
fn test_set_payment_empty_token_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment_err(&mut world, OWNER, SHOP_SLUG, "base", "0x123", "", shop::errors::ERR_INVALID_TOKEN);
}

#[test]
fn test_set_payment_update_destination() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment(&mut world, OWNER, SHOP_SLUG, "base", "0x111", "USDC");
    set_payment(&mut world, OWNER, SHOP_SLUG, "solana", "So1111111111111111111111111111111111111111111", "SOL");
}

// ─── addService ──────────────────────────────────────────────────────────────

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
    add_service(&mut world, OWNER, SHOP_SLUG, "spa-60min");
    add_service(&mut world, OWNER, SHOP_SLUG, "spa-90min");
    add_service(&mut world, OWNER, SHOP_SLUG, "massage");
}

#[test]
fn test_add_service_not_owner_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service_err(&mut world, OTHER, SHOP_SLUG, SERVICE_SLUG, shop::errors::ERR_NOT_SHOP_OWNER);
}

#[test]
fn test_add_service_shop_not_found_fails() {
    let mut world = setup_world();
    add_service_err(&mut world, OWNER, "nonexistent", SERVICE_SLUG, shop::errors::ERR_SHOP_NOT_FOUND);
}

#[test]
fn test_add_duplicate_service_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    add_service_err(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG, shop::errors::ERR_SERVICE_ALREADY_EXISTS);
}

// ─── removeService ───────────────────────────────────────────────────────────

#[test]
fn test_remove_service() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    remove_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
}

#[test]
fn test_remove_then_re_add_service() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    remove_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
    add_service(&mut world, OWNER, SHOP_SLUG, SERVICE_SLUG);
}

// ─── addProduct ──────────────────────────────────────────────────────────────

#[test]
fn test_add_product() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
}

#[test]
fn test_add_multiple_products() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, "single-room");
    add_product(&mut world, OWNER, SHOP_SLUG, "double-room");
    add_product(&mut world, OWNER, SHOP_SLUG, "suite");
}

#[test]
fn test_add_product_not_owner_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product_err(&mut world, OTHER, SHOP_SLUG, PRODUCT_SLUG, shop::errors::ERR_NOT_SHOP_OWNER);
}

#[test]
fn test_add_product_shop_not_found_fails() {
    let mut world = setup_world();
    add_product_err(&mut world, OWNER, "nonexistent", PRODUCT_SLUG, shop::errors::ERR_SHOP_NOT_FOUND);
}

#[test]
fn test_add_duplicate_product_fails() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
    add_product_err(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG, shop::errors::ERR_PRODUCT_ALREADY_EXISTS);
}

// ─── removeProduct ───────────────────────────────────────────────────────────

#[test]
fn test_remove_product() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
    remove_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
}

#[test]
fn test_remove_then_re_add_product() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
    remove_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
}

// ─── updateProductStock ──────────────────────────────────────────────────────

#[test]
fn test_update_product_stock() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    add_product(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG);
    update_product_stock(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG, false);
    update_product_stock(&mut world, OWNER, SHOP_SLUG, PRODUCT_SLUG, true);
}

// ─── Full flow ───────────────────────────────────────────────────────────────

#[test]
fn test_full_shop_setup_flow() {
    let mut world = setup_world();
    register_shop(&mut world, OWNER, SHOP_SLUG);
    set_payment(&mut world, OWNER, SHOP_SLUG, "base", "0xABCDEF1234567890", "USDC");
    add_product(&mut world, OWNER, SHOP_SLUG, "single-room");
    add_product(&mut world, OWNER, SHOP_SLUG, "double-room");
    add_service(&mut world, OWNER, SHOP_SLUG, "spa-60min");
    update_product_stock(&mut world, OWNER, SHOP_SLUG, "single-room", false);
    update_shop(&mut world, OWNER, SHOP_SLUG, "boutique-hotel", "Vienna, AT");
}
