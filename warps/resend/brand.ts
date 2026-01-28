import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Resend')
    .setDescription({
      en: "Send <strong>transactional and marketing emails</strong> from your applications. Use <strong>email templates</strong>, <strong>attachments</strong>, and <strong>tracking</strong> with Resend's <strong>email API</strong>.",
      de: 'Sende <strong>transaktionale und Marketing-E-Mails</strong> aus deinen Anwendungen. Nutze <strong>E-Mail-Vorlagen</strong>, <strong>Anhänge</strong> und <strong>Tracking</strong> mit Resends <strong>E-Mail-API</strong>.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/resend-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/resend-black.svg',
    })
    .setColors({ primary: '#6366F1' })
    .setUrls({ web: 'https://resend.com' })
    .build(),
  contracts: {},
  destinations: {
    API_EMAILS: (env: WarpChainEnv) => 'https://api.resend.com/emails',
  },
})
