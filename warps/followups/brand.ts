import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Followups')
    .setDescription({
      en: 'Automated customer follow-ups, win-back campaigns, and reminders.',
      de: 'Automatische Kunden-Follow-ups, Win-back-Kampagnen und Erinnerungen.',
      fr: 'Suivis clients automatises, campagnes de reconquete et rappels.',
      es: 'Seguimientos automaticos de clientes, campanas de recuperacion y recordatorios.',
      ro: 'Follow-up-uri automate pentru clienti, campanii de recuperare si memento-uri.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
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
    enabled: false,
    auth: false,
    indexPath: '/',
    routes: [],
  },
})
