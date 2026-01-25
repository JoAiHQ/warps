import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const TypefullyBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Typefully')
    .setDescription({
      en: 'Create, schedule, and optimize your <strong>Twitter tweets and threads</strong> for maximum engagement. <br />Professional <strong>social media content creation</strong> and <strong>automated scheduling</strong> tool for <strong>Twitter marketing</strong> and <strong>thread writing</strong>.',
      de: 'Erstelle, plane und optimiere deine <strong>Twitter-Tweets und Threads</strong> für maximale Reichweite. <br />Professionelles Tool für <strong>Social-Media-Content-Erstellung</strong> und <strong>automatisierte Planung</strong> für <strong>Twitter-Marketing</strong> und <strong>Thread-Schreiben</strong>.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/typefully.svg')
    .setColors({ primary: '#199BF5' })
    .setUrls({ web: 'https://typefully.com' })
    .build(),
  contracts: {},
  destinations: {},
})
