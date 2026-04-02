import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
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
}
