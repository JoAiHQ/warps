import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'send': {
    keywords: {
      en: [
        'AI email', 'AI send email', 'AI email assistant', 'AI email agent',
        'AI email drafting', 'AI email writer', 'AI email composer', 'AI cold email',
        'AI follow up email', 'AI sales email', 'AI outreach email', 'AI email reply',
        'email a contact', 'send email to contact', 'email my customer', 'email my lead',
        'write an email', 'draft an email', 'compose email', 'respond by email',
        'AI email marketing', 'AI email personalization', 'AI email for CRM',
        'agent sends email', 'send email through AI', 'email from AI agent',
        'AI email generator', 'AI personalized email', 'email automation AI',
        'CRM email thread', 'email conversation tracking', 'email reply handling',
        'automated email response', 'email room', 'email with history',
      ],
      de: [
        'KI E-Mail', 'KI E-Mail senden', 'KI E-Mail-Assistent', 'KI E-Mail-Agent',
        'KI Mail schreiben', 'KI Mail verfassen', 'KI Kaltakquise-Mail',
        'KI Follow-up-Mail', 'KI Vertriebs-Mail', 'KI Outreach-Mail', 'KI E-Mail-Antwort',
        'Kontakt per E-Mail anschreiben', 'E-Mail an Kunden', 'E-Mail an Lead',
        'Mail schreiben lassen', 'Mail verfassen lassen', 'E-Mail aufsetzen',
        'E-Mail per KI', 'KI personalisierte E-Mail', 'E-Mail-Automatisierung KI',
        'CRM E-Mail Thread', 'E-Mail-Konversation verfolgen', 'Antworten verwalten',
        'Agent sendet Mail', 'E-Mail über KI senden', 'E-Mail aus Agent',
        'KI Mail-Generator', 'automatische E-Mail-Antwort', 'E-Mail-Verlauf',
      ],
      fr: [
        'IA email', 'IA envoi email', 'assistant email IA', 'IA redaction email',
        'email personnalise IA', 'IA prospection email', 'IA suivi email',
        'agent envoie email', 'IA email pour CRM', 'email via IA',
      ],
      es: [
        'IA correo', 'IA enviar correo', 'asistente correo IA', 'IA redaccion correo',
        'correo personalizado IA', 'IA prospeccion correo', 'IA seguimiento correo',
        'agente envia correo', 'IA correo para CRM', 'correo via IA',
      ],
      ro: [
        'AI email', 'AI trimite email', 'asistent email AI', 'AI redactare email',
        'email personalizat AI', 'AI prospectare email', 'AI follow-up email',
        'agent trimite email', 'AI email pentru CRM', 'email via AI',
      ],
    },
    useCases: {
      en: [
        'Send a personalized follow-up email to a lead after an initial call',
        'Reply to a prospect by email with context-aware, on-brand copy the agent drafts from your intent',
        'Send a cold outreach email to a partner or investor — agent composes, routes through your email integration',
        'Keep a tracked conversation thread with every contact — replies land back in the same room automatically',
        'Automate check-in emails to clients after meetings without leaving the agent chat',
        'Reach out to a customer about a subscription renewal or offer with a personalized, one-prompt email',
      ],
      de: [
        'Eine personalisierte Follow-up-E-Mail an einen Lead nach einem ersten Gespräch senden',
        'Auf einen Interessenten per E-Mail antworten — der Agent verfasst kontextbezogenen, markenkonformen Text aus deiner Absicht',
        'Eine Kaltakquise-E-Mail an einen Partner oder Investor senden — Agent verfasst, sendet über deine E-Mail-Integration',
        'Einen nachvollziehbaren Gesprächs-Thread mit jedem Kontakt führen — Antworten landen automatisch im gleichen Raum',
        'Check-in-E-Mails an Kunden nach Meetings automatisieren, ohne den Agent-Chat zu verlassen',
        'Einen Kunden wegen Abo-Verlängerung oder Angebot kontaktieren — personalisierte Mail aus einem Prompt',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'What email integration does this use?',
          answer: 'Your agent\'s configured email integration (Gmail, Outlook, IMAP/SMTP, etc.). Set it up once in agent settings; the warp routes through it automatically.',
        },
        {
          question: 'How are replies tracked?',
          answer: 'The warp resolves or creates a conversation room for each recipient on first contact. Incoming replies route back into the same room so the agent — and you — always see the full thread without switching tools.',
        },
        {
          question: 'Does it replace my existing email client?',
          answer: 'No. It\'s an additional channel that uses your existing email account. You can still send and receive from your regular client; this warp is for agent-driven, CRM-linked email actions.',
        },
        {
          question: 'Can the agent draft the email body for me?',
          answer: 'Yes — describe what you want ("follow up on the proposal we discussed last week") and the agent composes the full message from context, then sends it via your email integration.',
        },
        {
          question: 'Is the email logged to the contact in the CRM?',
          answer: 'Yes. The conversation room is linked to the contact record, so every outbound email and every reply is part of that contact\'s searchable history — useful for future follow-ups and context.',
        },
      ],
      de: [
        {
          question: 'Welche E-Mail-Integration wird verwendet?',
          answer: 'Die in den Agent-Einstellungen konfigurierte E-Mail-Integration (Gmail, Outlook, IMAP/SMTP etc.). Einmalig einrichten, dann routet der Warp automatisch darüber.',
        },
        {
          question: 'Wie werden Antworten verfolgt?',
          answer: 'Der Warp erstellt beim ersten Kontakt einen Gesprächsraum für jeden Empfänger. Eingehende Antworten landen im gleichen Raum — Agent und du seht immer den vollständigen Thread, ohne Tools zu wechseln.',
        },
        {
          question: 'Ersetzt das meinen E-Mail-Client?',
          answer: 'Nein. Es ist ein zusätzlicher Kanal, der dein bestehendes E-Mail-Konto nutzt. Aus deinem normalen Client kannst du weiterhin senden und empfangen; dieser Warp ist für Agent-gesteuerte, CRM-verknüpfte Aktionen.',
        },
        {
          question: 'Kann der Agent den E-Mail-Text für mich verfassen?',
          answer: 'Ja — beschreibe was du willst ("Nachfassen zum Angebot von letzter Woche") und der Agent verfasst die vollständige Nachricht aus dem Kontext und sendet sie.',
        },
        {
          question: 'Wird die E-Mail am Kontakt im CRM protokolliert?',
          answer: 'Ja. Der Gesprächsraum ist mit dem Kontakt verknüpft — jede ausgehende Mail und jede Antwort ist Teil der durchsuchbaren Historie des Kontakts.',
        },
      ],
    },
  },
}
