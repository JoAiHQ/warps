import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'liquid-stake': {
    keywords: {
      en: ['liquid staking', 'stake EGLD', 'Hatom stake', 'sEGLD', 'MultiversX liquid staking', 'Hatom protocol', 'earn staking rewards'],
      de: ['Liquid Staking', 'EGLD staken', 'Hatom Staking', 'sEGLD', 'MultiversX Liquid Staking', 'Hatom Protokoll', 'Staking-Belohnungen verdienen'],
    },
    useCases: {
      en: ['Stake EGLD on Hatom to earn sEGLD rewards passively', 'Get liquid staking tokens to use as collateral in DeFi protocols', 'Earn staking yield without locking up your EGLD'],
      de: ['EGLD auf Hatom staken, um passiv sEGLD-Belohnungen zu verdienen', 'Liquid-Staking-Token erhalten, um sie als Sicherheit in DeFi-Protokollen zu verwenden', 'Staking-Rendite verdienen, ohne dein EGLD zu sperren'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How does liquid staking with Hatom work?',
          answer:
            'You stake EGLD through Hatom and receive sEGLD in return, a liquid staking token that accrues staking rewards while remaining transferable and usable in DeFi.',
        },
        {
          question: 'What are the benefits of liquid staking over regular staking?',
          answer:
            'Liquid staking gives you sEGLD which earns staking rewards while staying liquid. You can use sEGLD in DeFi protocols for additional yield, unlike regular staked EGLD which is locked.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert Liquid Staking mit Hatom?',
          answer:
            'Du stakest EGLD über Hatom und erhältst im Gegenzug sEGLD, einen Liquid-Staking-Token, der Staking-Belohnungen ansammelt und dabei übertragbar und in DeFi nutzbar bleibt.',
        },
        {
          question: 'Welche Vorteile hat Liquid Staking gegenüber normalem Staking?',
          answer:
            'Liquid Staking gibt dir sEGLD, das Staking-Belohnungen verdient und dabei liquide bleibt. Du kannst sEGLD in DeFi-Protokollen für zusätzliche Rendite nutzen, im Gegensatz zu regulär gestaktem EGLD, das gesperrt ist.',
        },
      ],
    },
  },

  'liquid-unstake': {
    keywords: {
      en: ['unstake EGLD', 'Hatom unstake', 'redeem sEGLD', 'liquid unstaking', 'withdraw staked EGLD'],
      de: ['EGLD entstaken', 'Hatom Entstaking', 'sEGLD einlösen', 'Liquid Entstaking', 'gestaktes EGLD abheben'],
    },
    useCases: {
      en: ['Convert sEGLD back to EGLD when you need liquidity', 'Unstake after earning sufficient staking rewards on Hatom', 'Begin the withdrawal process to reclaim your original EGLD'],
      de: ['sEGLD zurück in EGLD umwandeln, wenn du Liquidität benötigst', 'Entstaken, nachdem du ausreichende Staking-Belohnungen auf Hatom verdient hast', 'Den Abhebungsprozess starten, um dein ursprüngliches EGLD zurückzufordern'],
    },
    category: 'staking',
  },

  'liquid-withdraw': {
    keywords: {
      en: ['withdraw EGLD', 'Hatom withdraw', 'claim unstaked EGLD', 'collect staking withdrawal'],
      de: ['EGLD abheben', 'Hatom Abhebung', 'entstaktes EGLD beanspruchen', 'Staking-Abhebung einsammeln'],
    },
    useCases: {
      en: ['Claim EGLD after the unstaking cooldown period ends', 'Collect your withdrawn staking funds into your wallet', 'Finalize the exit from Hatom liquid staking'],
      de: ['EGLD nach Ablauf der Entstaking-Abklingzeit beanspruchen', 'Deine abgehobenen Staking-Mittel in dein Wallet einsammeln', 'Den Ausstieg aus dem Hatom Liquid Staking abschließen'],
    },
    category: 'staking',
  },
}
