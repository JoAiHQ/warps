import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Certificate')
    .setDescription({
      en: 'Issue and verify digital certificates on the blockchain. Permanently anchored — tamper-proof, instantly verifiable.',
      de: 'Digitale Zertifikate auf der Blockchain ausstellen und verifizieren. Dauerhaft verankert — fälschungssicher und sofort überprüfbar.',
      fr: 'Émettez et vérifiez des certificats numériques sur la blockchain. Ancrés en permanence — infalsifiables et vérifiables instantanément.',
      es: 'Emite y verifica certificados digitales en la blockchain. Anclados permanentemente — a prueba de manipulaciones, verificables al instante.',
      ro: 'Emite și verifică certificate digitale pe blockchain. Ancorate permanent — imposibil de falsificat, verificabile instant.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    CERTIFICATE_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqps56ch3ltnlr98mqwmxusx4ve4nvuwnltres49cp0v'
      if (env === 'testnet') return 'TODO_TESTNET'
      return 'TODO_MAINNET'
    },
  },
  destinations: {
    SITES_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-sites.joai.ai'
      if (env === 'testnet') return 'https://testnet-sites.joai.ai'
      return 'https://sites.joai.ai'
    },
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
  site: {
    enabled: true,
    auth: false,
    indexPath: '/issue',
    routes: [
      { path: '/create-collection', warp: '@certificate-create-collection', label: { en: 'New Collection', de: 'Neue Kollektion', fr: 'Nouvelle collection', es: 'Nueva colección', ro: 'Colecție nouă' }, nav: true },
      { path: '/issue', warp: '@certificate-issue', label: { en: 'Issue Certificate', de: 'Zertifikat ausstellen', fr: 'Émettre un certificat', es: 'Emitir certificado', ro: 'Emite certificat' }, nav: true },
      { path: '/verify', warp: '@certificate-verify', label: { en: 'Verify', de: 'Verifizieren', fr: 'Vérifier', es: 'Verificar', ro: 'Verifică' }, nav: true },
      { path: '/list', warp: '@certificate-list', label: { en: 'All Certificates', de: 'Alle Zertifikate', fr: 'Tous les certificats', es: 'Todos los certificados', ro: 'Toate certificatele' }, nav: true },
      { path: '/claim', warp: '@certificate-claim', label: { en: 'Claim', de: 'Einlösen', fr: 'Réclamer', es: 'Reclamar', ro: 'Revendică' }, nav: false },
      { path: '/revoke', warp: '@certificate-revoke', label: { en: 'Revoke', de: 'Widerrufen', fr: 'Révoquer', es: 'Revocar', ro: 'Revocă' }, nav: false },
    ],
  },
})
