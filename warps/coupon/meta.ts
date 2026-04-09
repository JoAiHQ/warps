import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'coupon-create': {
    keywords: {
      en: ['coupon', 'discount', 'promo', 'code', 'create', 'on-chain', 'commerce', 'sale'],
      de: ['gutschein', 'rabatt', 'promo', 'code', 'erstellen', 'on-chain', 'handel', 'sale'],
    },
    useCases: {
      en: [
        'Create a 20% discount coupon for your online store',
        'Issue a one-time promo code for a product launch',
        'Set up limited-use discount codes for loyal customers',
        'Generate verifiable coupon codes anchored on-chain',
      ],
      de: [
        '20%-Rabattgutschein für deinen Online-Shop erstellen',
        'Einmaligen Promo-Code für einen Produktlaunch ausstellen',
        'Begrenzte Rabattcodes für treue Kunden einrichten',
        'Verifizierbare Gutscheincodes on-chain verankern',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How are coupon codes stored?',
          answer: 'The coupon code, discount percentage, usage limits, and redemption records are all stored on the MultiversX blockchain.',
        },
        {
          question: 'Can I limit how many times a coupon can be used?',
          answer: 'Yes — set a max uses limit when creating. Use 0 for unlimited redemptions.',
        },
        {
          question: 'Can I revoke a coupon?',
          answer: 'Yes — you can revoke any active coupon you created. It will immediately become invalid.',
        },
      ],
      de: [
        {
          question: 'Wie werden Gutscheincodes gespeichert?',
          answer: 'Der Gutscheincode, der Rabattprozentsatz, die Nutzungslimits und Einlösungsaufzeichnungen werden alle auf der MultiversX-Blockchain gespeichert.',
        },
        {
          question: 'Kann ich einschränken, wie oft ein Gutschein verwendet werden kann?',
          answer: 'Ja — setze beim Erstellen ein Nutzungslimit. Verwende 0 für unbegrenzte Einlösungen.',
        },
        {
          question: 'Kann ich einen Gutschein widerrufen?',
          answer: 'Ja — du kannst jeden aktiven Gutschein, den du erstellt hast, widerrufen. Er wird sofort ungültig.',
        },
      ],
    },
  },
  'coupon-redeem': {
    keywords: {
      en: ['redeem', 'coupon', 'discount', 'code', 'use', 'apply', 'on-chain'],
      de: ['einlösen', 'gutschein', 'rabatt', 'code', 'verwenden', 'anwenden', 'on-chain'],
    },
    useCases: {
      en: [
        'Redeem a discount coupon code at checkout',
        'Apply an on-chain promo code to a purchase',
        'Use a coupon code issued by a merchant',
      ],
      de: [
        'Rabattgutscheincode beim Checkout einlösen',
        'On-Chain-Promo-Code für einen Kauf anwenden',
        'Vom Händler ausgestellten Gutscheincode verwenden',
      ],
    },
    category: 'commerce',
  },
  'coupon-view': {
    keywords: {
      en: ['view', 'coupon', 'details', 'discount', 'status', 'uses', 'remaining'],
      de: ['ansehen', 'gutschein', 'details', 'rabatt', 'status', 'nutzungen', 'verbleibend'],
    },
    useCases: {
      en: [
        'Check the details and remaining uses of a coupon',
        'Verify a coupon is still active before redeeming',
        'See the discount percentage for a coupon code',
      ],
      de: [
        'Details und verbleibende Nutzungen eines Gutscheins prüfen',
        'Vor dem Einlösen prüfen, ob ein Gutschein noch aktiv ist',
        'Den Rabattprozentsatz für einen Gutscheincode einsehen',
      ],
    },
    category: 'commerce',
  },
}
