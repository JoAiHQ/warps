import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('NEAR')
    .setDescription('NEAR Protocol is a developer-friendly blockchain designed to make decentralized applications usable on a mass scale.')
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/near-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/near-white.svg',
    })
    .setColors({ primary: '#00D9FF' })
    .setUrls({ web: 'https://near.org' })
    .build(),
  contracts: {},
  destinations: {},
})
