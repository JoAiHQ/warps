use crate::{
    config,
    errors::{
        ERR_CARD_ALREADY_REGISTERED, ERR_CARD_NOT_REGISTERED, ERR_INVALID_CARD_UUID, ERR_INVALID_DISCOUNT, ERR_INVALID_NAME,
        ERR_INVALID_REMINDER_DAYS, ERR_INVALID_REVIEW_URL, ERR_INVALID_REWARD_LABEL, ERR_INVALID_STAMPS_REWARD,
        ERR_LOYALTY_NOT_CONFIGURED, ERR_LOYALTY_NOT_FOUND, ERR_NOT_LOYALTY_OWNER, ERR_NO_DISCOUNT_ACTIVE, ERR_NO_REWARD_AVAILABLE,
    },
    events,
    types::{CustomerStatus, LoyaltyConfig, StaleCustomer},
};

pub const MAX_NAME_LEN: usize = 64;
pub const MAX_REWARD_LABEL_LEN: usize = 64;
pub const MAX_REVIEW_URL_LEN: usize = 256;
pub const MAX_CARD_UUID_LEN: usize = 64;
pub const MAX_STAMPS_FOR_REWARD: u32 = 100;
pub const MAX_REMINDER_DAYS: u32 = 365;
pub const MAX_DISCOUNT: u8 = 100;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait LoyaltyModule: config::ConfigModule + events::EventsModule {
    #[endpoint(configureLoyalty)]
    fn configure_loyalty(
        &self,
        slug: ManagedBuffer,
        stamps_for_reward: u32,
        reward_label: ManagedBuffer,
        review_url: ManagedBuffer,
        review_discount: u8,
        reminder_days: u32,
    ) {
        self.require_loyalty_owner(&slug);
        require!(stamps_for_reward >= 1 && stamps_for_reward <= MAX_STAMPS_FOR_REWARD, ERR_INVALID_STAMPS_REWARD);
        require!(review_discount <= MAX_DISCOUNT, ERR_INVALID_DISCOUNT);
        require!(reminder_days >= 1 && reminder_days <= MAX_REMINDER_DAYS, ERR_INVALID_REMINDER_DAYS);
        require!(reward_label.len() >= 1 && reward_label.len() <= MAX_REWARD_LABEL_LEN, ERR_INVALID_REWARD_LABEL);
        require!(review_url.len() >= 1 && review_url.len() <= MAX_REVIEW_URL_LEN, ERR_INVALID_REVIEW_URL);

        let config = LoyaltyConfig {
            stamps_for_reward,
            reward_label,
            review_url,
            review_discount,
            reminder_days,
        };

        self.loyalty_config(&slug).set(config);
    }

    #[endpoint(register)]
    fn register(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer, name: ManagedBuffer) {
        require!(!self.loyalty_info(&slug).is_empty(), ERR_LOYALTY_NOT_FOUND);
        require!(card_uuid.len() >= 1 && card_uuid.len() <= MAX_CARD_UUID_LEN, ERR_INVALID_CARD_UUID);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(self.card_customer(&slug, &card_uuid).is_empty(), ERR_CARD_ALREADY_REGISTERED);
        require!(!self.loyalty_config(&slug).is_empty(), ERR_LOYALTY_NOT_CONFIGURED);

        let customer_id = self.next_customer_id().get();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        self.card_customer(&slug, &card_uuid).set(customer_id);
        self.customer_card(customer_id).set(card_uuid.clone());
        self.customer_slug(customer_id).set(slug.clone());
        self.customer_name(customer_id).set(name);
        self.customer_stamps(customer_id).set(1u32); // first stamp on registration
        self.customer_last_visit(customer_id).set(timestamp);
        self.customer_discount(customer_id).set(0u8);
        self.customer_reward_ready(customer_id).set(false);
        self.loyalty_customers(&slug).insert(customer_id);

        self.next_customer_id().set(customer_id + 1);

        self.customer_registered_event(slug.clone(), card_uuid.clone(), customer_id);
        self.stamp_added_event(slug, card_uuid, 1u32);
    }

    #[endpoint(addStamp)]
    fn add_stamp(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer) {
        self.require_loyalty_owner(&slug);
        require!(!self.card_customer(&slug, &card_uuid).is_empty(), ERR_CARD_NOT_REGISTERED);

        let customer_id = self.card_customer(&slug, &card_uuid).get();
        let config = self.loyalty_config(&slug).get();
        let timestamp = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        let mut stamps = self.customer_stamps(customer_id).get();
        stamps += 1;

        if stamps >= config.stamps_for_reward {
            self.customer_reward_ready(customer_id).set(true);
        }

        self.customer_stamps(customer_id).set(stamps);
        self.customer_last_visit(customer_id).set(timestamp);

        self.stamp_added_event(slug, card_uuid, stamps);
    }

    #[endpoint(redeemReward)]
    fn redeem_reward(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer) {
        self.require_loyalty_owner(&slug);
        require!(!self.card_customer(&slug, &card_uuid).is_empty(), ERR_CARD_NOT_REGISTERED);

        let customer_id = self.card_customer(&slug, &card_uuid).get();
        require!(self.customer_reward_ready(customer_id).get(), ERR_NO_REWARD_AVAILABLE);

        self.customer_stamps(customer_id).set(0u32);
        self.customer_reward_ready(customer_id).set(false);

        self.reward_redeemed_event(slug, card_uuid);
    }

    #[endpoint(setDiscount)]
    fn set_discount(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer, percent: u8) {
        self.require_loyalty_owner(&slug);
        require!(percent <= MAX_DISCOUNT, ERR_INVALID_DISCOUNT);
        require!(!self.card_customer(&slug, &card_uuid).is_empty(), ERR_CARD_NOT_REGISTERED);

        let customer_id = self.card_customer(&slug, &card_uuid).get();
        self.customer_discount(customer_id).set(percent);

        self.discount_set_event(slug, card_uuid, percent);
    }

    #[endpoint(clearDiscount)]
    fn clear_discount(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer) {
        self.require_loyalty_owner(&slug);
        require!(!self.card_customer(&slug, &card_uuid).is_empty(), ERR_CARD_NOT_REGISTERED);

        let customer_id = self.card_customer(&slug, &card_uuid).get();
        require!(self.customer_discount(customer_id).get() > 0, ERR_NO_DISCOUNT_ACTIVE);

        self.customer_discount(customer_id).set(0u8);
    }

    #[view(getStatus)]
    fn get_status(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer) -> CustomerStatus<Self::Api> {
        require!(!self.card_customer(&slug, &card_uuid).is_empty(), ERR_CARD_NOT_REGISTERED);

        let customer_id = self.card_customer(&slug, &card_uuid).get();
        let config = self.loyalty_config(&slug).get();

        CustomerStatus {
            name: self.customer_name(customer_id).get(),
            stamps: self.customer_stamps(customer_id).get(),
            stamps_for_reward: config.stamps_for_reward,
            discount: self.customer_discount(customer_id).get(),
            reward_ready: self.customer_reward_ready(customer_id).get(),
            last_visit: self.customer_last_visit(customer_id).get(),
        }
    }

    #[view(isCardRegistered)]
    fn is_card_registered(&self, slug: ManagedBuffer, card_uuid: ManagedBuffer) -> bool {
        !self.card_customer(&slug, &card_uuid).is_empty()
    }

    #[view(getLoyaltyConfig)]
    fn get_loyalty_config(&self, slug: ManagedBuffer) -> LoyaltyConfig<Self::Api> {
        require!(!self.loyalty_config(&slug).is_empty(), ERR_LOYALTY_NOT_CONFIGURED);
        self.loyalty_config(&slug).get()
    }

    #[view(getStaleCustomers)]
    fn get_stale_customers(&self, slug: ManagedBuffer, since_timestamp: u64, limit: u32) -> MultiValueEncoded<StaleCustomer<Self::Api>> {
        require!(!self.loyalty_info(&slug).is_empty(), ERR_LOYALTY_NOT_FOUND);

        let mut result = MultiValueEncoded::new();
        let mut count = 0u32;

        for customer_id in self.loyalty_customers(&slug).iter() {
            if count >= limit {
                break;
            }
            let last_visit = self.customer_last_visit(customer_id).get();
            if last_visit < since_timestamp {
                let card_uuid = self.customer_card(customer_id).get();
                result.push(StaleCustomer {
                    customer_id,
                    card_uuid,
                    last_visit,
                });
                count += 1;
            }
        }

        result
    }

    #[view(getCustomerCount)]
    fn get_customer_count(&self, slug: ManagedBuffer) -> usize {
        self.loyalty_customers(&slug).len()
    }

    fn require_loyalty_owner(&self, slug: &ManagedBuffer) {
        require!(!self.loyalty_info(slug).is_empty(), ERR_LOYALTY_NOT_FOUND);
        let info = self.loyalty_info(slug).get();
        let caller = self.blockchain().get_caller();
        require!(info.owner == caller, ERR_NOT_LOYALTY_OWNER);
    }
}
