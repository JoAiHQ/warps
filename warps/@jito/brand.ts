import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Jito')
    .setDescription('Jito is a liquid staking protocol on Solana that provides JitoSOL tokens in exchange for staked SOL.')
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/jito.svg')
    .setColors({ primary: '#00D9FF' })
    .setUrls({ web: 'https://jito.network' })
    .build(),
  contracts: {
    STAKE_POOL_PROGRAM: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'DPoo15wWDqpPJJtS2MUZ49aRxqz5ZaaJCJP4z8bLuib'
      return 'SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy'
    },
    STAKE_POOL: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'JitoY5pcAxWX6iyP2QdFwTznGb8A99PRCUCVVxB46WZ'
      return 'Jito4APyf642JPZPx3hGc6WWJ8zPKtRbRs4P815Awbb'
    },
  },
  destinations: {},
})
