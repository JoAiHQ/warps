import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const FastsetBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Fastset')
    .setDescription({
      en: 'High-performance blockchain network for decentralized applications. Focus on high throughput, low latency, and interoperability.',
      de: 'Leistungsstarkes Blockchain-Netzwerk für dezentrale Anwendungen. Fokus auf hohem Durchsatz, geringer Latenz und Interoperabilität.',
    })
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/fastset-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/fastset-white.svg',
    })
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://fastset.xyz' })
    .build(),
  contracts: {},
  destinations: {},
})
