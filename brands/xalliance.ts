import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

const XALLIANCE_AGENT_IDS = {
  mainnet: 'b0f1b2dd-a5b6-4f7c-b1fc-a8f3319d76b2',
  devnet: '0591de47-c859-4c05-838e-7dad8c41306b',
}

export const XalliancePrivileges: Record<string, Partial<Record<WarpChainEnv, string[]>>> = {
  'xalliance-xp-add': {
    devnet: [XALLIANCE_AGENT_IDS.devnet],
    mainnet: [XALLIANCE_AGENT_IDS.mainnet],
  },
}

export const XallianceBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('xAlliance')
    .setDescription('Community accelerator')
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/xalliance-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/xalliance.svg',
    })
    .setColors({ primary: '#4fd1c5', secondary: '#7f8fa6' })
    .setUrls({ web: 'https://xalliance.io' })
    .build(),
  contracts: {
    XP: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqgweqmv8uyr9gc8e9rfmfd5pltjrr708sl3tsxeqp2e'
      return 'erd1qqqqqqqqqqqqqpgqpsdn5ctxtn9zuuysj67m255hyyy2ww49l3ts7cl4gw'
    },
  },
  destinations: {},
})
