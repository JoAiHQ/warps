import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('OpenAI')
    .setDescription({
      en: 'Launch and manage generic task runs through the OpenAI Responses API.',
      de: 'Starte und verwalte generische Task-Runs über die OpenAI Responses API.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/openai.png')
    .setColors({ primary: '#111111' })
    .setUrls({ web: 'https://platform.openai.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (_env: WarpChainEnv) => 'https://api.openai.com',
  },
})
