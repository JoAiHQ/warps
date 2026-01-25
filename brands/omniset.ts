import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const OmnisetBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('OmniSet')
    .setDescription('The Universal Liquidity Hub: Light-speed asset movement across any chain without bridges.')
    .setLogo('https://pbs.twimg.com/profile_images/1819428487104454657/HS3g_7bM_400x400.jpg')
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://omniset.fastset.xyz' })
    .build(),
  contracts: {
    DEPOSIT_ETHEREUM: (env: WarpChainEnv) => {
      if (env === 'devnet') return '0xaDB4f3334825E645dD201de5CF1778a09515936f'
      if (env === 'testnet') return '0xaDB4f3334825E645dD201de5CF1778a09515936f'
      return 'TODO'
    },
    DEPOSIT_ARBITRUM: (env: WarpChainEnv) => {
      if (env === 'devnet') return '0x31a80b9099A0d86D7ed94914bc6856F09e610881'
      if (env === 'testnet') return '0x31a80b9099A0d86D7ed94914bc6856F09e610881'
      return 'TODO'
    },
  },
  destinations: {},
})
