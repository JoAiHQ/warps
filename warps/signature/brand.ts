import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Signature')
    .setDescription({
      en: 'On-chain document signatures. Send signing requests by email. All agreements anchored on the blockchain.',
      de: 'On-chain-Dokumentensignaturen. Signaturanfragen per E-Mail senden. Alle Vereinbarungen auf der Blockchain verankert.',
      fr: 'Signatures de documents on-chain. Envoyez des demandes de signature par e-mail. Tous les accords sont ancrés sur la blockchain.',
      es: 'Firmas de documentos on-chain. Envia solicitudes de firma por correo electronico. Todos los acuerdos quedan anclados en la blockchain.',
      ro: 'Semnaturi de documente on-chain. Trimite cereri de semnare prin e-mail. Toate acordurile sunt ancorate pe blockchain.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    SIGNATURE_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqtxwhd7z99tvvrgd38897k9zunrqsgmahtres7648am'
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
    EXPLORER_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-explorer.multiversx.com'
      if (env === 'testnet') return 'https://testnet-explorer.multiversx.com'
      return 'https://explorer.multiversx.com'
    },
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@signature-create', label: { en: 'Request Signature', de: 'Signatur anfordern', fr: 'Demander une signature', es: 'Solicitar firma', ro: 'Solicita semnatura' }, nav: true },
      { path: '/self-sign', warp: '@signature-self-sign', label: { en: 'Sign My Document', de: 'Eigenes Dokument signieren', fr: 'Signer mon document', es: 'Firmar mi documento', ro: 'Semneaza documentul meu' }, nav: true },
      { path: '/sign', warp: '@signature-sign', label: { en: 'Sign Document', de: 'Dokument unterzeichnen', fr: 'Signer le document', es: 'Firmar documento', ro: 'Semneaza documentul' }, nav: false },
      { path: '/decline', warp: '@signature-decline', label: { en: 'Decline Request', de: 'Anfrage ablehnen', fr: 'Refuser la demande', es: 'Rechazar solicitud', ro: 'Respinge cererea' }, nav: false },
      { path: '/remind', warp: '@signature-remind', label: { en: 'Send Reminder', de: 'Erinnerung senden', fr: 'Envoyer un rappel', es: 'Enviar recordatorio', ro: 'Trimite reminder' }, nav: false },
      { path: '/view', warp: '@signature-view', label: { en: 'View Request', de: 'Anfrage ansehen', fr: 'Voir la demande', es: 'Ver solicitud', ro: 'Vezi cererea' }, nav: false },
      { path: '/cancel', warp: '@signature-cancel', label: { en: 'Cancel Request', de: 'Anfrage stornieren', fr: 'Annuler la demande', es: 'Cancelar solicitud', ro: 'Anuleaza cererea' }, nav: false },
      { path: '/list', warp: '@signature-list', label: { en: 'My Requests', de: 'Meine Anfragen', fr: 'Mes demandes', es: 'Mis solicitudes', ro: 'Cererile mele' }, nav: true },
    ],
  },
})
