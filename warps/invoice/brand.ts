import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Invoice')
    .setDescription({
      en: 'Generate professional invoices and billing documents for your clients.',
      de: 'Erstelle professionelle Rechnungen und Abrechnungsdokumente für deine Kunden.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/invoice.svg')
    .setColors({ primary: '#0070f3', secondary: '#f5f5f5' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
})
