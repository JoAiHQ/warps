import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('#wacli')
    .setDescription({
      en: 'Send WhatsApp messages via wacli CLI. Private/hacky tool for outreach automation.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/whatsapp.png')
    .setColors({ primary: '#25D366' })
    .setUrls({ web: 'https://whatsapp.com' })
    .build(),
  contracts: {},
  destinations: {},
})
