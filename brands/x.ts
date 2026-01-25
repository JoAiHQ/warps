import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const XBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('X')
    .setDescription({
      en: 'Create and manage your <strong>X (Twitter) posts</strong> and <strong>social media content</strong>. Generate post drafts, schedule content, and optimize your <strong>X.com presence</strong> for maximum engagement.',
      de: 'Erstelle und verwalte deine <strong>X (Twitter) Posts</strong> und <strong>Social-Media-Inhalte</strong>. Generiere Post-Entwürfe, plane Inhalte und optimiere deine <strong>X.com-Präsenz</strong> für maximale Reichweite.',
    })
    .setLogo('https://abs.twimg.com/favicons/twitter.3.ico')
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://x.com' })
    .build(),
  contracts: {},
  destinations: {},
})
