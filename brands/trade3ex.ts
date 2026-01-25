import { WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const Trade3exBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: null,
  contracts: {
    'STAKING/NFT': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqzfk3v0rvwuucjh9xg4zjt6y3jdm4g569l3tsjfey97'
      return 'erd1qqqqqqqqqqqqqpgqfken0exk7jpr85dx6f8ym3jgcagesfcqkqys0xnquf'
    },
  },
  destinations: {},
})
