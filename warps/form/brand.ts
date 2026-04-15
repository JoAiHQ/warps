import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

/**
 * Form — custom forms backed by private warps.
 *
 * Each form is a private warp (collect action) stored under the "form" brand
 * per team. No blockchain or wallet required — forms are managed via the
 * JoAi API and rendered through the standard warp UI.
 *
 * Submissions flow through the warp's `next` chain: lead forms →
 * @joai-contact-create, feedback forms → @joai-store-append, etc.
 *
 * Use cases: lead capture, event RSVP, quote requests, waitlists, feedback,
 * NPS surveys, walk-in registration, contact page replacement.
 */
export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Form')
    .setDescription({
      en: 'Custom forms that capture leads, RSVPs, feedback, and sign-ups — powered by private warps.',
      de: 'Maßgeschneiderte Formulare, die Leads, RSVPs, Feedback und Anmeldungen erfassen — mit privaten Warps.',
      fr: 'Formulaires personnalisés qui capturent leads, RSVPs, feedbacks et inscriptions — avec des warps privés.',
      es: 'Formularios personalizados que capturan leads, RSVPs, comentarios e inscripciones — con warps privados.',
      ro: 'Formulare personalizate care capteaza lead-uri, RSVPs, feedback si inscrieri — cu warps private.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
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
    indexPath: '/admin/create',
    routes: [
      {
        path: '/admin/create',
        warp: '@form-create',
        label: { en: 'Create Form', de: 'Formular erstellen' },
        nav: false,
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
