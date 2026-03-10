import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Sentry')
    .setDescription({
      en: 'Monitor and resolve <strong>errors</strong>, <strong>issues</strong>, and <strong>performance problems</strong> in your applications. List projects, track issues, and manage events using the <strong>Sentry API</strong>.',
      de: 'Uberwache und behebe <strong>Fehler</strong>, <strong>Issues</strong> und <strong>Performance-Probleme</strong> in deinen Anwendungen. Liste Projekte auf, verfolge Issues und verwalte Events mit der <strong>Sentry API</strong>.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/sentry-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/sentry-black.svg',
    })
    .setColors({ primary: '#362D59' })
    .setUrls({ web: 'https://sentry.io' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://sentry.io/api/0',
    API_ORGS: (env: WarpChainEnv) => 'https://sentry.io/api/0/organizations',
  },
})
