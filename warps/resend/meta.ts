import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'send-email': {
    keywords: {
      en: ['send email', 'Resend email', 'email API', 'transactional email', 'deliver email', 'compose email'],
      de: ['E-Mail senden', 'Resend E-Mail', 'E-Mail-API', 'Transaktions-E-Mail', 'E-Mail zustellen', 'E-Mail verfassen'],
    },
    useCases: {
      en: ['Send a transactional email notification to a customer', 'Deliver a welcome email to a new user via Resend', 'Compose and send a marketing update to your mailing list'],
      de: ['Eine transaktionale E-Mail-Benachrichtigung an einen Kunden senden', 'Eine Willkommens-E-Mail an einen neuen Nutzer über Resend zustellen', 'Ein Marketing-Update an deine Mailingliste verfassen und senden'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'How do I send an email via Resend?',
          answer:
            'Compose and send an email through the Resend API by providing the recipient, subject, and body to deliver your message.',
        },
      ],
      de: [
        {
          question: 'Wie sende ich eine E-Mail über Resend?',
          answer:
            'Verfasse und sende eine E-Mail über die Resend-API, indem du den Empfänger, Betreff und Inhalt angibst, um deine Nachricht zuzustellen.',
        },
      ],
    },
  },
}
