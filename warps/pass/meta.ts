import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'pass-generate': {
    keywords: {
      en: ['mobile pass', 'wallet pass', 'apple wallet', 'google wallet', 'pkpass', 'coupon pass', 'loyalty card', 'digital card', 'wallet'],
      de: ['mobile pass', 'wallet-pass', 'apple wallet', 'google wallet', 'gutschein-pass', 'treuekarte', 'digitale karte', 'wallet'],
      fr: ['pass mobile', 'pass wallet', 'apple wallet', 'google wallet', 'pass coupon', 'carte fidélité', 'carte numérique'],
      es: ['pase móvil', 'pase wallet', 'apple wallet', 'google wallet', 'pase cupón', 'tarjeta fidelización', 'tarjeta digital'],
      ro: ['pass mobil', 'pass wallet', 'apple wallet', 'google wallet', 'pass cupon', 'card fidelitate', 'card digital'],
    },
    useCases: {
      en: [
        'Create a coupon pass that customers can save to their phone wallet',
        'Generate a loyalty stamp card for Apple Wallet or Google Wallet',
        'Issue a digital store card pass that updates in real time',
      ],
      de: [
        'Einen Gutschein-Pass erstellen, den Kunden in ihr Handy-Wallet speichern können',
        'Eine Treue-Stempelkarte für Apple Wallet oder Google Wallet generieren',
        'Einen digitalen Kundenkarten-Pass ausstellen, der sich in Echtzeit aktualisiert',
      ],
      fr: [
        'Créer un pass coupon que les clients peuvent enregistrer dans leur wallet',
        'Générer une carte de fidélité pour Apple Wallet ou Google Wallet',
        'Émettre un pass de carte de magasin qui se met à jour en temps réel',
      ],
      es: [
        'Crear un pase de cupón que los clientes pueden guardar en su wallet',
        'Generar una tarjeta de sellos de fidelización para Apple Wallet o Google Wallet',
        'Emitir un pase de tarjeta digital que se actualiza en tiempo real',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Which wallets are supported?',
          answer: 'Apple Wallet (iPhone) and Google Wallet (Android). Choose the platform when generating a pass.',
        },
        {
          question: 'Can I update a pass after creating it?',
          answer: 'Yes — use the update pass action to push new data. Changes appear on the customer\'s phone within about a minute.',
        },
        {
          question: 'What types of passes can I generate?',
          answer: 'Coupons (discount codes) and loyalty cards (stamp cards, store cards). The type is determined by the source parameter.',
        },
      ],
      de: [
        {
          question: 'Welche Wallets werden unterstützt?',
          answer: 'Apple Wallet (iPhone) und Google Wallet (Android). Wähle die Plattform beim Erstellen des Passes.',
        },
        {
          question: 'Kann ich einen Pass nach dem Erstellen aktualisieren?',
          answer: 'Ja — verwende die Pass-aktualisieren-Aktion, um neue Daten zu pushen. Änderungen erscheinen in etwa einer Minute auf dem Handy des Kunden.',
        },
      ],
    },
  },

  'pass-update': {
    keywords: {
      en: ['update pass', 'wallet update', 'push update', 'live update pass', 'change pass'],
      de: ['pass aktualisieren', 'wallet-aktualisierung', 'live-update pass', 'pass ändern'],
      fr: ['mettre à jour pass', 'mise à jour wallet', 'pass en direct', 'modifier pass'],
      es: ['actualizar pase', 'actualización wallet', 'pase en directo', 'cambiar pase'],
    },
    useCases: {
      en: [
        'Update a loyalty card stamp count after a visit',
        'Change a coupon discount percentage',
        'Push new details to a customer\'s saved pass',
      ],
      de: [
        'Stempelstand einer Treuekarte nach einem Besuch aktualisieren',
        'Rabattprozentsatz eines Gutscheins ändern',
        'Neue Details auf dem gespeicherten Pass eines Kunden aktualisieren',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How quickly do updates appear?',
          answer: 'Updates are pushed immediately and typically appear on the customer\'s device within about a minute.',
        },
      ],
      de: [
        {
          question: 'Wie schnell erscheinen Aktualisierungen?',
          answer: 'Aktualisierungen werden sofort gepusht und erscheinen in der Regel innerhalb von etwa einer Minute auf dem Gerät des Kunden.',
        },
      ],
    },
  },

  'pass-void': {
    keywords: {
      en: ['void pass', 'expire pass', 'revoke pass', 'cancel pass', 'deactivate pass'],
      de: ['pass annullieren', 'pass ablaufen lassen', 'pass widerrufen', 'pass deaktivieren'],
      fr: ['invalider pass', 'expirer pass', 'révoquer pass', 'désactiver pass'],
      es: ['anular pase', 'caducar pase', 'revocar pase', 'desactivar pase'],
    },
    useCases: {
      en: [
        'Expire a coupon pass when the coupon is revoked',
        'Deactivate a loyalty card when a customer leaves',
        'Mark a pass as void so it no longer appears active',
      ],
      de: [
        'Einen Gutschein-Pass ablaufen lassen, wenn der Gutschein widerrufen wird',
        'Eine Treuekarte deaktivieren, wenn ein Kunde austritt',
        'Einen Pass als annulliert markieren, damit er nicht mehr aktiv angezeigt wird',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What happens when a pass is voided?',
          answer: 'The pass is marked as expired on the customer\'s device. It remains in their wallet but shows as no longer valid.',
        },
      ],
      de: [
        {
          question: 'Was passiert, wenn ein Pass annulliert wird?',
          answer: 'Der Pass wird auf dem Gerät des Kunden als abgelaufen markiert. Er bleibt im Wallet, wird aber als nicht mehr gültig angezeigt.',
        },
      ],
    },
  },
}
