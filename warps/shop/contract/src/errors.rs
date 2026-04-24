pub const ERR_INVALID_ID: &str = "id must be 1-64 bytes";
pub const ERR_INVALID_SLUG: &str = "slug must be 1-64 bytes";
pub const ERR_INVALID_NAME: &str = "name must be 1-128 bytes";
pub const ERR_INVALID_DURATION: &str = "duration must be between 1 and 1440 minutes";
pub const ERR_INVALID_CATEGORY: &str = "category must be at most 64 bytes";
pub const ERR_INVALID_LOCATION: &str = "location must be 1-128 bytes";
pub const ERR_INVALID_DESCRIPTION: &str = "description must be at most 512 bytes";
pub const ERR_INVALID_URL: &str = "url must be at most 256 bytes";
pub const ERR_INVALID_CHAIN: &str = "chain must be 1-32 bytes";
pub const ERR_INVALID_ADDRESS: &str = "address must be 1-128 bytes";
pub const ERR_INVALID_TOKEN: &str = "token must be 1-64 bytes";
pub const ERR_INVALID_SETTING_KEY: &str = "setting key must be 1-64 bytes";

pub const ERR_SHOP_NOT_FOUND: &str = "shop not found";
pub const ERR_SHOP_ALREADY_EXISTS: &str = "shop already exists";
pub const ERR_NOT_SHOP_OWNER: &str = "not shop owner";

pub const ERR_SERVICE_NOT_FOUND: &str = "service not found";
pub const ERR_SERVICE_ALREADY_EXISTS: &str = "service already exists";

pub const ERR_PRODUCT_NOT_FOUND: &str = "product not found";
pub const ERR_PRODUCT_ALREADY_EXISTS: &str = "product already exists";

pub const ERR_NO_PAYMENT_DESTINATION: &str = "no payment destination set";
