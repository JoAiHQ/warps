import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const SolanaBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Solana')
    .setDescription({
      en: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today. Built for speed with sub-second finality and low transaction costs.',
      de: 'Solana ist eine leistungsstarke Blockchain, die Entwickler weltweit bei der Erstellung von Krypto-Apps unterstützt, die heute skalieren. Entwickelt für Geschwindigkeit mit Sub-Sekunden-Finalität und niedrigen Transaktionskosten.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/solana.svg')
    .setColors({ primary: '#9945FF' })
    .setUrls({ web: 'https://solana.com' })
    .build(),
  contracts: {},
  destinations: {
    RPC: (env: WarpChainEnv) => (env === 'devnet' ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com'),
  },
})
