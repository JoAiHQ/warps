export type TransactionData = {
  TX_HASH: string
  SENDER: string
  RECEIVER?: string
  VALUE?: string
  VALUE_EGLD?: number
  NONCE: number
  GAS_LIMIT: number
  GAS_PRICE: number
  GAS_USED?: number
  FEE?: string
  FEE_EGLD?: number
  STATUS: string
  TIMESTAMP?: number
  DATA?: string
  SMART_CONTRACT_RESULTS?: string[]
}
