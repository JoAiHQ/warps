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
      { path: '/', warp: '@shop-services', label: { en: 'Services', de: 'Leistungen', fr: 'Services', es: 'Servicios', ro: 'Servicii' }, nav: true },
      { path: '/admin/add', warp: '@shop-service-add', label: { en: 'Add Service', de: 'Leistung hinzufügen', fr: 'Ajouter un service', es: 'Anadir servicio', ro: 'Adauga serviciu' }, nav: false },
      { path: '/admin/remove', warp: '@shop-service-remove', label: { en: 'Remove Service', de: 'Leistung entfernen', fr: 'Supprimer le service', es: 'Eliminar servicio', ro: 'Elimina serviciul' }, nav: false },
      { path: '/admin/setup', warp: '@shop-register', label: { en: 'Setup Shop', de: 'Shop einrichten', fr: 'Configurer la boutique', es: 'Configurar tienda', ro: 'Configureaza magazinul' }, nav: false },
    ],
  },
})
