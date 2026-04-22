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

  'log-touch': {
    keywords: {
      en: ['log outreach', 'track outreach touch', 'a/b test outreach', 'record message sent', 'outreach analytics', 'template tracking'],
      de: ['Outreach protokollieren', 'Outreach-Kontakt tracken', 'A/B-Test Outreach', 'Nachricht protokollieren', 'Outreach-Analytics', 'Template-Tracking'],
    },
    useCases: {
      en: ['Log a WhatsApp outreach touch with template + variant for later reply-rate analysis', 'Record a cold LinkedIn connect-note touch against a contact', 'Track which sequence step a follow-up message represents'],
      de: ['Einen WhatsApp-Outreach mit Template + Variante protokollieren für spätere Response-Rate-Analyse', 'Einen kalten LinkedIn-Connect-Note-Kontakt bei einem Kontakt protokollieren', 'Nachvollziehen, welchen Sequenz-Schritt eine Follow-up-Nachricht darstellt'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'Why not use contact-activity-log?',
          answer: 'log-touch enforces a structured meta payload (channel, templateId, variant, sequenceStep) so A/B tests and funnel analytics stay consistent. The generic activity log is free-form and not queryable the same way.',
        },
        {
          question: 'What templates IDs should I use?',
          answer: 'Stable slugs that identify your outreach message, e.g. handwerk-seq-a-m1 or kanzlei-linkedin-connect. The outreach app keeps template definitions in the OPS doc; the touch log just references the slug.',
        },
      ],
      de: [
        {
          question: 'Warum nicht contact-activity-log verwenden?',
          answer: 'log-touch erzwingt ein strukturiertes Meta-Payload (channel, templateId, variant, sequenceStep), damit A/B-Tests und Funnel-Analytics konsistent bleiben. Der generische Activity-Log ist freitextlich und nicht gleich auswertbar.',
        },
        {
          question: 'Welche Template-IDs soll ich verwenden?',
          answer: 'Stabile Slugs die deine Outreach-Nachricht identifizieren, z.B. handwerk-seq-a-m1 oder kanzlei-linkedin-connect. Die Outreach-App hält Template-Definitionen im OPS-Doc; der Touch-Log verweist nur auf den Slug.',
        },
      ],
    },
  },

  'stats': {
    keywords: {
      en: ['outreach stats', 'reply rate', 'a/b test results', 'outreach analytics', 'template performance', 'funnel metrics'],
      de: ['Outreach-Statistik', 'Response-Rate', 'A/B-Test-Ergebnisse', 'Outreach-Analytics', 'Template-Performance', 'Funnel-Metriken'],
    },
    useCases: {
      en: ['Compare reply rates between variant A and B of a WhatsApp opener', 'See how many handwerk-seq-a-m1 touches went out in the last 30 days', 'Pull all lawyer-post touches for an end-of-quarter review'],
      de: ['Response-Rates zwischen Variante A und B eines WhatsApp-Openers vergleichen', 'Sehen, wie viele handwerk-seq-a-m1-Kontakte in den letzten 30 Tagen rausgingen', 'Alle Anwalts-Post-Kontakte für ein Quartalsreview abrufen'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'How is reply rate calculated?',
          answer: 'This warp returns the raw list of outreach touches. Aggregation (sent count, reply count, rate) happens in the outreach dashboard or the agent\'s analysis step — the warp is the data source.',
        },
        {
          question: 'Can I filter by channel AND template?',
          answer: 'Yes — all filters combine. E.g. channel=whatsapp + templateId=handwerk-seq-a-m1 returns only WhatsApp touches that used that specific template.',
        },
      ],
      de: [
        {
          question: 'Wie wird die Response-Rate berechnet?',
          answer: 'Der Warp liefert die Rohliste der Outreach-Kontakte. Aggregation (Sent-Count, Reply-Count, Rate) passiert im Outreach-Dashboard oder im Analyse-Schritt des Agenten — der Warp ist die Datenquelle.',
        },
        {
          question: 'Kann ich nach Channel UND Template filtern?',
          answer: 'Ja — alle Filter kombinieren. Z.B. channel=whatsapp + templateId=handwerk-seq-a-m1 liefert nur WhatsApp-Kontakte die dieses Template nutzten.',
        },
      ],
    },
  },
}
