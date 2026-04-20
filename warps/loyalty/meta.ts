import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'loyalty-create': {
    keywords: {
      en: ['create loyalty program', 'setup loyalty', 'launch loyalty', 'new loyalty program', 'start loyalty'],
      de: ['Treueprogramm erstellen', 'Treue einrichten', 'Treueprogramm starten', 'neues Treueprogramm'],
    },
    useCases: {
      en: ['Create a stamp card loyalty program for a new coffee shop', 'Launch a rewards program for repeat customers', 'Register your business on-chain to issue loyalty cards'],
      de: ['Ein Stempelkarten-Treueprogramm für ein neues Café erstellen', 'Ein Prämienprogramm für Stammkunden starten', 'Dein Unternehmen on-chain registrieren, um Treuekarten auszustellen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I create a loyalty program?',
          answer: 'Your team slug is used as the unique identifier on-chain. Simply run this warp and your loyalty program is registered instantly.',
        },
      ],
      de: [
        {
          question: 'Wie erstelle ich ein Treueprogramm?',
          answer: 'Dein Team-Slug wird als eindeutiger Bezeichner on-chain verwendet. Starte diesen Warp und dein Treueprogramm ist sofort registriert.',
        },
      ],
    },
  },

  'loyalty-configure': {
    keywords: {
      en: ['configure loyalty program', 'loyalty settings', 'stamp card setup', 'rewards program config'],
      de: ['Treueprogramm konfigurieren', 'Treue-Einstellungen', 'Stempelkarte einrichten', 'Bonusprogramm konfigurieren'],
    },
    useCases: {
      en: ['Set how many stamps customers need for a free reward', 'Configure a Google review discount incentive', 'Adjust loyalty program rules based on seasonal promotions'],
      de: ['Festlegen, wie viele Stempel Kunden für eine Gratisprämie benötigen', 'Google-Bewertungsrabatt konfigurieren', 'Treueprogramm-Regeln basierend auf saisonalen Aktionen anpassen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What can I customize in my loyalty program?',
          answer: 'You can set stamps required for a reward, the reward label, a Google review URL with discount percentage, and the inactivity reminder threshold in days.',
        },
      ],
      de: [
        {
          question: 'Was kann ich in meinem Treueprogramm anpassen?',
          answer: 'Du kannst die Stempel für eine Prämie, das Prämien-Label, eine Google-Bewertungs-URL mit Rabatt und den Inaktivitäts-Erinnerungsschwellenwert in Tagen festlegen.',
        },
      ],
    },
  },

  'loyalty-register': {
    keywords: {
      en: ['join loyalty program', 'register loyalty card', 'sign up rewards', 'loyalty membership', 'enroll loyalty'],
      de: ['Treueprogramm beitreten', 'Treuekarte registrieren', 'für Bonusprogramm anmelden', 'Treue-Mitgliedschaft', 'Treueprogramm Anmeldung'],
    },
    useCases: {
      en: ['Sign up for a coffee shop stamp card to earn a free drink', 'Join a store loyalty program to receive exclusive discounts', 'Register for rewards to get cashback on regular purchases'],
      de: ['Sich für eine Café-Stempelkarte anmelden, um ein Gratisgetränk zu verdienen', 'Einem Shop-Treueprogramm beitreten, um exklusive Rabatte zu erhalten', 'Sich für Prämien registrieren, um Cashback bei regelmäßigen Einkäufen zu erhalten'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I register for a loyalty program?',
          answer: 'Tap your NFC card and fill in your name and email. Your card is registered on-chain instantly and your first stamp is awarded.',
        },
        {
          question: 'Is there a cost to join a loyalty program?',
          answer: 'No, joining is completely free. You simply register and start collecting stamps.',
        },
      ],
      de: [
        {
          question: 'Wie registriere ich mich für ein Treueprogramm?',
          answer: 'Tippe deine NFC-Karte an und gib deinen Namen und deine E-Mail ein. Deine Karte wird sofort on-chain registriert und dein erster Stempel wird vergeben.',
        },
        {
          question: 'Kostet die Teilnahme am Treueprogramm etwas?',
          answer: 'Nein, die Teilnahme ist völlig kostenlos. Du registrierst dich einfach und beginnst Stempel zu sammeln.',
        },
      ],
    },
  },

  'loyalty-stamp': {
    keywords: {
      en: ['add loyalty stamp', 'collect stamp', 'loyalty punch', 'earn stamp', 'stamp card'],
      de: ['Treuestempel hinzufügen', 'Stempel sammeln', 'Treuepunkt', 'Stempel verdienen', 'Stempelkarte'],
    },
    useCases: {
      en: ['Stamp a customer card after they make a purchase', 'Award a stamp via NFC tap', 'Track customer progress toward their next loyalty reward'],
      de: ['Eine Kundenkarte nach einem Einkauf abstempeln', 'Einen Stempel per NFC-Tap vergeben', 'Den Kundenfortschritt zur nächsten Treueprämie verfolgen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How does loyalty stamp scanning work?',
          answer: 'Customers tap their NFC loyalty card at your device. The stamp is recorded instantly on-chain and the customer sees their updated progress toward the next reward.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert das Scannen von Treuestempeln?',
          answer: 'Kunden halten ihre NFC-Treuekarte an dein Gerät. Der Stempel wird sofort on-chain erfasst und der Kunde sieht seinen aktualisierten Fortschritt zur nächsten Prämie.',
        },
      ],
    },
  },

  'loyalty-redeem': {
    keywords: {
      en: ['redeem loyalty reward', 'claim reward', 'use loyalty points', 'redeem stamps', 'loyalty cashback'],
      de: ['Treueprämie einlösen', 'Prämie beanspruchen', 'Treuepunkte einlösen', 'Stempel einlösen', 'Treue-Cashback'],
    },
    useCases: {
      en: ['Claim a free coffee after collecting enough stamps', 'Redeem stamps for a discount on the next purchase', 'Reset a customer card after reward redemption'],
      de: ['Einen Gratis-Kaffee nach dem Sammeln genügender Stempel beanspruchen', 'Stempel für einen Rabatt beim nächsten Einkauf einlösen', 'Eine Kundenkarte nach Prämieneinlösung zurücksetzen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I redeem my loyalty rewards?',
          answer: "Once you've collected enough stamps, tap your card and the merchant redeems your reward. Your stamps reset to zero automatically.",
        },
        {
          question: 'When can I redeem my stamps?',
          answer: 'Once you reach the required stamp count set by the merchant. Check your loyalty status to see your progress.',
        },
      ],
      de: [
        {
          question: 'Wie löse ich meine Treueprämien ein?',
          answer: 'Sobald du genügend Stempel gesammelt hast, hältst du deine Karte hin und der Händler löst die Prämie ein. Deine Stempel werden automatisch auf null zurückgesetzt.',
        },
        {
          question: 'Wann kann ich meine Stempel einlösen?',
          answer: 'Sobald du die vom Händler festgelegte Stempelanzahl erreicht hast. Überprüfe deinen Treuestatus, um deinen Fortschritt zu sehen.',
        },
      ],
    },
  },

  'loyalty-status': {
    keywords: {
      en: ['loyalty status', 'check stamps', 'loyalty balance', 'reward progress', 'stamp count'],
      de: ['Treuestatus', 'Stempel prüfen', 'Treue-Guthaben', 'Prämienfortschritt', 'Stempelanzahl'],
    },
    useCases: {
      en: ['See how many more stamps you need for a free reward', 'Check your loyalty balance before making a purchase', 'Track your reward progress across multiple visits'],
      de: ['Sehen, wie viele Stempel du noch für eine Gratisprämie brauchst', 'Dein Treue-Guthaben vor einem Einkauf prüfen', 'Deinen Prämienfortschritt über mehrere Besuche verfolgen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I check my loyalty card progress?',
          answer: 'Tap your NFC card to view your current stamp count, how many you need for a reward, and any active discounts.',
        },
      ],
      de: [
        {
          question: 'Wie prüfe ich den Fortschritt meiner Treuekarte?',
          answer: 'Tippe deine NFC-Karte an, um deinen aktuellen Stempelstand, wie viele du noch brauchst und aktive Rabatte zu sehen.',
        },
      ],
    },
  },

  'loyalty-review': {
    keywords: {
      en: ['google review discount', 'review loyalty reward', 'leave review get discount'],
      de: ['Google-Bewertung Rabatt', 'Bewertung Treueprämie', 'Bewertung abgeben Rabatt erhalten'],
    },
    useCases: {
      en: ['Get a discount for leaving a Google review after your first visit', 'Incentivize customers to leave reviews with an instant discount'],
      de: ['Rabatt für eine Google-Bewertung nach dem ersten Besuch erhalten', 'Kunden mit einem sofortigen Rabatt zur Bewertung animieren'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What happens after I leave a Google review?',
          answer: 'Show the success screen to your merchant to claim your configured discount on your next visit.',
        },
      ],
      de: [
        {
          question: 'Was passiert, nachdem ich eine Google-Bewertung abgegeben habe?',
          answer: 'Zeige den Erfolgsbildschirm deinem Händler, um deinen konfigurierten Rabatt beim nächsten Besuch zu erhalten.',
        },
      ],
    },
  },

  'loyalty-remind': {
    keywords: {
      en: ['loyalty reminder', 'remind customers', 'loyalty notification', 'win-back campaign', 'ai', 'ai agent', 'ai-powered', 'automated', 'smart', 'intelligent'],
      de: ['Treue-Erinnerung', 'Kunden erinnern', 'Treue-Benachrichtigung', 'Rückgewinnungskampagne', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'smart', 'intelligent'],
      fr: ['rappel de fidélité', 'rappeler les clients', 'notification de fidélité', 'campagne de reconquête', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'intelligent', 'assistant ia'],
      es: ['recordatorio de fidelidad', 'recordar clientes', 'notificación de fidelidad', 'campaña de recuperación', 'ia', 'agente ia', 'con ia', 'automatizado', 'inteligente', 'asistente ia'],
      ro: ['memento fidelitate', 'aminteste clientilor', 'notificare fidelitate', 'campanie de recuperare', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'inteligent', 'asistent ia'],
    },
    useCases: {
      en: ["Re-engage customers who haven't visited in weeks", 'Send automated WhatsApp reminders to inactive loyalty members', 'Run a daily win-back campaign for lapsed customers'],
      de: ['Kunden reaktivieren, die seit Wochen nicht da waren', 'Automatische WhatsApp-Erinnerungen an inaktive Treuemitglieder senden', 'Tägliche Rückgewinnungskampagne für abgewanderte Kunden starten'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do loyalty reminders work?',
          answer: "This warp runs daily, fetches customers who haven't visited since the configured threshold, and sends them a WhatsApp reminder via the JoAi agent.",
        },
      ],
      de: [
        {
          question: 'Wie funktionieren Treue-Erinnerungen?',
          answer: 'Dieser Warp läuft täglich, ruft Kunden ab, die seit dem konfigurierten Schwellenwert nicht da waren, und sendet ihnen eine WhatsApp-Erinnerung über den JoAi-Agenten.',
        },
      ],
    },
  },

  'loyalty-setup': {
    keywords: {
      en: ['program nfc cards', 'setup nfc loyalty', 'nfc card programming', 'loyalty card setup'],
      de: ['NFC-Karten programmieren', 'NFC-Treue einrichten', 'NFC-Karten-Programmierung', 'Treuekarte einrichten'],
    },
    useCases: {
      en: ['Program blank NFC cards with your loyalty register URL', 'Set up a batch of loyalty cards for a new location', 'Re-program NFC cards with an updated agent URL'],
      de: ['Leere NFC-Karten mit deiner Treue-Registrierungs-URL programmieren', 'Einen Stapel Treuekarten für einen neuen Standort einrichten', 'NFC-Karten mit einer aktualisierten Agenten-URL neu programmieren'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do NFC loyalty cards work?',
          answer: "All cards are programmed with the same URL. The NFC chip's unique hardware ID identifies each card — no individual programming needed per card.",
        },
      ],
      de: [
        {
          question: 'Wie funktionieren NFC-Treuekarten?',
          answer: 'Alle Karten werden mit derselben URL programmiert. Die einzigartige Hardware-ID des NFC-Chips identifiziert jede Karte — keine individuelle Programmierung pro Karte nötig.',
        },
      ],
    },
  },
}
