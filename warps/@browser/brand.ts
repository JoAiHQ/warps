import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Browser')
    .setDescription({
      en: 'Control Chrome on your desktop to automate web tasks, take screenshots, navigate pages, and interact with web content.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/chrome.png')
    .setColors({ primary: '#4285F4' })
    .setUrls({ web: 'https://google.com/chrome' })
    .build(),
  contracts: {},
  destinations: {},
})
