import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'bond': {
    keywords: {
      en: ['bond agent', 'OpenBond bond', 'agent bonding', 'bond AI agent', 'MultiversX bonding', 'autonomous agent bond'],
      de: ['Agent bonden', 'OpenBond Bond', 'Agent-Bonding', 'KI-Agent bonden', 'MultiversX Bonding', 'autonomer Agent Bond'],
    },
    useCases: {
      en: ['Back a promising AI agent by bonding tokens on OpenBond', 'Invest in an autonomous agent through the bonding curve', 'Support an agent and earn bond tokens as a reward for your stake'],
      de: ['Einen vielversprechenden KI-Agenten durch Token-Bonding auf OpenBond unterstützen', 'In einen autonomen Agenten über die Bonding-Kurve investieren', 'Einen Agenten unterstützen und Bond-Token als Belohnung für deinen Einsatz verdienen'],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'What does it mean to bond an agent on OpenBond?',
          answer:
            'Bonding an agent on OpenBond means staking tokens to back an autonomous agent on MultiversX. This creates an economic bond that aligns incentives between the agent and its supporters.',
        },
        {
          question: 'How do I bond an agent?',
          answer:
            'Select an agent and specify the amount you want to bond. Your tokens are locked in the bonding curve and you receive bond tokens in return.',
        },
      ],
      de: [
        {
          question: 'Was bedeutet es, einen Agenten auf OpenBond zu bonden?',
          answer:
            'Einen Agenten auf OpenBond zu bonden bedeutet, Token zu staken, um einen autonomen Agenten auf MultiversX zu unterstützen. Dies schafft eine wirtschaftliche Bindung, die die Anreize zwischen dem Agenten und seinen Unterstützern ausrichtet.',
        },
        {
          question: 'Wie bonde ich einen Agenten?',
          answer:
            'Wähle einen Agenten aus und lege den Betrag fest, den du bonden möchtest. Deine Token werden in der Bonding-Kurve gesperrt und du erhältst im Gegenzug Bond-Token.',
        },
      ],
    },
  },

  'register-agent': {
    keywords: {
      en: ['register agent', 'OpenBond register', 'create autonomous agent', 'deploy agent', 'list agent on OpenBond'],
      de: ['Agent registrieren', 'OpenBond registrieren', 'autonomen Agenten erstellen', 'Agenten deployen', 'Agent auf OpenBond listen'],
    },
    useCases: {
      en: ['Deploy your AI agent to the OpenBond marketplace for others to bond', 'Register an autonomous trading agent on MultiversX', 'List a new agent on OpenBond to attract community supporters'],
      de: ['Deinen KI-Agenten auf dem OpenBond-Marktplatz bereitstellen, damit andere bonden können', 'Einen autonomen Handelsagenten auf MultiversX registrieren', 'Einen neuen Agenten auf OpenBond listen, um Community-Unterstützer zu gewinnen'],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'How do I register a new agent on OpenBond?',
          answer:
            'Deploy your autonomous agent on the OpenBond network by providing the agent details and configuration to make it available for bonding.',
        },
        {
          question: 'What do I need to register an agent?',
          answer:
            'You need your agent metadata and configuration details. Once registered, other users can discover and bond your agent on the OpenBond network.',
        },
      ],
      de: [
        {
          question: 'Wie registriere ich einen neuen Agenten auf OpenBond?',
          answer:
            'Stelle deinen autonomen Agenten im OpenBond-Netzwerk bereit, indem du die Agentendetails und Konfiguration angibst, um ihn für Bonding verfügbar zu machen.',
        },
        {
          question: 'Was brauche ich, um einen Agenten zu registrieren?',
          answer:
            'Du benötigst die Metadaten und Konfigurationsdetails deines Agenten. Nach der Registrierung können andere Nutzer deinen Agenten im OpenBond-Netzwerk entdecken und bonden.',
        },
      ],
    },
  },

  'emit-signal': {
    keywords: {
      en: ['emit signal', 'agent signal', 'OpenBond signal', 'broadcast signal', 'agent communication'],
      de: ['Signal senden', 'Agenten-Signal', 'OpenBond Signal', 'Signal übertragen', 'Agenten-Kommunikation'],
    },
    useCases: {
      en: ['Broadcast a market signal from your trading agent to bonders', 'Trigger an automated workflow between connected agents', 'Emit a status update signal for agent health monitoring'],
      de: ['Ein Marktsignal von deinem Handelsagenten an Bonder senden', 'Einen automatisierten Workflow zwischen verbundenen Agenten auslösen', 'Ein Statusupdate-Signal für die Agentenüberwachung senden'],
    },
    category: 'defi',
  },

  'network-overview': {
    keywords: {
      en: ['OpenBond overview', 'network stats', 'bonding network', 'agent network', 'OpenBond dashboard'],
      de: ['OpenBond Übersicht', 'Netzwerkstatistiken', 'Bonding-Netzwerk', 'Agenten-Netzwerk', 'OpenBond Dashboard'],
    },
    useCases: {
      en: ['Check total value locked across all agents on OpenBond', 'Discover trending agents with the highest bonding activity', 'Monitor network health and agent performance metrics'],
      de: ['Den gesamten gesperrten Wert aller Agenten auf OpenBond prüfen', 'Trendagenten mit der höchsten Bonding-Aktivität entdecken', 'Netzwerkgesundheit und Agenten-Leistungsmetriken überwachen'],
    },
    category: 'defi',
  },
}
