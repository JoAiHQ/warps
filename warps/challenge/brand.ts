import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Challenge')
    .setDescription({
      en: 'Stake-backed personal challenges. Put money on the line and prove it.',
      de: 'Persönliche Challenges mit echtem Einsatz. Setz etwas aufs Spiel und beweise es.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    CHALLENGE_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqkwkadfc58fz38lhs0dxcusz2qsrunkgwncrsjfpgdt'
      if (env === 'testnet') return 'TODO'
      return 'TODO'
    },
  },
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@challenge-list', label: { en: 'Browse', de: 'Entdecken' }, nav: true },
      { path: '/create', warp: '@challenge-create', label: { en: 'Create', de: 'Erstellen' }, nav: true },
      { path: '/view', warp: '@challenge-view', label: { en: 'Challenge', de: 'Challenge' }, nav: false },
      { path: '/accept', warp: '@challenge-accept', label: { en: 'Accept', de: 'Annehmen' }, nav: false },
    ],
  },
})
