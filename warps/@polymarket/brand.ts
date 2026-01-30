import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Polymarket')
    .setDescription({
      en: 'Decentralized prediction market platform. Create markets, trade shares, and bet on real-world events.',
      de: 'Dezentralisierte Prognosemärkte-Plattform. Erstelle Märkte, handele Anteile und wette auf reale Ereignisse.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/polymarket.svg')
    .setColors({ primary: '#00D4FF' })
    .setUrls({ web: 'https://polymarket.com' })
    .build(),
  contracts: {
    'CONTRACT/CTF': (env: WarpChainEnv) => {
      if (env === 'devnet') return '0x4D97DCd97eC945f40cF65F87097ACe5EA0476045'
      if (env === 'testnet') return '0x4D97DCd97eC945f40cF65F87097ACe5EA0476045'
      return '0x4D97DCd97eC945f40cF65F87097ACe5EA0476045'
    },
    'CONTRACT/CTF_EXCHANGE': (env: WarpChainEnv) => {
      if (env === 'devnet') return '0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E'
      if (env === 'testnet') return '0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E'
      return '0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E'
    },
    'TOKEN/USDC': (env: WarpChainEnv) => {
      if (env === 'devnet') return '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
      if (env === 'testnet') return '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
      return '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
    },
  },
  destinations: {
    API_CLOB: (env: WarpChainEnv) => 'https://clob.polymarket.com',
    API_GAMMA: (env: WarpChainEnv) => 'https://gamma-api.polymarket.com',
    API_DATA: (env: WarpChainEnv) => 'https://data-api.polymarket.com',
  },
})
