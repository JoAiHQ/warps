import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Cursor')
    .setDescription({
      en: "Create and manage <strong>AI-powered coding agents</strong> that work autonomously on your repositories. Automate code changes, workflows, and pull requests with Cursor's <strong>Cloud Agents API</strong>.",
      de: 'Erstelle und verwalte <strong>KI-gestützte Coding-Agenten</strong>, die autonom an deinen Repositories arbeiten. Automatisiere Code-Änderungen, Workflows und Pull Requests mit Cursors <strong>Cloud Agents API</strong>.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cursor.png')
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://cursor.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://api.cursor.com',
  },
})
