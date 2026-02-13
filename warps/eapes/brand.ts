import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('EAPES')
    .setDescription({
      en: 'Where capital meets culture, we power the chain and strengthen the tribe. Our staking infrastructure blends security, scalability and efficiency. Built for sustainable high-yield growth with proven reliability and performance tailored for DeFi.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/eapes.png')
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://www.eapes.com' })
    .build(),
  contracts: {
    PROVIDER: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllllscktaww'
      return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqpzlllllshp8986'
    },
  },
  destinations: {},
})
