import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Gemini')
    .setDescription({
      en: 'Launch and manage generic task runs through the Gemini Batch API.',
      de: 'Starte und verwalte generische Task-Runs über die Gemini Batch API.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/gemini.png')
    .setColors({ primary: '#1a73e8' })
    .setUrls({ web: 'https://ai.google.dev' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (_env: WarpChainEnv) => 'https://generativelanguage.googleapis.com',
  },
})
