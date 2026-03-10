import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Threads')
    .setDescription({
      en: 'Create and manage your <strong>Threads</strong> posts and <strong>social media content</strong>. Publish <strong>text posts</strong>, view your <strong>profile</strong>, and track <strong>account insights</strong> on Meta\'s Threads platform.',
      de: 'Erstelle und verwalte deine <strong>Threads</strong>-Beiträge und <strong>Social-Media-Inhalte</strong>. Veröffentliche <strong>Textbeiträge</strong>, sieh dein <strong>Profil</strong> an und verfolge <strong>Konto-Einblicke</strong> auf Metas Threads-Plattform.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/threads-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/threads-black.svg',
    })
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://threads.net' })
    .build(),
  contracts: {},
  destinations: {
    API_THREADS: (env: WarpChainEnv) => 'https://graph.threads.net/v1.0/me/threads',
    API_PUBLISH: (env: WarpChainEnv) => 'https://graph.threads.net/v1.0/me/threads_publish',
    API_PROFILE: (env: WarpChainEnv) => 'https://graph.threads.net/v1.0/me',
    API_INSIGHTS: (env: WarpChainEnv) => 'https://graph.threads.net/v1.0/me/threads_insights',
  },
})
