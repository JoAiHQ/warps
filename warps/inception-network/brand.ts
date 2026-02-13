import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Inception Network')
    .setDescription('Staking provider on the MultiversX network.')
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/inception-white.svg')
    .setColors({ primary: '#ffffff', secondary: '#000000' })
    .setUrls({ web: 'https://inception-network.com' })
    .build(),
  contracts: {
    PROVIDER: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllllscktaww'
      return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq00llllsghg898'
    },
  },
  destinations: {},
})
