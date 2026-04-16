import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Activity')
    .setDescription({
      en: 'Personal activity coaching. Set goals, track progress, and get coached — one session at a time.',
      de: 'Persönliches Aktivitäts-Coaching. Ziele setzen, Fortschritt verfolgen und gecoacht werden — eine Einheit nach der anderen.',
      fr: 'Coaching d\'activité personnalisé. Définissez vos objectifs, suivez vos progrès et faites-vous coacher.',
      es: 'Coaching de actividad personal. Establece objetivos, sigue tu progreso y recibe coaching.',
      ro: 'Coaching personal pentru activitate. Seteaza obiective, urmareste progresul si primeste coaching.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
  destinations: {},
  site: {
    enabled: false,
    auth: false,
    indexPath: '/',
    routes: [],
  },
})
