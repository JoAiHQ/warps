import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Chess')
    .setDescription({
      en: 'Play fully on-chain chess on MultiversX. Create games, challenge opponents, and make moves — all recorded immutably on the blockchain.',
      de: 'Spiele komplett On-Chain-Schach auf MultiversX. Erstelle Spiele, fordere Gegner heraus und ziehe — alles unveränderlich auf der Blockchain gespeichert.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setColors({ primary: '#B58863' })
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {
    CHESS_SC_ADDRESS: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'TODO_DEVNET'
      if (env === 'testnet') return 'TODO_TESTNET'
      return 'TODO_MAINNET'
    },
  },
  destinations: {},
  site: {
    enabled: true,
    auth: false,
    indexPath: '/',
    routes: [
      { path: '/', warp: '@chess-list', label: { en: 'My Games', de: 'Meine Spiele' }, nav: true, hiddenFields: ['PLAYER'] },
      { path: '/create', warp: '@chess-create', label: { en: 'New Game', de: 'Neues Spiel' }, nav: true },
      { path: '/game', warp: '@chess-game', label: { en: 'Play', de: 'Spielen' }, nav: false, hiddenFields: ['PLAYER'] },
      { path: '/open', warp: '@chess-open-games', label: { en: 'Open Games', de: 'Offene Spiele' }, nav: true },
    ],
  },
})
