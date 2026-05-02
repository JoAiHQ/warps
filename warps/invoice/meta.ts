import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  create: {
    keywords: {
      en: ['invoice', 'billing', 'pdf invoice', 'create invoice', 'send invoice', 'line items'],
      de: ['Rechnung', 'Rechnung erstellen', 'PDF-Rechnung', 'Rechnung senden', 'Rechnungspositionen'],
    },
    useCases: {
      en: [
        'A freelancer billing a client for completed work hours and materials',
        'A contractor creating a professional PDF invoice after a site visit',
        'A small business sending an itemized invoice with multiple line items',
      ],
      de: [
        'Ein Freelancer stellt einem Kunden Arbeitsstunden und Material in Rechnung',
        'Ein Auftragnehmer erstellt nach einem Termin vor Ort eine professionelle PDF-Rechnung',
        'Ein kleines Unternehmen sendet eine Aufstellung mit mehreren Rechnungspositionen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        { question: 'Can I add multiple line items?', answer: 'Yes, pass an array of line items with title, quantity, and unit price for each.' },
        { question: 'What currency is used?', answer: 'The invoice is generated in the currency configured for your team.' },
        { question: 'How do I share the invoice?', answer: 'The response includes an invoiceUrl that you can send to your customer directly.' },
      ],
      de: [
        { question: 'Kann ich mehrere Rechnungspositionen hinzufügen?', answer: 'Ja, übergib ein Array von Positionen mit Titel, Menge und Einzelpreis.' },
        { question: 'Welche Währung wird verwendet?', answer: 'Die Rechnung wird in der für dein Team eingestellten Währung erstellt.' },
        { question: 'Wie teile ich die Rechnung?', answer: 'Die Antwort enthält eine invoiceUrl, die du direkt an deinen Kunden senden kannst.' },
      ],
    },
  },
}
