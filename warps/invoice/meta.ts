import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'create-invoice': {
    keywords: {
      en: ['create invoice', 'generate invoice', 'issue invoice', 'send bill', 'payment request', 'billing'],
      de: ['Rechnung erstellen', 'Rechnung generieren', 'Rechnung ausstellen', 'Rechnung senden', 'Zahlungsaufforderung', 'Abrechnung'],
    },
    useCases: {
      en: [
        'Bill a client for completed work with itemized line items',
        'Generate a professional PDF invoice for materials and labor',
        'Create a payment request after a service appointment',
      ],
      de: [
        'Einen Kunden für erledigte Arbeit mit detaillierten Posten abrechnen',
        'Eine professionelle PDF-Rechnung für Material und Arbeitszeit erstellen',
        'Eine Zahlungsaufforderung nach einem Service-Termin erzeugen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I create an invoice?',
          answer: 'Provide line items with title, quantity, and unit price in cents. The warp generates a PDF and returns a signed download link.',
        },
        {
          question: 'What currency is used?',
          answer: 'Prices are provided in cents. The invoice template uses the default currency configured for your team (usually USD).',
        },
      ],
      de: [
        {
          question: 'Wie erstelle ich eine Rechnung?',
          answer: 'Gib Einzelposten mit Titel, Menge und Einzelpreis in Cent an. Der Warp erzeugt ein PDF und gibt einen signierten Download-Link zurück.',
        },
        {
          question: 'Welche Währung wird verwendet?',
          answer: 'Preise werden in Cent angegeben. Das Rechnungstemplate verwendet die Standardwährung deines Teams (üblicherweise USD).',
        },
      ],
    },
  },
}
