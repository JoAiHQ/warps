import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Coupon')
    .setDescription({
      en: 'On-chain discount coupons. Create, share, and redeem verifiable coupon codes anchored on the blockchain.',
      de: 'On-Chain-Rabattgutscheine. Erstelle, teile und löse verifizierbare Gutscheincodes auf der Blockchain ein.',
      fr: 'Coupons de reduction on-chain. Creez, partagez et utilisez des codes promo verifiables ancrés sur la blockchain.',
      es: 'Cupones de descuento on-chain. Crea, comparte y canjea codigos verificables anclados en la blockchain.',
      ro: 'Cupoane de reducere on-chain. Creeaza, distribuie si foloseste coduri verificabile ancorate pe blockchain.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    COUPON_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqtxwhd7z99tvvrgd38897k9zunrqsgmahtres7648am'
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
      { path: '/', warp: '@coupon-redeem', label: { en: 'Redeem', de: 'Einlösen', fr: 'Utiliser', es: 'Canjear', ro: 'Foloseste' }, nav: true },
      { path: '/view', warp: '@coupon-view', label: { en: 'View Coupon', de: 'Gutschein ansehen', fr: 'Voir le coupon', es: 'Ver cupon', ro: 'Vezi cuponul' }, nav: false },
      { path: '/create', warp: '@coupon-create', label: { en: 'Create Coupon', de: 'Gutschein erstellen', fr: 'Creer un coupon', es: 'Crear cupon', ro: 'Creeaza cupon' }, nav: false },
    ],
  },
})
