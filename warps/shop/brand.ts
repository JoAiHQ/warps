import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Shop')
    .setDescription({
      en: 'Loyalty and customer management for local service businesses.',
      de: 'Treue- und Kundenverwaltung für lokale Dienstleistungsunternehmen.',
    })
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    SHOP_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqsjmve0p0v3m97q7yx4ev6nlr6dktqpf30zcs75wavf'
      return 'TODO'
    },
  },
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
    APP_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet.joai.ai'
      if (env === 'testnet') return 'https://testnet.joai.ai'
      return 'https://joai.ai'
    },
  },
})
