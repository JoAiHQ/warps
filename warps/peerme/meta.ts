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
    faq: {
      en: [
        {
          question: 'How do I deposit funds into a multi-sig wallet?',
          answer:
            'Send EGLD or any ESDT token directly to your multi-sig wallet address. The deposit appears in the treasury balance immediately and does not require approval from other signers.',
        },
      ],
      de: [
        {
          question: 'Wie zahle ich Guthaben in ein Multi-Sig Wallet ein?',
          answer:
            'Sende EGLD oder einen beliebigen ESDT-Token direkt an deine Multi-Sig-Wallet-Adresse. Die Einzahlung erscheint sofort im Treasury-Guthaben und erfordert keine Zustimmung anderer Unterzeichner.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'How do I see proposals waiting for my signature?',
          answer:
            'Open the pending actions list for your multi-sig wallet to see all proposals that still need your signature, along with their details, current approval count, and required threshold.',
        },
      ],
      de: [
        {
          question: 'Wie sehe ich Vorschläge, die auf meine Signatur warten?',
          answer:
            'Öffne die Liste der ausstehenden Aktionen deines Multi-Sig Wallets, um alle Vorschläge zu sehen, die noch deine Signatur benötigen, inklusive Details, aktuellem Genehmigungsstand und erforderlicher Schwelle.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'When can I claim my SUPER staking rewards?',
          answer:
            'Rewards accrue continuously while your SUPER tokens are staked. You can claim them at any time without unstaking, and they are sent directly to your wallet.',
        },
      ],
      de: [
        {
          question: 'Wann kann ich meine SUPER-Staking-Belohnungen beanspruchen?',
          answer:
            'Belohnungen laufen kontinuierlich auf, solange deine SUPER-Token gestakt sind. Du kannst sie jederzeit beanspruchen, ohne zu entstaken, und sie werden direkt in dein Wallet gesendet.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Is there a cooldown period for withdrawing staked SUPER?',
          answer:
            'Yes, after initiating a withdrawal your SUPER tokens enter an unbonding period before they become available in your wallet. During this time they no longer earn rewards.',
        },
      ],
      de: [
        {
          question: 'Gibt es eine Wartezeit beim Abheben von gestakten SUPER?',
          answer:
            'Ja, nach dem Einleiten einer Abhebung durchlaufen deine SUPER-Token eine Unbonding-Phase, bevor sie in deinem Wallet verfügbar sind. Während dieser Zeit erhältst du keine Belohnungen mehr.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'What does burning SUPER tokens for trust do?',
          answer:
            'Burning SUPER permanently removes them from circulation and increases your on-chain trust score. A higher trust score gives you more governance weight in DAOs and signals credibility to other members.',
        },
      ],
      de: [
        {
          question: 'Was bewirkt das Verbrennen von SUPER-Token für Vertrauen?',
          answer:
            'Das Verbrennen von SUPER entfernt sie dauerhaft aus dem Umlauf und erhöht deinen On-Chain-Vertrauenswert. Ein höherer Vertrauenswert gibt dir mehr Governance-Gewicht in DAOs und signalisiert anderen Mitgliedern Glaubwürdigkeit.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'How do I propose sending EGLD from a multi-sig wallet?',
          answer:
            'Create a transfer proposal by specifying the recipient address and EGLD amount. The proposal enters the pending queue and other signers can then review and approve it before execution.',
        },
      ],
      de: [
        {
          question: 'Wie schlage ich eine EGLD-Überweisung aus einem Multi-Sig Wallet vor?',
          answer:
            'Erstelle einen Überweisungsvorschlag, indem du die Empfängeradresse und den EGLD-Betrag angibst. Der Vorschlag wird in die Warteschlange gestellt und andere Unterzeichner können ihn prüfen und genehmigen.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Where can I see all my multi-sig wallets?',
          answer:
            'The multi-sig registry lists every wallet linked to your address. You can browse it to see wallet names, signer counts, and balances for all DAOs and teams you belong to.',
        },
      ],
      de: [
        {
          question: 'Wo kann ich alle meine Multi-Sig Wallets sehen?',
          answer:
            'Das Multi-Sig-Verzeichnis listet jedes Wallet auf, das mit deiner Adresse verknüpft ist. Du kannst dort Wallet-Namen, Anzahl der Unterzeichner und Guthaben aller DAOs und Teams sehen, denen du angehörst.',
        },
      ],
    },
  },
}
