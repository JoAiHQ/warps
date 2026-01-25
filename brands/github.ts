import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const GithubBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('GitHub')
    .setDescription({
      en: "Interact with <strong>GitHub repositories</strong>, <strong>issues</strong>, <strong>pull requests</strong>, and <strong>code</strong>. Create, read, update, and manage your GitHub projects with GitHub's <strong>REST API</strong>.",
      de: 'Interagiere mit <strong>GitHub-Repositories</strong>, <strong>Issues</strong>, <strong>Pull Requests</strong> und <strong>Code</strong>. Erstelle, lies, aktualisiere und verwalte deine GitHub-Projekte mit der <strong>REST API</strong> von GitHub.',
    })
    .setLogo('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
    .setColors({ primary: '#181717' })
    .setUrls({ web: 'https://github.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://api.github.com',
  },
})
