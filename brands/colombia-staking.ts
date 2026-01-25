import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const ColombiaStakingBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Colombia Staking')
    .setDescription('A staking provider on the MultiversX network')
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/colombia-staking.png')
    .setColors({ primary: '#62DBB8' })
    .setUrls({ web: 'https://colombia-staking.com/' })
    .build(),
  contracts: {
    PROVIDER: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllllscktaww'
      return 'TODO'
    },
    'WEGLD/SHARD1': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp'
      return 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3'
    },
  },
  destinations: {},
})
