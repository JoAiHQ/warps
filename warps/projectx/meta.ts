import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'stake-egld': {
    keywords: {
      en: ['stake eGold', 'EGLD staking', 'ProjectX staking', 'MultiversX staking', 'delegate EGLD ProjectX'],
      de: ['eGold staken', 'EGLD Staking', 'ProjectX Staking', 'MultiversX Staking', 'EGLD an ProjectX delegieren'],
    },
    useCases: {
      en: ['Earn passive income on EGLD', 'Delegate eGold to ProjectX validators', 'Support MultiversX network security'],
      de: ['Passives Einkommen mit EGLD verdienen', 'eGold an ProjectX-Validatoren delegieren', 'MultiversX-Netzwerksicherheit unterstutzen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I stake EGLD with ProjectX?',
          answer:
            'You can delegate your EGLD to the ProjectX staking provider directly through this action. Your staked EGLD earns rewards automatically.',
        },
        {
          question: 'What are the rewards for staking with ProjectX?',
          answer:
            'ProjectX distributes staking rewards to delegators based on the MultiversX network APR, minus a small service fee.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich EGLD mit ProjectX?',
          answer:
            'Du kannst deine EGLD direkt über diese Aktion an den ProjectX-Staking-Anbieter delegieren. Deine gestakten EGLD verdienen automatisch Belohnungen.',
        },
        {
          question: 'Welche Belohnungen gibt es beim Staking mit ProjectX?',
          answer:
            'ProjectX verteilt Staking-Belohnungen an Delegierer basierend auf dem MultiversX-Netzwerk-APR, abzüglich einer kleinen Servicegebühr.',
        },
      ],
    },
  },
  'claim-rewards': {
    keywords: {
      en: ['claim staking rewards', 'ProjectX rewards', 'collect EGLD rewards', 'claim ProjectX delegation rewards'],
      de: ['Staking-Belohnungen einfordern', 'ProjectX Belohnungen', 'EGLD Belohnungen einsammeln', 'ProjectX Delegationsbelohnungen einfordern'],
    },
    useCases: {
      en: ['Collect accumulated EGLD staking rewards', 'Withdraw earned eGold from ProjectX', 'Manage staking delegations'],
      de: ['Angesammelte EGLD-Staking-Belohnungen einsammeln', 'Verdientes eGold von ProjectX abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I claim my ProjectX staking rewards?',
          answer:
            'Use this action to collect your accumulated EGLD staking rewards from ProjectX. Rewards are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie fordere ich meine ProjectX-Staking-Belohnungen ein?',
          answer:
            'Nutze diese Aktion, um deine angesammelten EGLD-Staking-Belohnungen von ProjectX einzusammeln. Die Belohnungen werden direkt an dein Wallet gesendet.',
        },
      ],
    },
  },
  'redelegate-egld': {
    keywords: {
      en: ['redelegate EGLD', 'ProjectX redelegate', 'compound staking rewards', 'restake EGLD ProjectX'],
      de: ['EGLD redelegieren', 'ProjectX Redelegation', 'Staking-Belohnungen reinvestieren', 'EGLD bei ProjectX restaken'],
    },
    useCases: {
      en: ['Compound staking rewards automatically', 'Maximize EGLD earnings over time', 'Restake eGold with ProjectX'],
      de: ['Staking-Belohnungen automatisch reinvestieren', 'EGLD-Ertrage langfristig maximieren', 'eGold bei ProjectX restaken'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'What does redelegating EGLD do?',
          answer:
            'Redelegating automatically restakes your earned rewards with ProjectX, compounding your returns over time instead of letting them sit idle.',
        },
      ],
      de: [
        {
          question: 'Was bewirkt das Redelegieren von EGLD?',
          answer:
            'Beim Redelegieren werden deine verdienten Belohnungen automatisch bei ProjectX erneut gestakt, sodass sich deine Erträge über die Zeit hinweg verzinsen, anstatt ungenutzt zu bleiben.',
        },
      ],
    },
  },
  'undelegate-egld': {
    keywords: {
      en: ['undelegate EGLD', 'unstake ProjectX', 'withdraw staked EGLD', 'remove ProjectX delegation'],
      de: ['EGLD undelegieren', 'ProjectX unstaken', 'gestakte EGLD abheben', 'ProjectX Delegation entfernen'],
    },
    useCases: {
      en: ['Unstake EGLD from ProjectX', 'Withdraw staked eGold', 'Manage staking delegations'],
      de: ['EGLD von ProjectX unstaken', 'Gestaktes eGold abheben', 'Staking-Delegationen verwalten'],
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
