import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'shop-register': {
    keywords: {
      en: ['blockchain service business', 'on-chain shop', 'Web3 business registration', 'decentralized storefront', 'own your business identity', 'future-proof service business', 'blockchain for local business'],
      de: ['Blockchain-Dienstleistungsunternehmen', 'On-Chain-Shop', 'Web3-Unternehmensregistrierung', 'dezentrales Geschäft', 'Unternehmensidentität besitzen', 'zukunftssicheres Unternehmen'],
    },
    useCases: {
      en: [
        'Claim your permanent, tamper-proof business identity on the blockchain — no platform can take it away',
        'Be one of the first local service businesses with a verified on-chain presence customers and AI can trust',
        'Register your shop once and own your digital storefront forever, without paying rent to any platform',
      ],
      de: [
        'Sichere dir deine permanente, manipulationssichere Unternehmensidentität auf der Blockchain — keine Plattform kann sie dir wegnehmen',
        'Sei eines der ersten lokalen Unternehmen mit einer verifizierten On-Chain-Präsenz, der Kunden und KI vertrauen',
        'Registriere deinen Shop einmal und besitze dein digitales Schaufenster für immer, ohne Miete an eine Plattform zu zahlen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Why should I put my business on the blockchain?',
          answer: 'Blockchain-registered businesses are verifiable by anyone — customers, AI agents, and search engines — without relying on a third-party platform that can change its rules, delist you, or disappear. Your business identity becomes as permanent and trustworthy as the internet itself.',
        },
        {
          question: 'How do I register my shop?',
          answer: 'Your shop ID becomes your unique, immutable on-chain identifier. Run this once and you are permanently registered — no renewals, no subscriptions.',
        },
      ],
      de: [
        {
          question: 'Warum sollte ich mein Unternehmen auf der Blockchain registrieren?',
          answer: 'Blockchain-registrierte Unternehmen sind für jeden überprüfbar — Kunden, KI-Agenten und Suchmaschinen — ohne auf eine Drittanbieter-Plattform angewiesen zu sein, die ihre Regeln ändern, dich entfernen oder verschwinden kann. Deine Unternehmensidentität wird so permanent und vertrauenswürdig wie das Internet selbst.',
        },
        {
          question: 'Wie registriere ich meinen Shop?',
          answer: 'Deine Shop-ID wird zu deinem eindeutigen, unveränderlichen On-Chain-Bezeichner. Starte diesen Warp einmal und du bist dauerhaft registriert — keine Verlängerungen, keine Abonnements.',
        },
      ],
    },
  },

  'shop-service-add': {
    keywords: {
      en: ['publish service on blockchain', 'verifiable pricing', 'on-chain service catalog', 'AI-discoverable services', 'transparent service offerings', 'Web3 booking', 'blockchain menu'],
      de: ['Service auf Blockchain veröffentlichen', 'verifizierbare Preise', 'On-Chain-Servicekatalog', 'KI-auffindbare Services', 'transparente Dienstleistungen', 'Web3-Buchung'],
    },
    useCases: {
      en: [
        'Publish your services with verified, tamper-proof pricing — customers know the price they see is the real price',
        'Make your services discoverable by AI assistants and booking agents that read directly from the blockchain',
        'List a haircut, massage, or consulting session with a permanent, on-chain record that builds instant trust',
      ],
      de: [
        'Veröffentliche deine Services mit verifizierten, manipulationssicheren Preisen — Kunden wissen, dass der angezeigte Preis der echte Preis ist',
        'Mache deine Services für KI-Assistenten und Buchungsagenten auffindbar, die direkt von der Blockchain lesen',
        'Liste einen Haarschnitt, eine Massage oder eine Beratungssitzung mit einem permanenten, On-Chain-Eintrag, der sofortiges Vertrauen schafft',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What makes on-chain services different from a regular website listing?',
          answer: 'A regular website listing can be changed, faked, or taken offline. On-chain services are timestamped and verifiable — AI agents, customers, and other systems can read your offerings with full confidence that they are authentic and current.',
        },
        {
          question: 'What information do I need to add a service?',
          answer: 'A unique identifier (slug), display name, price in token micro-units, duration in minutes, and an optional category. Simple, fast, permanent.',
        },
      ],
      de: [
        {
          question: 'Was unterscheidet On-Chain-Services von einem normalen Website-Eintrag?',
          answer: 'Ein normaler Website-Eintrag kann geändert, gefälscht oder offline genommen werden. On-Chain-Services sind zeitgestempelt und verifizierbar — KI-Agenten, Kunden und andere Systeme können deine Angebote mit vollem Vertrauen lesen.',
        },
        {
          question: 'Welche Informationen brauche ich, um einen Service hinzuzufügen?',
          answer: 'Eine eindeutige Kennung (Slug), Anzeigenamen, Preis in Cent, Dauer in Minuten und eine optionale Kategorie. Einfach, schnell, permanent.',
        },
      ],
    },
  },

  'shop-service-remove': {
    keywords: {
      en: ['remove blockchain service', 'update service catalog', 'delist service on-chain', 'manage on-chain offerings'],
      de: ['Blockchain-Service entfernen', 'Servicekatalog aktualisieren', 'Service On-Chain entfernen', 'On-Chain-Angebote verwalten'],
    },
    useCases: {
      en: [
        'Keep your on-chain catalog accurate when a service is discontinued or temporarily unavailable',
        'Maintain the integrity of your verified storefront — customers only see what you actively offer',
      ],
      de: [
        'Halte deinen On-Chain-Katalog aktuell, wenn ein Service eingestellt oder vorübergehend nicht verfügbar ist',
        'Wahre die Integrität deines verifizierten Shops — Kunden sehen nur, was du aktiv anbietest',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Can I re-add a removed service?',
          answer: 'Yes. Removing a service clears it from your on-chain catalog. You can re-add it at any time with the same or updated details.',
        },
      ],
      de: [
        {
          question: 'Kann ich einen entfernten Service wieder hinzufügen?',
          answer: 'Ja. Das Entfernen löscht den Service aus deinem On-Chain-Katalog. Du kannst ihn jederzeit mit denselben oder aktualisierten Details erneut hinzufügen.',
        },
      ],
    },
  },

  'shop-configure': {
    keywords: {
      en: ['update shop details', 'edit blockchain business', 'change shop category', 'update on-chain storefront', 'modify shop location'],
      de: ['Shop-Details aktualisieren', 'Blockchain-Unternehmen bearbeiten', 'Shop-Kategorie ändern', 'On-Chain-Shop aktualisieren'],
    },
    useCases: {
      en: [
        'Update your shop description, location, or category as your business evolves — changes are reflected instantly on-chain',
        'Move into a new category and make your shop discoverable under the right niche for AI agents and customers',
        'Keep your on-chain profile accurate so AI assistants always recommend you for the right searches',
      ],
      de: [
        'Aktualisiere Beschreibung, Standort oder Kategorie deines Shops — Änderungen werden sofort On-Chain reflektiert',
        'Wechsle in eine neue Kategorie und werde von KI-Agenten und Kunden in der richtigen Nische gefunden',
        'Halte dein On-Chain-Profil aktuell, damit KI-Assistenten dich bei den richtigen Suchen empfehlen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Can I change my shop category after registration?',
          answer: 'Yes. The configure warp updates your category on-chain and moves you into the new category index — AI discovery reflects the change immediately.',
        },
      ],
      de: [
        {
          question: 'Kann ich meine Shop-Kategorie nach der Registrierung ändern?',
          answer: 'Ja. Der Configure-Warp aktualisiert deine Kategorie On-Chain und verschiebt dich in den neuen Kategorieindex — die KI-Auffindbarkeit spiegelt die Änderung sofort wider.',
        },
      ],
    },
  },

  'shop-set-payment': {
    keywords: {
      en: ['set payment destination', 'multi-chain payment', 'accept crypto payments', 'configure wallet address', 'cross-chain commerce', 'accept USDC payments', 'blockchain payment setup'],
      de: ['Zahlungsziel festlegen', 'Multi-Chain-Zahlung', 'Krypto-Zahlungen akzeptieren', 'Wallet-Adresse konfigurieren', 'Cross-Chain-Commerce'],
    },
    useCases: {
      en: [
        'Accept payments on any chain — Base, Solana, MultiversX, Ethereum — without switching platforms or wallets',
        'Let AI agents know exactly where and how to pay you when they complete a purchase on behalf of customers',
        'Set your preferred token (USDC, SOL, EGLD) and chain once — every buyer and AI agent reads it directly from the blockchain',
      ],
      de: [
        'Akzeptiere Zahlungen auf jeder Chain — Base, Solana, MultiversX, Ethereum — ohne Plattformen oder Wallets zu wechseln',
        'Lass KI-Agenten genau wissen, wo und wie sie zahlen sollen, wenn sie Käufe für Kunden abschließen',
        'Setze deinen bevorzugten Token und deine Chain einmal — jeder Käufer und KI-Agent liest es direkt von der Blockchain',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Which chains are supported for payments?',
          answer: 'Any chain you have a wallet on — multiversx, base, solana, ethereum, fast, and more. Set the chain identifier, your wallet address, and accepted token. AI agents use this to route payments correctly.',
        },
        {
          question: 'Can I update my payment destination later?',
          answer: 'Yes. Run this warp any time to point to a new wallet or chain. The change takes effect immediately for all future purchases.',
        },
      ],
      de: [
        {
          question: 'Welche Chains werden für Zahlungen unterstützt?',
          answer: 'Jede Chain, auf der du eine Wallet hast — multiversx, base, solana, ethereum, fast und mehr. Setze die Chain-Kennung, deine Wallet-Adresse und den akzeptierten Token. KI-Agenten nutzen das, um Zahlungen korrekt weiterzuleiten.',
        },
        {
          question: 'Kann ich mein Zahlungsziel später ändern?',
          answer: 'Ja. Starte diesen Warp jederzeit, um auf eine neue Wallet oder Chain zu verweisen. Die Änderung wirkt sofort für alle zukünftigen Käufe.',
        },
      ],
    },
  },

  'shop-product-add': {
    keywords: {
      en: ['add product on blockchain', 'on-chain product catalog', 'Web3 product listing', 'AI-discoverable products', 'verifiable product pricing', 'blockchain commerce', 'list hotel room on-chain'],
      de: ['Produkt auf Blockchain hinzufügen', 'On-Chain-Produktkatalog', 'Web3-Produktlisting', 'KI-auffindbare Produkte', 'verifizierbare Produktpreise'],
    },
    useCases: {
      en: [
        'List a hotel room, day pass, or physical product with transparent on-chain pricing that customers and AI can verify',
        'Make your products discoverable to AI shopping agents that search the blockchain for what customers need',
        'Publish your product catalog once and let AI agents browse and purchase on behalf of customers 24/7',
      ],
      de: [
        'Liste ein Hotelzimmer, eine Tageskarte oder ein physisches Produkt mit transparenten On-Chain-Preisen, die Kunden und KI überprüfen können',
        'Mache deine Produkte für KI-Shopping-Agenten auffindbar, die die Blockchain nach Kundenwünschen durchsuchen',
        'Veröffentliche deinen Produktkatalog einmal und lass KI-Agenten rund um die Uhr für Kunden stöbern und kaufen',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What is the difference between a product and a service?',
          answer: 'Products are items that can be in or out of stock (rooms, physical goods, passes). Services are time-based bookings with a duration (haircuts, consultations, sessions). Both are stored on-chain and AI-discoverable.',
        },
      ],
      de: [
        {
          question: 'Was ist der Unterschied zwischen einem Produkt und einem Service?',
          answer: 'Produkte sind Artikel mit Lagerbestand (Zimmer, physische Waren, Pässe). Services sind zeitbasierte Buchungen mit Dauer (Haarschnitte, Beratungen, Sessions). Beides wird On-Chain gespeichert und ist KI-auffindbar.',
        },
      ],
    },
  },

  'shop-product-remove': {
    keywords: {
      en: ['remove product on-chain', 'delist blockchain product', 'manage product catalog', 'update on-chain inventory'],
      de: ['Produkt On-Chain entfernen', 'Blockchain-Produkt entfernen', 'Produktkatalog verwalten'],
    },
    useCases: {
      en: [
        'Remove a discontinued product from your on-chain catalog so AI agents never attempt to purchase it',
        'Keep your verified storefront clean — only show what is currently available for purchase',
      ],
      de: [
        'Entferne ein eingestelltes Produkt aus deinem On-Chain-Katalog, damit KI-Agenten es nicht mehr kaufen',
        'Halte deinen verifizierten Shop sauber — zeige nur, was aktuell zum Kauf verfügbar ist',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Can I re-add a removed product?',
          answer: 'Yes. Removing clears the product from the catalog. You can add it back any time with the same or updated details.',
        },
      ],
      de: [
        {
          question: 'Kann ich ein entferntes Produkt wieder hinzufügen?',
          answer: 'Ja. Das Entfernen löscht das Produkt aus dem Katalog. Du kannst es jederzeit mit denselben oder aktualisierten Details wieder hinzufügen.',
        },
      ],
    },
  },

  'shop-product-stock': {
    keywords: {
      en: ['update product stock', 'mark out of stock', 'on-chain inventory', 'blockchain availability', 'toggle product availability'],
      de: ['Produktbestand aktualisieren', 'ausverkauft markieren', 'On-Chain-Bestand', 'Blockchain-Verfügbarkeit'],
    },
    useCases: {
      en: [
        'Mark a hotel room as sold out in real time — AI agents will not attempt to sell what is unavailable',
        'Toggle availability without removing a product — useful for seasonal items or limited-run offerings',
      ],
      de: [
        'Markiere ein Hotelzimmer in Echtzeit als ausgebucht — KI-Agenten versuchen nicht, Nichtverfügbares zu verkaufen',
        'Schalte Verfügbarkeit um, ohne ein Produkt zu entfernen — nützlich für saisonale oder limitierte Artikel',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Does stock status affect AI agent purchasing?',
          answer: 'Yes. AI agents read stock status on-chain before attempting a purchase and will not proceed with out-of-stock products.',
        },
      ],
      de: [
        {
          question: 'Beeinflusst der Lagerstatus den Einkauf von KI-Agenten?',
          answer: 'Ja. KI-Agenten lesen den Lagerstatus On-Chain, bevor sie einen Kauf versuchen, und setzen bei ausverkauften Produkten nicht fort.',
        },
      ],
    },
  },

  'shop-search': {
    keywords: {
      en: ['find shops by category', 'search blockchain businesses', 'AI business discovery', 'on-chain shop directory', 'Web3 commerce search', 'find hotel on blockchain', 'discover verified businesses'],
      de: ['Shops nach Kategorie finden', 'Blockchain-Unternehmen suchen', 'KI-Unternehmenssuche', 'On-Chain-Shopverzeichnis'],
    },
    useCases: {
      en: [
        'Find hotels, restaurants, clinics, or coaches registered on-chain in any city — results are trustless and AI-verifiable',
        'Let AI agents search the global shop registry to find the right business for a customer request',
        'Discover businesses that accept multi-chain crypto payments — browse the on-chain commerce network',
      ],
      de: [
        'Finde On-Chain-registrierte Hotels, Restaurants, Kliniken oder Coaches in jeder Stadt — Ergebnisse sind vertrauenslos und KI-verifizierbar',
        'Lass KI-Agenten das globale Shop-Register durchsuchen, um das richtige Unternehmen für eine Kundenanfrage zu finden',
        'Entdecke Unternehmen, die Multi-Chain-Krypto-Zahlungen akzeptieren',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How does the AI use this to find businesses?',
          answer: 'The AI agent calls getShopsByCategory on-chain, receives a list of verified shop IDs and their metadata, then filters by location, price, or description to match the customer request.',
        },
      ],
      de: [
        {
          question: 'Wie nutzt die KI das, um Unternehmen zu finden?',
          answer: 'Der KI-Agent ruft getShopsByCategory On-Chain auf, erhält eine Liste verifizierter Shop-IDs und Metadaten, und filtert dann nach Standort, Preis oder Beschreibung, um die Kundenanfrage zu erfüllen.',
        },
      ],
    },
  },

  'shop-browse': {
    keywords: {
      en: ['browse shop products', 'view blockchain catalog', 'on-chain product list', 'AI product discovery', 'shop inventory on-chain', 'view hotel rooms on blockchain'],
      de: ['Shop-Produkte durchsuchen', 'Blockchain-Katalog anzeigen', 'On-Chain-Produktliste', 'KI-Produktsuche'],
    },
    useCases: {
      en: [
        'View the full product catalog of any registered shop — prices, availability, and descriptions verified on-chain',
        'Let AI agents browse available products before making a purchase recommendation or completing a transaction',
        'Give customers a transparent window into exactly what a business offers, with no hidden markups or platform fees',
      ],
      de: [
        'Zeige den vollständigen Produktkatalog eines registrierten Shops — Preise, Verfügbarkeit und Beschreibungen on-chain verifiziert',
        'Lass KI-Agenten verfügbare Produkte durchsuchen, bevor sie eine Kaufempfehlung geben oder eine Transaktion abschließen',
        'Gib Kunden einen transparenten Einblick in das Angebot eines Unternehmens — ohne versteckte Aufschläge',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'What information does the product listing include?',
          answer: 'Each product shows its ID, name, price in token micro-units, category, description, and whether it is currently in stock.',
        },
      ],
      de: [
        {
          question: 'Welche Informationen enthält die Produktliste?',
          answer: 'Jedes Produkt zeigt seine ID, den Namen, Preis in Token-Mikroeinheiten, Kategorie, Beschreibung und ob es aktuell vorrätig ist.',
        },
      ],
    },
  },

  'shop-service-pay': {
    keywords: {
      en: ['pay for service', 'book hotel room', 'on-chain booking payment', 'crypto service payment', 'blockchain payment link', 'pay with crypto', 'service payment link'],
      de: ['Dienstleistung bezahlen', 'Hotelzimmer buchen', 'On-Chain-Buchungszahlung', 'Krypto-Dienstleistungszahlung', 'Blockchain-Zahlungslink'],
    },
    useCases: {
      en: [
        'Share a direct payment link for a specific service — customers open it, see the details, and pay in one tap',
        'Let AI agents complete bookings autonomously by reading service details and routing payment on-chain',
        'Hotel room, consultation, or any time-based service — one link, one click, crypto payment direct to your wallet',
      ],
      de: [
        'Teile einen direkten Zahlungslink für einen bestimmten Service — Kunden öffnen ihn, sehen die Details und zahlen mit einem Klick',
        'Lass KI-Agenten Buchungen autonom abschließen, indem sie Service-Details lesen und die Zahlung On-Chain weiterleiten',
        'Hotelzimmer, Beratung oder jeder zeitbasierte Service — ein Link, ein Klick, Krypto-Zahlung direkt auf deine Wallet',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How does the payment link work?',
          answer: 'Share the link with ?shop=YOUR_SHOP_ID&service=SERVICE_SLUG appended. The warp fetches the service details and your configured payment destination on-chain, then shows the customer a Pay button that sends crypto directly to your wallet.',
        },
        {
          question: 'Which chains and tokens are supported?',
          answer: 'Any chain you configured in your payment destination — MultiversX, Base, Solana, Ethereum, and more. The token is whatever you set when configuring your shop payment.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert der Zahlungslink?',
          answer: 'Teile den Link mit ?shop=DEINE_SHOP_ID&service=SERVICE_SLUG. Der Warp liest die Service-Details und dein konfiguriertes Zahlungsziel On-Chain und zeigt dem Kunden einen Pay-Button, der Krypto direkt auf deine Wallet sendet.',
        },
        {
          question: 'Welche Chains und Token werden unterstützt?',
          answer: 'Jede Chain, die du in deinem Zahlungsziel konfiguriert hast — MultiversX, Base, Solana, Ethereum und mehr.',
        },
      ],
    },
  },

  'shop-payment-info': {
    keywords: {
      en: ['get payment destination', 'which chain to pay on', 'shop wallet address', 'accepted token', 'AI payment routing', 'multi-chain payment info', 'crypto checkout'],
      de: ['Zahlungsziel abrufen', 'welche Chain zahlen', 'Shop-Wallet-Adresse', 'akzeptierter Token', 'KI-Zahlungsweiterleitung'],
    },
    useCases: {
      en: [
        'Retrieve exactly where and how to pay a shop — chain, wallet address, and accepted token — in one on-chain query',
        'AI agents use this before every purchase to route the payment correctly across any blockchain',
        'Verify a shop accepts your preferred token before initiating a transaction',
      ],
      de: [
        'Abruf, wo und wie ein Shop bezahlt werden soll — Chain, Wallet-Adresse und akzeptierter Token — in einer On-Chain-Abfrage',
        'KI-Agenten nutzen das vor jedem Kauf, um die Zahlung korrekt über jede Blockchain weiterzuleiten',
        'Überprüfe, ob ein Shop deinen bevorzugten Token akzeptiert, bevor du eine Transaktion einleitest',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How does an AI agent use payment info to complete a purchase?',
          answer: 'The agent calls this endpoint to get the chain, address, and token, then executes a native transfer on that chain — no intermediaries, no escrow. The payment goes directly to the shop owner.',
        },
      ],
      de: [
        {
          question: 'Wie nutzt ein KI-Agent die Zahlungsinfo, um einen Kauf abzuschließen?',
          answer: 'Der Agent ruft diesen Endpunkt auf, um Chain, Adresse und Token zu erhalten, und führt dann eine native Überweisung auf dieser Chain durch — keine Intermediäre, kein Treuhand. Die Zahlung geht direkt an den Shop-Eigentümer.',
        },
      ],
    },
  },

  'shop-products': {
    keywords: {
      en: ['verified product page', 'blockchain shop storefront', 'on-chain product catalog', 'AI-readable product page', 'Web3 shop page', 'trusted product listing'],
      de: ['verifizierte Produktseite', 'Blockchain-Shopseite', 'On-Chain-Produktkatalog', 'KI-lesbare Produktseite'],
    },
    useCases: {
      en: [
        'Share a link to your verified product page — customers and AI agents see real-time on-chain inventory',
        'Let AI agents browse your products and recommend the right one to a customer without leaving the conversation',
        'Your product page cannot be faked or taken down — it lives on the blockchain, permanently accessible',
      ],
      de: [
        'Teile einen Link zu deiner verifizierten Produktseite — Kunden und KI-Agenten sehen Echtzeit-On-Chain-Bestand',
        'Lass KI-Agenten deine Produkte durchsuchen und das richtige für einen Kunden empfehlen',
        'Deine Produktseite kann nicht gefälscht oder abgeschaltet werden — sie lebt auf der Blockchain',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How is this different from a regular e-commerce page?',
          answer: 'Products are stored on MultiversX — not in a database. Pricing and availability are on-chain facts, not website copy. AI agents can read and act on this data natively.',
        },
      ],
      de: [
        {
          question: 'Was unterscheidet das von einer normalen E-Commerce-Seite?',
          answer: 'Produkte sind auf MultiversX gespeichert — nicht in einer Datenbank. Preise und Verfügbarkeit sind On-Chain-Fakten. KI-Agenten können diese Daten nativ lesen und darauf reagieren.',
        },
      ],
    },
  },

  'shop-services': {
    keywords: {
      en: ['verified business services', 'blockchain storefront', 'on-chain service page', 'AI-readable shop', 'decentralized service menu', 'Web3 shop page', 'trusted service catalog'],
      de: ['verifizierte Unternehmensservices', 'Blockchain-Schaufenster', 'On-Chain-Service-Seite', 'KI-lesbarer Shop', 'dezentrales Servicemenü', 'Web3-Shopseite'],
    },
    useCases: {
      en: [
        'Share a link to your verified, blockchain-backed shop page — no app needed, no login, instant trust',
        'Let AI assistants discover and present your services automatically to customers looking for what you offer',
        'Give customers a shop page that cannot be faked, cloned, or manipulated — backed by the blockchain',
      ],
      de: [
        'Teile einen Link zu deiner verifizierten, Blockchain-basierten Shop-Seite — keine App nötig, kein Login, sofortiges Vertrauen',
        'Lass KI-Assistenten deine Services automatisch an Kunden präsentieren, die nach deinem Angebot suchen',
        'Gib Kunden eine Shop-Seite, die nicht gefälscht, geklont oder manipuliert werden kann — gesichert durch die Blockchain',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How is this different from a regular booking page?',
          answer: 'Your services are stored on the MultiversX blockchain — not in a database someone else controls. Every service, price, and duration is publicly verifiable. AI agents can read your catalog directly and act on it, making your business natively compatible with the next generation of digital commerce.',
        },
        {
          question: 'How do I share my shop with customers?',
          answer: 'Share your shop link — it loads instantly, displays all your verified services, and works on any device without an account.',
        },
      ],
      de: [
        {
          question: 'Was unterscheidet das von einer normalen Buchungsseite?',
          answer: 'Deine Services sind auf der MultiversX-Blockchain gespeichert — nicht in einer Datenbank, die jemand anderes kontrolliert. Jeder Service, Preis und jede Dauer ist öffentlich verifizierbar. KI-Agenten können deinen Katalog direkt lesen und darauf reagieren — dein Unternehmen wird nativ kompatibel mit der nächsten Generation des digitalen Handels.',
        },
        {
          question: 'Wie teile ich meinen Shop mit Kunden?',
          answer: 'Teile deinen Shop-Link — er lädt sofort, zeigt alle deine verifizierten Services und funktioniert auf jedem Gerät ohne Account.',
        },
      ],
    },
  },
}
