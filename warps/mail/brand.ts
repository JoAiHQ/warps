import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('AI Mail')
    .setDescription({
      en: 'AI-drafted emails with one-click send. Your agent composes personalized messages, logs them to your CRM automatically, and hands you a ready-to-send mailto link — no copy-paste, no lost conversations.',
      de: 'KI-gestützte E-Mails mit Ein-Klick-Versand. Dein Agent verfasst personalisierte Nachrichten, protokolliert sie automatisch in deinem CRM und liefert dir einen fertigen mailto-Link — kein Copy-Paste, keine verlorenen Gespräche.',
      fr: 'E-mails rediges par IA avec envoi en un clic. Votre agent compose des messages personnalises, les enregistre dans votre CRM automatiquement, et vous donne un lien mailto pret a envoyer.',
      es: 'Correos redactados por IA con envio en un clic. Tu agente compone mensajes personalizados, los registra automaticamente en tu CRM y te entrega un enlace mailto listo para enviar.',
      ro: 'E-mailuri redactate de AI cu trimitere dintr-un clic. Agentul tau compune mesaje personalizate, le inregistreaza automat in CRM si iti ofera un link mailto gata de trimis.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
  site: {
    enabled: false,
    auth: false,
    indexPath: '/',
    routes: [],
  },
})
