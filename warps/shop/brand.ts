import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Shop')
    .setDescription({
      en: 'Your services, permanently on the blockchain. No middlemen, no platforms — just a verified storefront customers and AI can trust.',
      de: 'Deine Dienstleistungen, dauerhaft auf der Blockchain. Keine Mittelsmänner, keine Plattformen — nur ein verifiziertes Schaufenster, dem Kunden und KI vertrauen.',
      fr: 'Vos services, durablement ancrés sur la blockchain. Sans intermediaires ni plateformes, juste une vitrine verifiee en laquelle vos clients et l IA peuvent avoir confiance.',
      es: 'Tus servicios, anclados de forma permanente en la blockchain. Sin intermediarios ni plataformas: solo un escaparate verificado en el que clientes y agentes de IA pueden confiar.',
      ro: 'Serviciile tale, ancorate permanent pe blockchain. Fara intermediari si fara platforme, doar o vitrina verificata in care clientii si AI-ul pot avea incredere.',
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
      { path: '/', warp: '@shop-search', label: { en: 'Browse Shops', de: 'Shops durchsuchen' }, nav: true },
      { path: '/services', warp: '@shop-services', label: { en: 'Services', de: 'Leistungen' }, nav: true },
      { path: '/products', warp: '@shop-products', label: { en: 'Products', de: 'Produkte' }, nav: true },
      { path: '/shop/browse', warp: '@shop-browse', label: { en: 'Browse Products', de: 'Produkte durchsuchen' }, nav: false },
      { path: '/shop/payment-info', warp: '@shop-payment-info', label: { en: 'Payment Info', de: 'Zahlungsinfo' }, nav: false },
      { path: '/admin/setup', warp: '@shop-register', label: { en: 'Register Shop', de: 'Shop registrieren' }, nav: false },
      { path: '/admin/configure', warp: '@shop-configure', label: { en: 'Configure Shop', de: 'Shop konfigurieren' }, nav: false },
      { path: '/admin/payment', warp: '@shop-set-payment', label: { en: 'Payment Setup', de: 'Zahlung einrichten' }, nav: false },
      { path: '/service/pay', warp: '@shop-service-pay', label: { en: 'Book & Pay', de: 'Buchen & Bezahlen' }, nav: false },
      { path: '/admin/service/add', warp: '@shop-service-add', label: { en: 'Add Service', de: 'Leistung hinzufügen' }, nav: false },
      { path: '/admin/service/remove', warp: '@shop-service-remove', label: { en: 'Remove Service', de: 'Leistung entfernen' }, nav: false },
      { path: '/admin/product/add', warp: '@shop-product-add', label: { en: 'Add Product', de: 'Produkt hinzufügen' }, nav: false },
      { path: '/admin/product/remove', warp: '@shop-product-remove', label: { en: 'Remove Product', de: 'Produkt entfernen' }, nav: false },
      { path: '/admin/product/stock', warp: '@shop-product-stock', label: { en: 'Update Stock', de: 'Bestand aktualisieren' }, nav: false },
    ],
  },
})
