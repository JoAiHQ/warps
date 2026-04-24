import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Appointment')
    .setDescription({
      en: 'Appointment booking and intake flows for service businesses.',
      de: 'Terminbuchung und Intake-Abläufe für Dienstleistungsunternehmen.',
      fr: 'Prise de rendez-vous et parcours de reservation pour les entreprises de services.',
      es: 'Reservas de citas y flujos de atencion para negocios de servicios.',
      ro: 'Programari si fluxuri de preluare pentru afaceri de servicii.',
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
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@appointment-book', label: { en: 'Book', de: 'Buchen', fr: 'Prendre rendez-vous', es: 'Reservar', ro: 'Programeaza' }, nav: true },
      { path: '/confirm', warp: '@appointment-confirm', label: { en: 'Confirm', de: 'Bestätigen', fr: 'Confirmer', es: 'Confirmar', ro: 'Confirma' }, nav: false },
      { path: '/configure', warp: '@appointment-policy-upsert', label: { en: 'Settings', de: 'Einstellungen', fr: 'Parametres', es: 'Ajustes', ro: 'Setari' }, nav: false },
    ],
  },
})
