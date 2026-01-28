import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('PeerMe')
    .setDescription({
      en: 'Decentralized governance and multi-signature wallet platform for DAOs on MultiversX. Manage organizations and execute secure transactions with advanced multisig capabilities.',
      de: 'Dezentralisierte Governance- und Multi-Signatur-Wallet-Plattform für DAOs auf MultiversX. Verwalte Organisationen und führe sichere Transaktionen mit erweiterten Multisig-Funktionen aus.',
    })
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/peerme-black.png',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/peerme-white.png',
    })
    .setColors({ primary: '#4fd1c5', secondary: '#7f8fa6' })
    .setUrls({ web: 'https://peerme.io' })
    .build(),
  contracts: {
    EARN: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqfxlljcaalgl2qfcnxcsftheju0ts36kvl3ts3qkewe'
      return 'erd1qqqqqqqqqqqqqpgqjhn0rrta3hceyguqlmkqgklxc0eh0r5rl3tsv6a9k0'
    },
    IDENTITY: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqpgqld08ayjqfk4sptve3xslanhq4pd5ar5dl3tsvm7gcp'
      return 'erd1qqqqqqqqqqqqqpgq4kns8he9r84c58ed3jjuam3tp7u9zl4n27rsy2kv6u'
    },
  },
  destinations: {},
})
