import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Pass')
    .setDescription({
      en: 'Generate mobile wallet passes for Apple Wallet and Google Wallet. Create coupon, loyalty, and store card passes that update in real time.',
      de: 'Erstelle mobile Wallet-Pässe für Apple Wallet und Google Wallet. Erstelle Gutschein-, Treue- und Kundenkarten-Pässe, die sich in Echtzeit aktualisieren.',
      fr: 'Générez des passes mobiles pour Apple Wallet et Google Wallet. Créez des coupons, cartes de fidélité et cartes de magasin mises à jour en temps réel.',
      es: 'Genera pases de móvil para Apple Wallet y Google Wallet. Crea pases de cupones, fidelización y tarjetas de tienda que se actualizan en tiempo real.',
      ro: 'Generează pase de mobil pentru Apple Wallet și Google Wallet. Creează pase de cupoane, loialitate și carduri de magazin care se actualizează în timp real.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
})
