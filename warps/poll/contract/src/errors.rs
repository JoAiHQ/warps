// Group
pub const ERR_GROUP_NOT_FOUND: &str = "group not found";
pub const ERR_GROUP_ALREADY_EXISTS: &str = "group already exists";
pub const ERR_NOT_GROUP_ADMIN: &str = "not group admin";

// Membership
pub const ERR_ALREADY_MEMBER: &str = "already a member";
pub const ERR_NOT_MEMBER: &str = "not a member of this group";
pub const ERR_REQUEST_ALREADY_PENDING: &str = "membership request already pending";
pub const ERR_NO_PENDING_REQUEST: &str = "no pending request from this address";
pub const ERR_ADMIN_CANNOT_LEAVE: &str = "admin cannot be removed; transfer admin first";

// Invites
pub const ERR_INVITE_NOT_FOUND: &str = "invite not found or already revoked";
pub const ERR_INVITE_EXPIRED: &str = "invite has expired";
pub const ERR_INVITE_EXHAUSTED: &str = "invite has no uses left";
pub const ERR_INVITE_ALREADY_EXISTS: &str = "invite code already exists";

// Polls
pub const ERR_POLL_NOT_FOUND: &str = "poll not found";
pub const ERR_POLL_EXPIRED: &str = "poll deadline has passed";
pub const ERR_ALREADY_VOTED: &str = "already voted on this poll";
pub const ERR_INVALID_OPTION: &str = "option index out of range";

// Validation
pub const ERR_INVALID_SLUG: &str = "slug must be 1-64 bytes";
pub const ERR_INVALID_NAME: &str = "name must be 1-64 bytes";
pub const ERR_INVALID_DISPLAY_NAME: &str = "display name must be 1-64 bytes";
pub const ERR_INVALID_QUESTION: &str = "question must be 1-256 bytes";
pub const ERR_INVALID_OPTIONS_COUNT: &str = "poll must have between 2 and 10 options";
pub const ERR_INVALID_OPTION_LABEL: &str = "option label must be 1-64 bytes";
pub const ERR_INVALID_INVITE_CODE: &str = "invite code must be 1-64 bytes";
pub const ERR_INVALID_MAX_USES: &str = "max uses must be between 1 and 1000";
pub const ERR_INVALID_DEADLINE: &str = "deadline must be in the future";
