import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('WhatsApp')
    .setDescription({
      en: 'Send WhatsApp messages via wacli CLI.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/whatsapp.png')
    .setColors({ primary: '#25D366' })
    .setUrls({ web: 'https://whatsapp.com' })
    .build(),
  contracts: {},
  destinations: {},
})
