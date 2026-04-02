import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'stake-egld': {
    keywords: {
      en: ['stake eGold', 'EGLD staking', 'Colombia Staking', 'MultiversX staking', 'delegate EGLD Colombia'],
      de: ['eGold staken', 'EGLD Staking', 'Colombia Staking', 'MultiversX Staking', 'EGLD an Colombia delegieren'],
    },
    useCases: {
      en: ['Earn passive income on EGLD', 'Delegate eGold to Colombia Staking validators', 'Support MultiversX network security'],
      de: ['Passives Einkommen mit EGLD verdienen', 'eGold an Colombia Staking-Validatoren delegieren', 'MultiversX-Netzwerksicherheit unterstutzen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I stake EGLD with Colombia Staking?',
          answer:
            'You can delegate your EGLD to the Colombia Staking provider directly through this action. Your staked EGLD earns rewards automatically.',
        },
        {
          question: 'Is Colombia Staking a reliable provider?',
          answer:
            'Colombia Staking is a MultiversX staking provider that operates validator nodes and distributes rewards to its delegators.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich EGLD mit Colombia Staking?',
          answer:
            'Du kannst deine EGLD direkt über diese Aktion an den Colombia Staking-Anbieter delegieren. Deine gestakten EGLD verdienen automatisch Belohnungen.',
        },
        {
          question: 'Ist Colombia Staking ein zuverlässiger Anbieter?',
          answer:
            'Colombia Staking ist ein MultiversX-Staking-Anbieter, der Validator-Knoten betreibt und Belohnungen an seine Delegierer verteilt.',
        },
      ],
    },
  },
  'claim-rewards': {
    keywords: {
      en: ['claim staking rewards', 'Colombia Staking rewards', 'collect EGLD rewards', 'claim Colombia delegation rewards'],
      de: ['Staking-Belohnungen einfordern', 'Colombia Staking Belohnungen', 'EGLD Belohnungen einsammeln', 'Colombia Delegationsbelohnungen einfordern'],
    },
    useCases: {
      en: ['Collect accumulated EGLD staking rewards', 'Withdraw earned eGold from Colombia Staking', 'Manage staking delegations'],
      de: ['Angesammelte EGLD-Staking-Belohnungen einsammeln', 'Verdientes eGold von Colombia Staking abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I claim my Colombia Staking rewards?',
          answer:
            'Use this action to collect your accumulated EGLD staking rewards from the Colombia Staking provider. Rewards are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie fordere ich meine Colombia Staking-Belohnungen ein?',
          answer:
            'Nutze diese Aktion, um deine angesammelten EGLD-Staking-Belohnungen vom Colombia Staking-Anbieter einzusammeln. Die Belohnungen werden direkt an dein Wallet gesendet.',
        },
      ],
    },
  },
  'redelegate-egld': {
    keywords: {
      en: ['redelegate EGLD', 'Colombia Staking redelegate', 'compound staking rewards', 'restake EGLD Colombia'],
      de: ['EGLD redelegieren', 'Colombia Staking Redelegation', 'Staking-Belohnungen reinvestieren', 'EGLD bei Colombia restaken'],
    },
    useCases: {
      en: ['Compound staking rewards automatically', 'Maximize EGLD earnings over time', 'Restake eGold with Colombia Staking'],
      de: ['Staking-Belohnungen automatisch reinvestieren', 'EGLD-Ertrage langfristig maximieren', 'eGold bei Colombia Staking restaken'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'What does redelegating EGLD do?',
          answer:
            'Redelegating automatically restakes your earned rewards with Colombia Staking, compounding your returns over time instead of letting them sit idle.',
        },
      ],
      de: [
        {
          question: 'Was bewirkt das Redelegieren von EGLD?',
          answer:
            'Beim Redelegieren werden deine verdienten Belohnungen automatisch bei Colombia Staking erneut gestakt, sodass sich deine Erträge über die Zeit hinweg verzinsen, anstatt ungenutzt zu bleiben.',
        },
      ],
    },
  },
  'undelegate-egld': {
    keywords: {
      en: ['undelegate EGLD', 'unstake Colombia Staking', 'withdraw staked EGLD', 'remove Colombia delegation'],
      de: ['EGLD undelegieren', 'Colombia Staking unstaken', 'gestakte EGLD abheben', 'Colombia Delegation entfernen'],
    },
    useCases: {
      en: ['Unstake EGLD from Colombia Staking', 'Withdraw staked eGold', 'Manage staking delegations'],
      de: ['EGLD von Colombia Staking unstaken', 'Gestaktes eGold abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How long does it take to undelegate EGLD?',
          answer:
            'After undelegating, your EGLD goes through a 10-day unbonding period before it becomes available for withdrawal to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie lange dauert es, EGLD zu undelegieren?',
          answer:
            'Nach dem Undelegieren durchläuft dein EGLD eine 10-tägige Unbonding-Periode, bevor es zur Auszahlung in dein Wallet verfügbar wird.',
        },
      ],
    },
  },
}
