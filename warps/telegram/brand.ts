import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Telegram')
    .setDescription({
      en: 'Connect your Telegram bot to send and receive messages.',
      de: 'Verbinde deinen Telegram-Bot zum Senden und Empfangen von Nachrichten.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/telegram.svg')
    .setColors({ primary: '#2AABEE' })
    .setUrls({ web: 'https://telegram.org' })
    .build(),
  contracts: {},
  destinations: {},
})
