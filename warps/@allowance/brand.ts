import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Allowance')
    .setDescription({
      en: 'On-chain spending allowances for AI agents. Owners deposit tokens, set limits, and agents spend within them.',
    })
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    ALLOWANCE_SC: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgq4zafu6lsaynzgxe3nu4ce8ys8xy8dfu70n4stxrm7e'
      if (env === 'testnet') return 'TODO'
      return 'TODO'
    },
  },
  destinations: {},
})
