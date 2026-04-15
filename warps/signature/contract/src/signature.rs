use crate::{
    config,
    errors::*,
    events,
    types::{RequestId, SignatureRequest, SignatureStatus},
};

pub const MAX_TITLE_LEN: usize = 128;
pub const MAX_DOCUMENT_HASH_LEN: usize = 128;
pub const MAX_DOCUMENT_URL_LEN: usize = 256;
pub const MAX_DEADLINE_HOURS: u64 = 8760; // 1 year
pub const MAX_SIGNERS: usize = 10;
pub const HOURS_TO_SECONDS: u64 = 3600;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait SignatureModule: config::ConfigModule + events::EventsModule {
    /// Create a new multi-party signature request.
    /// The blockchain transaction signed by the creator anchors their intent on-chain.
    #[endpoint(createRequest)]
    fn create_request(
        &self,
        title: ManagedBuffer,
        document_hash: ManagedBuffer,
        document_url: ManagedBuffer,
        deadline_hours: u64,
        signers: MultiValueEncoded<ManagedAddress>,
    ) -> RequestId {
        require!(title.len() >= 1 && title.len() <= MAX_TITLE_LEN, ERR_INVALID_TITLE);
        require!(
            document_hash.len() >= 1 && document_hash.len() <= MAX_DOCUMENT_HASH_LEN,
            ERR_INVALID_DOCUMENT_HASH
        );
        require!(
            document_url.len() >= 1 && document_url.len() <= MAX_DOCUMENT_URL_LEN,
            ERR_INVALID_DOCUMENT_URL
        );
        require!(
            deadline_hours == 0 || (deadline_hours >= 1 && deadline_hours <= MAX_DEADLINE_HOURS),
            ERR_INVALID_DEADLINE
        );

        let signers_vec: ManagedVec<ManagedAddress> = signers.to_vec();
        let signer_count = signers_vec.len();

        require!(signer_count >= 1, ERR_NO_SIGNERS);
        require!(signer_count <= MAX_SIGNERS, ERR_TOO_MANY_SIGNERS);

        let caller = self.blockchain().get_caller();
        let now: u64 = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        let deadline = if deadline_hours == 0 {
            0u64
        } else {
            now + deadline_hours * HOURS_TO_SECONDS
        };

        let id = self.next_request_id().get();

        // Store signers, checking for duplicates
        for signer in signers_vec.iter() {
            let inserted = self.request_signers(id).insert(signer.clone());
            require!(inserted, ERR_DUPLICATE_SIGNER);
        }

        let req = SignatureRequest {
            id,
            creator: caller.clone(),
            title: title.clone(),
            document_hash: document_hash.clone(),
            document_url,
            signer_count: signer_count as u64,
            signed_count: 0u64,
            deadline,
            created_at: now,
            status: SignatureStatus::Pending,
        };

        self.request(id).set(req);
        self.creator_requests(&caller).insert(id);
        self.next_request_id().set(id + 1);

        self.request_created_event(id, caller, title, document_hash, deadline);

        id
    }

    /// Sign a request. The blockchain transaction itself (signed by the caller's private key)
    /// is the cryptographic proof of consent for the document hash stored on-chain.
    #[endpoint(sign)]
    fn sign(&self, request_id: RequestId) {
        require!(!self.request(request_id).is_empty(), ERR_REQUEST_NOT_FOUND);

        let mut req = self.request(request_id).get();
        require!(req.status == SignatureStatus::Pending, ERR_NOT_PENDING);

        let now: u64 = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if req.deadline != 0 {
            require!(now <= req.deadline, ERR_DEADLINE_PASSED);
        }

        let caller = self.blockchain().get_caller();
        require!(self.request_signers(request_id).contains(&caller), ERR_NOT_ELIGIBLE_SIGNER);
        require!(!self.request_signed_by(request_id).contains(&caller), ERR_ALREADY_SIGNED);

        self.request_signed_by(request_id).insert(caller.clone());
        req.signed_count += 1;

        if req.signed_count == req.signer_count {
            req.status = SignatureStatus::Completed;
            self.request(request_id).set(&req);
            self.request_completed_event(request_id, req.creator.clone());
        } else {
            self.request(request_id).set(&req);
        }

        self.document_signed_event(request_id, caller, req.signed_count, req.signer_count);
    }

    /// Cancel a pending request. Only the creator can cancel.
    #[endpoint(cancelRequest)]
    fn cancel_request(&self, request_id: RequestId) {
        require!(!self.request(request_id).is_empty(), ERR_REQUEST_NOT_FOUND);

        let mut req = self.request(request_id).get();
        require!(req.status == SignatureStatus::Pending, ERR_NOT_PENDING);

        let caller = self.blockchain().get_caller();
        require!(caller == req.creator, ERR_NOT_CREATOR);

        req.status = SignatureStatus::Cancelled;
        self.request(request_id).set(&req);

        self.request_cancelled_event(request_id, req.creator);
    }

    /// Expire a request whose deadline has passed. Anyone can call this.
    #[endpoint(expireRequest)]
    fn expire_request(&self, request_id: RequestId) {
        require!(!self.request(request_id).is_empty(), ERR_REQUEST_NOT_FOUND);

        let mut req = self.request(request_id).get();
        require!(req.status == SignatureStatus::Pending, ERR_NOT_PENDING);
        require!(req.deadline != 0, ERR_NO_DEADLINE);

        let now: u64 = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        require!(now >= req.deadline, ERR_DEADLINE_NOT_PASSED);

        req.status = SignatureStatus::Expired;
        self.request(request_id).set(&req);

        self.request_expired_event(request_id);
    }

    // ─── Views ───────────────────────────────────────────────────────────────

    #[view(getRequest)]
    fn get_request(&self, request_id: RequestId) -> SignatureRequest<Self::Api> {
        require!(!self.request(request_id).is_empty(), ERR_REQUEST_NOT_FOUND);
        self.request(request_id).get()
    }

    #[view(getRequestSigners)]
    fn get_request_signers(&self, request_id: RequestId) -> MultiValueEncoded<ManagedAddress> {
        let mut result = MultiValueEncoded::new();
        for addr in self.request_signers(request_id).iter() {
            result.push(addr);
        }
        result
    }

    #[view(getSignedBy)]
    fn get_signed_by(&self, request_id: RequestId) -> MultiValueEncoded<ManagedAddress> {
        let mut result = MultiValueEncoded::new();
        for addr in self.request_signed_by(request_id).iter() {
            result.push(addr);
        }
        result
    }

    #[view(hasSigned)]
    fn has_signed(&self, request_id: RequestId, signer: ManagedAddress) -> bool {
        self.request_signed_by(request_id).contains(&signer)
    }

    #[view(isEligibleSigner)]
    fn is_eligible_signer(&self, request_id: RequestId, address: ManagedAddress) -> bool {
        self.request_signers(request_id).contains(&address)
            && !self.request_signed_by(request_id).contains(&address)
    }

    #[view(getRequestsByCreator)]
    fn get_requests_by_creator(
        &self,
        creator: ManagedAddress,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<RequestId, SignatureRequest<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        for id in self.creator_requests(&creator).iter().skip(offset).take(limit) {
            result.push((id, self.request(id).get()).into());
        }
        result
    }

    #[view(getNextRequestId)]
    fn get_next_request_id(&self) -> RequestId {
        self.next_request_id().get()
    }
}
