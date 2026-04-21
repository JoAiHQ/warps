import type { WarpExtras } from '../types'

const sharedKeywords = {
  en: [
    'AI calendar', 'AI schedule', 'AI meeting', 'AI appointment', 'AI calendar assistant',
    'schedule meeting', 'book appointment', 'create event', 'add calendar event',
    'update event', 'reschedule meeting', 'delete event', 'cancel meeting',
    'list events', 'upcoming meetings', 'next meeting', 'free time',
    'calendar availability', 'agent scheduling', 'AI scheduling', 'smart scheduling',
  ],
  de: [
    'KI Kalender', 'KI Termine', 'KI Meeting', 'KI Terminplaner',
    'Termin vereinbaren', 'Termin buchen', 'Termin erstellen', 'Kalendereintrag hinzufügen',
    'Termin aktualisieren', 'Termin verschieben', 'Termin löschen', 'Meeting absagen',
    'Termine auflisten', 'kommende Termine', 'nächstes Meeting', 'freie Zeit',
    'Kalenderverfügbarkeit', 'KI Terminplanung', 'intelligente Terminplanung',
  ],
  fr: [
    'IA calendrier', 'IA planning', 'IA reunion', 'IA rendez-vous',
    'planifier reunion', 'reserver rendez-vous', 'creer evenement',
    'modifier evenement', 'annuler reunion', 'supprimer evenement',
    'lister evenements', 'prochain rendez-vous', 'disponibilite',
  ],
  es: [
    'IA calendario', 'IA agenda', 'IA reunion', 'IA cita',
    'programar reunion', 'reservar cita', 'crear evento',
    'modificar evento', 'cancelar reunion', 'eliminar evento',
    'listar eventos', 'proxima reunion', 'disponibilidad',
  ],
  ro: [
    'AI calendar', 'AI agenda', 'AI intalnire', 'AI programare',
    'programeaza intalnire', 'rezerva programare', 'creeaza eveniment',
    'modifica eveniment', 'anuleaza intalnire', 'sterge eveniment',
    'listeaza evenimente', 'urmatoarea intalnire', 'disponibilitate',
  ],
}

const sharedFaq = {
  en: [
    {
      question: 'Which calendar providers are supported?',
      answer: 'Google Calendar, Microsoft Outlook/Exchange, and Apple iCloud Calendar. The warp is provider-agnostic — it always routes through the calendar integration connected to your agent, so you use the same interface regardless of provider.',
    },
    {
      question: 'Does the agent create events without my approval?',
      answer: 'No. Calendar writes run through the warp approval pipeline unless the agent is explicitly in auto mode. You see a preview card and approve before the event is created.',
    },
    {
      question: 'How is the calendar connection handled?',
      answer: 'Connect Google Calendar (or Microsoft/Apple) once from the agent\'s integration settings. The warp uses the tokens stored on that integration to make the call — no need to manage OAuth tokens per warp.',
    },
    {
      question: 'Does event creation sync back to my actual calendar?',
      answer: 'Yes. Events are written to the connected provider (Google/Microsoft/Apple) and appear in your native calendar app alongside events created elsewhere.',
    },
  ],
  de: [
    {
      question: 'Welche Kalenderanbieter werden unterstützt?',
      answer: 'Google Calendar, Microsoft Outlook/Exchange und Apple iCloud Calendar. Der Warp ist anbieterunabhängig — er läuft immer über die verbundene Kalenderintegration deines Agenten, die Oberfläche ist unabhängig vom Anbieter gleich.',
    },
    {
      question: 'Erstellt der Agent Termine ohne meine Zustimmung?',
      answer: 'Nein. Kalenderschreibvorgänge laufen über die Warp-Freigabe, außer der Agent ist explizit im Auto-Modus. Du siehst eine Vorschau und bestätigst, bevor der Termin angelegt wird.',
    },
    {
      question: 'Wie wird die Kalenderverbindung gehandhabt?',
      answer: 'Verbinde Google Calendar (oder Microsoft/Apple) einmal in den Integrationseinstellungen des Agenten. Der Warp nutzt die dort gespeicherten Tokens — kein OAuth-Management pro Warp nötig.',
    },
    {
      question: 'Wird die Termin-Erstellung zurück in meinen Kalender synchronisiert?',
      answer: 'Ja. Ereignisse werden direkt beim verbundenen Anbieter (Google/Microsoft/Apple) geschrieben und erscheinen in deiner nativen Kalender-App neben anderweitig erstellten Einträgen.',
    },
  ],
}

export const meta: Record<string, WarpExtras> = {
  'create-event': {
    keywords: sharedKeywords,
    useCases: {
      en: [
        'Schedule a meeting with a client from the agent chat in one message',
        'Block focus time on your calendar by describing it to the agent',
        'Create a recurring personal reminder (workout, medication, review) via natural language',
        'Have the agent schedule a follow-up after an email or call without switching apps',
      ],
      de: [
        'Einen Kundentermin direkt aus dem Agent-Chat mit einer Nachricht buchen',
        'Fokuszeit im Kalender blockieren, indem du sie dem Agenten beschreibst',
        'Wiederkehrende persönliche Erinnerungen (Training, Medikation, Review) per Sprache anlegen',
        'Nach einer E-Mail oder einem Anruf einen Follow-up-Termin vom Agenten planen lassen',
      ],
    },
    category: 'productivity',
    faq: sharedFaq,
  },
  'update-event': {
    keywords: sharedKeywords,
    useCases: {
      en: [
        'Reschedule a meeting to a later time by asking the agent',
        'Change the location of an event (e.g. Zoom → physical address) in one message',
        'Update the title or description of an existing event without opening your calendar app',
      ],
      de: [
        'Ein Meeting auf einen späteren Zeitpunkt verschieben — einfach per Sprache',
        'Den Ort eines Termins ändern (z. B. Zoom → Adresse) mit einer Nachricht',
        'Titel oder Beschreibung eines Termins anpassen, ohne die Kalender-App zu öffnen',
      ],
    },
    category: 'productivity',
    faq: sharedFaq,
  },
  'delete-event': {
    keywords: sharedKeywords,
    useCases: {
      en: [
        'Cancel a meeting from the agent chat with one sentence',
        'Remove a mistakenly created event without hunting through your calendar UI',
        'Clean up duplicate events via natural language',
      ],
      de: [
        'Ein Meeting aus dem Agent-Chat mit einem Satz absagen',
        'Einen fälschlich angelegten Termin entfernen, ohne die Kalender-Oberfläche zu durchsuchen',
        'Doppelte Einträge per Sprache bereinigen',
      ],
    },
    category: 'productivity',
    faq: sharedFaq,
  },
  'list-events': {
    keywords: sharedKeywords,
    useCases: {
      en: [
        'Ask the agent what\'s on your calendar today or this week',
        'Find your next meeting or the nearest free slot',
        'Surface upcoming events for context before another action (e.g. "am I free at 3pm?")',
      ],
      de: [
        'Den Agenten fragen, was heute oder diese Woche im Kalender steht',
        'Das nächste Meeting oder den nächsten freien Slot finden',
        'Kommende Termine als Kontext für andere Aktionen aufrufen (z. B. "bin ich um 15 Uhr frei?")',
      ],
    },
    category: 'productivity',
    faq: sharedFaq,
  },
}
