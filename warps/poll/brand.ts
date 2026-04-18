import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Poll')
    .setDescription({
      en: 'On-chain polls and voting groups for any community — property owners, DAOs, teams, and more.',
      de: 'On-Chain-Abstimmungen und Voting-Gruppen für jede Gemeinschaft — Eigentümer, DAOs, Teams und mehr.',
      fr: 'Sondages on-chain et groupes de vote pour toutes les communautes : coproprietes, DAO, equipes et bien plus.',
      es: 'Encuestas on-chain y grupos de votacion para cualquier comunidad: propietarios, DAOs, equipos y mas.',
      ro: 'Sondaje on-chain si grupuri de vot pentru orice comunitate: proprietari, DAO-uri, echipe si multe altele.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    POLL_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqtxwhd7z99tvvrgd38897k9zunrqsgmahtres7648am'
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
      { path: '/', warp: '@poll-polls', label: { en: 'Polls', de: 'Abstimmungen', fr: 'Sondages', es: 'Encuestas', ro: 'Sondaje' }, nav: true, hiddenFields: ['GROUP_SLUG'] },
      { path: '/poll', warp: '@poll-detail', label: { en: 'Poll', de: 'Abstimmung', fr: 'Sondage', es: 'Encuesta', ro: 'Sondaj' }, nav: false },
      { path: '/vote', warp: '@poll-vote', label: { en: 'Vote', de: 'Abstimmen', fr: 'Voter', es: 'Votar', ro: 'Voteaza' }, nav: false },
      { path: '/results', warp: '@poll-results', label: { en: 'Results', de: 'Ergebnisse', fr: 'Resultats', es: 'Resultados', ro: 'Rezultate' }, nav: false },
      { path: '/join', warp: '@poll-membership-request', label: { en: 'Join Group', de: 'Gruppe beitreten', fr: 'Rejoindre le groupe', es: 'Unirse al grupo', ro: 'Alatura-te grupului' }, nav: true, hiddenFields: ['GROUP_SLUG'] },
      { path: '/join-invite', warp: '@poll-invite-join', label: { en: 'Join with Invite', de: 'Mit Einladung beitreten', fr: 'Rejoindre avec une invitation', es: 'Unirse con invitacion', ro: 'Alatura-te cu invitatie' }, nav: false, hiddenFields: ['GROUP_SLUG'] },
      { path: '/admin/create', warp: '@poll-poll-create', label: { en: 'Create Poll', de: 'Abstimmung erstellen', fr: 'Creer un sondage', es: 'Crear encuesta', ro: 'Creeaza sondaj' }, nav: false, hiddenFields: ['GROUP_SLUG'] },
      { path: '/admin/requests', warp: '@poll-requests-pending', label: { en: 'Requests', de: 'Anfragen', fr: 'Demandes', es: 'Solicitudes', ro: 'Cereri' }, nav: false, hiddenFields: ['GROUP_SLUG'] },
      { path: '/admin/invite', warp: '@poll-invite-create', label: { en: 'Invite', de: 'Einladen', fr: 'Inviter', es: 'Invitar', ro: 'Invita' }, nav: false, hiddenFields: ['GROUP_SLUG'] },
    ],
  },
})
