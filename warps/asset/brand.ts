import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Asset')
    .setDescription({
      en: 'The Asset app provides tools and operations for seamless transfer of blockchain assets, including cryptocurrencies and tokens, between different accounts and chains.',
      de: 'Die Asset App bietet Tools und Operationen für den nahtlosen Transfer von Blockchain-Assets, einschließlich Kryptowährungen und Token, zwischen verschiedenen Konten und Chains.',
    })
    .setLogo('https://raw.githubusercontent.com/iconic/open-iconic/master/svg/globe.svg')
    .setColors({ primary: '#000000' })
    .build(),
  contracts: {},
  destinations: {},
})
