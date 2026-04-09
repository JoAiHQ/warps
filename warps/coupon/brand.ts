import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Coupon')
    .setDescription({
      en: 'On-chain discount coupons. Create, share, and redeem verifiable coupon codes anchored on the blockchain.',
      de: 'On-Chain-Rabattgutscheine. Erstelle, teile und löse verifizierbare Gutscheincodes auf der Blockchain ein.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    COUPON_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'TODO_DEVNET'
      if (env === 'testnet') return 'TODO_TESTNET'
      return 'TODO_MAINNET'
    },
  },
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
})
