import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

/**
 * Form — public-facing forms for any purpose.
 *
 * Forms are publicly accessible (no auth required from the submitter).
 * Anyone can scan a QR code at a seminar, webinar, or event and submit
 * their details instantly. Each form is registered on-chain via the Form
 * smart contract (definition only — no PII on-chain). Submissions flow
 * through the warp's `next` chain: lead forms → @joai-contact-create,
 * feedback forms → @joai-store-append, etc.
 *
 * Use cases: lead capture, event RSVP, quote requests, waitlists, feedback,
 * NPS surveys, walk-in registration, contact page replacement.
 *
 * Admin warps (create-form, add-field) require the agent owner to be
 * authenticated — they write form definitions to the Form SC.
 */
export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Form')
    .setDescription({
      en: 'Custom forms that capture leads, RSVPs, feedback, and sign-ups — without a backend.',
      de: 'Maßgeschneiderte Formulare, die Leads, RSVPs, Feedback und Anmeldungen erfassen — ohne Backend.',
      fr: 'Formulaires personnalises qui capturent leads, RSVPs, feedbacks et inscriptions — sans backend.',
      es: 'Formularios personalizados que capturan leads, RSVPs, comentarios e inscripciones — sin backend.',
      ro: 'Formulare personalizate care capteaza lead-uri, RSVPs, feedback si inscrieri — fara backend.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    FORM_CONTRACT: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqz2tu5l8ymrwx7cfx0phhv8nge5wrkhpstres5u0p8q'
      return 'TODO'
    },
  },
  destinations: {
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
      // --- Public (no auth) ---
      {
        path: '/',
        warp: '@form-submit',
        label: { en: 'Sign up', de: 'Anmelden', fr: 'S inscrire', es: 'Registrarse', ro: 'Inscrie-te' },
        nav: true,
      },
      {
        path: '/complete',
        warp: '@form-complete',
        label: { en: 'Complete', de: 'Abgeschlossen', fr: 'Termine', es: 'Completado', ro: 'Finalizat' },
        nav: false,
      },
      // --- Admin (agent-authenticated) ---
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
      {
        path: '/admin/activate',
        warp: '@form-set-active',
        label: { en: 'Activate / Pause', de: 'Aktivieren / Pausieren' },
        nav: false,
      },
      {
        path: '/admin/message',
        warp: '@form-set-complete-message',
        label: { en: 'Completion Message', de: 'Abschlussnachricht' },
        nav: false,
      },
    ],
  },
})
