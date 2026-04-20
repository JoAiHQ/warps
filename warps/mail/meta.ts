import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'draft': {
    keywords: {
      en: [
        'AI mail', 'AI email', 'AI email assistant', 'AI email agent', 'AI email drafting',
        'AI email composer', 'AI email writer', 'AI email generator', 'AI draft email',
        'AI write email for me', 'AI personalized email', 'AI outreach email', 'AI cold email',
        'mailto link generator', 'mailto link', 'prefilled mail link', 'one click email',
        'draft email with AI', 'compose email AI', 'email assistant AI', 'AI email tool',
        'CRM email logging', 'email history CRM', 'log email to CRM', 'email activity CRM',
        'agent writes email', 'send email through AI', 'AI email to contact',
        'AI follow up email', 'AI email sales', 'AI email outreach',
        'personalized outreach AI', 'AI email for lead', 'AI email for customer',
      ],
      de: [
        'KI E-Mail', 'KI Mail', 'KI E-Mail-Assistent', 'KI E-Mail-Agent', 'KI E-Mail schreiben',
        'KI Mail verfassen', 'KI E-Mail generieren', 'E-Mail mit KI schreiben',
        'KI schreibt E-Mail', 'KI personalisierte E-Mail', 'KI Outreach E-Mail',
        'KI Kaltakquise E-Mail', 'E-Mail Agent', 'Mailto Link generieren', 'Mailto erstellen',
        'vorausgefüllter E-Mail-Link', 'Ein-Klick E-Mail', 'E-Mail Entwurf KI',
        'KI Verkaufs-E-Mail', 'KI Follow-up-Mail', 'E-Mail Historie CRM', 'E-Mail im CRM protokollieren',
        'E-Mail Aktivität CRM', 'Agent schreibt E-Mail', 'E-Mail über KI senden',
        'persönliche E-Mail KI', 'E-Mail an Kontakt KI',
      ],
      fr: [
        'IA email', 'IA redaction email', 'assistant email IA', 'generateur mailto',
        'email personnalise IA', 'IA ecrire email', 'outreach email IA',
      ],
      es: [
        'IA correo', 'IA redaccion correo', 'asistente correo IA', 'generador mailto',
        'correo personalizado IA', 'IA escribir correo', 'alcance correo IA',
      ],
      ro: [
        'AI email', 'AI scriere email', 'asistent email AI', 'generator mailto',
        'email personalizat AI', 'AI scrie email', 'outreach email AI',
      ],
    },
    useCases: {
      en: [
        'Draft a personalized outreach email to a CRM contact and get a one-click mailto link to send it',
        'Have the agent compose a cold email based on context you provide — subject, body, tone, all tailored',
        'Send a follow-up to a lead and automatically log the email as a contact activity for history tracking',
        'Turn a quick voice note into a polished email with the recipient prefilled and ready to send',
        'Write emails to professors, partners, or prospects without drafting from scratch — agent does the work',
        'Maintain a full CRM timeline of every outreach email without copy-pasting into a separate logging tool',
      ],
      de: [
        'Eine personalisierte Outreach-E-Mail an einen CRM-Kontakt verfassen und einen Ein-Klick-Mailto-Link zum Senden erhalten',
        'Der Agent verfasst eine Kaltakquise-E-Mail basierend auf dem Kontext, den du angibst — Betreff, Inhalt, Ton, alles maßgeschneidert',
        'Ein Follow-up an einen Lead senden und die E-Mail automatisch als Kontakt-Aktivität protokollieren',
        'Eine Sprachnotiz in eine polierte E-Mail verwandeln, mit Empfänger vorausgefüllt',
        'E-Mails an Professoren, Partner oder Interessenten schreiben, ohne von Grund auf zu entwerfen',
        'Eine vollständige CRM-Timeline aller Outreach-E-Mails führen, ohne in ein separates Tool zu kopieren',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'Does this actually send the email?',
          answer: 'No — it creates a mailto link that opens your default mail client (Apple Mail, Gmail, Outlook) with the subject and body prefilled. You review and hit send. This gives you full control and works with any email provider, no OAuth setup required.',
        },
        {
          question: 'Why use this instead of sending through Gmail or another integration?',
          answer: 'Because it works with zero setup — no OAuth, no SMTP credentials, no app permissions. Your agent drafts, logs to CRM, hands you a clickable link. Send from your actual mail client, where replies naturally land.',
        },
        {
          question: 'How is the email logged?',
          answer: 'As a contact activity of type "email" on the recipient\'s CRM record. The full body is stored as the description, with subject and recipient in the activity metadata. Searchable, filterable, and available for follow-up signals.',
        },
        {
          question: 'Can the agent follow up automatically?',
          answer: 'Yes — logged activities feed into the follow-up signal system. If no response is recorded within a configured window (default 7 days), the agent surfaces a follow-up suggestion proactively.',
        },
        {
          question: 'Does it work with long emails?',
          answer: 'Modern mail clients (Apple Mail, Gmail web, Outlook) handle multi-paragraph bodies without issue. Some older clients cap mailto URLs at ~2000 characters; for longer drafts the body is still fully logged in the activity even if the mailto truncates.',
        },
      ],
      de: [
        {
          question: 'Sendet das tatsächlich die E-Mail?',
          answer: 'Nein — es erstellt einen Mailto-Link, der deinen Standard-Mail-Client (Apple Mail, Gmail, Outlook) mit vorausgefülltem Betreff und Inhalt öffnet. Du prüfst und sendest. So hast du volle Kontrolle und brauchst kein OAuth-Setup.',
        },
        {
          question: 'Warum das statt Gmail-Integration?',
          answer: 'Weil es ohne Setup funktioniert — kein OAuth, keine SMTP-Zugangsdaten, keine App-Berechtigungen. Dein Agent verfasst, protokolliert ins CRM, liefert einen klickbaren Link. Senden aus deinem echten Mail-Client, wo Antworten natürlich landen.',
        },
        {
          question: 'Wie wird die E-Mail protokolliert?',
          answer: 'Als Kontakt-Aktivität vom Typ "E-Mail" im CRM-Eintrag des Empfängers. Der vollständige Inhalt wird gespeichert, Betreff und Empfänger in den Metadaten. Durchsuchbar, filterbar und für Follow-up-Signale verfügbar.',
        },
        {
          question: 'Kann der Agent automatisch Follow-ups senden?',
          answer: 'Ja — protokollierte Aktivitäten füttern das Follow-up-Signal-System. Wenn innerhalb eines konfigurierbaren Zeitraums (Standard 7 Tage) keine Antwort eingetragen wird, schlägt der Agent proaktiv ein Follow-up vor.',
        },
        {
          question: 'Funktioniert das mit langen E-Mails?',
          answer: 'Moderne Mail-Clients (Apple Mail, Gmail Web, Outlook) können mehrere Absätze problemlos handhaben. Ältere Clients kappen Mailto-URLs bei ~2000 Zeichen; in diesem Fall ist der vollständige Text trotzdem in der CRM-Aktivität gespeichert.',
        },
      ],
    },
  },
}
