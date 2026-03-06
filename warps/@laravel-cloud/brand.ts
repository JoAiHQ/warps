import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Laravel Cloud')
    .setDescription({
      en: "The <strong>Laravel Cloud API</strong> allows you to manage your <strong>applications</strong>, <strong>environments</strong>, <strong>deployments</strong>, <strong>databases</strong>, and more. Ship your Laravel apps at scale with cloud-native infrastructure.",
      de: 'Die <strong>Laravel Cloud API</strong> ermöglicht es dir, deine <strong>Applikationen</strong>, <strong>Umgebungen</strong>, <strong>Deployments</strong>, <strong>Datenbanken</strong> und mehr zu verwalten. Veröffentliche deine Laravel-Apps skaliert mit Cloud-nativer Infrastruktur.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/laravel.svg')
    .setColors({ primary: '#FF2D20' })
    .setUrls({ web: 'https://cloud.laravel.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://cloud.laravel.com/api',
  },
})
