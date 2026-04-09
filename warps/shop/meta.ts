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
          answer: 'Your team slug becomes your unique, immutable shop identifier on-chain. Run this once and you are permanently registered — no renewals, no subscriptions.',
        },
      ],
      de: [
        {
          question: 'Warum sollte ich mein Unternehmen auf der Blockchain registrieren?',
          answer: 'Blockchain-registrierte Unternehmen sind für jeden überprüfbar — Kunden, KI-Agenten und Suchmaschinen — ohne auf eine Drittanbieter-Plattform angewiesen zu sein, die ihre Regeln ändern, dich entfernen oder verschwinden kann. Deine Unternehmensidentität wird so permanent und vertrauenswürdig wie das Internet selbst.',
        },
        {
          question: 'Wie registriere ich meinen Shop?',
          answer: 'Dein Team-Slug wird zu deinem eindeutigen, unveränderlichen Shop-Bezeichner on-chain. Starte diesen Warp einmal und du bist dauerhaft registriert — keine Verlängerungen, keine Abonnements.',
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
          answer: 'A unique identifier (slug), display name, price in cents, duration in minutes, and an optional category. Simple, fast, permanent.',
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
