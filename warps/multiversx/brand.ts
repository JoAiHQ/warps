import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('MultiversX')
    .setDescription(
      'MultiversX, the EGLD network, is a distributed blockchain network for next-gen applications. Decentralized via 3,000+ nodes, scalable through sharding, fast, secure & green.'
    )
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/multiversx.svg')
    .setColors({ primary: '#22F7DD' })
    .setUrls({ web: 'https://multiversx.com' })
    .build(),
  contracts: {
    'WEGLD/SHARD1': (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp'
      return 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3'
    },
  },
  destinations: {},
})
