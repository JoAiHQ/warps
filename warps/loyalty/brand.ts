import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Loyalty')
    .setDescription({
      en: 'Stamp-based loyalty programs for local service businesses.',
      de: 'Stempelbasierte Treueprogramme für lokale Dienstleistungsunternehmen.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    LOYALTY_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgq9gagzdqrjlpp2nqllmcdzuvpjna3llh5tresc3qye8'
      return 'TODO'
    },
  },
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
    APP_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet.joai.ai'
      if (env === 'testnet') return 'https://testnet.joai.ai'
      return 'https://joai.ai'
    },
    AGENT_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-agents.joai.ai'
      if (env === 'testnet') return 'https://testnet-agents.joai.ai'
      return 'https://agents.joai.ai'
    },
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@loyalty-register', label: { en: 'Join', de: 'Beitreten' }, nav: true },
      { path: '/card', warp: '@loyalty-status', label: { en: 'My Card', de: 'Meine Karte' }, nav: true },
      { path: '/redeem', warp: '@loyalty-redeem', label: { en: 'Redeem', de: 'Einlösen' }, nav: false },
      { path: '/review', warp: '@loyalty-review', label: { en: 'Review', de: 'Bewertung' }, nav: false },
      { path: '/admin/stamp', warp: '@loyalty-stamp', label: { en: 'Stamp Card', de: 'Karte stempeln' }, nav: false },
      { path: '/admin/configure', warp: '@loyalty-configure', label: { en: 'Configure', de: 'Konfigurieren' }, nav: false },
    ],
  },
})
