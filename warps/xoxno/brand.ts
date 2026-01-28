import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('XOXNO')
    .setDescription({
      en: 'NFT marketplace and DeFi platform on MultiversX. Trade NFTs and access liquid staking services on the eGold ecosystem.',
      de: 'NFT-Marktplatz und DeFi-Plattform auf MultiversX. Handele NFTs und nutze Liquid Staking-Dienste im eGold-Ökosystem.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/xoxno.png')
    .setColors({ primary: '#22F7DD' })
    .setUrls({ web: 'https://xoxno.com' })
    .build(),
  contracts: {
    LIQUID_STAKING: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqc2d2z4atpxpk7xgucfkc7nrrp5ynscjrah0scsqc35'
      return 'TODO'
    },
  },
  destinations: {},
})
