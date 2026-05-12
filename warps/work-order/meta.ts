import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'create': {
    keywords: {
      en: ['work order', 'service report', 'field work', 'technician report', 'job documentation', 'work confirmation', 'Arbeitsschein', 'service certificate', 'maintenance report', 'repair documentation'],
      de: ['Arbeitsschein', 'Servicebericht', 'Außeneinsatz', 'Technikerbericht', 'Einsatzdokumentation', 'Arbeitsnachweis', 'Reparaturbericht', 'Wartungsprotokoll', 'Kundendienstbericht', 'Montageprotokoll'],
    },
    useCases: {
      en: [
        'A heating technician documents a boiler repair including materials used and hours worked',
        'A field service engineer creates a work confirmation after completing an installation',
        'A maintenance technician logs a preventive service visit with parts and labor',
        'A plumber generates a PDF service report for a customer after a job',
      ],
      de: [
        'Ein Heizungstechniker dokumentiert eine Boiler-Reparatur mit Material und Arbeitszeit',
        'Ein Servicetechniker erstellt einen Arbeitsnachweis nach einer Installation',
        'Ein Wartungstechniker protokolliert einen Präventivbesuch mit Teilen und Arbeitszeit',
        'Ein Klempner erstellt einen PDF-Servicebericht für den Kunden nach dem Einsatz',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What information do I need to create a work order?',
          answer: 'Just describe the job naturally — the agent extracts customer name, work performed, hours worked, and materials used from your description.',
        },
        {
          question: 'Can I add products and services to the work order?',
          answer: 'Yes. The warp matches the materials you mention against your team\'s product catalog and the hours worked against your service catalog automatically.',
        },
        {
          question: 'Is a PDF generated automatically?',
          answer: 'Yes. A PDF work order is created and saved to your media library. You can download or share it directly from there.',
        },
      ],
      de: [
        {
          question: 'Welche Informationen brauche ich für einen Arbeitsschein?',
          answer: 'Beschreibe einfach den Einsatz natürlich — der Agent extrahiert Kundenname, ausgeführte Arbeiten, Stunden und verwendetes Material aus deiner Beschreibung.',
        },
        {
          question: 'Kann ich Produkte und Dienstleistungen hinzufügen?',
          answer: 'Ja. Der Agent ordnet die genannten Materialien automatisch Produkten aus deinem Katalog und die Stunden den Dienstleistungen zu.',
        },
        {
          question: 'Wird automatisch ein PDF erstellt?',
          answer: 'Ja. Der Arbeitsschein wird als PDF erstellt und in deiner Medienbibliothek gespeichert. Du kannst ihn von dort herunterladen oder teilen.',
        },
      ],
    },
  },

  'create-bill': {
    keywords: {
      en: ['invoice', 'bill', 'create invoice', 'work order billing', 'service invoice', 'payment link', 'send invoice', 'customer invoice', 'job billing'],
      de: ['Rechnung', 'Rechnung erstellen', 'Arbeitsschein Abrechnung', 'Service Rechnung', 'Zahlungslink', 'Rechnung senden', 'Kundenrechnung', 'Einsatz abrechnen'],
    },
    useCases: {
      en: [
        'Create an invoice for a completed work order with products and labor',
        'Generate a payment link for a customer after a service visit',
        'Bill a customer for materials used and hours worked on a repair',
      ],
      de: [
        'Eine Rechnung für einen abgeschlossenen Arbeitsschein mit Material und Arbeitszeit erstellen',
        'Einen Zahlungslink für einen Kunden nach einem Serviceeinsatz generieren',
        'Einem Kunden Material und Arbeitszeit einer Reparatur in Rechnung stellen',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How is the invoice total calculated?',
          answer: 'The total is the sum of all matched product and service prices from your team catalog. Each item\'s price is set in your billing settings.',
        },
        {
          question: 'Does the customer receive an email with the invoice?',
          answer: 'The invoice is created with a payment link. You can send it to the customer via email using the related email-send action.',
        },
      ],
      de: [
        {
          question: 'Wie wird der Rechnungsbetrag berechnet?',
          answer: 'Der Betrag ergibt sich aus der Summe aller zugeordneten Produkt- und Service-Preise aus deinem Team-Katalog.',
        },
        {
          question: 'Erhält der Kunde eine E-Mail mit der Rechnung?',
          answer: 'Die Rechnung wird mit einem Zahlungslink erstellt. Du kannst sie über die zugehörige E-Mail-Aktion an den Kunden senden.',
        },
      ],
    },
  },
}
