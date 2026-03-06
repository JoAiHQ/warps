import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Anthropic')
    .setDescription({
      en: 'Launch and manage generic task runs through Anthropic Message Batches.',
      de: 'Starte und verwalte generische Task-Runs über Anthropic Message Batches.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/anthropic.png')
    .setColors({ primary: '#191919' })
    .setUrls({ web: 'https://www.anthropic.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (_env: WarpChainEnv) => 'https://api.anthropic.com',
  },
})
