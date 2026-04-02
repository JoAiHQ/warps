import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'transfer': {
    keywords: {
      en: ['transfer assets', 'send tokens', 'MultiversX transfer', 'send EGLD', 'send ESDT', 'token transfer', 'crypto transfer', 'send NFT'],
      de: ['Vermögenswerte übertragen', 'Token senden', 'MultiversX Übertragung', 'EGLD senden', 'ESDT senden', 'Token-Transfer', 'Krypto-Transfer', 'NFT senden'],
    },
    useCases: {
      en: ['Send EGLD to a friend or business partner on MultiversX', 'Transfer ESDT tokens between your own wallets', 'Send an NFT or SFT to a buyer after a sale'],
      de: ['EGLD an einen Freund oder Geschäftspartner auf MultiversX senden', 'ESDT-Token zwischen deinen eigenen Wallets übertragen', 'Ein NFT oder SFT nach einem Verkauf an einen Käufer senden'],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'How do I transfer assets on MultiversX?',
          answer:
            'Send EGLD, ESDT tokens, or NFTs to any MultiversX address by specifying the recipient, token, and amount to execute the transfer.',
        },
        {
          question: 'What assets can I transfer?',
          answer:
            'You can transfer native EGLD, any ESDT fungible token, NFTs, and SFTs on the MultiversX blockchain.',
        },
      ],
      de: [
        {
          question: 'Wie übertrage ich Vermögenswerte auf MultiversX?',
          answer:
            'Sende EGLD, ESDT-Token oder NFTs an eine beliebige MultiversX-Adresse, indem du den Empfänger, Token und Betrag angibst, um die Übertragung auszuführen.',
        },
        {
          question: 'Welche Vermögenswerte kann ich übertragen?',
          answer:
            'Du kannst natives EGLD, beliebige fungible ESDT-Token, NFTs und SFTs auf der MultiversX-Blockchain übertragen.',
        },
      ],
    },
  },
}
