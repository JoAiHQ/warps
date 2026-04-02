import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'account-info': {
    keywords: {
      en: ['MultiversX account info', 'EGLD wallet balance', 'MultiversX address lookup', 'eGold account details', 'MultiversX wallet viewer'],
      de: ['MultiversX Kontoinformationen', 'EGLD Wallet-Guthaben', 'MultiversX Adressabfrage', 'eGold Kontodetails', 'MultiversX Wallet-Anzeige'],
    },
    useCases: {
      en: ['Check EGLD balance for any MultiversX wallet address', 'Verify account shard assignment and nonce', 'Audit on-chain account properties before transactions', 'Monitor wallet status for portfolio tracking'],
      de: ['EGLD-Guthaben fuer jede MultiversX-Wallet-Adresse pruefen', 'Shard-Zuweisung und Nonce des Kontos verifizieren', 'On-Chain-Kontoeigenschaften vor Transaktionen pruefen', 'Wallet-Status fuer Portfolio-Tracking ueberwachen'],
    },
    category: 'analytics',
    faq: {
      en: [
        {
          question: 'What information can I see about a MultiversX account?',
          answer:
            'You can view the account balance, nonce, shard assignment, and other on-chain details associated with any MultiversX address.',
        },
        {
          question: 'Do I need to connect a wallet to view account information?',
          answer:
            'No, you can look up any public MultiversX address. Connecting a wallet is only needed if you want to view your own account quickly.',
        },
      ],
      de: [
        {
          question: 'Welche Informationen kann ich zu einem MultiversX-Konto einsehen?',
          answer:
            'Du kannst den Kontostand, die Nonce, die Shard-Zuweisung und weitere On-Chain-Details zu jeder MultiversX-Adresse einsehen.',
        },
        {
          question: 'Muss ich eine Wallet verbinden, um Kontoinformationen anzuzeigen?',
          answer:
            'Nein, du kannst jede öffentliche MultiversX-Adresse nachschlagen. Eine Wallet-Verbindung ist nur nötig, wenn du dein eigenes Konto schnell einsehen möchtest.',
        },
      ],
    },
  },
  'account-tokens': {
    keywords: {
      en: ['MultiversX token balance', 'ESDT tokens list', 'MultiversX wallet tokens', 'eGold token portfolio', 'MultiversX token viewer'],
      de: ['MultiversX Token-Guthaben', 'ESDT Token-Liste', 'MultiversX Wallet-Token', 'eGold Token-Portfolio', 'MultiversX Token-Anzeige'],
    },
    useCases: {
      en: ['Review ESDT token holdings for any MultiversX address', 'Track token portfolio balances across wallets', 'Verify token receipts after trades or transfers', 'Analyze token distribution for research purposes'],
      de: ['ESDT-Token-Bestaende fuer jede MultiversX-Adresse einsehen', 'Token-Portfolio-Guthaben ueber Wallets hinweg verfolgen', 'Token-Eingaenge nach Trades oder Transfers verifizieren', 'Token-Verteilung fuer Recherchezwecke analysieren'],
    },
    category: 'analytics',
    faq: {
      en: [
        {
          question: 'What tokens will I see for a MultiversX account?',
          answer:
            'You will see all ESDT fungible tokens held by the account, including their balances and token identifiers.',
        },
        {
          question: 'Can I view tokens for any MultiversX address?',
          answer:
            'Yes, token holdings are public on-chain data and can be viewed for any valid MultiversX address.',
        },
      ],
      de: [
        {
          question: 'Welche Token werden mir für ein MultiversX-Konto angezeigt?',
          answer:
            'Du siehst alle fungiblen ESDT-Token des Kontos, einschließlich ihrer Guthaben und Token-Bezeichner.',
        },
        {
          question: 'Kann ich die Token jeder MultiversX-Adresse einsehen?',
          answer:
            'Ja, Token-Bestände sind öffentliche On-Chain-Daten und können für jede gültige MultiversX-Adresse eingesehen werden.',
        },
      ],
    },
  },
  'account-nfts': {
    keywords: {
      en: ['MultiversX NFTs', 'ESDT NFT collection', 'MultiversX NFT viewer', 'eGold NFT portfolio', 'view MultiversX NFTs'],
      de: ['MultiversX NFTs', 'ESDT NFT-Sammlung', 'MultiversX NFT-Anzeige', 'eGold NFT-Portfolio', 'MultiversX NFTs anzeigen'],
    },
    useCases: {
      en: ['View NFT and SFT collections for any MultiversX address', 'Verify NFT ownership and metadata on-chain', 'Track NFT portfolio value and holdings', 'Explore collection attributes and rarity data'],
      de: ['NFT- und SFT-Sammlungen fuer jede MultiversX-Adresse anzeigen', 'NFT-Eigentumsrechte und Metadaten on-chain verifizieren', 'NFT-Portfolio-Wert und Bestaende verfolgen', 'Sammlungsattribute und Seltenheitsdaten erkunden'],
    },
    category: 'analytics',
    faq: {
      en: [
        {
          question: 'What types of NFTs does this show?',
          answer:
            'It displays all non-fungible and semi-fungible ESDT tokens (NFTs and SFTs) held by the account, including their metadata and collection info.',
        },
        {
          question: 'Can I see NFT images and attributes?',
          answer:
            'Yes, the viewer shows available metadata such as name, image, and attributes for each NFT in the account.',
        },
      ],
      de: [
        {
          question: 'Welche Arten von NFTs werden hier angezeigt?',
          answer:
            'Es werden alle nicht-fungiblen und semi-fungiblen ESDT-Token (NFTs und SFTs) des Kontos angezeigt, einschließlich ihrer Metadaten und Sammlungsinformationen.',
        },
        {
          question: 'Kann ich NFT-Bilder und Attribute sehen?',
          answer:
            'Ja, die Anzeige zeigt verfügbare Metadaten wie Name, Bild und Attribute für jedes NFT im Konto.',
        },
      ],
    },
  },
  'account-transactions': {
    keywords: {
      en: ['MultiversX transaction history', 'EGLD transactions', 'MultiversX address transactions', 'eGold transfer history', 'MultiversX activity log'],
      de: ['MultiversX Transaktionsverlauf', 'EGLD Transaktionen', 'MultiversX Adress-Transaktionen', 'eGold Überweisungsverlauf', 'MultiversX Aktivitätsprotokoll'],
    },
    useCases: {
      en: ['Audit full transaction history for any MultiversX address', 'Track EGLD and token transfers over time', 'Monitor smart contract interactions and staking activity', 'Investigate suspicious or failed transactions'],
      de: ['Vollstaendigen Transaktionsverlauf fuer jede MultiversX-Adresse pruefen', 'EGLD- und Token-Transfers ueber die Zeit verfolgen', 'Smart-Contract-Interaktionen und Staking-Aktivitaeten ueberwachen', 'Verdaechtige oder fehlgeschlagene Transaktionen untersuchen'],
    },
    category: 'analytics',
    faq: {
      en: [
        {
          question: 'How far back can I see transaction history?',
          answer:
            'You can browse the full on-chain transaction history for any MultiversX address, going back to the first transaction on the account.',
        },
        {
          question: 'Does this show smart contract interactions?',
          answer:
            'Yes, the transaction history includes all types of transactions such as transfers, staking operations, and smart contract calls.',
        },
      ],
      de: [
        {
          question: 'Wie weit reicht der Transaktionsverlauf zurück?',
          answer:
            'Du kannst den gesamten On-Chain-Transaktionsverlauf jeder MultiversX-Adresse durchsuchen, bis zur ersten Transaktion des Kontos.',
        },
        {
          question: 'Werden auch Smart-Contract-Interaktionen angezeigt?',
          answer:
            'Ja, der Transaktionsverlauf umfasst alle Arten von Transaktionen wie Überweisungen, Staking-Vorgänge und Smart-Contract-Aufrufe.',
        },
      ],
    },
  },
  'staking-claim-all': {
    keywords: {
      en: ['claim EGLD staking rewards', 'MultiversX staking claim', 'eGold staking rewards', 'claim all staking rewards MultiversX', 'EGLD delegation rewards'],
      de: ['EGLD Staking-Belohnungen einfordern', 'MultiversX Staking-Auszahlung', 'eGold Staking-Belohnungen', 'alle Staking-Belohnungen einfordern MultiversX', 'EGLD Delegations-Belohnungen'],
    },
    useCases: {
      en: ['Collect EGLD staking rewards from all providers at once', 'Simplify reward management for multi-provider delegations', 'Harvest staking earnings to reinvest or trade', 'Automate periodic reward claiming for staking portfolios'],
      de: ['EGLD-Staking-Belohnungen von allen Anbietern auf einmal einfordern', 'Belohnungsverwaltung fuer Multi-Anbieter-Delegationen vereinfachen', 'Staking-Einnahmen zur Reinvestition oder zum Handel ernten', 'Periodisches Einfordern von Belohnungen fuer Staking-Portfolios automatisieren'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'What does claiming all staking rewards do?',
          answer:
            'It collects your accumulated eGold staking rewards from all staking providers in a single transaction, sending them to your wallet.',
        },
        {
          question: 'How often should I claim my staking rewards?',
          answer:
            'You can claim at any time. Rewards accumulate continuously, so the frequency is up to you based on your preference and transaction fee considerations.',
        },
        {
          question: 'Do I need to unstake to claim my rewards?',
          answer:
            'No, claiming rewards does not affect your staked eGold. Your delegation remains active while you collect the earned rewards.',
        },
      ],
      de: [
        {
          question: 'Was bewirkt das Einfordern aller Staking-Belohnungen?',
          answer:
            'Es sammelt deine angesammelten eGold-Staking-Belohnungen von allen Staking-Anbietern in einer einzigen Transaktion und sendet sie an deine Wallet.',
        },
        {
          question: 'Wie oft sollte ich meine Staking-Belohnungen einfordern?',
          answer:
            'Du kannst jederzeit einfordern. Belohnungen sammeln sich fortlaufend an, daher liegt die Häufigkeit bei dir, abhängig von deinen Präferenzen und den Transaktionsgebühren.',
        },
        {
          question: 'Muss ich mein Staking auflösen, um Belohnungen einzufordern?',
          answer:
            'Nein, das Einfordern von Belohnungen hat keinen Einfluss auf dein gestaktes eGold. Deine Delegation bleibt aktiv, während du die verdienten Belohnungen erhältst.',
        },
      ],
    },
  },
  'staking-delegations': {
    keywords: {
      en: ['MultiversX staking delegations', 'EGLD staking positions', 'eGold delegation overview', 'MultiversX staking providers', 'view EGLD stake'],
      de: ['MultiversX Staking-Delegationen', 'EGLD Staking-Positionen', 'eGold Delegationsübersicht', 'MultiversX Staking-Anbieter', 'EGLD Stake anzeigen'],
    },
    useCases: {
      en: ['Review staking positions across all MultiversX providers', 'Monitor claimable rewards for each delegation', 'Compare delegation amounts between staking providers', 'Track staking portfolio performance over time'],
      de: ['Staking-Positionen bei allen MultiversX-Anbietern ueberpruefen', 'Einforderbare Belohnungen fuer jede Delegation ueberwachen', 'Delegationsbetraege zwischen Staking-Anbietern vergleichen', 'Staking-Portfolio-Performance ueber die Zeit verfolgen'],
    },
    category: 'staking',
    faq: {
      en: [
        {
          question: 'What information does the delegations view show?',
          answer:
            'It shows all your active staking positions, including the staking provider, delegated amount, and claimable rewards for each.',
        },
        {
          question: 'Can I see delegations for any address?',
          answer:
            'Yes, staking delegations are on-chain data and can be viewed for any MultiversX address.',
        },
      ],
      de: [
        {
          question: 'Welche Informationen zeigt die Delegationsansicht?',
          answer:
            'Sie zeigt alle deine aktiven Staking-Positionen, einschließlich des Staking-Anbieters, des delegierten Betrags und der einforderbaren Belohnungen für jede Position.',
        },
        {
          question: 'Kann ich Delegationen für jede Adresse einsehen?',
          answer:
            'Ja, Staking-Delegationen sind On-Chain-Daten und können für jede MultiversX-Adresse eingesehen werden.',
        },
      ],
    },
  },
  'esdt-issue-fungible': {
    keywords: {
      en: ['create token MultiversX', 'issue ESDT token', 'MultiversX fungible token', 'launch token eGold', 'mint ESDT MultiversX'],
      de: ['Token erstellen MultiversX', 'ESDT Token ausgeben', 'MultiversX fungibler Token', 'Token launchen eGold', 'ESDT prägen MultiversX'],
    },
    useCases: {
      en: ['Launch a new fungible token for a DeFi project on MultiversX', 'Create a community or governance token with custom supply', 'Issue reward tokens for loyalty or gaming platforms', 'Prototype tokenomics with configurable mint and burn properties'],
      de: ['Einen neuen fungiblen Token fuer ein DeFi-Projekt auf MultiversX starten', 'Einen Community- oder Governance-Token mit benutzerdefinierter Menge erstellen', 'Belohnungstoken fuer Treue- oder Gaming-Plattformen ausgeben', 'Tokenomics mit konfigurierbaren Praege- und Burn-Eigenschaften prototypisieren'],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'What is an ESDT fungible token?',
          answer:
            'ESDT (eStandard Digital Token) is the MultiversX token standard. A fungible ESDT token is interchangeable, similar to ERC-20 tokens on Ethereum.',
        },
        {
          question: 'What do I need to issue a fungible token on MultiversX?',
          answer:
            'You need a MultiversX wallet with a small amount of EGLD to cover the issuance cost (0.05 EGLD) and transaction fees.',
        },
        {
          question: 'Can I configure token properties like supply and decimals?',
          answer:
            'Yes, you can set the token name, ticker, initial supply, number of decimals, and properties such as mintable, burnable, and pausable.',
        },
      ],
      de: [
        {
          question: 'Was ist ein fungibler ESDT-Token?',
          answer:
            'ESDT (eStandard Digital Token) ist der MultiversX-Token-Standard. Ein fungibler ESDT-Token ist austauschbar, ähnlich wie ERC-20-Token auf Ethereum.',
        },
        {
          question: 'Was brauche ich, um einen fungiblen Token auf MultiversX auszugeben?',
          answer:
            'Du benötigst eine MultiversX-Wallet mit einem kleinen Betrag an EGLD, um die Ausgabekosten (0,05 EGLD) und Transaktionsgebühren zu decken.',
        },
        {
          question: 'Kann ich Token-Eigenschaften wie Gesamtmenge und Dezimalstellen konfigurieren?',
          answer:
            'Ja, du kannst den Token-Namen, das Kürzel, die anfängliche Gesamtmenge, die Anzahl der Dezimalstellen und Eigenschaften wie prägbar, burnable und pausierbar festlegen.',
        },
      ],
    },
  },
  'esdt-nft-create': {
    keywords: {
      en: ['mint NFT MultiversX', 'create NFT eGold', 'ESDT NFT mint', 'MultiversX NFT creator', 'issue NFT MultiversX blockchain'],
      de: ['NFT prägen MultiversX', 'NFT erstellen eGold', 'ESDT NFT prägen', 'MultiversX NFT-Ersteller', 'NFT ausgeben MultiversX Blockchain'],
    },
    useCases: {
      en: ['Mint individual NFTs within an existing MultiversX collection', 'Create digital art with custom royalties and metadata', 'Issue event tickets or membership passes as NFTs', 'Build NFT-based gaming assets with on-chain attributes'],
      de: ['Einzelne NFTs innerhalb einer bestehenden MultiversX-Sammlung praegen', 'Digitale Kunst mit individuellen Lizenzgebuehren und Metadaten erstellen', 'Event-Tickets oder Mitgliedsausweise als NFTs ausgeben', 'NFT-basierte Gaming-Assets mit On-Chain-Attributen erstellen'],
    },
    category: 'nft',
    faq: {
      en: [
        {
          question: 'How do I mint an NFT on MultiversX?',
          answer:
            'You need an existing NFT collection with the NFT create role assigned to your address. Then you can mint by providing the name, royalties, media, and attributes.',
        },
        {
          question: 'What media formats are supported for MultiversX NFTs?',
          answer:
            'MultiversX NFTs support various media types including images, videos, and audio. The media is typically stored on IPFS or a similar decentralized storage.',
        },
      ],
      de: [
        {
          question: 'Wie präge ich ein NFT auf MultiversX?',
          answer:
            'Du brauchst eine bestehende NFT-Sammlung, bei der die NFT-Erstellungsrolle deiner Adresse zugewiesen ist. Dann kannst du prägen, indem du Name, Lizenzgebühren, Medien und Attribute angibst.',
        },
        {
          question: 'Welche Medienformate werden für MultiversX-NFTs unterstützt?',
          answer:
            'MultiversX-NFTs unterstützen verschiedene Medientypen wie Bilder, Videos und Audio. Die Medien werden typischerweise auf IPFS oder einem ähnlichen dezentralen Speicher abgelegt.',
        },
      ],
    },
  },
  'esdt-issue-nft-collection': {
    keywords: {
      en: ['create NFT collection MultiversX', 'issue NFT collection eGold', 'ESDT NFT collection', 'MultiversX NFT project', 'launch NFT collection MultiversX'],
      de: ['NFT-Sammlung erstellen MultiversX', 'NFT-Sammlung ausgeben eGold', 'ESDT NFT-Sammlung', 'MultiversX NFT-Projekt', 'NFT-Sammlung starten MultiversX'],
    },
    useCases: {
      en: ['Launch a new NFT collection or project on MultiversX', 'Set up an on-chain container for minting digital art', 'Create branded NFT collections for communities or events', 'Establish a collection before assigning minting roles and creating NFTs'],
      de: ['Eine neue NFT-Sammlung oder ein Projekt auf MultiversX starten', 'Einen On-Chain-Container fuer das Praegen digitaler Kunst einrichten', 'Marken-NFT-Sammlungen fuer Communities oder Events erstellen', 'Eine Sammlung einrichten, bevor Praegerollen zugewiesen und NFTs erstellt werden'],
    },
    category: 'nft',
    faq: {
      en: [
        {
          question: 'What is an NFT collection on MultiversX?',
          answer:
            'An NFT collection is a registered token type on-chain under which individual NFTs can be minted. It acts as a container with a unique collection ticker.',
        },
        {
          question: 'How much does it cost to issue an NFT collection?',
          answer:
            'Issuing an NFT collection on MultiversX costs 0.05 EGLD plus a small transaction fee.',
        },
        {
          question: 'What happens after I issue the collection?',
          answer:
            'After issuing, you need to assign the NFT create role to your address before you can start minting individual NFTs within the collection.',
        },
      ],
      de: [
        {
          question: 'Was ist eine NFT-Sammlung auf MultiversX?',
          answer:
            'Eine NFT-Sammlung ist ein registrierter Token-Typ auf der Blockchain, unter dem einzelne NFTs geprägt werden können. Sie fungiert als Container mit einem einzigartigen Sammlungskürzel.',
        },
        {
          question: 'Wie viel kostet es, eine NFT-Sammlung auszugeben?',
          answer:
            'Die Ausgabe einer NFT-Sammlung auf MultiversX kostet 0,05 EGLD zuzüglich einer kleinen Transaktionsgebühr.',
        },
        {
          question: 'Was passiert, nachdem ich die Sammlung ausgegeben habe?',
          answer:
            'Nach der Ausgabe musst du die NFT-Erstellungsrolle deiner Adresse zuweisen, bevor du einzelne NFTs innerhalb der Sammlung prägen kannst.',
        },
      ],
    },
  },
  'wrap-egld': {
    keywords: {
      en: ['wrap EGLD', 'WEGLD MultiversX', 'convert EGLD to WEGLD', 'wrapped eGold', 'EGLD wrapping'],
      de: ['EGLD wrappen', 'WEGLD MultiversX', 'EGLD in WEGLD umwandeln', 'gewrapptes eGold', 'EGLD Wrapping'],
    },
    useCases: {
      en: ['Prepare EGLD for use in DeFi protocols and DEX trading', 'Convert to WEGLD for liquidity pool participation', 'Enable smart contract interactions that require ESDT tokens', 'Wrap EGLD before swapping on MultiversX decentralized exchanges'],
      de: ['EGLD fuer die Nutzung in DeFi-Protokollen und DEX-Handel vorbereiten', 'In WEGLD fuer die Teilnahme an Liquiditaetspools umwandeln', 'Smart-Contract-Interaktionen ermoeglichen, die ESDT-Token erfordern', 'EGLD vor dem Tausch auf MultiversX-dezentralen Boersen wrappen'],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'Why do I need to wrap EGLD?',
          answer:
            'Wrapped EGLD (WEGLD) is an ESDT token required by many MultiversX DeFi protocols and decentralized exchanges, since native EGLD cannot be used directly in smart contracts that expect ESDT tokens.',
        },
        {
          question: 'Is wrapping EGLD reversible?',
          answer:
            'Yes, you can unwrap WEGLD back to native EGLD at any time at a 1:1 ratio with no loss of value.',
        },
      ],
      de: [
        {
          question: 'Warum muss ich EGLD wrappen?',
          answer:
            'Wrapped EGLD (WEGLD) ist ein ESDT-Token, der von vielen MultiversX-DeFi-Protokollen und dezentralen Börsen benötigt wird, da natives EGLD nicht direkt in Smart Contracts verwendet werden kann, die ESDT-Token erwarten.',
        },
        {
          question: 'Ist das Wrapping von EGLD umkehrbar?',
          answer:
            'Ja, du kannst WEGLD jederzeit im Verhältnis 1:1 ohne Wertverlust zurück in natives EGLD unwrappen.',
        },
      ],
    },
  },
  'unwrap-egld': {
    keywords: {
      en: ['unwrap WEGLD', 'WEGLD to EGLD', 'convert WEGLD', 'unwrap eGold', 'WEGLD unwrapping MultiversX'],
      de: ['WEGLD unwrappen', 'WEGLD zu EGLD', 'WEGLD umwandeln', 'eGold unwrappen', 'WEGLD Unwrapping MultiversX'],
    },
    useCases: {
      en: ['Convert WEGLD back to native EGLD after DeFi trading', 'Reclaim native eGold from liquidity pool exits', 'Unwrap WEGLD for staking or direct transfers', 'Simplify wallet holdings by converting wrapped tokens back'],
      de: ['WEGLD nach DeFi-Handel zurueck in natives EGLD umwandeln', 'Natives eGold nach Austritt aus Liquiditaetspools zurueckerhalten', 'WEGLD fuer Staking oder direkte Transfers unwrappen', 'Wallet-Bestaende durch Rueckumwandlung gewrappter Token vereinfachen'],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'How does unwrapping WEGLD work?',
          answer:
            'Unwrapping converts your WEGLD ESDT token back to native EGLD at a 1:1 ratio through the official wrapping smart contract.',
        },
        {
          question: 'Are there any fees for unwrapping?',
          answer:
            'There is no fee beyond the standard MultiversX transaction cost, which is very low.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert das Unwrapping von WEGLD?',
          answer:
            'Beim Unwrapping wird dein WEGLD-ESDT-Token über den offiziellen Wrapping-Smart-Contract im Verhältnis 1:1 zurück in natives EGLD umgewandelt.',
        },
        {
          question: 'Fallen Gebühren für das Unwrapping an?',
          answer:
            'Es fallen keine Gebühren an, abgesehen von den standardmäßigen MultiversX-Transaktionskosten, die sehr gering sind.',
        },
      ],
    },
  },

  // Keywords only
  'account-transaction-count': {
    keywords: {
      en: ['MultiversX transaction count', 'EGLD account nonce', 'MultiversX address activity', 'eGold transaction number'],
      de: ['MultiversX Transaktionsanzahl', 'EGLD Konto-Nonce', 'MultiversX Adressaktivität', 'eGold Transaktionsnummer'],
    },
    useCases: {
      en: ['Check how active a MultiversX address has been', 'Verify account nonce before submitting transactions', 'Analyze address activity for research or compliance', 'Monitor account usage patterns over time'],
      de: ['Pruefen, wie aktiv eine MultiversX-Adresse war', 'Konto-Nonce vor dem Einreichen von Transaktionen verifizieren', 'Adressaktivitaet fuer Recherche oder Compliance analysieren', 'Kontonutzungsmuster ueber die Zeit ueberwachen'],
    },
    category: 'analytics',
  },
  'account-guardian-data': {
    keywords: {
      en: ['MultiversX guardian', 'EGLD account guardian', 'MultiversX 2FA', 'eGold account security', 'MultiversX account protection'],
      de: ['MultiversX Guardian', 'EGLD Konto-Guardian', 'MultiversX 2FA', 'eGold Kontosicherheit', 'MultiversX Kontoschutz'],
    },
    useCases: {
      en: ['Verify if a MultiversX account has guardian protection enabled', 'Check 2FA security status for wallet auditing', 'Confirm guardian address configuration before sensitive operations', 'Assess account security posture for compliance reviews'],
      de: ['Pruefen, ob ein MultiversX-Konto Guardian-Schutz aktiviert hat', '2FA-Sicherheitsstatus fuer Wallet-Audits ueberpruefen', 'Guardian-Adresskonfiguration vor sensiblen Vorgaengen bestaetigen', 'Kontosicherheitsstatus fuer Compliance-Pruefungen bewerten'],
    },
    category: 'analytics',
  },
  'network-economics': {
    keywords: {
      en: ['MultiversX economics', 'EGLD supply', 'MultiversX staking APR', 'eGold market data', 'MultiversX network stats'],
      de: ['MultiversX Wirtschaftsdaten', 'EGLD Gesamtmenge', 'MultiversX Staking-APR', 'eGold Marktdaten', 'MultiversX Netzwerkstatistiken'],
    },
    useCases: {
      en: ['Monitor EGLD supply and inflation metrics in real time', 'Track current staking APR for investment decisions', 'Analyze MultiversX market capitalization and economic health', 'Integrate network economics data into dashboards or reports'],
      de: ['EGLD-Angebots- und Inflationskennzahlen in Echtzeit ueberwachen', 'Aktuellen Staking-APR fuer Investitionsentscheidungen verfolgen', 'MultiversX-Marktkapitalisierung und wirtschaftliche Gesundheit analysieren', 'Netzwerkoekonomie-Daten in Dashboards oder Berichte integrieren'],
    },
    category: 'infrastructure',
  },
  'network-status': {
    keywords: {
      en: ['MultiversX network status', 'EGLD network health', 'MultiversX block height', 'eGold chain status', 'MultiversX uptime'],
      de: ['MultiversX Netzwerkstatus', 'EGLD Netzwerkzustand', 'MultiversX Blockhöhe', 'eGold Chain-Status', 'MultiversX Verfügbarkeit'],
    },
    useCases: {
      en: ['Verify MultiversX network health before submitting transactions', 'Monitor block height and epoch progression', 'Check chain uptime and round information for validators', 'Integrate network status checks into automated workflows'],
      de: ['MultiversX-Netzwerkzustand vor dem Einreichen von Transaktionen verifizieren', 'Blockhoehe und Epochenfortschritt ueberwachen', 'Chain-Verfuegbarkeit und Rundeninformationen fuer Validatoren pruefen', 'Netzwerkstatus-Pruefungen in automatisierte Workflows integrieren'],
    },
    category: 'infrastructure',
  },
  'staking-claimable-rewards': {
    keywords: {
      en: ['MultiversX claimable rewards', 'EGLD staking rewards balance', 'check eGold staking earnings', 'MultiversX pending rewards'],
      de: ['MultiversX einforderbare Belohnungen', 'EGLD Staking-Belohnungsguthaben', 'eGold Staking-Einnahmen prüfen', 'MultiversX ausstehende Belohnungen'],
    },
    useCases: {
      en: ['Check pending staking rewards before claiming', 'Monitor reward accumulation across staking providers', 'Plan optimal claim timing based on reward balance', 'Track staking yield performance for portfolio management'],
      de: ['Ausstehende Staking-Belohnungen vor dem Einfordern pruefen', 'Belohnungsansammlung ueber Staking-Anbieter hinweg ueberwachen', 'Optimalen Einfordern-Zeitpunkt basierend auf Belohnungsguthaben planen', 'Staking-Rendite-Performance fuer Portfolio-Management verfolgen'],
    },
    category: 'staking',
  },
  'staking-redelegate-all': {
    keywords: {
      en: ['redelegate EGLD', 'MultiversX redelegate staking', 'eGold restake rewards', 'MultiversX compound staking'],
      de: ['EGLD redelegieren', 'MultiversX Staking redelegieren', 'eGold Belohnungen restaken', 'MultiversX Zinseszins-Staking'],
    },
    useCases: {
      en: ['Compound staking rewards automatically across all providers', 'Maximize EGLD staking yield through redelegation', 'Simplify reward reinvestment with one-click restaking', 'Grow staking positions over time without manual management'],
      de: ['Staking-Belohnungen automatisch ueber alle Anbieter compoundieren', 'EGLD-Staking-Rendite durch Redelegation maximieren', 'Belohnungs-Reinvestition mit Ein-Klick-Restaking vereinfachen', 'Staking-Positionen ueber die Zeit ohne manuelle Verwaltung wachsen lassen'],
    },
    category: 'staking',
  },
  'staking-claim': {
    keywords: {
      en: ['claim EGLD rewards', 'MultiversX staking claim provider', 'eGold delegation claim', 'MultiversX single provider claim'],
      de: ['EGLD Belohnungen einfordern', 'MultiversX Staking-Auszahlung Anbieter', 'eGold Delegations-Auszahlung', 'MultiversX Einzelanbieter-Auszahlung'],
    },
    useCases: {
      en: ['Claim rewards from a specific staking provider selectively', 'Manage reward collection per delegation for tax tracking', 'Test reward claiming with a single provider before claiming all', 'Maintain separate reward schedules across different validators'],
      de: ['Belohnungen selektiv von einem bestimmten Staking-Anbieter einfordern', 'Belohnungseinholung pro Delegation fuer Steuerverfolgung verwalten', 'Belohnungseinfordern mit einem einzelnen Anbieter testen, bevor alles eingefordert wird', 'Separate Belohnungszeitplaene ueber verschiedene Validatoren beibehalten'],
    },
    category: 'staking',
  },
  'transaction-details': {
    keywords: {
      en: ['MultiversX transaction details', 'EGLD tx lookup', 'MultiversX transaction explorer', 'eGold transaction info'],
      de: ['MultiversX Transaktionsdetails', 'EGLD Transaktionssuche', 'MultiversX Transaktions-Explorer', 'eGold Transaktionsinformationen'],
    },
    useCases: {
      en: ['Inspect transaction details by hash for debugging or verification', 'Review smart contract call results and gas consumption', 'Verify transfer amounts and recipients for auditing', 'Investigate failed transactions to understand error causes'],
      de: ['Transaktionsdetails anhand des Hashs fuer Debugging oder Verifizierung pruefen', 'Smart-Contract-Aufrufergebnisse und Gasverbrauch ueberpruefen', 'Transferbetraege und Empfaenger fuer Audits verifizieren', 'Fehlgeschlagene Transaktionen untersuchen, um Fehlerursachen zu verstehen'],
    },
    category: 'analytics',
  },
  'transaction-status': {
    keywords: {
      en: ['MultiversX transaction status', 'EGLD tx status check', 'MultiversX pending transaction', 'eGold transaction confirmation'],
      de: ['MultiversX Transaktionsstatus', 'EGLD Transaktionsstatus prüfen', 'MultiversX ausstehende Transaktion', 'eGold Transaktionsbestätigung'],
    },
    useCases: {
      en: ['Confirm whether a transaction completed successfully', 'Monitor pending transactions until finality', 'Troubleshoot failed or stuck transactions', 'Verify transaction confirmation for payment processing'],
      de: ['Bestaetigen, ob eine Transaktion erfolgreich abgeschlossen wurde', 'Ausstehende Transaktionen bis zur Finalitaet ueberwachen', 'Fehlgeschlagene oder haengende Transaktionen beheben', 'Transaktionsbestaetigung fuer Zahlungsabwicklung verifizieren'],
    },
    category: 'analytics',
  },
  'token-details': {
    keywords: {
      en: ['MultiversX token details', 'ESDT token info', 'MultiversX token properties', 'eGold token lookup'],
      de: ['MultiversX Token-Details', 'ESDT Token-Informationen', 'MultiversX Token-Eigenschaften', 'eGold Token-Suche'],
    },
    useCases: {
      en: ['Verify ESDT token properties before trading or investing', 'Look up token supply, decimals, and owner information', 'Check token configuration flags like mintable and burnable', 'Research token details for DeFi integration or analysis'],
      de: ['ESDT-Token-Eigenschaften vor dem Handel oder der Investition verifizieren', 'Token-Angebot, Dezimalstellen und Eigentuemerinformationen nachschlagen', 'Token-Konfigurationsflags wie praegbar und brennbar pruefen', 'Token-Details fuer DeFi-Integration oder Analyse recherchieren'],
    },
    category: 'defi',
  },
  'esdt-set-nft-create-role': {
    keywords: {
      en: ['NFT create role MultiversX', 'ESDT role assignment', 'MultiversX NFT permissions', 'assign NFT minting role eGold'],
      de: ['NFT-Erstellungsrolle MultiversX', 'ESDT Rollenzuweisung', 'MultiversX NFT-Berechtigungen', 'NFT-Prägerolle zuweisen eGold'],
    },
    useCases: {
      en: ['Enable NFT minting permissions for a collection owner', 'Assign create roles to collaborators for shared NFT projects', 'Set up minting access after issuing a new NFT collection', 'Manage role-based access control for NFT creation workflows'],
      de: ['NFT-Praegeberechtigungen fuer einen Sammlungseigentuemer aktivieren', 'Erstellungsrollen an Mitarbeiter fuer gemeinsame NFT-Projekte zuweisen', 'Praegezugang nach Ausgabe einer neuen NFT-Sammlung einrichten', 'Rollenbasierte Zugriffskontrolle fuer NFT-Erstellungs-Workflows verwalten'],
    },
    category: 'nft',
  },
  'esdt-issue-sft-collection': {
    keywords: {
      en: ['SFT collection MultiversX', 'issue semi-fungible token', 'MultiversX SFT', 'create SFT collection eGold'],
      de: ['SFT-Sammlung MultiversX', 'semi-fungiblen Token ausgeben', 'MultiversX SFT', 'SFT-Sammlung erstellen eGold'],
    },
    useCases: {
      en: ['Create SFT collections for event tickets or limited editions', 'Launch gaming item collections with multiple copies per token', 'Issue membership passes or vouchers as semi-fungible tokens', 'Build fractionalized asset representations on MultiversX'],
      de: ['SFT-Sammlungen fuer Event-Tickets oder limitierte Editionen erstellen', 'Gaming-Item-Sammlungen mit mehreren Kopien pro Token starten', 'Mitgliedsausweise oder Gutscheine als semi-fungible Token ausgeben', 'Fraktionalisierte Asset-Darstellungen auf MultiversX erstellen'],
    },
    category: 'nft',
  },
  'esdt-nft-view': {
    keywords: {
      en: ['view NFT MultiversX', 'ESDT NFT details', 'MultiversX NFT metadata', 'eGold NFT viewer'],
      de: ['NFT anzeigen MultiversX', 'ESDT NFT-Details', 'MultiversX NFT-Metadaten', 'eGold NFT-Anzeige'],
    },
    useCases: {
      en: ['Inspect NFT metadata including royalties and attributes', 'Verify NFT authenticity and creator information', 'View media URIs and on-chain properties for individual tokens', 'Research NFT details before purchasing or trading'],
      de: ['NFT-Metadaten einschliesslich Lizenzgebuehren und Attribute inspizieren', 'NFT-Authentizitaet und Erstellerinformationen verifizieren', 'Medien-URIs und On-Chain-Eigenschaften fuer einzelne Token anzeigen', 'NFT-Details vor dem Kauf oder Handel recherchieren'],
    },
    category: 'nft',
  },
}
