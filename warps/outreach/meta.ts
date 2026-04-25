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

  'template-create': {
    keywords: {
      en: ['create outreach template', 'outreach message template', 'sequence template', 'nurture template', 'whatsapp template'],
      de: ['Outreach-Template erstellen', 'Outreach-Nachrichtenvorlage', 'Sequenz-Template', 'Nurture-Template', 'WhatsApp-Vorlage'],
    },
    useCases: {
      en: [
        'Create a reusable WhatsApp opener template for a nurture sequence',
        'Set up a multi-step email outreach sequence with delay between steps',
        'Build a LinkedIn connect-note template with personalization variables',
      ],
      de: [
        'Ein wiederverwendbares WhatsApp-Opener-Template für eine Nurture-Sequenz erstellen',
        'Eine mehrstufige E-Mail-Outreach-Sequenz mit Verzögerung zwischen den Schritten aufsetzen',
        'Ein LinkedIn-Connect-Note-Template mit Personalisierungsvariablen aufbauen',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'What variables can I use in a template?',
          answer: 'Use {{name}}, {{company}}, or any custom variable. The agent fills them in when executing the step based on the contact data.',
        },
        {
          question: 'What is a sequence step?',
          answer: 'Each template has a step number (1, 2, 3...) and a delay in days. Step 1 is the first touch, step 2 follows after the specified delay, and so on.',
        },
      ],
      de: [
        {
          question: 'Welche Variablen kann ich in einem Template verwenden?',
          answer: 'Nutze {{name}}, {{company}} oder eigene Variablen. Der Agent füllt sie bei der Ausführung basierend auf den Kontaktdaten aus.',
        },
        {
          question: 'Was ist ein Sequenz-Schritt?',
          answer: 'Jedes Template hat eine Schrittnummer (1, 2, 3...) und eine Verzögerung in Tagen. Schritt 1 ist der Erstkontakt, Schritt 2 folgt nach der angegebenen Verzögerung, usw.',
        },
      ],
    },
  },

  'enroll': {
    keywords: {
      en: ['enroll contact outreach', 'start outreach sequence', 'add contact to sequence', 'begin nurture', 'outreach onboarding'],
      de: ['Kontakt für Outreach anmelden', 'Outreach-Sequenz starten', 'Kontakt zur Sequenz hinzufügen', 'Nurture beginnen', 'Outreach-Onboarding'],
    },
    useCases: {
      en: [
        'Enroll a lead in a WhatsApp nurture sequence',
        'Start a multi-step outreach for a new contact',
        'Add a contact from a segment scan to an outreach sequence',
      ],
      de: [
        'Einen Lead in einer WhatsApp-Nurture-Sequenz anmelden',
        'Ein mehrstufiges Outreach für einen neuen Kontakt starten',
        'Einen Kontakt aus einem Segment-Scan einer Outreach-Sequenz hinzufügen',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'What happens when I enroll a contact?',
          answer: 'The contact gets the sequence name and starting step set as properties, and is tagged as outreach-enrolled. The host system then schedules the first template execution.',
        },
      ],
      de: [
        {
          question: 'Was passiert, wenn ich einen Kontakt anmelde?',
          answer: 'Der Kontakt erhält den Sequenz-Namen und Startschritt als Eigenschaften und wird als outreach-enrolled getaggt. Das Host-System plant dann die erste Template-Ausführung.',
        },
      ],
    },
  },

  'execute-step': {
    keywords: {
      en: ['execute outreach step', 'send outreach message', 'run nurture step', 'outreach automation', 'sequence execution'],
      de: ['Outreach-Schritt ausführen', 'Outreach-Nachricht senden', 'Nurture-Schritt ausführen', 'Outreach-Automatisierung', 'Sequenzausführung'],
    },
    useCases: {
      en: [
        'Send the next WhatsApp message in a nurture sequence',
        'Execute step 2 of an email outreach sequence',
        'Log a LinkedIn connect-note as sent and advance to the next step',
      ],
      de: [
        'Die nächste WhatsApp-Nachricht in einer Nurture-Sequenz senden',
        'Schritt 2 einer E-Mail-Outreach-Sequenz ausführen',
        'Eine LinkedIn-Connect-Note als gesendet protokollieren und zum nächsten Schritt weiterrücken',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'What happens for linkedin and post channels?',
          answer: 'For channels that cannot be automated (linkedin, post), the composed message is logged as an activity and the step is advanced. The user sends the message manually.',
        },
        {
          question: 'How does personalization work?',
          answer: 'The agent fetches the contact data and fills in template variables like {{name}} automatically, creating a natural personalized message.',
        },
      ],
      de: [
        {
          question: 'Was passiert bei LinkedIn- und Post-Kanälen?',
          answer: 'Bei Kanälen, die nicht automatisiert werden können (LinkedIn, Post), wird die erstellte Nachricht als Aktivität protokolliert und der Schritt weitergeschaltet. Der Nutzer sendet die Nachricht manuell.',
        },
        {
          question: 'Wie funktioniert die Personalisierung?',
          answer: 'Der Agent ruft die Kontaktdaten ab und füllt Template-Variablen wie {{name}} automatisch aus, um eine natürliche personalisierte Nachricht zu erstellen.',
        },
      ],
    },
  },

  'park': {
    keywords: {
      en: ['pause outreach', 'park contact', 'stop outreach sequence', 'hold outreach', 'outreach break'],
      de: ['Outreach pausieren', 'Kontakt parken', 'Outreach-Sequenz stoppen', 'Outreach unterbrechen', 'Outreach-Pause'],
    },
    useCases: {
      en: [
        'Pause outreach for a contact who asked for a break',
        'Park a contact while waiting for a manual decision',
        'Temporarily stop a sequence for a VIP contact',
      ],
      de: [
        'Outreach für einen Kontakt pausieren, der um eine Pause gebeten hat',
        'Einen Kontakt parken, während auf eine manuelle Entscheidung gewartet wird',
        'Eine Sequenz für einen VIP-Kontakt vorübergehend stoppen',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'Can I resume a parked contact?',
          answer: 'Yes — remove the outreach-parked tag and the contact can continue their sequence from where they left off.',
        },
      ],
      de: [
        {
          question: 'Kann ich einen geparkten Kontakt fortsetzen?',
          answer: 'Ja — entferne den outreach-parked-Tag und der Kontakt kann die Sequenz dort fortsetzen, wo er stehen geblieben ist.',
        },
      ],
    },
  },

  'handle-reply': {
    keywords: {
      en: ['outreach reply', 'contact replied', 'response received', 'handle reply', 'outreach response'],
      de: ['Outreach-Antwort', 'Kontakt geantwortet', 'Antwort erhalten', 'Antwort behandeln', 'Outreach-Response'],
    },
    useCases: {
      en: [
        'Record that a contact replied to a WhatsApp outreach message',
        'Tag a contact as replied to stop further automated touches',
        'Log a reply event with a summary of what the contact said',
      ],
      de: [
        'Erfassen, dass ein Kontakt auf eine WhatsApp-Outreach-Nachricht geantwortet hat',
        'Einen Kontakt als geantwortet markieren, um weitere automatisierte Nachrichten zu stoppen',
        'Ein Antwort-Ereignis mit einer Zusammenfassung protokollieren',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'What happens after I record a reply?',
          answer: 'The contact is tagged as outreach-replied, which signals the host system to stop automated sequence execution. The reply is also logged as an activity.',
        },
      ],
      de: [
        {
          question: 'Was passiert, nachdem ich eine Antwort erfasst habe?',
          answer: 'Der Kontakt wird als outreach-replied getaggt, was dem Host-System signalisiert, die automatische Sequenzausführung zu stoppen. Die Antwort wird zusätzlich als Aktivität protokolliert.',
        },
      ],
    },
  },
}
