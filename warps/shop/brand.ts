import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Shop')
    .setDescription({
      en: 'Your services, permanently on the blockchain. No middlemen, no platforms — just a verified storefront customers and AI can trust.',
      de: 'Deine Dienstleistungen, dauerhaft auf der Blockchain. Keine Mittelsmänner, keine Plattformen — nur ein verifiziertes Schaufenster, dem Kunden und KI vertrauen.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    SHOP_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'TODO'
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
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@shop-services', label: { en: 'Services', de: 'Leistungen' }, nav: true },
      { path: '/admin/add', warp: '@shop-service-add', label: { en: 'Add Service', de: 'Leistung hinzufügen' }, nav: false },
      { path: '/admin/remove', warp: '@shop-service-remove', label: { en: 'Remove Service', de: 'Leistung entfernen' }, nav: false },
      { path: '/admin/setup', warp: '@shop-register', label: { en: 'Setup Shop', de: 'Shop einrichten' }, nav: false },
    ],
  },
})
