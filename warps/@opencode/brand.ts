import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('OpenCode')
    .setDescription({
      en: 'Manage generic task sessions through the OpenCode server API.',
      de: 'Verwalte generische Task-Sessions über die OpenCode Server-API.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/opencode.png')
    .setColors({ primary: '#0f172a' })
    .setUrls({ web: 'https://opencode.ai' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (_env: WarpChainEnv) => 'http://127.0.0.1:4096',
  },
})
