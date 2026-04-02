import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'stake-egld': {
    keywords: {
      en: ['stake eGold', 'EGLD staking', 'MrEGLD staking', 'MultiversX staking', 'delegate EGLD MrEGLD'],
      de: ['eGold staken', 'EGLD Staking', 'MrEGLD Staking', 'MultiversX Staking', 'EGLD an MrEGLD delegieren'],
    },
    useCases: {
      en: ['Earn passive income on EGLD', 'Delegate eGold to MrEGLD validators', 'Support MultiversX network security'],
      de: ['Passives Einkommen mit EGLD verdienen', 'eGold an MrEGLD-Validatoren delegieren', 'MultiversX-Netzwerksicherheit unterstutzen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I stake EGLD with MrEGLD?',
          answer:
            'You can delegate your EGLD to the MrEGLD staking provider directly through this action. Your staked EGLD earns rewards automatically.',
        },
        {
          question: 'What are the rewards for staking with MrEGLD?',
          answer:
            'MrEGLD distributes staking rewards to delegators based on the MultiversX network APR, minus a small service fee.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich EGLD mit MrEGLD?',
          answer:
            'Du kannst deine EGLD direkt über diese Aktion an den MrEGLD-Staking-Anbieter delegieren. Deine gestakten EGLD verdienen automatisch Belohnungen.',
        },
        {
          question: 'Welche Belohnungen gibt es beim Staking mit MrEGLD?',
          answer:
            'MrEGLD verteilt Staking-Belohnungen an Delegierer basierend auf dem MultiversX-Netzwerk-APR, abzüglich einer kleinen Servicegebühr.',
        },
      ],
    },
  },
  'claim-rewards': {
    keywords: {
      en: ['claim staking rewards', 'MrEGLD rewards', 'collect EGLD rewards', 'claim MrEGLD delegation rewards'],
      de: ['Staking-Belohnungen einfordern', 'MrEGLD Belohnungen', 'EGLD Belohnungen einsammeln', 'MrEGLD Delegationsbelohnungen einfordern'],
    },
    useCases: {
      en: ['Collect accumulated EGLD staking rewards', 'Withdraw earned eGold from MrEGLD', 'Manage staking delegations'],
      de: ['Angesammelte EGLD-Staking-Belohnungen einsammeln', 'Verdientes eGold von MrEGLD abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I claim my MrEGLD staking rewards?',
          answer:
            'Use this action to collect your accumulated EGLD staking rewards from MrEGLD. Rewards are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie fordere ich meine MrEGLD-Staking-Belohnungen ein?',
          answer:
            'Nutze diese Aktion, um deine angesammelten EGLD-Staking-Belohnungen von MrEGLD einzusammeln. Die Belohnungen werden direkt an dein Wallet gesendet.',
        },
      ],
    },
  },
  'redelegate-egld': {
    keywords: {
      en: ['redelegate EGLD', 'MrEGLD redelegate', 'compound staking rewards', 'restake EGLD MrEGLD'],
      de: ['EGLD redelegieren', 'MrEGLD Redelegation', 'Staking-Belohnungen reinvestieren', 'EGLD bei MrEGLD restaken'],
    },
    useCases: {
      en: ['Compound staking rewards automatically', 'Maximize EGLD earnings over time', 'Restake eGold with MrEGLD'],
      de: ['Staking-Belohnungen automatisch reinvestieren', 'EGLD-Ertrage langfristig maximieren', 'eGold bei MrEGLD restaken'],
    },
    category: 'staking',
  },
  'undelegate-egld': {
    keywords: {
      en: ['undelegate EGLD', 'unstake MrEGLD', 'withdraw staked EGLD', 'remove MrEGLD delegation'],
      de: ['EGLD undelegieren', 'MrEGLD unstaken', 'gestakte EGLD abheben', 'MrEGLD Delegation entfernen'],
    },
    useCases: {
      en: ['Unstake EGLD from MrEGLD', 'Withdraw staked eGold', 'Manage staking delegations'],
      de: ['EGLD von MrEGLD unstaken', 'Gestaktes eGold abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
  },
}
