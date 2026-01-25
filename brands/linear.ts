import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const LinearBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Linear')
    .setDescription({
      en: "Manage <strong>projects</strong>, <strong>issues</strong>, and <strong>teams</strong> with Linear's modern project management platform. Create, update, and track issues using Linear's <strong>GraphQL API</strong>.",
      de: 'Verwalte <strong>Projekte</strong>, <strong>Issues</strong> und <strong>Teams</strong> mit der modernen Projektmanagement-Plattform Linear. Erstelle, aktualisiere und verfolge Issues mit der <strong>GraphQL API</strong> von Linear.',
    })
    .setLogo('https://linear.app/favicon.ico')
    .setColors({ primary: '#5E6AD2' })
    .setUrls({ web: 'https://linear.app' })
    .build(),
  contracts: {},
  destinations: {
    API_GRAPHQL: (env: WarpChainEnv) => 'https://api.linear.app/graphql',
  },
})
