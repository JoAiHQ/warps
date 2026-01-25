import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const SuiBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Sui')
    .setDescription(
      'Sui is a next-generation smart contract platform with high throughput, low latency, and an asset-oriented programming model powered by the Move programming language.'
    )
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/sui.svg')
    .setColors({ primary: '#4FA8FF' })
    .setUrls({ web: 'https://sui.io' })
    .build(),
  contracts: {},
  destinations: {},
})
