export type WarpbaseBrand = {
  info: import('@joai/warps').WarpBrand | null
  contracts: Record<string, (env: import('@joai/warps').WarpChainEnv) => string>
  destinations: Record<string, (env: import('@joai/warps').WarpChainEnv) => string>
  discover?: string[]
}
