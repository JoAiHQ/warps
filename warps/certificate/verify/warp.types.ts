export type CertificateStatus = 'Active' | 'Revoked' | 'Expired'

export type Certificate = {
  id: number
  collection_id: number
  nft_nonce: number
  issuer: string
  company_name: string
  pdf_hash: string
  pdf_url: string
  issued_at: number
  expires_at: number
  status: CertificateStatus
  recipient: string | null
}

export type VerifyInputs = {
  certId: string
}
