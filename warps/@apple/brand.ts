import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Apple')
    .setDescription({
      en: 'Control native Apple apps on macOS.',
      de: 'Native Apple-Apps auf macOS steuern.',
    })
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/apple-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/apple-white.svg',
    })
    .setColors({ primary: '#000000', secondary: '#FFFFFF' })
    .build(),
  contracts: {},
  destinations: {},
})
