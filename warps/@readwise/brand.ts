import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Readwise')
    .setDescription({
      en: 'Connect to Readwise Reader to list and retrieve saved documents, highlights, and metadata.',
      de: 'Verbinde dich mit Readwise Reader, um gespeicherte Dokumente, Highlights und Metadaten abzurufen.',
    })
    .setLogo('https://readwise-assets.s3.amazonaws.com/static/images/readwise/rw-logo-v3.png')
    .setColors({ primary: '#111827', secondary: '#f59e0b' })
    .setUrls({ web: 'https://readwise.io' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://readwise.io/api/v3',
  },
})
