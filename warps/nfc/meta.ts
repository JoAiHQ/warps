import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'nfc-write': {
    keywords: {
      en: ['nfc tag write', 'nfc link', 'program nfc', 'nfc url', 'create nfc link', 'nfc short link', 'nfc qr code alternative'],
      de: ['NFC-Tag beschreiben', 'NFC-Link', 'NFC programmieren', 'NFC-URL', 'NFC-Link erstellen', 'NFC-Kurzlink', 'NFC-Alternative zu QR'],
    },
    useCases: {
      en: [
        'Create a short link for a business card NFC tag',
        'Program an NFC tag for a product page or portfolio',
        'Set up an NFC link for a restaurant menu or flyer',
      ],
      de: [
        'Einen Kurzlink für einen NFC-Visitenkarten-Tag erstellen',
        'Einen NFC-Tag für eine Produktseite oder ein Portfolio programmieren',
        'Einen NFC-Link für eine Restaurant-Speisekarte oder einen Flyer einrichten',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How do I write a URL to an NFC tag?',
          answer: 'This warp creates a short link that you can write to any NFC tag using your phone\'s NFC writing app (like NFC Tools for iOS/Android). The link redirects to your chosen URL and tracks scans automatically.',
        },
        {
          question: 'Do I need special hardware for NFC tags?',
          answer: 'Any smartphone can read and write NFC tags. You just need blank NFC stickers or cards — they cost a few cents each and work with any NFC writing app.',
        },
      ],
      de: [
        {
          question: 'Wie schreibe ich eine URL auf einen NFC-Tag?',
          answer: 'Dieser Warp erstellt einen Kurzlink, den du mit einer NFC-Schreib-App (wie NFC Tools für iOS/Android) auf jeden NFC-Tag schreiben kannst. Der Link leitet auf deine gewählte URL weiter und zählt Scans automatisch.',
        },
        {
          question: 'Brauche ich spezielle Hardware für NFC-Tags?',
          answer: 'Jedes Smartphone kann NFC-Tags lesen und beschreiben. Du brauchst nur leere NFC-Aufkleber oder -Karten — sie kosten nur wenige Cent pro Stück und funktionieren mit jeder NFC-Schreib-App.',
        },
      ],
    },
  },
}
