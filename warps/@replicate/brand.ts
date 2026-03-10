import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Replicate')
    .setDescription({
      en: 'Run <strong>AI models</strong> in the cloud with Replicate. Generate <strong>images</strong>, <strong>video</strong>, <strong>music</strong>, <strong>speech</strong>, and more using thousands of open-source <strong>machine learning models</strong>.',
      de: 'Führe <strong>KI-Modelle</strong> in der Cloud mit Replicate aus. Erzeuge <strong>Bilder</strong>, <strong>Videos</strong>, <strong>Musik</strong>, <strong>Sprache</strong> und mehr mit tausenden Open-Source <strong>Machine-Learning-Modellen</strong>.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/replicate-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/replicate-black.svg',
    })
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://replicate.com' })
    .build(),
  contracts: {},
  destinations: {
    API_PREDICTIONS: (env: WarpChainEnv) => 'https://api.replicate.com/v1/predictions',
    API_MODELS: (env: WarpChainEnv) => 'https://api.replicate.com/v1/models',
  },
})
