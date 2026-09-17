import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'cli-update': {
    keywords: {
      en: ['update wacli', 'latest WhatsApp CLI', 'fix WhatsApp sync'],
      de: ['wacli aktualisieren', 'neueste WhatsApp CLI', 'WhatsApp Sync reparieren'],
    },
    useCases: {
      en: ['Install the latest compatible wacli release', 'Fix sync failures caused by an outdated WhatsApp protocol', 'Keep personal WhatsApp sending reliable'],
      de: ['Die neueste kompatible wacli-Version installieren', 'Sync-Fehler durch ein veraltetes WhatsApp-Protokoll beheben', 'Persönliche WhatsApp-Nachrichten zuverlässig senden'],
    },
    category: 'communication',
    faq: {
      en: [
        { question: 'How do I update wacli?', answer: 'Run this action in the JoAi desktop app to download and verify the latest supported release.' },
        { question: 'Will updating remove my WhatsApp pairing?', answer: 'No. The update replaces only the executable and keeps your local WhatsApp account data.' },
      ],
      de: [
        { question: 'Wie aktualisiere ich wacli?', answer: 'Führe diese Aktion in der JoAi Desktop-App aus, um die neueste unterstützte Version herunterzuladen und zu prüfen.' },
        { question: 'Geht meine WhatsApp-Kopplung beim Update verloren?', answer: 'Nein. Das Update ersetzt nur das Programm und behält deine lokalen WhatsApp-Kontodaten.' },
      ],
    },
  },
}
