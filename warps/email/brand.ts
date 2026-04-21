import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('AI Email')
    .setDescription({
      en: 'Send personalized emails to contacts through your AI agent. The agent drafts the message from your intent, uses your configured email integration, and automatically creates a conversation room so replies route back to the right thread — no copy-paste, no lost context.',
      de: 'Versende personalisierte E-Mails an Kontakte über deinen KI-Agenten. Der Agent verfasst die Nachricht aus deiner Absicht, nutzt deine konfigurierte E-Mail-Integration und legt automatisch einen Gesprächsraum an, damit Antworten im richtigen Thread landen — ohne Copy-Paste, ohne verlorenen Kontext.',
      fr: 'Envoyez des e-mails personnalises a vos contacts via votre agent IA. L\'agent redige le message a partir de votre intention, utilise votre integration e-mail configuree et cree automatiquement une salle de conversation pour que les reponses arrivent au bon endroit.',
      es: 'Envia correos personalizados a tus contactos mediante tu agente IA. El agente redacta el mensaje segun tu intencion, usa tu integracion de correo configurada y crea automaticamente una sala de conversacion para que las respuestas regresen al hilo correcto.',
      ro: 'Trimite e-mailuri personalizate catre contacte prin agentul tau AI. Agentul redacteaza mesajul din intentia ta, foloseste integrarea ta de e-mail configurata si creeaza automat o camera de conversatie astfel incat raspunsurile sa ajunga in firul corect.',
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
})
