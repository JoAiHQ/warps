import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'stake-egld': {
    keywords: {
      en: ['stake eGold', 'EGLD staking', 'Inception Network staking', 'MultiversX staking', 'delegate EGLD Inception'],
      de: ['eGold staken', 'EGLD Staking', 'Inception Network Staking', 'MultiversX Staking', 'EGLD an Inception delegieren'],
    },
    useCases: {
      en: ['Earn passive income on EGLD', 'Delegate eGold to Inception Network validators', 'Support MultiversX network security'],
      de: ['Passives Einkommen mit EGLD verdienen', 'eGold an Inception Network-Validatoren delegieren', 'MultiversX-Netzwerksicherheit unterstutzen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I stake EGLD with Inception Network?',
          answer:
            'You can delegate your EGLD to the Inception Network staking provider directly through this action. Your staked EGLD earns rewards automatically.',
        },
        {
          question: 'What makes Inception Network different as a staking provider?',
          answer:
            'Inception Network operates MultiversX validator nodes and distributes staking rewards to delegators based on the network APR.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich EGLD mit Inception Network?',
          answer:
            'Du kannst deine EGLD direkt über diese Aktion an den Inception Network-Staking-Anbieter delegieren. Deine gestakten EGLD verdienen automatisch Belohnungen.',
        },
        {
          question: 'Was unterscheidet Inception Network als Staking-Anbieter?',
          answer:
            'Inception Network betreibt MultiversX-Validator-Knoten und verteilt Staking-Belohnungen an Delegierer basierend auf dem Netzwerk-APR.',
        },
      ],
    },
  },
  'claim-rewards': {
    keywords: {
      en: ['claim staking rewards', 'Inception Network rewards', 'collect EGLD rewards', 'claim Inception delegation rewards'],
      de: ['Staking-Belohnungen einfordern', 'Inception Network Belohnungen', 'EGLD Belohnungen einsammeln', 'Inception Delegationsbelohnungen einfordern'],
    },
    useCases: {
      en: ['Collect accumulated EGLD staking rewards', 'Withdraw earned eGold from Inception Network', 'Manage staking delegations'],
      de: ['Angesammelte EGLD-Staking-Belohnungen einsammeln', 'Verdientes eGold von Inception Network abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I claim my Inception Network staking rewards?',
          answer:
            'Use this action to collect your accumulated EGLD staking rewards from Inception Network. Rewards are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie fordere ich meine Inception Network-Staking-Belohnungen ein?',
          answer:
            'Nutze diese Aktion, um deine angesammelten EGLD-Staking-Belohnungen von Inception Network einzusammeln. Die Belohnungen werden direkt an dein Wallet gesendet.',
        },
      ],
    },
  },
  'redelegate-egld': {
    keywords: {
      en: ['redelegate EGLD', 'Inception Network redelegate', 'compound staking rewards', 'restake EGLD Inception'],
      de: ['EGLD redelegieren', 'Inception Network Redelegation', 'Staking-Belohnungen reinvestieren', 'EGLD bei Inception restaken'],
    },
    useCases: {
      en: ['Compound staking rewards automatically', 'Maximize EGLD earnings over time', 'Restake eGold with Inception Network'],
      de: ['Staking-Belohnungen automatisch reinvestieren', 'EGLD-Ertrage langfristig maximieren', 'eGold bei Inception Network restaken'],
    },
    category: 'staking',
  },
  'undelegate-egld': {
    keywords: {
      en: ['undelegate EGLD', 'unstake Inception Network', 'withdraw staked EGLD', 'remove Inception delegation'],
      de: ['EGLD undelegieren', 'Inception Network unstaken', 'gestakte EGLD abheben', 'Inception Delegation entfernen'],
    },
    useCases: {
      en: ['Unstake EGLD from Inception Network', 'Withdraw staked eGold', 'Manage staking delegations'],
      de: ['EGLD von Inception Network unstaken', 'Gestaktes eGold abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
  },
}
