import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'broadcast': {
    keywords: {
      en: ['broadcast message', 'send to all contacts', 'mass message', 'bulk outreach', 'segment message', 'group message'],
      de: ['Broadcast-Nachricht', 'an alle Kontakte senden', 'Massennachricht', 'Bulk-Outreach', 'Segmentnachricht', 'Gruppennachricht'],
    },
    useCases: {
      en: ['Send a promotion to all customers tagged as VIP', 'Broadcast a flash offer to contacts who haven\'t visited in 60 days', 'Notify a segment of clients about a schedule change'],
      de: ['Eine Aktion an alle als VIP getaggten Kunden senden', 'Ein Flash-Angebot an Kontakte senden, die seit 60 Tagen nicht mehr da waren', 'Ein Segment von Kunden über eine Terminänderung informieren'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'Who receives the broadcast?',
          answer: 'All contacts matching the selected tag or segment. You can preview the recipient list before sending.',
        },
        {
          question: 'Which channels can I use for broadcasts?',
          answer: 'WhatsApp and email are supported. The agent uses the channel configured for each contact.',
        },
      ],
      de: [
        {
          question: 'Wer erhält den Broadcast?',
          answer: 'Alle Kontakte, die dem ausgewählten Tag oder Segment entsprechen. Du kannst die Empfängerliste vor dem Versand prüfen.',
        },
        {
          question: 'Welche Kanäle kann ich für Broadcasts verwenden?',
          answer: 'WhatsApp und E-Mail werden unterstützt. Der Agent verwendet den für jeden Kontakt konfigurierten Kanal.',
        },
      ],
    },
  },

  'contact-message': {
    keywords: {
      en: ['message contact', 'reach out to customer', 'send personal message', 'contact outreach', 'proactive message'],
      de: ['Kontakt benachrichtigen', 'Kunden kontaktieren', 'persönliche Nachricht senden', 'Kontakt-Outreach', 'proaktive Nachricht'],
    },
    useCases: {
      en: ['Send a personalized follow-up to a specific customer', 'Reach out to a lead after an inquiry', 'Check in on a client ahead of their next appointment'],
      de: ['Eine personalisierte Nachricht an einen bestimmten Kunden senden', 'Einen Lead nach einer Anfrage kontaktieren', 'Vor dem nächsten Termin bei einem Kunden nachfragen'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'How is the message personalized?',
          answer: 'The agent composes a message based on the contact\'s name, history, and the context you provide — no template required.',
        },
      ],
      de: [
        {
          question: 'Wie wird die Nachricht personalisiert?',
          answer: 'Der Agent verfasst eine Nachricht basierend auf dem Namen, der Geschichte und dem von dir angegebenen Kontext des Kontakts — keine Vorlage erforderlich.',
        },
      ],
    },
  },

  'segment-scan': {
    keywords: {
      en: ['scan contacts', 'find outreach targets', 'contact segment', 'identify prospects', 'filter contacts'],
      de: ['Kontakte scannen', 'Outreach-Ziele finden', 'Kontaktsegment', 'Interessenten identifizieren', 'Kontakte filtern'],
    },
    useCases: {
      en: ['Find all contacts tagged as "lead" who haven\'t been contacted in 14 days', 'Identify VIP customers due for a check-in', 'Build a target list for an upcoming promotion'],
      de: ['Alle als "Lead" getaggten Kontakte finden, die seit 14 Tagen nicht kontaktiert wurden', 'VIP-Kunden identifizieren, bei denen ein Check-in fällig ist', 'Eine Zielliste für eine bevorstehende Aktion erstellen'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'What filters can I use when scanning contacts?',
          answer: 'You can filter by tag, days since last contact, and segment. The scan returns a prioritized list with suggested actions.',
        },
      ],
      de: [
        {
          question: 'Welche Filter kann ich beim Scannen von Kontakten verwenden?',
          answer: 'Du kannst nach Tag, Tagen seit dem letzten Kontakt und Segment filtern. Der Scan gibt eine priorisierte Liste mit vorgeschlagenen Aktionen zurück.',
        },
      ],
    },
  },
}
