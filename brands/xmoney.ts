import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const XmoneyBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('xMoney')
    .setDescription({
      en: 'Crypto & Fiat payment platform',
      de: 'Crypto & Fiat Zahlungsplattform',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/xmoney.svg')
    .setColors({ primary: '#7c4dff' })
    .setUrls({ web: 'https://xmoney.com' })
    .build(),
  contracts: {},
  destinations: {
    API_MERCHANTS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://merchants.api.sandbox.crypto.xmoney.com/api/stores/orders'
      if (env === 'testnet') return 'https://merchants.api.sandbox.crypto.xmoney.com/api/stores/orders'
      return 'https://merchants.api.crypto.xmoney.com/api/stores/orders'
    },
  },
})
