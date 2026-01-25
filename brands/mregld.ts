import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const MregldBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('MrEGLD')
    .setDescription({
      en: 'Professional Staking Provider on MultiversX.',
      de: 'Professioneller Staking-Anbieter auf MultiversX.',
    })
    .setLogo('https://tools.multiversx.com/assets-cdn/identities/MrEGLD/icon.png')
    .setColors({ primary: '#000000' })
    .build(),
  contracts: {
    PROVIDER: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllllscktaww'
      return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqx0llllsdx93z0'
    },
  },
  destinations: {},
})
