import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Gumroad')
    .setDescription({
      en: 'Sell <strong>digital products</strong>, manage <strong>sales</strong>, and track <strong>subscribers</strong> with Gumroad. Monitor <strong>revenue</strong>, <strong>customers</strong>, and <strong>product performance</strong> through a simple <strong>creator commerce</strong> platform.',
      de: 'Verkaufe <strong>digitale Produkte</strong>, verwalte <strong>Verkäufe</strong> und verfolge <strong>Abonnenten</strong> mit Gumroad. Überwache <strong>Einnahmen</strong>, <strong>Kunden</strong> und <strong>Produktleistung</strong> über eine einfache <strong>Creator-Commerce</strong>-Plattform.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/gumroad-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/gumroad-black.svg',
    })
    .setColors({ primary: '#FF90E8' })
    .setUrls({ web: 'https://gumroad.com' })
    .build(),
  contracts: {},
  destinations: {
    API_PRODUCTS: (env: WarpChainEnv) => 'https://api.gumroad.com/v2/products',
    API_SALES: (env: WarpChainEnv) => 'https://api.gumroad.com/v2/sales',
    API_SUBSCRIBERS: (env: WarpChainEnv) => 'https://api.gumroad.com/v2/subscribers',
  },
})
