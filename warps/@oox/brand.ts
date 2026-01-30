import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('OOX')
    .setDescription({
      en: 'OOX - NFT marketplace on MultiversX. Buy, sell, and trade NFTs through auctions, offers, and vending machines.',
      de: 'OOX - NFT-Marktplatz auf MultiversX. Kaufe, verkaufe und handele NFTs über Auktionen, Angebote und Verkaufsautomaten.',
    })
    .setLogo({
      light: 'https://www.oox.art/logo-light.png',
      dark: 'https://www.oox.art/logo-dark.png',
    })
    .setColors({ primary: '#000000', secondary: '#ffffff' })
    .setUrls({ web: 'https://www.oox.art' })
    .build(),
  contracts: {
    MARKETPLACE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqplaceholderdevnet'
      return 'erd1qqqqqqqqqqqqqpgqplaceholdermainnet'
    },
  },
  destinations: {},
})
