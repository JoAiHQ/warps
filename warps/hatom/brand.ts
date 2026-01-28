import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Hatom')
    .setDescription('The pioneering, non-custodial liquidity protocol on MultiversX')
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/hatom.svg')
    .setColors({ primary: '#5AF1B0' })
    .setUrls({ web: 'https://hatom.com' })
    .build(),
  contracts: {
    LIQUID_DELEGATE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqvg8r5yavkyhu6rmmkgqzgsduzheg2fk7v5ysrypdex'
      return 'TODO'
    },
  },
  destinations: {},
})
