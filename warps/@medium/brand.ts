import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Medium')
    .setDescription({
      en: 'Publish and manage content on <strong>Medium</strong>. Create <strong>posts</strong>, retrieve <strong>user profiles</strong>, and manage your <strong>publications</strong> using the Medium <strong>REST API</strong>.',
      de: 'Veröffentliche und verwalte Inhalte auf <strong>Medium</strong>. Erstelle <strong>Beiträge</strong>, rufe <strong>Benutzerprofile</strong> ab und verwalte deine <strong>Publikationen</strong> mit der <strong>REST API</strong> von Medium.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/medium-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/medium-black.svg',
    })
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://medium.com' })
    .build(),
  contracts: {},
  destinations: {
    API_ME: (env: WarpChainEnv) => 'https://api.medium.com/v1/me',
    API_USER_POSTS: (env: WarpChainEnv) => 'https://api.medium.com/v1/users',
  },
})
