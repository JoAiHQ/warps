import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const DeepbookBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Deepbook')
    .setDescription({
      en: 'Decentralized exchange (DEX) with high-throughput trading through a fully on-chain order book.',
      de: 'Dezentrale Börse (DEX) mit Hochdurchsatz-Handel durch ein vollständig On-Chain-Orderbuch.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/deepbook.svg')
    .setColors({ primary: '#297EE9' })
    .setUrls({ web: 'https://deepbook.tech' })
    .build(),
  contracts: {},
  destinations: {},
})
