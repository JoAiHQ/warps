import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Form')
    .setDescription({
      en: 'Create, manage, publish, and install standalone forms for leads, registrations, feedback, and contact requests.',
      de: 'Erstelle, verwalte, veröffentliche und installiere eigenständige Formulare für Leads, Anmeldungen, Feedback und Kontaktanfragen.',
      fr: 'Créez, gérez, publiez et installez des formulaires autonomes pour les prospects, inscriptions et retours.',
      es: 'Crea, gestiona, publica e instala formularios independientes para contactos, registros y comentarios.',
      ro: 'Creeaza, gestioneaza, publica si instaleaza formulare independente pentru lead-uri, inscrieri si feedback.',
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
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/admin/forms',
    routes: [
      {
        path: '/admin/forms',
        warp: '@form-list',
        label: { en: 'Forms', de: 'Formulare' },
        nav: true,
      },
      {
        path: '/admin/create',
        warp: '@form-create',
        label: { en: 'Create Form', de: 'Formular erstellen' },
        nav: true,
      },
      {
        path: '/admin/field/add',
        warp: '@form-field-add',
        label: { en: 'Add Field', de: 'Feld hinzufügen' },
        nav: false,
      },
      {
        path: '/admin/field/update',
        warp: '@form-field-update',
        label: { en: 'Edit Field', de: 'Feld bearbeiten' },
        nav: false,
      },
      {
        path: '/admin/field/remove',
        warp: '@form-field-remove',
        label: { en: 'Remove Field', de: 'Feld entfernen' },
        nav: false,
      },
    ],
  },
})
