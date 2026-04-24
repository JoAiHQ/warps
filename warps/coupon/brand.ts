import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Coupon')
    .setDescription({
      en: 'On-chain discount coupons for businesses. Create, share, and redeem verifiable coupon codes — fully recorded on the blockchain.',
      de: 'On-Chain-Rabattgutscheine für Unternehmen. Verifizierbare Gutscheincodes erstellen, teilen und einlösen — vollständig auf der Blockchain gespeichert.',
      fr: 'Coupons de réduction on-chain pour les entreprises. Créez, partagez et utilisez des codes promo vérifiables — entièrement enregistrés sur la blockchain.',
      es: 'Cupones de descuento on-chain para negocios. Crea, comparte y canjea códigos verificables — totalmente registrados en la blockchain.',
      ro: 'Cupoane de reducere on-chain pentru afaceri. Creează, distribuie și folosește coduri verificabile — înregistrate complet pe blockchain.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    COUPON_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgq5ccu7cxc5r7sw524ulcvcgs8323txckd2kns5khrtc'
      if (env === 'testnet') return 'TODO_TESTNET'
      return 'TODO_MAINNET'
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
      { path: '/', warp: '@coupon-browse', label: { en: 'Coupons', de: 'Gutscheine' }, nav: true },
      { path: '/redeem', warp: '@coupon-redeem', label: { en: 'Redeem', de: 'Einlösen' }, nav: true },
      { path: '/create', warp: '@coupon-create', label: { en: 'Create', de: 'Erstellen' }, nav: true },
      { path: '/collection', warp: '@coupon-create-collection', label: { en: 'New Collection', de: 'Neue Kollektion' }, nav: false },
      { path: '/manage', warp: '@coupon-manage', label: { en: 'Manage', de: 'Verwalten' }, nav: true },
    ],
  },
})
