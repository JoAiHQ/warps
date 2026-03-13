import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Mailcoach')
    .setDescription({
      en: "Manage <strong>email lists</strong>, <strong>campaigns</strong>, <strong>subscribers</strong>, and <strong>transactional emails</strong> with Mailcoach's powerful <strong>REST API</strong>. Automate your email marketing workflows.",
      de: 'Verwalte <strong>E-Mail-Listen</strong>, <strong>Kampagnen</strong>, <strong>Abonnenten</strong> und <strong>transaktionale E-Mails</strong> mit Mailcoachs leistungsstarker <strong>REST API</strong>. Automatisiere deine E-Mail-Marketing-Workflows.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/mailcoach.svg')
    .setColors({ primary: '#346df1' })
    .setUrls({ web: 'https://mailcoach.app' })
    .build(),
  contracts: {},
  destinations: {},
})
