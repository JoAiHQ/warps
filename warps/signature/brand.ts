import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Signature')
    .setDescription({
      en: 'On-chain document signatures. Send signing requests by email. All agreements anchored on the blockchain.',
      de: 'On-chain-Dokumentensignaturen. Signaturanfragen per E-Mail senden. Alle Vereinbarungen auf der Blockchain verankert.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    SIGNATURE_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'TODO_DEVNET'
      if (env === 'testnet') return 'TODO_TESTNET'
      return 'TODO_MAINNET'
    },
  },
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: 'create', label: { en: 'Request Signature', de: 'Signatur anfordern' }, nav: true },
      { path: '/sign', warp: 'sign', label: { en: 'Sign Document', de: 'Dokument unterzeichnen' }, nav: false },
      { path: '/view', warp: 'view', label: { en: 'View Request', de: 'Anfrage ansehen' }, nav: false },
      { path: '/list', warp: 'list', label: { en: 'My Requests', de: 'Meine Anfragen' }, nav: true },
    ],
  },
})
