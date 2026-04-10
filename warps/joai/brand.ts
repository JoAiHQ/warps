import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('JoAi')
    .setDescription({
      en: 'JoAi is a platform for creating and managing your own AI agents.',
      de: 'JoAi ist eine Plattform für das Erstellen und Verwalten eigener AI-Agenten.',
      fr: 'JoAi est une plateforme qui permet de créer et de gérer vos propres agents IA.',
      es: 'JoAi es una plataforma para crear y gestionar tus propios agentes de IA.',
      ro: 'JoAi este o platforma pentru crearea si gestionarea propriilor tai agenti AI.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setColors({ primary: '#98FF98', secondary: '#FFFF66' })
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
})
