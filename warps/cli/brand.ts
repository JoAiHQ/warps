import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('CLI')
    .setDescription({
      en: 'Execute CLI commands on the desktop.',
      de: 'CLI-Befehle auf dem Desktop ausführen.',
    })
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cli-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cli-white.svg',
    })
    .setColors({ primary: '#000000', secondary: '#FFFFFF' })
    .build(),
  contracts: {},
  destinations: {},
})
