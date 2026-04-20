pub const ERR_WRONG_PAYMENT: &str = "Must send exactly 0.05 EGLD to create a collection";
pub const ERR_INVALID_NAME: &str = "Invalid collection name";
pub const ERR_INVALID_TICKER: &str = "Ticker must be 3–10 uppercase letters";
pub const ERR_COLLECTION_NOT_FOUND: &str = "Collection not found";
pub const ERR_COLLECTION_NOT_READY: &str = "Collection ESDT not yet issued";
pub const ERR_NOT_COLLECTION_ISSUER: &str = "Only the collection issuer can perform this action";

pub const ERR_CERT_NOT_FOUND: &str = "Certificate not found";
pub const ERR_NOT_ISSUER: &str = "Only the issuer can perform this action";
pub const ERR_ALREADY_REVOKED: &str = "Certificate is already revoked";
pub const ERR_INVALID_COMPANY_NAME: &str = "Invalid company name";
pub const ERR_INVALID_PDF_HASH: &str = "Invalid PDF hash";
pub const ERR_INVALID_PDF_URL: &str = "Invalid PDF URL";
pub const ERR_INVALID_EXPIRES_AT: &str = "Expiry must be in the future";
pub const ERR_ALREADY_CLAIMED: &str = "Certificate has already been claimed";
pub const ERR_NOT_ACTIVE: &str = "Certificate is not active";
