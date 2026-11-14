import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('OpenCode')
    .setDescription({
      en: 'Run coding tasks locally through the OpenCode CLI on the desktop.',
      de: 'Codierungsaufgaben lokal über die OpenCode CLI auf dem Desktop ausführen.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/opencode.png')
    .setColors({ primary: '#0f172a' })
    .setUrls({ web: 'https://opencode.ai' })
    .build(),
  contracts: {},
  destinations: {},
})
