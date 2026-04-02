import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'multisig-overview': {
    keywords: {
      en: ['multisig overview', 'PeerMe multisig', 'DAO wallet', 'multi-signature wallet', 'MultiversX multisig', 'team wallet'],
      de: ['Multisig Übersicht', 'PeerMe Multisig', 'DAO Wallet', 'Multi-Signatur Wallet', 'MultiversX Multisig', 'Team-Wallet'],
    },
    useCases: {
      en: ['Review your DAO treasury balance and recent activity', 'Check pending multisig transactions awaiting approval', 'Monitor your team wallet signers and permissions'],
      de: ['Das DAO-Treasury-Guthaben und letzte Aktivitäten überprüfen', 'Ausstehende Multisig-Transaktionen prüfen, die auf Genehmigung warten', 'Die Unterzeichner und Berechtigungen deines Team-Wallets überwachen'],
    },
    category: 'security',
    faq: {
      en: [
        {
          question: 'What is a PeerMe multisig wallet?',
          answer:
            'A PeerMe multisig is a multi-signature wallet on MultiversX that requires multiple signers to approve transactions. It is ideal for DAOs, teams, and shared treasuries.',
        },
        {
          question: 'How do I view my multisig wallet details?',
          answer:
            'Simply open your multisig overview to see your wallet balance, pending actions, signers, and recent activity at a glance.',
        },
      ],
      de: [
        {
          question: 'Was ist ein PeerMe Multisig Wallet?',
          answer:
            'Ein PeerMe Multisig ist ein Multi-Signatur Wallet auf MultiversX, das mehrere Unterzeichner zur Genehmigung von Transaktionen erfordert. Es ist ideal für DAOs, Teams und gemeinsame Treasuries.',
        },
        {
          question: 'Wie sehe ich die Details meines Multisig Wallets?',
          answer:
            'Öffne einfach deine Multisig-Übersicht, um dein Wallet-Guthaben, ausstehende Aktionen, Unterzeichner und letzte Aktivitäten auf einen Blick zu sehen.',
        },
      ],
    },
  },

  'earn-stake-peerme-dao': {
    keywords: {
      en: ['stake PeerMe', 'PeerMe DAO staking', 'stake PEER token', 'earn PEER rewards', 'PeerMe staking'],
      de: ['PeerMe staken', 'PeerMe DAO Staking', 'PEER Token staken', 'PEER Belohnungen verdienen', 'PeerMe Staking'],
    },
    useCases: {
      en: ['Stake PEER tokens to earn passive rewards from the DAO pool', 'Support PeerMe governance while generating yield on your tokens', 'Lock PEER tokens for long-term staking to maximize rewards'],
      de: ['PEER-Token staken, um passive Belohnungen aus dem DAO-Pool zu verdienen', 'PeerMe-Governance unterstützen und gleichzeitig Rendite auf deine Token erzielen', 'PEER-Token für langfristiges Staking sperren, um Belohnungen zu maximieren'],
    },
    category: 'security',
    faq: {
      en: [
        {
          question: 'How do I stake in the PeerMe DAO?',
          answer:
            'Stake your PEER tokens in the PeerMe DAO to earn staking rewards over time while supporting the DAO governance.',
        },
        {
          question: 'What rewards do I earn from staking?',
          answer:
            'Staking rewards are distributed based on the DAO staking pool configuration. The longer you stake, the more rewards you accumulate.',
        },
      ],
      de: [
        {
          question: 'Wie stake ich in der PeerMe DAO?',
          answer:
            'Stake deine PEER-Token in der PeerMe DAO, um Staking-Belohnungen im Laufe der Zeit zu verdienen und gleichzeitig die DAO-Governance zu unterstützen.',
        },
        {
          question: 'Welche Belohnungen erhalte ich durch Staking?',
          answer:
            'Staking-Belohnungen werden basierend auf der Konfiguration des DAO-Staking-Pools verteilt. Je länger du stakest, desto mehr Belohnungen sammelst du an.',
        },
      ],
    },
  },

  'multisig-sign-action': {
    keywords: {
      en: ['sign multisig action', 'approve transaction', 'multisig signature', 'confirm multisig', 'PeerMe sign'],
      de: ['Multisig-Aktion unterschreiben', 'Transaktion genehmigen', 'Multisig-Signatur', 'Multisig bestätigen', 'PeerMe unterschreiben'],
    },
    useCases: {
      en: ['Approve a DAO treasury payment as one of the required signers', 'Sign a multisig transaction to release funds for a team expense', 'Confirm a pending smart contract interaction from your multisig wallet'],
      de: ['Eine DAO-Treasury-Zahlung als einer der erforderlichen Unterzeichner genehmigen', 'Eine Multisig-Transaktion unterschreiben, um Mittel für eine Teamausgabe freizugeben', 'Eine ausstehende Smart-Contract-Interaktion aus deinem Multisig-Wallet bestätigen'],
    },
    category: 'security',
    faq: {
      en: [
        {
          question: 'How do I sign a pending multisig action?',
          answer:
            'Select the pending transaction you want to approve and confirm your signature. Once enough signers approve, the action is executed automatically.',
        },
        {
          question: 'What happens after I sign an action?',
          answer:
            'Your signature is recorded on-chain. When the required number of signatures is reached, the action executes. If more signatures are still needed, it remains pending.',
        },
      ],
      de: [
        {
          question: 'Wie unterschreibe ich eine ausstehende Multisig-Aktion?',
          answer:
            'Wähle die ausstehende Transaktion aus, die du genehmigen möchtest, und bestätige deine Signatur. Sobald genügend Unterzeichner zustimmen, wird die Aktion automatisch ausgeführt.',
        },
        {
          question: 'Was passiert, nachdem ich eine Aktion unterschrieben habe?',
          answer:
            'Deine Signatur wird On-Chain aufgezeichnet. Wenn die erforderliche Anzahl an Signaturen erreicht ist, wird die Aktion ausgeführt. Wenn noch weitere Signaturen benötigt werden, bleibt sie ausstehend.',
        },
      ],
    },
  },

  'multisig-deposit': {
    keywords: {
      en: ['deposit to multisig', 'fund multisig wallet', 'send to DAO wallet', 'multisig funding'],
      de: ['Einzahlung ins Multisig', 'Multisig Wallet aufladen', 'an DAO Wallet senden', 'Multisig-Finanzierung'],
    },
    useCases: {
      en: ['Fund your DAO treasury with EGLD for upcoming expenses', 'Deposit tokens into a team multisig wallet for project funding', 'Contribute to a shared multisig wallet for a group investment'],
      de: ['Dein DAO-Treasury mit EGLD für anstehende Ausgaben aufladen', 'Token in ein Team-Multisig-Wallet für Projektfinanzierung einzahlen', 'Zu einem gemeinsamen Multisig-Wallet für eine Gruppeninvestition beitragen'],
    },
    category: 'security',
  },

  'multisig-get-pending-actions': {
    keywords: {
      en: ['pending multisig actions', 'view pending transactions', 'multisig queue', 'awaiting signatures'],
      de: ['ausstehende Multisig-Aktionen', 'ausstehende Transaktionen anzeigen', 'Multisig-Warteschlange', 'auf Signaturen wartend'],
    },
    useCases: {
      en: ['Check which multisig transactions need your signature', 'Review pending DAO proposals before signing', 'Monitor the approval queue for team wallet transactions'],
      de: ['Prüfen, welche Multisig-Transaktionen deine Signatur benötigen', 'Ausstehende DAO-Vorschläge vor dem Unterschreiben überprüfen', 'Die Genehmigungswarteschlange für Team-Wallet-Transaktionen überwachen'],
    },
    category: 'security',
  },

  'earn-claim-peerme-dao': {
    keywords: {
      en: ['claim PeerMe rewards', 'collect staking rewards', 'PeerMe DAO claim', 'harvest PEER rewards'],
      de: ['PeerMe Belohnungen beanspruchen', 'Staking-Belohnungen einsammeln', 'PeerMe DAO Anspruch', 'PEER Belohnungen ernten'],
    },
    useCases: {
      en: ['Harvest accumulated PEER staking rewards into your wallet', 'Claim DAO rewards before compounding them back into staking', 'Collect earned staking yield without withdrawing your stake'],
      de: ['Angesammelte PEER-Staking-Belohnungen in dein Wallet ernten', 'DAO-Belohnungen beanspruchen, bevor du sie wieder ins Staking reinvestierst', 'Verdiente Staking-Rendite einsammeln, ohne deinen Stake abzuheben'],
    },
    category: 'security',
  },

  'earn-withdraw-peerme-dao': {
    keywords: {
      en: ['withdraw PeerMe stake', 'unstake PEER', 'PeerMe DAO withdraw', 'remove stake'],
      de: ['PeerMe Stake abheben', 'PEER entstaken', 'PeerMe DAO Abhebung', 'Stake entfernen'],
    },
    useCases: {
      en: ['Unstake PEER tokens to use them in a different protocol', 'Withdraw your stake to sell or transfer your PEER tokens', 'Remove staked tokens after achieving your target reward amount'],
      de: ['PEER-Token entstaken, um sie in einem anderen Protokoll zu verwenden', 'Deinen Stake abheben, um deine PEER-Token zu verkaufen oder zu übertragen', 'Gestakte Token abheben, nachdem du deinen Ziel-Belohnungsbetrag erreicht hast'],
    },
    category: 'security',
  },

  'identity-burn-for-trust': {
    keywords: {
      en: ['burn for trust', 'PeerMe trust score', 'identity trust', 'burn tokens trust', 'reputation score'],
      de: ['Verbrennen für Vertrauen', 'PeerMe Vertrauenswert', 'Identitätsvertrauen', 'Token für Vertrauen verbrennen', 'Reputationswert'],
    },
    useCases: {
      en: ['Boost your on-chain trust score to gain credibility in DAOs', 'Burn tokens to qualify as a trusted signer on multisig wallets', 'Build reputation to unlock governance privileges in the PeerMe ecosystem'],
      de: ['Deinen On-Chain-Vertrauenswert erhöhen, um Glaubwürdigkeit in DAOs zu gewinnen', 'Token verbrennen, um als vertrauenswürdiger Unterzeichner auf Multisig-Wallets qualifiziert zu werden', 'Reputation aufbauen, um Governance-Privilegien im PeerMe-Ökosystem freizuschalten'],
    },
    category: 'security',
  },

  'multisig-propose-transfer-execute-egld': {
    keywords: {
      en: ['propose EGLD transfer', 'multisig send EGLD', 'DAO transfer EGLD', 'propose multisig payment'],
      de: ['EGLD-Überweisung vorschlagen', 'Multisig EGLD senden', 'DAO EGLD übertragen', 'Multisig-Zahlung vorschlagen'],
    },
    useCases: {
      en: ['Propose a DAO payment to a contractor or service provider', 'Submit an EGLD transfer for team salary payments from multisig', 'Initiate a multisig treasury withdrawal for operational expenses'],
      de: ['Eine DAO-Zahlung an einen Auftragnehmer oder Dienstleister vorschlagen', 'Eine EGLD-Überweisung für Team-Gehaltszahlungen aus dem Multisig einreichen', 'Eine Multisig-Treasury-Abhebung für Betriebskosten initiieren'],
    },
    category: 'security',
  },

  'multisig-registry-list': {
    keywords: {
      en: ['multisig registry', 'list multisig wallets', 'PeerMe registry', 'browse DAOs', 'discover multisig'],
      de: ['Multisig-Verzeichnis', 'Multisig Wallets auflisten', 'PeerMe Verzeichnis', 'DAOs durchsuchen', 'Multisig entdecken'],
    },
    useCases: {
      en: ['Browse active DAOs on MultiversX to find communities to join', 'Discover team wallets and their governance structures', 'Search the registry for a specific multisig wallet or DAO'],
      de: ['Aktive DAOs auf MultiversX durchsuchen, um Communities zum Beitreten zu finden', 'Team-Wallets und ihre Governance-Strukturen entdecken', 'Das Verzeichnis nach einem bestimmten Multisig-Wallet oder DAO durchsuchen'],
    },
    category: 'security',
  },
}
