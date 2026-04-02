import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'stake-egld': {
    keywords: {
      en: ['stake eGold', 'EGLD staking', 'EAPES staking', 'MultiversX staking', 'delegate EGLD EAPES'],
      de: ['eGold staken', 'EGLD Staking', 'EAPES Staking', 'MultiversX Staking', 'EGLD an EAPES delegieren'],
    },
    useCases: {
      en: ['Earn passive income on EGLD', 'Delegate eGold to EAPES validators', 'Support MultiversX network security'],
      de: ['Passives Einkommen mit EGLD verdienen', 'eGold an EAPES-Validatoren delegieren', 'MultiversX-Netzwerksicherheit unterstutzen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I stake EGLD with EAPES?',
          answer:
            'You can delegate your EGLD to the EAPES staking provider directly through this action. Your staked EGLD earns rewards automatically.',
        },
        {
          question: 'What are the rewards for staking with EAPES?',
          answer:
            'EAPES distributes staking rewards to delegators based on the MultiversX network APR, minus a small service fee.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich EGLD mit EAPES?',
          answer:
            'Du kannst deine EGLD direkt über diese Aktion an den EAPES-Staking-Anbieter delegieren. Deine gestakten EGLD verdienen automatisch Belohnungen.',
        },
        {
          question: 'Welche Belohnungen gibt es beim Staking mit EAPES?',
          answer:
            'EAPES verteilt Staking-Belohnungen an Delegierer basierend auf dem MultiversX-Netzwerk-APR, abzüglich einer kleinen Servicegebühr.',
        },
      ],
    },
  },
  'claim-rewards': {
    keywords: {
      en: ['claim staking rewards', 'EAPES rewards', 'collect EGLD rewards', 'claim EAPES delegation rewards'],
      de: ['Staking-Belohnungen einfordern', 'EAPES Belohnungen', 'EGLD Belohnungen einsammeln', 'EAPES Delegationsbelohnungen einfordern'],
    },
    useCases: {
      en: ['Collect accumulated EGLD staking rewards', 'Withdraw earned eGold from EAPES', 'Manage staking delegations'],
      de: ['Angesammelte EGLD-Staking-Belohnungen einsammeln', 'Verdientes eGold von EAPES abheben', 'Staking-Delegationen verwalten'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'How do I claim my EAPES staking rewards?',
          answer:
            'Use this action to collect your accumulated EGLD staking rewards from the EAPES provider. Rewards are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wie fordere ich meine EAPES-Staking-Belohnungen ein?',
          answer:
            'Nutze diese Aktion, um deine angesammelten EGLD-Staking-Belohnungen vom EAPES-Anbieter einzusammeln. Die Belohnungen werden direkt an dein Wallet gesendet.',
        },
      ],
    },
  },
  'redelegate-egld': {
    keywords: {
      en: ['redelegate EGLD', 'EAPES redelegate', 'compound staking rewards', 'restake EGLD EAPES'],
      de: ['EGLD redelegieren', 'EAPES Redelegation', 'Staking-Belohnungen reinvestieren', 'EGLD bei EAPES restaken'],
    },
    useCases: {
      en: ['Compound staking rewards automatically', 'Maximize EGLD earnings over time', 'Restake eGold with EAPES'],
      de: ['Staking-Belohnungen automatisch reinvestieren', 'EGLD-Ertrage langfristig maximieren', 'eGold bei EAPES restaken'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'What does redelegating EGLD do?',
          answer:
            'Redelegating automatically restakes your earned rewards with EAPES, compounding your returns over time instead of letting them sit idle.',
        },
      ],
      de: [
        {
          question: 'Was bewirkt das Redelegieren von EGLD?',
          answer:
            'Beim Redelegieren werden deine verdienten Belohnungen automatisch bei EAPES erneut gestakt, sodass sich deine Erträge über die Zeit hinweg verzinsen, anstatt ungenutzt zu bleiben.',
        },
      ],
    },
  },
  'undelegate-egld': {
    keywords: {
      en: ['undelegate EGLD', 'unstake EAPES', 'withdraw staked EGLD', 'remove EAPES delegation'],
      de: ['EGLD undelegieren', 'EAPES unstaken', 'gestakte EGLD abheben', 'EAPES Delegation entfernen'],
    },
    useCases: {
      en: ['Unstake EGLD from EAPES', 'Withdraw staked eGold', 'Manage staking delegations'],
      de: ['EGLD von EAPES unstaken', 'Gestaktes eGold abheben', 'Staking-Delegationen verwalten'],
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
