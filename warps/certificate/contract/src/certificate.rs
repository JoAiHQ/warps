use crate::{
    config::{self, ESDT_ISSUE_COST},
    errors::*,
    events,
    types::{CertCollection, CertId, Certificate, CertificateStatus, CollectionId},
};
use multiversx_sc::types::ManagedOption;

pub const MAX_NAME_LEN: usize = 64;
pub const MIN_TICKER_LEN: usize = 3;
pub const MAX_TICKER_LEN: usize = 10;
pub const MAX_COMPANY_NAME_LEN: usize = 128;
pub const MAX_PDF_HASH_LEN: usize = 128;
pub const MAX_PDF_URL_LEN: usize = 512;

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait CertificateModule: config::ConfigModule + events::EventsModule {
    // ─── Collections ─────────────────────────────────────────────────────────

    /// Create a new NFT certificate collection.
    /// Caller must send exactly 0.05 EGLD (MultiversX ESDT issuance fee).
    /// The collection becomes ready after the async callback completes.
    #[endpoint(createCollection)]
    #[payable("EGLD")]
    fn create_collection(&self, name: ManagedBuffer, ticker: ManagedBuffer) {
        let payment = self.call_value().egld();
        require!(*payment == BigUint::from(ESDT_ISSUE_COST), ERR_WRONG_PAYMENT);
        require!(name.len() >= 1 && name.len() <= MAX_NAME_LEN, ERR_INVALID_NAME);
        require!(
            ticker.len() >= MIN_TICKER_LEN && ticker.len() <= MAX_TICKER_LEN,
            ERR_INVALID_TICKER
        );

        let caller = self.blockchain().get_caller();
        let id = self.next_collection_id().get();
        self.next_collection_id().set(id + 1);

        self.collection(id).set(CertCollection {
            id,
            issuer: caller.clone(),
            name: name.clone(),
        });
        self.issuer_collections(&caller).insert(id);

        self.tx()
            .to(ESDTSystemSCAddress)
            .typed(system_proxy::ESDTSystemSCProxy)
            .issue_and_set_all_roles(
                BigUint::from(ESDT_ISSUE_COST),
                name,
                ticker,
                EsdtTokenType::NonFungible,
                0,
            )
            .with_callback(self.callbacks().on_collection_issued(id))
            .async_call_and_exit()
    }

    #[callback]
    fn on_collection_issued(
        &self,
        collection_id: CollectionId,
        #[call_result] result: ManagedAsyncCallResult<EsdtTokenIdentifier>,
    ) {
        match result {
            ManagedAsyncCallResult::Ok(token_id) => {
                self.collection_token(collection_id).set(&token_id);
                self.token_collection(&token_id).set(collection_id);
                let collection = self.collection(collection_id).get();
                self.collection_created_event(collection_id, &collection.issuer, &token_id);
            }
            ManagedAsyncCallResult::Err(_) => {
                let collection = self.collection(collection_id).get();
                self.issuer_collections(&collection.issuer)
                    .swap_remove(&collection_id);
                self.collection(collection_id).clear();
            }
        }
    }

    // ─── Certificates ─────────────────────────────────────────────────────────

    /// Issue a certificate as an NFT within a collection.
    /// Only the collection issuer can issue. The NFT is held by this SC until claimed.
    #[endpoint(issue)]
    fn issue(
        &self,
        collection_id: CollectionId,
        company_name: ManagedBuffer,
        pdf_hash: ManagedBuffer,
        pdf_url: ManagedBuffer,
        expires_at: u64,
    ) -> CertId {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        require!(!self.collection_token(collection_id).is_empty(), ERR_COLLECTION_NOT_READY);

        let collection = self.collection(collection_id).get();
        let caller = self.blockchain().get_caller();
        require!(caller == collection.issuer, ERR_NOT_COLLECTION_ISSUER);

        require!(company_name.len() >= 1 && company_name.len() <= MAX_COMPANY_NAME_LEN, ERR_INVALID_COMPANY_NAME);
        require!(pdf_hash.len() >= 1 && pdf_hash.len() <= MAX_PDF_HASH_LEN, ERR_INVALID_PDF_HASH);
        require!(pdf_url.len() >= 1 && pdf_url.len() <= MAX_PDF_URL_LEN, ERR_INVALID_PDF_URL);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if expires_at != 0 {
            require!(expires_at > now, ERR_INVALID_EXPIRES_AT);
        }

        let token_id = self.collection_token(collection_id).get();
        let cert_id = self.next_cert_id().get();

        // Build NFT attributes: human-readable metadata stored on-chain
        let mut attributes = ManagedBuffer::new();
        attributes.append(&ManagedBuffer::from(b"company_name:"));
        attributes.append(&company_name);
        attributes.append(&ManagedBuffer::from(b";cert_id:"));
        let cert_id_buf = self.u64_to_ascii(cert_id);
        attributes.append(&cert_id_buf);
        attributes.append(&ManagedBuffer::from(b";issued_at:"));
        let now_buf = self.u64_to_ascii(now);
        attributes.append(&now_buf);
        if expires_at != 0 {
            attributes.append(&ManagedBuffer::from(b";expires_at:"));
            let exp_buf = self.u64_to_ascii(expires_at);
            attributes.append(&exp_buf);
        }

        let mut uris = ManagedVec::new();
        uris.push(pdf_url.clone());

        let nft_nonce = self.send().esdt_nft_create(
            &token_id,
            &BigUint::from(1u64),
            &company_name,
            &BigUint::zero(),
            &ManagedBuffer::new(),
            &attributes,
            &uris,
        );

        let cert = Certificate {
            id: cert_id,
            collection_id,
            nft_nonce,
            issuer: caller.clone(),
            company_name: company_name.clone(),
            pdf_hash,
            pdf_url,
            issued_at: now,
            expires_at,
            status: CertificateStatus::Active,
            recipient: ManagedOption::none(),
        };

        self.certificate(cert_id).set(&cert);
        self.issuer_certs(&caller).insert(cert_id);
        self.collection_certs(collection_id).insert(cert_id);
        self.next_cert_id().set(cert_id + 1);

        self.certificate_issued_event(cert_id, collection_id, &caller, &company_name);

        cert_id
    }

    /// Claim a certificate. Caller's wallet receives the NFT.
    /// Can only be claimed once. Certificate must be active.
    #[endpoint(claim)]
    fn claim(&self, cert_id: CertId) {
        require!(!self.certificate(cert_id).is_empty(), ERR_CERT_NOT_FOUND);

        let mut cert = self.certificate(cert_id).get();
        require!(cert.status == CertificateStatus::Active, ERR_NOT_ACTIVE);
        require!(cert.recipient.is_none(), ERR_ALREADY_CLAIMED);

        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if cert.expires_at != 0 {
            require!(now <= cert.expires_at, ERR_NOT_ACTIVE);
        }

        let token_id = self.collection_token(cert.collection_id).get();
        let caller = self.blockchain().get_caller();

        cert.recipient = ManagedOption::some(caller.clone());
        self.certificate(cert_id).set(&cert);

        self.send().direct_esdt(&caller, &token_id, cert.nft_nonce, &BigUint::from(1u64));

        self.certificate_claimed_event(cert_id, &caller);
    }

    /// Revoke a certificate. Only the original issuer can revoke.
    /// If not yet claimed, the NFT is burned. If already claimed, status is marked revoked only.
    #[endpoint(revoke)]
    fn revoke(&self, cert_id: CertId) {
        require!(!self.certificate(cert_id).is_empty(), ERR_CERT_NOT_FOUND);

        let mut cert = self.certificate(cert_id).get();
        require!(cert.status != CertificateStatus::Revoked, ERR_ALREADY_REVOKED);

        let caller = self.blockchain().get_caller();
        require!(caller == cert.issuer, ERR_NOT_ISSUER);

        if cert.recipient.is_none() {
            // NFT still held by SC — burn it
            let token_id = self.collection_token(cert.collection_id).get();
            self.send().esdt_local_burn(&token_id, cert.nft_nonce, &BigUint::from(1u64));
        }

        cert.status = CertificateStatus::Revoked;
        self.certificate(cert_id).set(&cert);

        self.certificate_revoked_event(cert_id, &caller);
    }

    // ─── Views ────────────────────────────────────────────────────────────────

    #[view(getCollection)]
    fn get_collection(&self, collection_id: CollectionId) -> CertCollection<Self::Api> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        self.collection(collection_id).get()
    }

    #[view(getCollectionToken)]
    fn get_collection_token(&self, collection_id: CollectionId) -> OptionalValue<EsdtTokenIdentifier> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        if self.collection_token(collection_id).is_empty() {
            OptionalValue::None
        } else {
            OptionalValue::Some(self.collection_token(collection_id).get())
        }
    }

    #[view(isCollectionReady)]
    fn is_collection_ready(&self, collection_id: CollectionId) -> bool {
        !self.collection(collection_id).is_empty()
            && !self.collection_token(collection_id).is_empty()
    }

    #[view(getCollectionsByIssuer)]
    fn get_collections_by_issuer(
        &self,
        issuer: ManagedAddress,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<CollectionId, CertCollection<Self::Api>>> {
        let mut result = MultiValueEncoded::new();
        for id in self.issuer_collections(&issuer).iter().skip(offset).take(limit) {
            result.push((id, self.collection(id).get()).into());
        }
        result
    }

    #[view(getCertificate)]
    fn get_certificate(&self, cert_id: CertId) -> Certificate<Self::Api> {
        require!(!self.certificate(cert_id).is_empty(), ERR_CERT_NOT_FOUND);
        let mut cert = self.certificate(cert_id).get();
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if cert.status == CertificateStatus::Active && cert.expires_at != 0 && now > cert.expires_at {
            cert.status = CertificateStatus::Expired;
        }
        cert
    }

    #[view(isValid)]
    fn is_valid(&self, cert_id: CertId) -> bool {
        if self.certificate(cert_id).is_empty() {
            return false;
        }
        let cert = self.certificate(cert_id).get();
        if cert.status == CertificateStatus::Revoked {
            return false;
        }
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        if cert.expires_at != 0 && now > cert.expires_at {
            return false;
        }
        true
    }

    #[view(getCertsByIssuer)]
    fn get_certs_by_issuer(
        &self,
        issuer: ManagedAddress,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<CertId, Certificate<Self::Api>>> {
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let mut result = MultiValueEncoded::new();
        for id in self.issuer_certs(&issuer).iter().skip(offset).take(limit) {
            let mut cert = self.certificate(id).get();
            if cert.status == CertificateStatus::Active && cert.expires_at != 0 && now > cert.expires_at {
                cert.status = CertificateStatus::Expired;
            }
            result.push((id, cert).into());
        }
        result
    }

    #[view(getCertsByCollection)]
    fn get_certs_by_collection(
        &self,
        collection_id: CollectionId,
        offset: usize,
        limit: usize,
    ) -> MultiValueEncoded<MultiValue2<CertId, Certificate<Self::Api>>> {
        require!(!self.collection(collection_id).is_empty(), ERR_COLLECTION_NOT_FOUND);
        let now = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();
        let mut result = MultiValueEncoded::new();
        for id in self.collection_certs(collection_id).iter().skip(offset).take(limit) {
            let mut cert = self.certificate(id).get();
            if cert.status == CertificateStatus::Active && cert.expires_at != 0 && now > cert.expires_at {
                cert.status = CertificateStatus::Expired;
            }
            result.push((id, cert).into());
        }
        result
    }

    #[view(getNextCertId)]
    fn get_next_cert_id(&self) -> CertId {
        self.next_cert_id().get()
    }

    #[view(getNextCollectionId)]
    fn get_next_collection_id_view(&self) -> CollectionId {
        self.next_collection_id().get()
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    fn u64_to_ascii(&self, mut n: u64) -> ManagedBuffer {
        if n == 0 {
            return ManagedBuffer::from(b"0");
        }
        let mut digits = [0u8; 20];
        let mut len = 0usize;
        while n > 0 {
            digits[len] = b'0' + (n % 10) as u8;
            n /= 10;
            len += 1;
        }
        let mut result = ManagedBuffer::new();
        for i in (0..len).rev() {
            result.append_bytes(&[digits[i]]);
        }
        result
    }
}
