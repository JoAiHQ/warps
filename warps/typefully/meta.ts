import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'create-draft': {
    keywords: {
      en: ['create draft', 'Typefully draft', 'schedule post', 'social media draft', 'Twitter draft', 'X post draft', 'schedule tweet'],
      de: ['Entwurf erstellen', 'Typefully Entwurf', 'Beitrag planen', 'Social-Media-Entwurf', 'Twitter Entwurf', 'X Beitrag Entwurf', 'Tweet planen'],
    },
    useCases: {
      en: ['Draft a tweet thread and schedule it for peak engagement hours', 'Publish a LinkedIn post immediately through Typefully', 'Queue up a week of social media content in advance'],
      de: ['Einen Tweet-Thread entwerfen und für Spitzeninteraktionszeiten planen', 'Einen LinkedIn-Beitrag sofort über Typefully veröffentlichen', 'Eine Woche Social-Media-Inhalte im Voraus einreihen'],
    },
    category: 'social',
    faq: {
      en: [
        {
          question: 'How do I create or schedule a post on Typefully?',
          answer:
            'Write a new draft post on Typefully and either publish it immediately or schedule it for a specific time.',
        },
      ],
      de: [
        {
          question: 'Wie erstelle oder plane ich einen Beitrag auf Typefully?',
          answer:
            'Schreibe einen neuen Entwurf auf Typefully und veröffentliche ihn sofort oder plane ihn für einen bestimmten Zeitpunkt.',
        },
      ],
    },
  },
}
