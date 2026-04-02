import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'send-text': {
    keywords: {
      en: ['send WhatsApp message', 'WhatsApp text', 'message on WhatsApp', 'WhatsApp API', 'send WhatsApp'],
      de: ['WhatsApp Nachricht senden', 'WhatsApp Text', 'Nachricht auf WhatsApp', 'WhatsApp API', 'WhatsApp senden'],
    },
    useCases: {
      en: ['Send an order confirmation to a customer via WhatsApp', 'Deliver appointment reminders through WhatsApp messages', 'Notify team members about urgent updates on WhatsApp'],
      de: ['Eine Bestellbestätigung an einen Kunden über WhatsApp senden', 'Terminerinnerungen über WhatsApp-Nachrichten zustellen', 'Teammitglieder über dringende Updates auf WhatsApp benachrichtigen'],
    },
    category: 'communication',
    faq: {
      en: [
        {
          question: 'How do I send a WhatsApp message?',
          answer:
            'Send a text message via WhatsApp by providing the recipient phone number and your message content to deliver it instantly.',
        },
      ],
      de: [
        {
          question: 'Wie sende ich eine WhatsApp-Nachricht?',
          answer:
            'Sende eine Textnachricht über WhatsApp, indem du die Telefonnummer des Empfängers und deinen Nachrichteninhalt angibst, um sie sofort zuzustellen.',
        },
      ],
    },
  },
}
