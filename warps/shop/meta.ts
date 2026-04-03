import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'shop-create': {
    keywords: {
      en: ['create shop', 'new online store', 'setup shop', 'launch store', 'e-commerce setup', 'start selling online'],
      de: ['Shop erstellen', 'neuer Online-Shop', 'Shop einrichten', 'Shop starten', 'E-Commerce einrichten', 'online verkaufen starten'],
    },
    useCases: {
      en: ['Launch an online store for your small business or side project', 'Set up a shop with built-in loyalty rewards for repeat customers', 'Create a storefront to sell products with integrated payment processing'],
      de: ['Einen Online-Shop für dein Kleinunternehmen oder Nebenprojekt starten', 'Einen Shop mit integrierten Treueprämien für Stammkunden einrichten', 'Einen Laden erstellen, um Produkte mit integrierter Zahlungsabwicklung zu verkaufen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I create a new shop?',
          answer:
            'Set up a new online store by providing your shop details. It will be created and ready for configuration immediately.',
        },
        {
          question: 'What do I need to get started with a shop?',
          answer:
            'You just need a name and basic details for your shop. You can configure loyalty programs, products, and other features after creation.',
        },
      ],
      de: [
        {
          question: 'Wie erstelle ich einen neuen Shop?',
          answer:
            'Richte einen neuen Online-Shop ein, indem du deine Shop-Details angibst. Er wird sofort erstellt und ist bereit zur Konfiguration.',
        },
        {
          question: 'Was brauche ich, um mit einem Shop zu starten?',
          answer:
            'Du brauchst nur einen Namen und grundlegende Angaben für deinen Shop. Treueprogramme, Produkte und andere Funktionen kannst du nach der Erstellung konfigurieren.',
        },
      ],
    },
  },

  'shop-loyalty-configure': {
    keywords: {
      en: ['configure loyalty program', 'loyalty settings', 'stamp card setup', 'rewards program config'],
      de: ['Treueprogramm konfigurieren', 'Treue-Einstellungen', 'Stempelkarte einrichten', 'Bonusprogramm konfigurieren'],
    },
    useCases: {
      en: ['Set how many stamps customers need for a free reward', 'Configure cashback percentages for loyal shoppers', 'Adjust loyalty program rules based on seasonal promotions'],
      de: ['Festlegen, wie viele Stempel Kunden für eine Gratisprämie benötigen', 'Cashback-Prozentsätze für treue Käufer konfigurieren', 'Treueprogramm-Regeln basierend auf saisonalen Aktionen anpassen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What can I customize in my loyalty program?',
          answer:
            'You can set the number of stamps required for a reward, define the reward type (free item, discount, or cashback), adjust thresholds for different tiers, and enable a Google review incentive that grants bonus stamps or discounts.',
        },
      ],
      de: [
        {
          question: 'Was kann ich in meinem Treueprogramm anpassen?',
          answer:
            'Du kannst die Anzahl der Stempel für eine Prämie festlegen, die Prämienart wählen (Gratisartikel, Rabatt oder Cashback), Schwellenwerte für verschiedene Stufen anpassen und einen Google-Bewertungsanreiz aktivieren, der Bonusstempel oder Rabatte gewährt.',
        },
      ],
    },
  },

  'shop-loyalty-register': {
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
          question: 'How do I register for a shop loyalty program?',
          answer:
            'Sign up for a loyalty program by providing your details. Once registered, you can start earning stamps and redeeming rewards at the shop.',
        },
        {
          question: 'Is there a cost to join a loyalty program?',
          answer:
            'No, joining a loyalty program is free. You simply register and start collecting stamps with your purchases.',
        },
      ],
      de: [
        {
          question: 'Wie registriere ich mich für ein Shop-Treueprogramm?',
          answer:
            'Melde dich für ein Treueprogramm an, indem du deine Daten angibst. Nach der Registrierung kannst du Stempel sammeln und Prämien im Shop einlösen.',
        },
        {
          question: 'Kostet die Teilnahme am Treueprogramm etwas?',
          answer:
            'Nein, die Teilnahme am Treueprogramm ist kostenlos. Du registrierst dich einfach und beginnst mit deinen Einkäufen Stempel zu sammeln.',
        },
      ],
    },
  },

  'shop-loyalty-stamp': {
    keywords: {
      en: ['add loyalty stamp', 'collect stamp', 'loyalty punch', 'earn stamp', 'stamp card'],
      de: ['Treuestempel hinzufügen', 'Stempel sammeln', 'Treuepunkt', 'Stempel verdienen', 'Stempelkarte'],
    },
    useCases: {
      en: ['Stamp a customer card after they make a purchase at your shop', 'Award bonus stamps during a promotional event', 'Track customer progress toward their next loyalty reward'],
      de: ['Eine Kundenkarte nach einem Einkauf in deinem Shop abstempeln', 'Bonusstempel während einer Werbeaktion vergeben', 'Den Kundenfortschritt zur nächsten Treueprämie verfolgen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How does loyalty stamp scanning work?',
          answer:
            'Customers tap their NFC loyalty card at your device or you manually scan their card code. The stamp is recorded instantly and the customer sees their updated progress toward the next reward.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert das Scannen von Treuestempeln?',
          answer:
            'Kunden halten ihre NFC-Treuekarte an dein Gerät oder du scannst ihren Kartencode manuell. Der Stempel wird sofort erfasst und der Kunde sieht seinen aktualisierten Fortschritt zur nächsten Prämie.',
        },
      ],
    },
  },

  'shop-loyalty-redeem': {
    keywords: {
      en: ['redeem loyalty reward', 'claim reward', 'use loyalty points', 'redeem stamps', 'loyalty cashback'],
      de: ['Treueprämie einlösen', 'Prämie beanspruchen', 'Treuepunkte einlösen', 'Stempel einlösen', 'Treue-Cashback'],
    },
    useCases: {
      en: ['Claim a free coffee after collecting enough stamps', 'Redeem loyalty points for a discount on your next purchase', 'Use accumulated stamps to receive cashback rewards'],
      de: ['Einen Gratis-Kaffee nach dem Sammeln genügender Stempel beanspruchen', 'Treuepunkte für einen Rabatt beim nächsten Einkauf einlösen', 'Angesammelte Stempel für Cashback-Prämien verwenden'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I redeem my loyalty rewards?',
          answer:
            'Redeem your rewards once you have enough stamps collected. Your reward will be applied automatically based on the shop\'s loyalty program rules.',
        },
        {
          question: 'When can I redeem my stamps?',
          answer:
            'You can redeem once you reach the required number of stamps set by the shop. Check your loyalty status to see how close you are to a reward.',
        },
      ],
      de: [
        {
          question: 'Wie löse ich meine Treueprämien ein?',
          answer:
            'Löse deine Prämien ein, sobald du genügend Stempel gesammelt hast. Deine Prämie wird automatisch basierend auf den Regeln des Shop-Treueprogramms angewendet.',
        },
        {
          question: 'Wann kann ich meine Stempel einlösen?',
          answer:
            'Du kannst einlösen, sobald du die vom Shop festgelegte Anzahl an Stempeln erreicht hast. Überprüfe deinen Treuestatus, um zu sehen, wie nah du an einer Prämie bist.',
        },
      ],
    },
  },

  'shop-loyalty-status': {
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
          answer:
            'View your loyalty status to see how many stamps you have collected, how many more you need for your next reward, and any available rewards ready to redeem.',
        },
      ],
      de: [
        {
          question: 'Wie prüfe ich den Fortschritt meiner Treuekarte?',
          answer:
            'Sieh dir deinen Treuestatus an, um zu erfahren, wie viele Stempel du gesammelt hast, wie viele du noch bis zur nächsten Prämie brauchst und welche Prämien du bereits einlösen kannst.',
        },
      ],
    },
  },

  'shop-loyalty-review': {
    keywords: {
      en: ['loyalty review', 'review loyalty program', 'loyalty analytics', 'program performance'],
      de: ['Treue-Überprüfung', 'Treueprogramm überprüfen', 'Treue-Analysen', 'Programmleistung'],
    },
    useCases: {
      en: ['Analyze how many customers are actively using the loyalty program', 'Review redemption rates to evaluate reward attractiveness', 'Identify trends in stamp collection to plan promotions'],
      de: ['Analysieren, wie viele Kunden das Treueprogramm aktiv nutzen', 'Einlösequoten überprüfen, um die Attraktivität der Prämien zu bewerten', 'Trends bei der Stempelsammlung erkennen, um Aktionen zu planen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What happens after I leave a Google review?',
          answer:
            'Once your Google review is verified, you automatically receive a discount reward or bonus stamps as configured by the shop owner. The reward is applied to your loyalty account instantly.',
        },
      ],
      de: [
        {
          question: 'Was passiert, nachdem ich eine Google-Bewertung abgegeben habe?',
          answer:
            'Sobald deine Google-Bewertung verifiziert ist, erhältst du automatisch einen Rabatt oder Bonusstempel, wie vom Shop-Betreiber konfiguriert. Die Prämie wird sofort deinem Treuekonto gutgeschrieben.',
        },
      ],
    },
  },

  'shop-loyalty-remind': {
    keywords: {
      en: ['loyalty reminder', 'remind customers', 'loyalty notification', 'stamp reminder'],
      de: ['Treue-Erinnerung', 'Kunden erinnern', 'Treue-Benachrichtigung', 'Stempel-Erinnerung'],
    },
    useCases: {
      en: ['Notify customers who are one stamp away from a reward', 'Re-engage inactive loyalty members with a reminder', 'Send promotional reminders about expiring loyalty rewards'],
      de: ['Kunden benachrichtigen, die nur einen Stempel von einer Prämie entfernt sind', 'Inaktive Treuemitglieder mit einer Erinnerung reaktivieren', 'Werbe-Erinnerungen über ablaufende Treueprämien senden'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do loyalty reminders work?',
          answer:
            'Automated messages are sent to customers who have not visited in a while, reminding them of their stamp progress and how close they are to a reward. You can configure the inactivity threshold and message content.',
        },
      ],
      de: [
        {
          question: 'Wie funktionieren Treue-Erinnerungen?',
          answer:
            'Automatische Nachrichten werden an Kunden gesendet, die längere Zeit nicht da waren, und erinnern sie an ihren Stempelfortschritt und wie nah sie an einer Prämie sind. Du kannst die Inaktivitätsschwelle und den Nachrichteninhalt konfigurieren.',
        },
      ],
    },
  },

  'shop-loyalty-setup': {
    keywords: {
      en: ['setup loyalty program', 'create loyalty program', 'initialize loyalty', 'loyalty onboarding'],
      de: ['Treueprogramm einrichten', 'Treueprogramm erstellen', 'Treue initialisieren', 'Treue-Onboarding'],
    },
    useCases: {
      en: ['Create a stamp card loyalty program for a new coffee shop', 'Initialize a rewards program with cashback for an online store', 'Set up a points-based loyalty system for a retail business'],
      de: ['Ein Stempelkarten-Treueprogramm für ein neues Café erstellen', 'Ein Prämienprogramm mit Cashback für einen Online-Shop initialisieren', 'Ein punktebasiertes Treuesystem für ein Einzelhandelsgeschäft einrichten'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I set up NFC loyalty cards?',
          answer:
            'Program blank NFC cards with your shop identifier using the setup flow. Once programmed, customers simply tap the card at your device to collect stamps automatically.',
        },
      ],
      de: [
        {
          question: 'Wie richte ich NFC-Treuekarten ein?',
          answer:
            'Programmiere leere NFC-Karten mit deiner Shop-Kennung über den Einrichtungsablauf. Nach der Programmierung halten Kunden die Karte einfach an dein Gerät, um automatisch Stempel zu sammeln.',
        },
      ],
    },
  },
}
