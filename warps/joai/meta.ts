import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'team-create': {
    keywords: {
      en: ['create team', 'business onboarding', 'team profile', 'public directory listing', 'workspace setup'],
      de: ['Team erstellen', 'Betrieb onboarden', 'Teamprofil', 'öffentlicher Verzeichniseintrag', 'Workspace einrichten'],
    },
    useCases: {
      en: [
        'Create a public business profile for a local directory',
        'Set up a new workspace with contact details and tags',
        'Onboard an organization so connected apps can display it',
        'Prepare a team profile before adding services, products, media, or updates',
      ],
      de: [
        'Ein öffentliches Betriebsprofil für ein lokales Verzeichnis erstellen',
        'Einen neuen Workspace mit Kontaktinfos und Tags einrichten',
        'Eine Organisation onboarden, damit verbundene Apps sie anzeigen können',
        'Ein Teamprofil vorbereiten, bevor Services, Produkte, Medien oder Updates ergänzt werden',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'Can I create a public business team with tags?',
          answer: 'Yes. Provide the team name, visibility, tags, and profile details, and the created team can be used by connected apps and directories.',
        },
        {
          question: 'Can this action add contact details to a team?',
          answer: 'Yes. It supports website, phone, email, address, location, and optional settings for the team profile.',
        },
      ],
      de: [
        {
          question: 'Kann ich ein öffentliches Betriebs-Team mit Tags erstellen?',
          answer: 'Ja. Gib Name, Sichtbarkeit, Tags und Profildaten an, damit verbundene Apps und Verzeichnisse das Team nutzen können.',
        },
        {
          question: 'Kann diese Aktion Kontaktinfos zum Team hinzufügen?',
          answer: 'Ja. Website, Telefon, E-Mail, Adresse, Standort und optionale Einstellungen können direkt im Teamprofil hinterlegt werden.',
        },
      ],
    },
  },
  'desk-upload': {
    keywords: {
      en: ['upload file', 'add to desk', 'pin document', 'attach pdf', 'share file with agent'],
      de: ['Datei hochladen', 'zum Schreibtisch hinzufügen', 'Dokument anheften', 'PDF anhängen', 'Datei mit Agent teilen'],
    },
    useCases: {
      en: [
        'Upload a contract PDF before requesting signatures',
        'Share an image with your agent so it can use it in the next action',
        'Pin a document to the desk so it stays available across messages',
      ],
      de: [
        'Einen Vertrag hochladen, bevor du eine Signaturanfrage sendest',
        'Ein Bild mit deinem Agenten teilen, damit er es in der nächsten Aktion verwenden kann',
        'Ein Dokument am Schreibtisch anheften, damit es in allen Nachrichten verfügbar bleibt',
      ],
    },
    category: 'productivity',
  },
  'meeting-start': {
    keywords: {
      en: ['AI meeting recorder', 'meeting transcription', 'automated meeting notes', 'voice recording AI', 'meeting summary'],
      de: ['KI Meeting Aufnahme', 'Meeting Transkription', 'automatische Meetingnotizen', 'KI Sprachaufnahme', 'Meeting Zusammenfassung'],
    },
    useCases: {
      en: [
        'Record team standup meetings with automatic transcription',
        'Generate meeting summaries and action items automatically',
        'Capture client calls and create follow-up notes',
        'Document brainstorming sessions without manual note-taking',
      ],
      de: [
        'Team-Standups mit automatischer Transkription aufzeichnen',
        'Meeting-Zusammenfassungen und Aufgaben automatisch erstellen',
        'Kundengespräche aufnehmen und Follow-up-Notizen erstellen',
        'Brainstorming-Sitzungen ohne manuelles Mitschreiben dokumentieren',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How does the AI meeting recorder work?',
          answer:
            'Simply start a meeting with your AI agent. It automatically records and transcribes the conversation in real-time, generating notes and summaries you can review afterwards.',
        },
        {
          question: 'What languages are supported for transcription?',
          answer:
            'The meeting transcription supports multiple languages including English and German, with automatic language detection.',
        },
        {
          question: 'Is the meeting recording stored securely?',
          answer:
            'Yes, all meeting recordings and transcriptions are securely stored and only accessible to you and your team.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert die KI-Meeting-Aufnahme?',
          answer:
            'Starte einfach ein Meeting mit deinem KI-Agenten. Er nimmt das Gespräch automatisch auf und transkribiert es in Echtzeit.',
        },
        {
          question: 'Welche Sprachen werden für die Transkription unterstützt?',
          answer:
            'Die Meeting-Transkription unterstützt mehrere Sprachen, darunter Englisch und Deutsch, mit automatischer Spracherkennung.',
        },
        {
          question: 'Wird die Meeting-Aufnahme sicher gespeichert?',
          answer:
            'Ja, alle Meeting-Aufnahmen und Transkriptionen werden sicher gespeichert und sind nur für dich und dein Team zugänglich.',
        },
      ],
    },
  },
  'memory-create': {
    keywords: {
      en: ['AI memory', 'agent knowledge base', 'save information AI', 'persistent AI context'],
      de: ['KI Gedächtnis', 'Agenten Wissensbasis', 'Informationen speichern KI', 'persistenter KI-Kontext'],
    },
    useCases: {
      en: [
        'Save project-specific context for your AI agent to remember',
        'Store personal preferences and working style instructions',
        'Build a knowledge base of recurring tasks and workflows',
        'Persist important decisions and background information across chats',
      ],
      de: [
        'Projektspezifischen Kontext für deinen KI-Agenten speichern',
        'Persönliche Präferenzen und Arbeitsstil-Anweisungen hinterlegen',
        'Eine Wissensbasis für wiederkehrende Aufgaben und Workflows aufbauen',
        'Wichtige Entscheidungen und Hintergrundinformationen über Chats hinweg bewahren',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What is an AI agent memory?',
          answer:
            'An AI agent memory is a piece of information saved to your agent\'s knowledge base, allowing it to remember context across conversations.',
        },
      ],
      de: [
        {
          question: 'Was ist ein KI-Agenten-Gedächtnis?',
          answer:
            'Ein KI-Agenten-Gedächtnis ist eine Information, die in der Wissensbasis deines Agenten gespeichert wird, sodass er sich über Gespräche hinweg an den Kontext erinnern kann.',
        },
      ],
    },
  },
  'message-send': {
    keywords: {
      en: ['send message', 'deliver message', 'room message', 'post message', 'channel message'],
      de: ['Nachricht senden', 'Nachricht übermitteln', 'Raum-Nachricht', 'Nachricht posten', 'Kanal-Nachricht'],
    },
    useCases: {
      en: [
        'Send a pre-written message to a specific room or channel',
        'Deliver output from another warp to a destination',
        'Forward generated alerts or notifications to a social channel',
      ],
      de: [
        'Eine vorbereitete Nachricht an einen bestimmten Raum oder Kanal senden',
        'Ausgabe eines anderen Warps an ein Ziel übermitteln',
        'Generierte Warnungen oder Benachrichtigungen an einen sozialen Kanal weiterleiten',
      ],
    },
    category: 'communication',
  },
  'message-generated-send': {
    keywords: {
      en: ['generate message', 'send AI message', 'automated notification', 'recurring reminder', 'agent message'],
      de: ['Nachricht generieren', 'KI Nachricht senden', 'automatische Benachrichtigung', 'wiederkehrende Erinnerung', 'Agent Nachricht'],
    },
    useCases: {
      en: [
        'Generate and send a daily status update to a Telegram room',
        'Create a reminder in the agent voice and deliver it to Slack',
        'Turn a monitoring result into a readable alert for a chat room',
      ],
      de: [
        'Ein tägliches Status-Update generieren und an einen Telegram-Raum senden',
        'Eine Erinnerung im Stil des Agenten erstellen und an Slack senden',
        'Ein Monitoring-Ergebnis in eine verständliche Warnung für einen Chat-Raum umwandeln',
      ],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'Can the agent write and send a message automatically?',
          answer: 'Yes. Provide an instruction and a destination, and the agent generates the message before delivering it to the selected room or channel.',
        },
        {
          question: 'Which destinations are supported?',
          answer: 'Messages can be sent to supported JoAi destinations such as Telegram, Slack, and rooms connected to the agent.',
        },
      ],
      de: [
        {
          question: 'Kann der Agent automatisch eine Nachricht schreiben und senden?',
          answer: 'Ja. Gib eine Anweisung und ein Ziel an, dann generiert der Agent die Nachricht und sendet sie an den gewählten Raum oder Kanal.',
        },
        {
          question: 'Welche Ziele werden unterstützt?',
          answer: 'Nachrichten können an unterstützte JoAi-Ziele wie Telegram, Slack und mit dem Agenten verbundene Räume gesendet werden.',
        },
      ],
    },
  },
  'document-create': {
    keywords: {
      en: ['save document', 'agent knowledge', 'store template', 'create document', 'add reference material'],
      de: ['Dokument speichern', 'Agentenwissen', 'Template erstellen', 'Dokument anlegen', 'Referenzmaterial hinzufügen'],
    },
    useCases: {
      en: [
        'Save an article or note to the agent knowledge base',
        'Store a reusable message template with structured metadata',
        'Add guidelines or reference material the agent should know about',
      ],
      de: [
        'Einen Artikel oder eine Notiz in der Wissensbasis speichern',
        'Ein wiederverwendbares Nachrichten-Template mit Metadaten anlegen',
        'Richtlinien oder Referenzmaterial hinterlegen, das der Agent kennen soll',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What types of documents can I save?',
          answer:
            'You can save text documents, templates, PDFs, HTML, and Markdown. Templates include metadata like slug, channel, and step number for use in outreach sequences.',
        },
        {
          question: 'What is a template document?',
          answer:
            'A template is a reusable message with variables like {{name}} and structured metadata (slug, channel, step). It is used by outreach and followup sequences to personalize messages.',
        },
      ],
      de: [
        {
          question: 'Welche Dokumenttypen kann ich speichern?',
          answer:
            'Du kannst Textdokumente, Templates, PDFs, HTML und Markdown speichern. Templates enthalten Metadaten wie Slug, Kanal und Schrittnummer für Outreach-Sequenzen.',
        },
        {
          question: 'Was ist ein Template-Dokument?',
          answer:
            'Ein Template ist eine wiederverwendbare Nachricht mit Variablen wie {{name}} und strukturierten Metadaten (Slug, Kanal, Schritt). Es wird von Outreach- und Followup-Sequenzen für personalisierte Nachrichten genutzt.',
        },
      ],
    },
  },
  'document-list': {
    keywords: {
      en: ['list documents', 'search documents', 'find template', 'browse knowledge base', 'show templates'],
      de: ['Dokumente auflisten', 'Dokumente suchen', 'Template finden', 'Wissensbasis durchsuchen', 'Templates anzeigen'],
    },
    useCases: {
      en: [
        'List all message templates for outreach sequences',
        'Search for a specific document by title',
        'Browse all stored knowledge base documents',
      ],
      de: [
        'Alle Nachrichten-Templates für Outreach-Sequenzen auflisten',
        'Nach einem bestimmten Dokument im Titel suchen',
        'Alle gespeicherten Wissensbasis-Dokumente durchsuchen',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'Can I filter documents by type?',
          answer:
            'Yes — use the type filter to list only templates, text documents, or any other supported type.',
        },
      ],
      de: [
        {
          question: 'Kann ich Dokumente nach Typ filtern?',
          answer:
            'Ja — nutze den Typ-Filter, um nur Templates, Textdokumente oder andere unterstützte Typen aufzulisten.',
        },
      ],
    },
  },
  'document-update': {
    keywords: {
      en: ['edit document', 'update template', 'change document content', 'modify knowledge base'],
      de: ['Dokument bearbeiten', 'Template aktualisieren', 'Dokumentinhalt ändern', 'Wissensbasis ändern'],
    },
    useCases: {
      en: [
        'Edit the content of an existing message template',
        'Update a document title or metadata',
        'Correct information stored in the knowledge base',
      ],
      de: [
        'Den Inhalt eines bestehenden Nachrichten-Templates bearbeiten',
        'Einen Dokumenttitel oder Metadaten aktualisieren',
        'Gespeicherte Informationen in der Wissensbasis korrigieren',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'Can I update only specific fields?',
          answer:
            'Yes — title, content, and metadata can each be updated independently. Omit any field to keep its current value.',
        },
      ],
      de: [
        {
          question: 'Kann ich nur bestimmte Felder aktualisieren?',
          answer:
            'Ja — Titel, Inhalt und Metadaten können unabhängig voneinander aktualisiert werden. Lass ein Feld weg, um den aktuellen Wert beizubehalten.',
        },
      ],
    },
  },
  'document-delete': {
    keywords: {
      en: ['delete document', 'remove template', 'delete from knowledge base', 'clean up documents'],
      de: ['Dokument löschen', 'Template entfernen', 'aus Wissensbasis löschen', 'Dokumente aufräumen'],
    },
    useCases: {
      en: [
        'Remove an outdated template from the knowledge base',
        'Delete a document that is no longer relevant',
        'Clean up test or duplicate documents',
      ],
      de: [
        'Ein veraltetes Template aus der Wissensbasis entfernen',
        'Ein nicht mehr relevantes Dokument löschen',
        'Test- oder Duplikat-Dokumente aufräumen',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'Can I undo a document deletion?',
          answer:
            'No, deletion is permanent. Make sure you have the content backed up if you might need it again.',
        },
      ],
      de: [
        {
          question: 'Kann ich eine Dokumentlöschung rückgängig machen?',
          answer:
            'Nein, die Löschung ist dauerhaft. Sichere den Inhalt, falls du ihn noch benötigen könntest.',
        },
      ],
    },
  },
  'ingest': {
    keywords: {
      en: ['ingest knowledge', 'extract insights', 'save notes', 'remember content', 'process text', 'AI extraction'],
      de: ['Wissen erfassen', 'Erkenntnisse extrahieren', 'Notizen speichern', 'Inhalt merken', 'Text verarbeiten', 'KI Extraktion'],
    },
    useCases: {
      en: [
        'Turn meeting notes into action items and reminders automatically',
        'Save an article and extract key memories and goals from it',
        'Process a support ticket and create contacts, items, and follow-ups',
        'Ingest CRM notes to automatically surface reminders and tasks',
      ],
      de: [
        'Meeting-Notizen automatisch in Aufgaben und Erinnerungen umwandeln',
        'Einen Artikel speichern und wichtige Erinnerungen und Ziele daraus extrahieren',
        'Ein Support-Ticket verarbeiten und Kontakte, Aufgaben und Follow-ups erstellen',
        'CRM-Notizen erfassen, um automatisch Erinnerungen und Aufgaben zu generieren',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What types of content can be ingested?',
          answer: 'Any text content — notes, articles, meeting transcripts, emails, or URLs to web pages, YouTube videos, and X/Twitter posts.',
        },
        {
          question: 'What happens after ingestion?',
          answer: 'Your agent extracts structured primitives like reminders, action items, goals, and memories from the content and creates them automatically.',
        },
      ],
      de: [
        {
          question: 'Welche Inhalte können erfasst werden?',
          answer: 'Jeglicher Text — Notizen, Artikel, Meeting-Transkripte, E-Mails oder URLs zu Webseiten, YouTube-Videos und X/Twitter-Beiträgen.',
        },
        {
          question: 'Was passiert nach der Erfassung?',
          answer: 'Dein Agent extrahiert strukturierte Primitive wie Erinnerungen, Aufgaben, Ziele und Erinnerungen aus dem Inhalt und legt sie automatisch an.',
        },
      ],
    },
  },
  'contact-find-or-create': {
    keywords: {
      en: ['find contact', 'create contact', 'contact lookup', 'find or create', 'CRM', 'address book'],
      de: ['Kontakt suchen', 'Kontakt erstellen', 'Kontakt lookup', 'suchen oder erstellen', 'CRM', 'Adressbuch'],
    },
    useCases: {
      en: [
        'Look up a customer contact by name before assigning them to a task',
        'Create a contact on the fly when recording a new work order',
        'Find an existing contact by email or phone to link to a new order',
      ],
      de: [
        'Einen Kundenkontakt vor der Zuweisung zu einer Aufgabe suchen',
        'Bei der Erfassung eines neuen Arbeitsauftrags automatisch einen Kontakt anlegen',
        'Einen vorhandenen Kontakt per E-Mail oder Telefon finden und mit einer Rechnung verknüpfen',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What happens if multiple contacts match?',
          answer: 'The first matching contact by name, email, or phone is returned. If no match is found, a new contact is created.',
        },
        {
          question: 'Can I link this to other actions?',
          answer: 'Yes, the warp returns a contact ID that can be chained to item creation, invoicing, or other warps.',
        },
      ],
      de: [
        {
          question: 'Was passiert bei mehreren Treffern?',
          answer: 'Der erste passende Kontakt per Name, E-Mail oder Telefon wird zurückgegeben. Bei keinem Treffer wird ein neuer Kontakt angelegt.',
        },
        {
          question: 'Kann ich das mit anderen Aktionen verknüpfen?',
          answer: 'Ja, der Warp gibt eine Kontakt-ID zurück, die mit Aufgabenerstellung, Rechnungen oder anderen Warps verkettet werden kann.',
        },
      ],
    },
  },
  'order-create': {
    keywords: {
      en: ['create order', 'billing order', 'generate invoice', 'bill customer', 'order from products'],
      de: ['Bestellung erstellen', 'Rechnung erstellen', 'Kunde abrechnen', 'Produktbestellung'],
    },
    useCases: {
      en: ['Bill a customer for products used during a service call', 'Generate an order with invoice from team products'],
      de: ['Kunden für verbaute Materialien abrechnen', 'Bestellung mit Rechnung aus Team-Produkten erstellen'],
    },
    category: 'commerce',
    faq: {
      en: [
        { question: 'What is the difference between an order and an invoice?', answer: 'An order is created through the billing system and automatically generates an invoice with a payment URL.' },
        { question: 'Can I use products not in my catalog?', answer: 'Products must exist in your team catalog. Create missing products first via Product Create.' },
      ],
      de: [
        { question: 'Was ist der Unterschied zwischen Bestellung und Rechnung?', answer: 'Eine Bestellung wird im Abrechnungssystem erstellt und erzeugt automatisch eine Rechnung mit Zahlungslink.' },
        { question: 'Kann ich Produkte verwenden, die nicht in meinem Katalog sind?', answer: 'Produkte müssen im Team-Katalog existieren. Fehlende Produkte zuerst via Produkt erstellen anlegen.' },
      ],
    },
  },
  'service-list': {
    keywords: {
      en: ['list services', 'view services', 'service catalog', 'billable services', 'appointment services'],
      de: ['Dienstleistungen anzeigen', 'Service-Katalog', 'abrechenbare Leistungen', 'Termin-Dienstleistungen'],
    },
    useCases: {
      en: [
        'View all services and hourly rates in your team catalog',
        'Find a service ID to use in appointment settings',
        'Check which services are available for invoicing',
      ],
      de: [
        'Alle Dienstleistungen und Stundensätze im Team-Katalog anzeigen',
        'Eine Service-ID für die Termineinstellungen finden',
        'Prüfen, welche Dienstleistungen für Rechnungen verfügbar sind',
      ],
    },
    category: 'productivity',
  },
  'service-create': {
    keywords: {
      en: ['create service', 'add service', 'new billable service', 'appointment type', 'service catalog'],
      de: ['Dienstleistung erstellen', 'Service hinzufügen', 'neue abrechenbare Leistung', 'Terminart', 'Service-Katalog'],
    },
    useCases: {
      en: [
        'Add a new service type for appointment booking',
        'Create a billable service with a set price and duration',
        'Set up consultation, maintenance, or repair service offerings',
      ],
      de: [
        'Einen neuen Dienstleistungstyp für Terminbuchungen hinzufügen',
        'Eine abrechenbare Dienstleistung mit festem Preis und Dauer erstellen',
        'Beratungs-, Wartungs- oder Reparaturleistungen anlegen',
      ],
    },
    category: 'productivity',
  },
  'service-update': {
    keywords: {
      en: ['update service', 'edit service', 'change service price', 'modify service duration', 'service settings'],
      de: ['Dienstleistung aktualisieren', 'Service bearbeiten', 'Preis ändern', 'Dauer anpassen', 'Service-Einstellungen'],
    },
    useCases: {
      en: [
        'Change the price of an existing service',
        'Update the duration of a service for appointment booking',
        'Activate or deactivate a service in your catalog',
      ],
      de: [
        'Den Preis einer bestehenden Dienstleistung ändern',
        'Die Dauer einer Dienstleistung für Terminbuchungen anpassen',
        'Eine Dienstleistung im Katalog aktivieren oder deaktivieren',
      ],
    },
    category: 'productivity',
  },
  'service-delete': {
    keywords: {
      en: ['delete service', 'remove service', 'archive service', 'service catalog cleanup'],
      de: ['Dienstleistung löschen', 'Service entfernen', 'Service archivieren', 'Katalog bereinigen'],
    },
    useCases: {
      en: [
        'Remove an outdated service from your team catalog',
        'Delete a service that is no longer offered',
        'Clean up duplicate or unused service entries',
      ],
      de: [
        'Eine veraltete Dienstleistung aus dem Team-Katalog entfernen',
        'Eine nicht mehr angebotene Dienstleistung löschen',
        'Doppelte oder ungenutzte Service-Einträge bereinigen',
      ],
    },
    category: 'productivity',
  },
  'service-subscribe': {
    keywords: {
      en: ['subscribe', 'subscription', 'recurring', 'service', 'billing', 'monthly', 'auto-renew'],
      de: ['abonnieren', 'abonnement', 'wiederkehrend', 'dienstleistung', 'monatlich', 'automatisch verlängern'],
    },
    useCases: {
      en: [
        'Subscribe a customer to a monthly support service with auto-renewal',
        'Set up recurring billing for a contact on a team service',
        'Create a subscription plan for ongoing service delivery',
      ],
      de: [
        'Einen Kunden für einen monatlichen Support-Service mit automatischer Verlängerung anmelden',
        'Wiederkehrende Zahlungen für einen Kontakt auf einen Team-Service einrichten',
        'Ein Abonnement für wiederkehrende Dienstleistungen erstellen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        { question: 'What happens after the initial subscription order?', answer: 'The subscription renews automatically each month. A new pending order with invoice is created and the customer pays via the payment link.' },
        { question: 'Can I cancel a subscription?', answer: 'Yes, use the Cancel Subscription action. Future renewals are stopped. Existing unpaid orders remain valid.' },
      ],
      de: [
        { question: 'Was passiert nach der ersten Bestellung?', answer: 'Das Abonnement verlängert sich automatisch jeden Monat. Eine neue Bestellung mit Rechnung wird erstellt und der Kunde bezahlt über den Zahlungslink.' },
        { question: 'Kann ich ein Abonnement kündigen?', answer: 'Ja, nutze die Aktion "Abonnement kündigen". Zukünftige Verlängerungen werden gestoppt. Bestehende unbezahlte Bestellungen bleiben gültig.' },
      ],
    },
  },
  'service-subscribe-cancel': {
    keywords: {
      en: ['cancel', 'subscription', 'unsubscribe', 'stop', 'service', 'recurring'],
      de: ['kündigen', 'abonnement', 'abmelden', 'stoppen', 'dienstleistung', 'wiederkehrend'],
    },
    useCases: {
      en: [
        'Cancel a customer subscription when they request to stop',
        'End recurring billing for a service that is no longer needed',
        'Stop auto-renewal of a monthly service plan',
      ],
      de: [
        'Ein Kunden-Abonnement auf Wunsch kündigen',
        'Wiederkehrende Zahlungen für einen nicht mehr benötigten Service beenden',
        'Die automatische Verlängerung eines monatlichen Serviceplans stoppen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        { question: 'Does canceling affect already paid orders?', answer: 'No, only future renewals are stopped. Already paid orders and invoices remain valid.' },
        { question: 'Can I reactivate a canceled subscription?', answer: 'Not yet — you would need to create a new subscription via the Subscribe to Service action.' },
      ],
      de: [
        { question: 'Hat die Kündigung Auswirkungen auf bereits bezahlte Bestellungen?', answer: 'Nein, nur zukünftige Verlängerungen werden gestoppt. Bereits bezahlte Bestellungen und Rechnungen bleiben gültig.' },
        { question: 'Kann ich ein gekündigtes Abo reaktivieren?', answer: 'Noch nicht — du müsstest ein neues Abonnement über die Aktion "Service abonnieren" erstellen.' },
      ],
    },
  },

  'product-variation-create': {
    keywords: {
      en: ['add variation', 'volume pricing', 'price tier', 'bulk discount', 'product SKU', 'pricing tier'],
      de: ['Variante hinzufügen', 'Mengenrabatt', 'Preisstaffel', 'Staffelpreis', 'Produkt-SKU', 'Preisstufe'],
    },
    useCases: {
      en: [
        'Add a "10-49 cards" volume pricing tier to a business card product',
        'Set up bulk discount tiers: €8 for 1-9, €4 for 10-49, €3 for 50-99',
        'Create a wholesale tier with custom pricing for orders above 100 units',
      ],
      de: [
        'Eine "10-49 Karten" Mengenrabatt-Stufe zu einem Visitenkartenprodukt hinzufügen',
        'Staffelpreise einrichten: €8 für 1-9, €4 für 10-49, €3 für 50-99',
        'Eine Großhandelsstufe mit individuellem Preis für Bestellungen über 100 Stück erstellen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        { question: 'Can I add multiple variations at once?', answer: 'This warp adds one variation at a time. For multiple tiers, call it once per variation.' },
        { question: 'What is a volume variation?', answer: 'A volume variation sets a different price per unit based on the quantity ordered. For example, €8/card for 1-9 cards and €4/card for 10-49 cards.' },
      ],
      de: [
        { question: 'Kann ich mehrere Varianten auf einmal hinzufügen?', answer: 'Dieser Warp fügt eine Variante auf einmal hinzu. Für mehrere Stufen rufe ihn pro Variante auf.' },
        { question: 'Was ist eine Mengenvariante?', answer: 'Eine Mengenvariante setzt einen anderen Preis pro Einheit basierend auf der bestellten Menge. Zum Beispiel €8/Karte für 1-9 Karten und €4/Karte für 10-49 Karten.' },
      ],
    },
  },
  'update-create': {
    keywords: {
      en: ['post update', 'create deal', 'publish event', 'business news', 'local announcement'],
      de: ['Update veröffentlichen', 'Angebot erstellen', 'Event veröffentlichen', 'Betriebsnews', 'lokale Ankündigung'],
    },
    useCases: {
      en: ['Publish a limited-time offer for customers', 'Announce an upcoming event on a business profile', 'Post local business news to connected directories'],
      de: ['Ein zeitlich begrenztes Angebot für Kunden veröffentlichen', 'Ein bevorstehendes Event im Betriebsprofil ankündigen', 'Lokale Betriebsnews in verbundenen Verzeichnissen posten'],
    },
    category: 'communication',
    faq: {
      en: [
        { question: 'Can I publish deals, events, and news?', answer: 'Yes. Use deal for offers, event for appointments or happenings, and update for news-style announcements.' },
        { question: 'Can an update be scheduled?', answer: 'Yes. Add startsAt and endsAt to control when the update is active.' },
      ],
      de: [
        { question: 'Kann ich Angebote, Events und News veröffentlichen?', answer: 'Ja. Nutze deal für Angebote, event für Veranstaltungen und update für News oder allgemeine Ankündigungen.' },
        { question: 'Kann ein Update geplant werden?', answer: 'Ja. Mit startsAt und endsAt steuerst du, wann das Update aktiv ist.' },
      ],
    },
  },
  'update-list': {
    keywords: {
      en: ['list updates', 'view deals', 'view events', 'business announcements', 'active updates'],
      de: ['Updates anzeigen', 'Angebote anzeigen', 'Events anzeigen', 'Betriebsankündigungen', 'aktive Updates'],
    },
    useCases: {
      en: ['Check currently active customer announcements', 'Filter updates by deal, event, or news type', 'Review published content before editing it'],
      de: ['Aktive Kundenankündigungen prüfen', 'Updates nach Angebot, Event oder News filtern', 'Veröffentlichte Inhalte vor dem Bearbeiten prüfen'],
    },
    category: 'communication',
    faq: {
      en: [
        { question: 'Can I filter updates by type?', answer: 'Yes. Filter by deal, event, or update. Use update for news-style posts.' },
        { question: 'Does this show only visible updates?', answer: 'By default active updates are shown, but you can adjust the active and status filters.' },
      ],
      de: [
        { question: 'Kann ich Updates nach Typ filtern?', answer: 'Ja. Filtere nach deal, event oder update. Für News verwendest du update.' },
        { question: 'Zeigt diese Aktion nur sichtbare Updates?', answer: 'Standardmäßig werden aktive Updates angezeigt, du kannst active und status aber anpassen.' },
      ],
    },
  },
  'update-update': {
    keywords: {
      en: ['edit update', 'update deal', 'edit event', 'change business news', 'announcement status'],
      de: ['Update bearbeiten', 'Angebot bearbeiten', 'Event bearbeiten', 'Betriebsnews ändern', 'Ankündigungsstatus'],
    },
    useCases: {
      en: ['Change the dates of an event announcement', 'Archive an expired deal', 'Correct the title or link of a news post'],
      de: ['Den Zeitraum einer Event-Ankündigung ändern', 'Ein abgelaufenes Angebot archivieren', 'Titel oder Link einer News korrigieren'],
    },
    category: 'communication',
    faq: {
      en: [
        { question: 'Can I change the type of an update?', answer: 'Yes. Existing posts can be changed between deal, event, and update when needed.' },
        { question: 'Can I unpublish an update?', answer: 'Yes. Set its status to draft or archived depending on whether it should be hidden or retired.' },
      ],
      de: [
        { question: 'Kann ich den Typ eines Updates ändern?', answer: 'Ja. Bestehende Beiträge können bei Bedarf zwischen deal, event und update wechseln.' },
        { question: 'Kann ich ein Update ausblenden?', answer: 'Ja. Setze den Status auf draft oder archived, je nachdem ob es versteckt oder endgültig erledigt ist.' },
      ],
    },
  },
  'update-delete': {
    keywords: {
      en: ['delete update', 'remove deal', 'delete event', 'remove announcement', 'delete business news'],
      de: ['Update löschen', 'Angebot entfernen', 'Event löschen', 'Ankündigung entfernen', 'Betriebsnews löschen'],
    },
    useCases: {
      en: ['Remove an outdated announcement from public feeds', 'Delete a duplicate deal', 'Clean up a canceled event'],
      de: ['Eine veraltete Ankündigung aus öffentlichen Feeds entfernen', 'Ein doppeltes Angebot löschen', 'Ein abgesagtes Event bereinigen'],
    },
    category: 'communication',
    faq: {
      en: [
        { question: 'Should I delete or archive an update?', answer: 'Archive content you may want to keep for history. Delete only when the update should be removed permanently.' },
        { question: 'Do I need the update ID?', answer: 'Yes. If you only know the title, list updates first to find the matching ID.' },
      ],
      de: [
        { question: 'Soll ich ein Update löschen oder archivieren?', answer: 'Archiviere Inhalte, die historisch erhalten bleiben sollen. Lösche nur, wenn das Update dauerhaft entfernt werden soll.' },
        { question: 'Brauche ich die Update-ID?', answer: 'Ja. Wenn du nur den Titel kennst, liste zuerst die Updates, um die passende ID zu finden.' },
      ],
    },
  },
  'update-stats': {
    keywords: {
      en: ['update statistics', 'deal count', 'event count', 'news count', 'announcement analytics'],
      de: ['Update Statistik', 'Anzahl Angebote', 'Anzahl Events', 'Anzahl News', 'Ankündigungsanalyse'],
    },
    useCases: {
      en: ['Check how many deals are currently managed', 'See event and news post counts for a business profile', 'Audit customer-facing content coverage'],
      de: ['Prüfen, wie viele Angebote verwaltet werden', 'Event- und News-Zahlen für ein Betriebsprofil ansehen', 'Kundenrelevante Inhalte auf Vollständigkeit prüfen'],
    },
    category: 'analytics',
    faq: {
      en: [
        { question: 'What counts are included?', answer: 'The stats include deals, events, and news-style updates for the team.' },
        { question: 'Can this help audit a business profile?', answer: 'Yes. Use it to see whether a profile has enough current customer-facing content.' },
      ],
      de: [
        { question: 'Welche Zahlen sind enthalten?', answer: 'Die Statistik enthält Angebote, Events und News-Updates des Teams.' },
        { question: 'Hilft das beim Prüfen eines Betriebsprofils?', answer: 'Ja. Damit siehst du, ob ein Profil genug aktuelle kundenrelevante Inhalte hat.' },
      ],
    },
  },
}
