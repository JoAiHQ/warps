import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Jupiter')
    .setDescription({
      en: 'Jupiter is the leading DEX aggregator on Solana, routing swaps across multiple liquidity sources for the best prices. Powers token swaps, limit orders, and DCA strategies.',
      de: 'Jupiter ist der fuehrende DEX-Aggregator auf Solana, der Swaps ueber mehrere Liquiditaetsquellen fuer die besten Preise routet. Ermoeglicht Token-Swaps, Limit-Orders und DCA-Strategien.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/jupiter.svg')
    .setColors({ primary: '#00FFA3' })
    .setUrls({ web: 'https://jup.ag' })
    .build(),
  contracts: {},
  destinations: {
    PRICE_API: (_env: WarpChainEnv) => 'https://lite-api.jup.ag/price/v3',
    QUOTE_API: (_env: WarpChainEnv) => 'https://lite-api.jup.ag/swap/v1/quote',
  },
})
