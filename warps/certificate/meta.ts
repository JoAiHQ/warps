import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'certificate-create-collection': {
    keywords: {
      en: ['collection', 'nft collection', 'certificate collection', 'blockchain', 'create collection', 'digital certificates', 'esdt', 'ai', 'ai agent', 'ai-powered', 'automated'],
      de: ['kollektion', 'nft kollektion', 'zertifikat-kollektion', 'blockchain', 'kollektion erstellen', 'digitale zertifikate', 'esdt', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert'],
      fr: ['collection', 'collection nft', 'collection de certificats', 'blockchain', 'créer une collection', 'certificats numériques', 'esdt', 'ia', 'agent ia', 'ia propulsée', 'automatisé'],
      es: ['colección', 'colección nft', 'colección de certificados', 'blockchain', 'crear colección', 'certificados digitales', 'esdt', 'ia', 'agente ia', 'con ia', 'automatizado'],
      ro: ['colectie', 'colectie nft', 'colectie de certificate', 'blockchain', 'creeaza colectie', 'certificate digitale', 'esdt', 'ia', 'agent ia', 'bazat pe ia', 'automatizat'],
    },
    useCases: {
      en: [
        'Create a new NFT collection for issuing digital certificates on the blockchain',
        'Set up a certificate collection for a specific certification type like Innovationssiegel',
      ],
      de: [
        'Neue NFT-Kollektion für digitale Zertifikate auf der Blockchain erstellen',
        'Zertifikat-Kollektion für einen bestimmten Zertifikattyp wie das Innovationssiegel einrichten',
      ],
    },
    category: 'legal',
  },
  'certificate-issue': {
    keywords: {
      en: ['certificate', 'issue', 'blockchain', 'pdf', 'digital certificate', 'verify', 'seal', 'credential', 'ai', 'ai agent', 'ai-powered', 'automated', 'smart', 'intelligent'],
      de: ['zertifikat', 'ausstellen', 'blockchain', 'pdf', 'digitales zertifikat', 'verifizieren', 'siegel', 'nachweis', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'smart', 'intelligent'],
      fr: ['certificat', 'émettre', 'blockchain', 'pdf', 'certificat numérique', 'vérifier', 'sceau', 'credential', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'intelligent', 'assistant ia'],
      es: ['certificado', 'emitir', 'blockchain', 'pdf', 'certificado digital', 'verificar', 'sello', 'credencial', 'ia', 'agente ia', 'con ia', 'automatizado', 'inteligente', 'asistente ia'],
      ro: ['certificat', 'emite', 'blockchain', 'pdf', 'certificat digital', 'verifica', 'sigiliu', 'credential', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'inteligent', 'asistent ia'],
    },
    useCases: {
      en: [
        'Issue a digital certificate on the blockchain to a company after completing an assessment',
        'Create a tamper-proof proof of certification anchored on the blockchain',
        'Issue an Innovationssiegel to a certified business',
      ],
      de: [
        'Digitales Zertifikat auf der Blockchain an ein Unternehmen nach einem Assessment ausstellen',
        'Fälschungssicheren Zertifizierungsnachweis auf der Blockchain verankern',
        'Innovationssiegel an einen zertifizierten Betrieb ausstellen',
      ],
    },
    category: 'legal',
  },
  'certificate-verify': {
    keywords: {
      en: ['verify', 'certificate', 'check', 'valid', 'authentic', 'blockchain', 'proof', 'ai', 'ai agent', 'ai-powered', 'automated', 'intelligent'],
      de: ['verifizieren', 'zertifikat', 'prüfen', 'gültig', 'authentisch', 'blockchain', 'nachweis', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'intelligent'],
      fr: ['vérifier', 'certificat', 'contrôler', 'valide', 'authentique', 'blockchain', 'preuve', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'intelligent'],
      es: ['verificar', 'certificado', 'comprobar', 'válido', 'auténtico', 'blockchain', 'prueba', 'ia', 'agente ia', 'con ia', 'automatizado', 'inteligente'],
      ro: ['verifica', 'certificat', 'verifica', 'valid', 'autentic', 'blockchain', 'dovada', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'inteligent'],
    },
    useCases: {
      en: [
        'Verify the authenticity of a certificate received from a partner',
        'Check whether a company certificate is still valid or has expired',
        'Confirm a certification before entering a business relationship',
      ],
      de: [
        'Echtheit eines von einem Partner erhaltenen Zertifikats verifizieren',
        'Prüfen ob ein Unternehmenszertifikat noch gültig oder abgelaufen ist',
        'Zertifizierung bestätigen bevor eine Geschäftsbeziehung eingegangen wird',
      ],
    },
    category: 'legal',
    faq: {
      en: [
        { question: 'How is the certificate verified?', answer: 'The certificate data is read directly from the MultiversX blockchain — no central server involved. If the chain says it\'s valid, it\'s valid.' },
        { question: 'What does Revoked mean?', answer: 'The issuer has permanently invalidated this certificate. A revoked certificate cannot be reinstated.' },
        { question: 'What does Expired mean?', answer: 'The certificate was valid but has passed its expiry date set at issuance.' },
      ],
      de: [
        { question: 'Wie wird das Zertifikat verifiziert?', answer: 'Die Zertifikatsdaten werden direkt von der MultiversX-Blockchain gelesen — kein zentraler Server beteiligt. Wenn die Blockchain es als gültig ausweist, ist es gültig.' },
        { question: 'Was bedeutet Widerrufen?', answer: 'Der Aussteller hat dieses Zertifikat dauerhaft für ungültig erklärt. Ein widerrufenes Zertifikat kann nicht wiederhergestellt werden.' },
        { question: 'Was bedeutet Abgelaufen?', answer: 'Das Zertifikat war gültig, hat aber das bei der Ausstellung festgelegte Ablaufdatum überschritten.' },
      ],
    },
  },
  'certificate-list': {
    keywords: {
      en: ['list', 'my certificates', 'issued', 'certificates', 'overview'],
      de: ['liste', 'meine zertifikate', 'ausgestellt', 'zertifikate', 'übersicht'],
    },
    useCases: {
      en: [
        'View all certificates you have issued',
        'Track which certifications are active, expired, or revoked',
      ],
      de: [
        'Alle ausgestellten Zertifikate ansehen',
        'Verfolgen welche Zertifizierungen aktiv, abgelaufen oder widerrufen sind',
      ],
    },
    category: 'legal',
  },
  'certificate-claim': {
    keywords: {
      en: ['claim', 'certificate', 'receive', 'blockchain', 'wallet', 'digital certificate'],
      de: ['einlösen', 'zertifikat', 'empfangen', 'blockchain', 'wallet', 'digitales zertifikat'],
    },
    useCases: {
      en: [
        'Claim a certificate issued to you by connecting your wallet',
        'Register your wallet as the blockchain recipient of a certificate',
      ],
      de: [
        'Ein ausgestelltes Zertifikat einlösen, indem du deine Wallet verbindest',
        'Deine Wallet als Empfänger eines Zertifikats auf der Blockchain registrieren',
      ],
    },
    category: 'legal',
  },
  'certificate-revoke': {
    keywords: {
      en: ['revoke', 'invalidate', 'cancel', 'certificate', 'withdraw'],
      de: ['widerrufen', 'ungültig machen', 'stornieren', 'zertifikat', 'zurückziehen'],
    },
    useCases: {
      en: [
        'Revoke a certificate issued in error',
        'Permanently invalidate a certification that is no longer valid',
      ],
      de: [
        'Ein irrtümlich ausgestelltes Zertifikat widerrufen',
        'Eine nicht mehr gültige Zertifizierung dauerhaft ungültig machen',
      ],
    },
    category: 'legal',
  },
}
