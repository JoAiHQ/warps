import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const RedditBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Reddit')
    .setDescription({
      en: "Interact with <strong>Reddit communities</strong>, <strong>subreddits</strong>, and <strong>posts</strong>. Read, create, comment, and search content with Reddit's <strong>API</strong>.",
      de: 'Interagiere mit <strong>Reddit-Communities</strong>, <strong>Subreddits</strong> und <strong>Posts</strong>. Lies, erstelle, kommentiere und durchsuche Inhalte mit Reddits <strong>API</strong>.',
    })
    .setLogo({
      dark: 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png',
      light: 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png',
    })
    .setColors({ primary: '#FF4500' })
    .setUrls({ web: 'https://www.reddit.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://oauth.reddit.com',
    API_OAUTH: (env: WarpChainEnv) => 'https://www.reddit.com/api/v1',
  },
})
