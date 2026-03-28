import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Social')
    .setDescription({
      en: 'AI-powered <strong>social media content</strong> tools for writing, refining, and repurposing posts. Generate variations, sharpen hooks, match your voice, and more.',
      de: 'KI-gestützte <strong>Social-Media-Content</strong>-Tools zum Schreiben, Verfeinern und Wiederverwenden von Beiträgen.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/social.svg')
    .setColors({ primary: '#6366F1' })
    .build(),
  contracts: {},
  destinations: {},
})
