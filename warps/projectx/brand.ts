import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('ProjectX')
    .setDescription({
      en: 'Empowering communities with game-changing products.',
      de: 'Gemeinschaften mit bahnbrechenden Produkten stärken.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/projectx.png')
    .setColors({ primary: '#000000', secondary: '#ffffff' })
    .setUrls({ web: 'https://projectx.mx' })
    .build(),
  contracts: {
    PROVIDER: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv8lllls3ydk0k'
      return 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqpw8llllssv9f7g'
    },
  },
  destinations: {},
})
