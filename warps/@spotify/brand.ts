import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Spotify')
    .setDescription({
      en: 'Search and browse <strong>music</strong>, <strong>artists</strong>, <strong>albums</strong>, and <strong>playlists</strong> on Spotify. Get <strong>track details</strong>, <strong>artist info</strong>, and <strong>playlist contents</strong> using the Spotify <strong>Web API</strong>.',
      de: 'Suche und durchstöbere <strong>Musik</strong>, <strong>Künstler</strong>, <strong>Alben</strong> und <strong>Playlists</strong> auf Spotify. Erhalte <strong>Track-Details</strong>, <strong>Künstler-Infos</strong> und <strong>Playlist-Inhalte</strong> über die Spotify <strong>Web API</strong>.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/spotify.svg')
    .setColors({ primary: '#1DB954' })
    .setUrls({ web: 'https://spotify.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://api.spotify.com/v1',
  },
})
