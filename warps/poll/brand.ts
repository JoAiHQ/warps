import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Poll')
    .setDescription({
      en: 'On-chain polls and voting groups for any community — property owners, DAOs, teams, and more.',
      de: 'On-Chain-Abstimmungen und Voting-Gruppen für jede Gemeinschaft — Eigentümer, DAOs, Teams und mehr.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    POLL_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'TODO'
      if (env === 'testnet') return 'TODO'
      return 'TODO'
    },
  },
  destinations: {},
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@poll-get-active-polls', label: { en: 'Polls', de: 'Abstimmungen' }, nav: true, hiddenFields: ['SLUG'] },
      { path: '/vote', warp: '@poll-vote', label: { en: 'Vote', de: 'Abstimmen' }, nav: false },
      { path: '/results', warp: '@poll-get-poll-results', label: { en: 'Results', de: 'Ergebnisse' }, nav: false },
      { path: '/join', warp: '@poll-request-membership', label: { en: 'Join Group', de: 'Gruppe beitreten' }, nav: true, hiddenFields: ['SLUG'] },
      { path: '/join-invite', warp: '@poll-join-with-invite', label: { en: 'Join with Invite', de: 'Mit Einladung beitreten' }, nav: false, hiddenFields: ['SLUG'] },
      { path: '/admin/create', warp: '@poll-create-poll', label: { en: 'Create Poll', de: 'Abstimmung erstellen' }, nav: false, hiddenFields: ['GROUP_SLUG'] },
      { path: '/admin/requests', warp: '@poll-get-pending-requests', label: { en: 'Requests', de: 'Anfragen' }, nav: false, hiddenFields: ['SLUG'] },
      { path: '/admin/invite', warp: '@poll-create-invite', label: { en: 'Invite', de: 'Einladen' }, nav: false, hiddenFields: ['SLUG'] },
    ],
  },
})
