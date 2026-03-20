import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('File')
    .setDescription({
      en: 'Convert, transform, and manage files on your desktop.',
      de: 'Dateien auf dem Desktop konvertieren, transformieren und verwalten.',
    })
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/file-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/file-white.svg',
    })
    .setColors({ primary: '#4F46E5', secondary: '#EEF2FF' })
    .build(),
  contracts: {},
  destinations: {},
})
