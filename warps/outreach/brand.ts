import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Outreach')
    .setDescription({
      en: 'Proactive customer outreach — broadcast messages to contact segments or reach out to individuals.',
      de: 'Proaktive Kundenansprache — Nachrichten an Kontaktsegmente senden oder einzelne Kontakte ansprechen.',
      fr: 'Prospection client proactive — envoyez des messages a des segments de contacts ou contactez des individus.',
      es: 'Alcance proactivo al cliente — envie mensajes a segmentos de contactos o llegue a individuos.',
      ro: 'Contactare proactiva a clientilor — trimite mesaje catre segmente de contacte sau contacteaza persoane.',
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
