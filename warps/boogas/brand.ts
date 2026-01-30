import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

const BOOGAS_AGENT_IDS = {
  mainnet: '4ef02c52-22bd-4ccf-9bef-a611577f2ede',
}

export const BoogasPrivileges: Record<string, Partial<Record<WarpChainEnv, string[]>>> = {
  'boogas-give-bonus': {
    mainnet: [BOOGAS_AGENT_IDS.mainnet],
  },
}

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Boogas')
    .setDescription({
      en: 'Put a bounce in your step! A fun-loving collectible NFT project featuring prehistoric caveman characters.',
      de: 'Gib deinem Schritt einen Schwung! Ein fröhliches Sammler-NFT-Projekt mit prähistorischen Höhlenmensch-Charakteren.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/boogas.png')
    .setColors({ primary: '#000000', secondary: '#ffffff' })
    .setUrls({ web: 'https://boogas.io' })
    .build(),
  contracts: {
    BOOGAS_CLASH: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqjpvkydjdnkmz6ynnph8grm4xwt6zpytd996qll3epa'
      return 'erd1qqqqqqqqqqqqqpgqxa9n0w2g9wy66a3z3eqjj9e7xz5nxkh7w3sscumrgp'
    },
  },
  destinations: {},
})
