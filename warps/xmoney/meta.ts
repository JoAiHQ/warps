import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'payment-link-create': {
    keywords: {
      en: ['create payment link', 'xMoney payment', 'payment URL', 'accept payments', 'payment gateway', 'crypto payment link'],
      de: ['Zahlungslink erstellen', 'xMoney Zahlung', 'Zahlungs-URL', 'Zahlungen akzeptieren', 'Zahlungs-Gateway', 'Krypto-Zahlungslink'],
    },
    useCases: {
      en: ['Generate a payment link for a freelance invoice', 'Create a crypto checkout link for an online product sale', 'Share a payment URL with a client to collect a service fee'],
      de: ['Einen Zahlungslink für eine Freelancer-Rechnung generieren', 'Einen Krypto-Checkout-Link für einen Online-Produktverkauf erstellen', 'Eine Zahlungs-URL mit einem Kunden teilen, um eine Servicegebühr einzuziehen'],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How do I create a payment link with xMoney?',
          answer:
            'Generate a payment link via xMoney by specifying the amount and currency, then share the link with your customer to collect payment.',
        },
      ],
      de: [
        {
          question: 'Wie erstelle ich einen Zahlungslink mit xMoney?',
          answer:
            'Generiere einen Zahlungslink über xMoney, indem du den Betrag und die Währung angibst, und teile den Link mit deinem Kunden, um die Zahlung einzuziehen.',
        },
      ],
    },
  },
}
