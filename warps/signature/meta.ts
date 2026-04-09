import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'signature-create': {
    keywords: {
      en: ['signature', 'sign', 'document', 'contract', 'agreement', 'legal', 'nda', 'request', 'on-chain'],
      de: ['signatur', 'unterzeichnen', 'dokument', 'vertrag', 'vereinbarung', 'rechtlich', 'nda', 'anfrage', 'on-chain'],
    },
    useCases: {
      en: [
        'Request a signature on a freelance contract',
        'Send an NDA to a business partner for on-chain signing',
        'Get a service agreement signed before starting a project',
        'Request signatures on a partnership agreement',
      ],
      de: [
        'Unterschrift für einen Freelance-Vertrag anfordern',
        'NDA an einen Geschäftspartner zum On-Chain-Unterzeichnen senden',
        'Dienstleistungsvertrag vor Projektbeginn unterzeichnen lassen',
        'Unterschriften für eine Partnerschaftsvereinbarung anfordern',
      ],
    },
    category: 'legal',
    faq: {
      en: [
        {
          question: 'How is the signature stored?',
          answer: 'The signer\'s wallet address and a timestamp are recorded permanently on the MultiversX blockchain.',
        },
        {
          question: 'What is the document hash?',
          answer: 'A SHA-256 fingerprint of your document. It proves the document hasn\'t changed since signing without storing the document itself on-chain.',
        },
        {
          question: 'Can I set a deadline?',
          answer: 'Yes — choose from no deadline, 24 hours, 3 days, 1 week, or 2 weeks.',
        },
        {
          question: 'Can I cancel a request?',
          answer: 'Yes — you can cancel any pending request you created before it is fully signed.',
        },
      ],
      de: [
        {
          question: 'Wie wird die Signatur gespeichert?',
          answer: 'Die Wallet-Adresse des Unterzeichners und ein Zeitstempel werden dauerhaft auf der MultiversX-Blockchain gespeichert.',
        },
        {
          question: 'Was ist der Dokument-Hash?',
          answer: 'Ein SHA-256-Fingerabdruck deines Dokuments. Er beweist, dass das Dokument seit der Unterzeichnung unverändert geblieben ist, ohne das Dokument selbst on-chain zu speichern.',
        },
        {
          question: 'Kann ich eine Frist setzen?',
          answer: 'Ja — wähle zwischen keiner Frist, 24 Stunden, 3 Tagen, 1 Woche oder 2 Wochen.',
        },
        {
          question: 'Kann ich eine Anfrage stornieren?',
          answer: 'Ja — du kannst jede ausstehende Anfrage stornieren, die du erstellt hast, solange sie noch nicht vollständig unterzeichnet ist.',
        },
      ],
    },
  },
  'signature-sign': {
    keywords: {
      en: ['sign', 'signature', 'document', 'contract', 'agreement', 'approve', 'on-chain'],
      de: ['unterzeichnen', 'signatur', 'dokument', 'vertrag', 'vereinbarung', 'genehmigen', 'on-chain'],
    },
    useCases: {
      en: [
        'Sign a contract sent to your wallet address',
        'Confirm agreement on a freelance NDA',
        'Sign a partnership agreement on-chain',
      ],
      de: [
        'Einen an deine Wallet-Adresse gesendeten Vertrag unterzeichnen',
        'Zustimmung zu einem Freelance-NDA bestätigen',
        'Eine Partnerschaftsvereinbarung on-chain unterzeichnen',
      ],
    },
    category: 'legal',
  },
  'signature-view': {
    keywords: {
      en: ['view', 'signature', 'request', 'status', 'document', 'details'],
      de: ['ansehen', 'signatur', 'anfrage', 'status', 'dokument', 'details'],
    },
    useCases: {
      en: [
        'Check the status of a signature request',
        'View document details before signing',
        'See how many signers have already signed',
      ],
      de: [
        'Status einer Signaturanfrage prüfen',
        'Dokumentdetails vor dem Unterzeichnen ansehen',
        'Sehen, wie viele Unterzeichner bereits unterschrieben haben',
      ],
    },
    category: 'legal',
  },
  'signature-list': {
    keywords: {
      en: ['list', 'my requests', 'signature requests', 'created', 'pending', 'completed'],
      de: ['liste', 'meine anfragen', 'signaturanfragen', 'erstellt', 'ausstehend', 'abgeschlossen'],
    },
    useCases: {
      en: [
        'View all signature requests you have created',
        'Track which contracts are still pending signatures',
        'Review completed agreements',
      ],
      de: [
        'Alle erstellten Signaturanfragen ansehen',
        'Verfolgen, welche Verträge noch ausstehende Signaturen haben',
        'Abgeschlossene Vereinbarungen überprüfen',
      ],
    },
    category: 'legal',
  },
}
