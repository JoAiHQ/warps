import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Upsells')
    .setDescription({
      en: 'AI-powered product recommendations and upselling for businesses.',
      de: 'KI-gestuetzte Produktempfehlungen und Upselling fuer Betriebe.',
      fr: 'Recommandations de produits et ventes additionnelles basees sur l IA pour les entreprises.',
      es: 'Recomendaciones de productos y ventas adicionales impulsadas por IA para negocios.',
      ro: 'Recomandari de produse si upselling bazate pe IA pentru afaceri.',
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
