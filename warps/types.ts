import { WarpBrand, WarpChainEnv } from '@joai/warps'

export type WarpbaseBrand = {
  info: WarpBrand | null
  contracts: Record<string, (env: WarpChainEnv) => string>
  destinations: Record<string, (env: WarpChainEnv) => string>
  discover?: string[]
}
