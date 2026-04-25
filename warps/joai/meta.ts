import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
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
}
