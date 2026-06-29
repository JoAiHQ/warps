import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'product-configurator': {
    keywords: {
      en: ['product inquiry', 'configurator', 'custom product', 'quote request', 'design inquiry', 'shop inquiry'],
      de: ['Produktanfrage', 'Konfigurator', 'individuelles Produkt', 'Angebot anfordern', 'Designanfrage', 'Shop-Anfrage'],
    },
    useCases: {
      en: [
        'A customer configures a product in the shop and submits an inquiry',
        'A buyer selects quantity, color, and text options and requests a design quote',
        'A customer uploads their own design file and requests production pricing',
      ],
      de: [
        'Ein Kunde konfiguriert ein Produkt im Shop und sendet eine Anfrage',
        'Ein Käufer wählt Menge, Farbe und Textoptionen und fordert ein Design-Angebot an',
        'Ein Kunde lädt eine eigene Design-Datei hoch und fragt nach Produktionspreisen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What happens after I submit a product inquiry?',
          answer: 'The agent creates a contact record and a board item for follow-up. You will receive a response within 24 hours.',
        },
        {
          question: 'Can I submit my own design file?',
          answer: 'Yes, you can upload a design file (PDF, SVG, AI, EPS) during configuration. The team will review it for production feasibility.',
        },
      ],
      de: [
        {
          question: 'Was passiert nachdem ich eine Produktanfrage sende?',
          answer: 'Der Agent erstellt einen Kontakteintrag und einen Board-Eintrag zur Nachverfolgung. Du erhältst innerhalb von 24 Stunden eine Antwort.',
        },
        {
          question: 'Kann ich meine eigene Design-Datei hochladen?',
          answer: 'Ja, du kannst während der Konfiguration eine Design-Datei (PDF, SVG, AI, EPS) hochladen. Das Team prüft sie auf Produktionstauglichkeit.',
        },
      ],
    },
  },
}
