import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('HTTP')
    .setDescription({
      en: 'A set of skills to make HTTP requests to any URL.',
      de: 'Eine Reihe von Fähigkeiten, um HTTP-Anfragen an beliebige URLs zu stellen.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/http.svg')
    .setColors({ primary: '#000000', secondary: '#FFFFFF' })
    .setUrls({ web: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' })
    .build(),
  contracts: {},
  destinations: {},
})
