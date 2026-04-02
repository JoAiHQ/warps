import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'stake-egld': {
    keywords: {
      en: ['stake eGold', 'EGLD staking', 'XOXNO staking', 'MultiversX staking', 'delegate EGLD XOXNO'],
      de: ['eGold staken', 'EGLD Staking', 'XOXNO Staking', 'MultiversX Staking', 'EGLD an XOXNO delegieren'],
    },
    useCases: {
      en: ['Earn passive income on EGLD', 'Delegate eGold to XOXNO validators', 'Support MultiversX network security'],
      de: ['Passives Einkommen mit EGLD verdienen', 'eGold an XOXNO-Validatoren delegieren', 'MultiversX-Netzwerksicherheit unterstutzen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I stake EGLD with XOXNO?',
          answer:
            'You can delegate your EGLD to the XOXNO staking provider directly through this action. Your staked EGLD earns rewards automatically.',
        },
        {
          question: 'What are the rewards for staking with XOXNO?',
          answer:
            'XOXNO distributes staking rewards to delegators based on the MultiversX network APR, minus a small service fee.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich EGLD mit XOXNO?',
          answer:
            'Du kannst deine EGLD direkt über diese Aktion an den XOXNO-Staking-Anbieter delegieren. Deine gestakten EGLD verdienen automatisch Belohnungen.',
        },
        {
          question: 'Welche Belohnungen gibt es beim Staking mit XOXNO?',
          answer:
            'XOXNO verteilt Staking-Belohnungen an Delegierer basierend auf dem MultiversX-Netzwerk-APR, abzüglich einer kleinen Servicegebühr.',
        },
      ],
    },
  },
  'claim-rewards': {
    keywords: {
      en: ['claim staking rewards', 'XOXNO rewards', 'collect EGLD rewards', 'claim XOXNO delegation rewards'],
      de: ['Staking-Belohnungen einfordern', 'XOXNO Belohnungen', 'EGLD Belohnungen einsammeln', 'XOXNO Delegationsbelohnungen einfordern'],
    },
    useCases: {
      en: ['Collect accumulated EGLD staking rewards', 'Withdraw earned eGold from XOXNO', 'Manage staking delegations'],
      de: ['Angesammelte EGLD-Staking-Belohnungen einsammeln', 'Verdientes eGold von XOXNO abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I claim my XOXNO staking rewards?',
          answer:
            'Use this action to collect your accumulated EGLD staking rewards from XOXNO. Rewards are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie fordere ich meine XOXNO-Staking-Belohnungen ein?',
          answer:
            'Nutze diese Aktion, um deine angesammelten EGLD-Staking-Belohnungen von XOXNO einzusammeln. Die Belohnungen werden direkt an dein Wallet gesendet.',
        },
      ],
    },
  },
  'redelegate-egld': {
    keywords: {
      en: ['redelegate EGLD', 'XOXNO redelegate', 'compound staking rewards', 'restake EGLD XOXNO'],
      de: ['EGLD redelegieren', 'XOXNO Redelegation', 'Staking-Belohnungen reinvestieren', 'EGLD bei XOXNO restaken'],
    },
    useCases: {
      en: ['Compound staking rewards automatically', 'Maximize EGLD earnings over time', 'Restake eGold with XOXNO'],
      de: ['Staking-Belohnungen automatisch reinvestieren', 'EGLD-Ertrage langfristig maximieren', 'eGold bei XOXNO restaken'],
    },
    category: 'staking',
  },
  'undelegate-egld': {
    keywords: {
      en: ['undelegate EGLD', 'unstake XOXNO', 'withdraw staked EGLD', 'remove XOXNO delegation'],
      de: ['EGLD undelegieren', 'XOXNO unstaken', 'gestakte EGLD abheben', 'XOXNO Delegation entfernen'],
    },
    useCases: {
      en: ['Unstake EGLD from XOXNO', 'Withdraw staked eGold', 'Manage staking delegations'],
      de: ['EGLD von XOXNO unstaken', 'Gestaktes eGold abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
  },
  'liquid-stake': {
    keywords: {
      en: ['liquid staking EGLD', 'XOXNO liquid stake', 'liquid EGLD staking', 'MultiversX liquid staking'],
      de: ['Liquid Staking EGLD', 'XOXNO Liquid Stake', 'liquides EGLD Staking', 'MultiversX Liquid Staking'],
    },
    useCases: {
      en: ['Earn staking rewards while maintaining liquidity', 'Use liquid staked EGLD in DeFi', 'Stake eGold without locking assets'],
      de: ['Staking-Belohnungen verdienen und Liquiditat behalten', 'Liquid gestakte EGLD in DeFi nutzen', 'eGold staken ohne Vermogenswerte zu sperren'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'What is XOXNO liquid staking?',
          answer:
            'XOXNO liquid staking lets you stake EGLD and receive a liquid token in return, so you can earn staking rewards while keeping your assets usable in DeFi.',
        },
      ],
      de: [
        {
          question: 'Was ist XOXNO Liquid Staking?',
          answer:
            'Mit XOXNO Liquid Staking kannst du EGLD staken und erhältst dafür einen liquiden Token, sodass du Staking-Belohnungen verdienst und deine Vermögenswerte gleichzeitig in DeFi nutzen kannst.',
        },
      ],
    },
  },
  'liquid-unstake': {
    keywords: {
      en: ['liquid unstake EGLD', 'XOXNO liquid unstake', 'redeem liquid staked EGLD', 'unstake liquid XOXNO'],
      de: ['EGLD Liquid Unstake', 'XOXNO Liquid Unstake', 'liquid gestakte EGLD einlösen', 'XOXNO Liquid unstaken'],
    },
    useCases: {
      en: ['Redeem liquid staked EGLD tokens', 'Exit XOXNO liquid staking position', 'Begin eGold withdrawal process'],
      de: ['Liquid gestakte EGLD-Token einlosen', 'XOXNO Liquid-Staking-Position verlassen', 'eGold-Auszahlungsprozess starten'],
    },
    category: 'staking',
  },
  'liquid-withdraw': {
    keywords: {
      en: ['liquid withdraw EGLD', 'XOXNO liquid withdraw', 'withdraw liquid staked EGLD', 'claim liquid unstake XOXNO'],
      de: ['EGLD Liquid Auszahlung', 'XOXNO Liquid Auszahlung', 'liquid gestakte EGLD abheben', 'XOXNO Liquid Unstake einfordern'],
    },
    useCases: {
      en: ['Complete EGLD liquid unstaking withdrawal', 'Claim eGold after unbonding period', 'Finalize XOXNO liquid staking exit'],
      de: ['EGLD Liquid-Unstaking-Auszahlung abschliessen', 'eGold nach Unbonding-Periode einfordern', 'XOXNO Liquid-Staking-Ausstieg abschliessen'],
    },
    category: 'staking',
  },
}
