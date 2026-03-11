import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Bluesky')
    .setDescription({
      en: 'Connect with <strong>Bluesky</strong>, the decentralized <strong>social network</strong> built on the <strong>AT Protocol</strong>. Create <strong>posts</strong>, view <strong>profiles</strong>, and browse <strong>feeds</strong>.',
      de: 'Verbinde dich mit <strong>Bluesky</strong>, dem dezentralen <strong>sozialen Netzwerk</strong> auf dem <strong>AT Protocol</strong>. Erstelle <strong>Beiträge</strong>, sieh <strong>Profile</strong> an und durchsuche <strong>Feeds</strong>.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/bluesky-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/bluesky-black.svg',
    })
    .setColors({ primary: '#0085FF' })
    .setUrls({ web: 'https://bsky.app' })
    .build(),
  contracts: {},
  destinations: {
    API_CREATE_RECORD: (env: WarpChainEnv) => 'https://bsky.social/xrpc/com.atproto.repo.createRecord',
    API_GET_PROFILE: (env: WarpChainEnv) => 'https://bsky.social/xrpc/app.bsky.actor.getProfile',
    API_GET_POSTS: (env: WarpChainEnv) => 'https://bsky.social/xrpc/app.bsky.feed.getPosts',
    API_GET_AUTHOR_FEED: (env: WarpChainEnv) => 'https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed',
  },
})
