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
  'media-import': {
    keywords: {
      en: ['import WhatsApp media', 'download WhatsApp photo', 'import WhatsApp voice note', 'attach WhatsApp file'],
      de: ['WhatsApp Medien importieren', 'WhatsApp Foto herunterladen', 'WhatsApp Sprachnachricht importieren', 'WhatsApp Datei anhängen'],
    },
    useCases: {
      en: ['Import a personal WhatsApp voice note or photo into JoAi', 'Attach synced WhatsApp media so the agent can use it'],
      de: ['Persönliche WhatsApp-Sprachnachricht oder Foto in JoAi importieren', 'Synchronisierte WhatsApp-Medien anhängen, damit der Agent sie nutzen kann'],
    },
    category: 'communication',
  },
  'send-media': {
    keywords: {
      en: ['send WhatsApp photo', 'send WhatsApp file', 'send WhatsApp media', 'share image on WhatsApp'],
      de: ['WhatsApp Foto senden', 'WhatsApp Datei senden', 'WhatsApp Medien senden', 'Bild über WhatsApp teilen'],
    },
    useCases: {
      en: ['Send a photo or document through personal WhatsApp', 'Share a local or JoAi media file with a contact or group'],
      de: ['Foto oder Dokument über persönliches WhatsApp senden', 'Lokale oder JoAi-Mediendatei an Kontakt oder Gruppe teilen'],
    },
    category: 'communication',
  },
  'send-voice': {
    keywords: {
      en: ['send WhatsApp voice note', 'send voice message', 'WhatsApp audio'],
      de: ['WhatsApp Sprachnachricht senden', 'Sprachnachricht senden', 'WhatsApp Audio'],
    },
    useCases: {
      en: ['Send an OGG/Opus voice note through personal WhatsApp', 'Reply with audio to a WhatsApp Personal contact or group'],
      de: ['OGG/Opus-Sprachnachricht über persönliches WhatsApp senden', 'Mit Audio an einen WhatsApp-Personal-Kontakt oder eine Gruppe antworten'],
    },
    category: 'communication',
  },
}
