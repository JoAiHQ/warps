import type { WarpClientConfig } from '@joai/warps'
import type { WarpbaseBrand } from '../types'
import { WarpBrandBuilder } from '@joai/warps'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('AIustria')
    .setDescription({
      en: 'AIustria — AI-powered business applications for Austrian SMEs.',
      de: 'AIustria — KI-gestützte Unternehmensanwendungen für österreichische KMU.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://aiustria.at' })
    .build(),
  contracts: {},
  destinations: {},
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      {
        path: '/',
        warp: 'private_NymWbkNqQwDe',
        label: { en: 'Apply', de: 'Bewerben' },
        nav: false,
      },
    ],
  },
})
