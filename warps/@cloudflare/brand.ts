import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Cloudflare')
    .setDescription({
      en: 'Manage <strong>DNS records</strong>, <strong>Workers</strong>, <strong>KV storage</strong>, and <strong>cache</strong> with the Cloudflare API. Control your <strong>zones</strong>, deploy <strong>serverless functions</strong>, and purge <strong>CDN cache</strong>.',
      de: 'Verwalte <strong>DNS-Einträge</strong>, <strong>Workers</strong>, <strong>KV-Speicher</strong> und <strong>Cache</strong> mit der Cloudflare-API. Steuere deine <strong>Zonen</strong>, deploye <strong>serverlose Funktionen</strong> und leere den <strong>CDN-Cache</strong>.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cloudflare-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cloudflare-black.svg',
    })
    .setColors({ primary: '#F6821F' })
    .setUrls({ web: 'https://cloudflare.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://api.cloudflare.com/client/v4',
  },
})
