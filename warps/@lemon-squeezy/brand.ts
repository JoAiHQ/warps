import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Lemon Squeezy')
    .setDescription({
      en: 'Sell <strong>digital products</strong>, <strong>subscriptions</strong>, and <strong>software licenses</strong> with Lemon Squeezy. Manage <strong>orders</strong>, <strong>customers</strong>, and <strong>checkouts</strong> through a simple <strong>merchant of record</strong> platform.',
      de: 'Verkaufe <strong>digitale Produkte</strong>, <strong>Abonnements</strong> und <strong>Softwarelizenzen</strong> mit Lemon Squeezy. Verwalte <strong>Bestellungen</strong>, <strong>Kunden</strong> und <strong>Checkouts</strong> über eine einfache <strong>Merchant-of-Record</strong>-Plattform.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/lemon-squeezy-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/lemon-squeezy-black.svg',
    })
    .setColors({ primary: '#FFC233' })
    .setUrls({ web: 'https://lemonsqueezy.com' })
    .build(),
  contracts: {},
  destinations: {
    API_PRODUCTS: (env: WarpChainEnv) => 'https://api.lemonsqueezy.com/v1/products',
    API_ORDERS: (env: WarpChainEnv) => 'https://api.lemonsqueezy.com/v1/orders',
    API_CUSTOMERS: (env: WarpChainEnv) => 'https://api.lemonsqueezy.com/v1/customers',
    API_CHECKOUTS: (env: WarpChainEnv) => 'https://api.lemonsqueezy.com/v1/checkouts',
    API_SUBSCRIPTIONS: (env: WarpChainEnv) => 'https://api.lemonsqueezy.com/v1/subscriptions',
    API_LICENSE_KEYS: (env: WarpChainEnv) => 'https://api.lemonsqueezy.com/v1/license-keys',
  },
})
