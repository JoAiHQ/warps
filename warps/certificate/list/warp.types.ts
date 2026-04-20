export type CertificateStatus = 'Active' | 'Revoked' | 'Expired'

export type Certificate = {
  id: number
  collection_id: number
  nft_nonce: number
  company_name: string
  issued_at: number
  expires_at: number
  status: CertificateStatus
  recipient: string | null
}

export type ListData = {
  certificates: Certificate[]
}
