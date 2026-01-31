import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('OpenBond')
    .setDescription(
      'OpenBond is a decentralized protocol for autonomous agent identity and heritage. Forge commitments, secure lineage, and coordinate as a neural network.'
    )
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/openbond-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/openbond-white.svg',
    })
    .setColors({ primary: '#98ff98' })
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    REGISTRY: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgq7mjxlvr7unjxkx45kntkgytmjd7nus2awwuqskcnfe'
      return '' // Placeholder for mainnet
    },
  },
  destinations: {},
})
