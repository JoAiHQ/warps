import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Asset')
    .setDescription({
      en: 'The Asset app provides tools and operations for seamless transfer of blockchain assets, including cryptocurrencies and tokens, between different accounts and chains.',
      de: 'Die Asset App bietet Tools und Operationen für den nahtlosen Transfer von Blockchain-Assets, einschließlich Kryptowährungen und Token, zwischen verschiedenen Konten und Chains.',
    })
    .setLogo({
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/asset-black.svg',
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/asset-white.svg',
    })
    .setColors({ primary: '#000000' })
    .build(),
  contracts: {},
  destinations: {},
})
