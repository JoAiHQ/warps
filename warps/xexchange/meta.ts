import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  // --- Key swap pairs with full keywords + FAQs ---

  'swap-egld-to-mex': {
    keywords: {
      en: ['swap EGLD to MEX', 'WEGLD MEX exchange', 'buy MEX token', 'xExchange swap', 'MultiversX DEX', 'MEX token', 'EGLD to MEX'],
      de: ['EGLD in MEX tauschen', 'WEGLD MEX Börse', 'MEX Token kaufen', 'xExchange Tausch', 'MultiversX DEX', 'MEX Token', 'EGLD zu MEX'],
    },
    useCases: {
      en: [
        'Acquire MEX governance tokens to vote on xExchange proposals',
        'Buy MEX to provide liquidity and earn trading fees',
        'Convert EGLD holdings to MEX for yield farming on xExchange',
      ],
      de: [
        'MEX-Governance-Token erwerben, um über xExchange-Vorschläge abzustimmen',
        'MEX kaufen, um Liquidität bereitzustellen und Handelsgebühren zu verdienen',
        'EGLD-Bestände in MEX umwandeln für Yield Farming auf xExchange',
      ],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'How do I swap EGLD to MEX on xExchange?',
          answer:
            'You can swap EGLD to MEX directly through this action. Your EGLD is automatically wrapped to WEGLD and swapped for MEX on xExchange, the main decentralized exchange on MultiversX.',
        },
        {
          question: 'What is MEX and why would I swap EGLD for it?',
          answer:
            'MEX is the governance and utility token of xExchange (formerly Maiar Exchange). Holding MEX allows you to participate in governance, provide liquidity, and earn rewards on the xExchange DEX.',
        },
      ],
      de: [
        {
          question: 'Wie tausche ich EGLD in MEX auf xExchange?',
          answer:
            'Du kannst EGLD direkt über diese Aktion in MEX tauschen. Dein EGLD wird automatisch in WEGLD gewrappt und auf xExchange, der wichtigsten dezentralen Börse auf MultiversX, gegen MEX getauscht.',
        },
        {
          question: 'Was ist MEX und warum sollte ich EGLD dafür tauschen?',
          answer:
            'MEX ist der Governance- und Utility-Token von xExchange (ehemals Maiar Exchange). Mit MEX kannst du an der Governance teilnehmen, Liquidität bereitstellen und Belohnungen auf der xExchange DEX verdienen.',
        },
      ],
    },
  },

  'swap-usdc-to-wegld': {
    keywords: {
      en: ['swap USDC to WEGLD', 'buy EGLD with USDC', 'USDC WEGLD exchange', 'xExchange swap', 'MultiversX DEX', 'stablecoin to EGLD'],
      de: ['USDC in WEGLD tauschen', 'EGLD mit USDC kaufen', 'USDC WEGLD Börse', 'xExchange Tausch', 'MultiversX DEX', 'Stablecoin zu EGLD'],
    },
    useCases: {
      en: [
        'Convert stablecoins to EGLD for staking and earning rewards',
        'Enter the MultiversX ecosystem from USDC holdings',
        'Buy WEGLD at market price to participate in DeFi protocols',
      ],
      de: [
        'Stablecoins in EGLD umwandeln für Staking und Belohnungen',
        'Mit USDC-Beständen in das MultiversX-Ökosystem einsteigen',
        'WEGLD zum Marktpreis kaufen, um an DeFi-Protokollen teilzunehmen',
      ],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'Can I buy EGLD with USDC on xExchange?',
          answer:
            'Yes. This action swaps your USDC for WEGLD (Wrapped EGLD) on xExchange. You can then unwrap WEGLD to native EGLD if needed.',
        },
        {
          question: 'What slippage should I expect when swapping USDC to WEGLD?',
          answer:
            'Slippage depends on the liquidity available in the USDC/WEGLD pool and your trade size. For most trades the default slippage tolerance works well, but for larger amounts you may want to adjust it to avoid price impact.',
        },
      ],
      de: [
        {
          question: 'Kann ich EGLD mit USDC auf xExchange kaufen?',
          answer:
            'Ja. Diese Aktion tauscht dein USDC auf xExchange gegen WEGLD (Wrapped EGLD). Du kannst WEGLD anschließend bei Bedarf in natives EGLD unwrappen.',
        },
        {
          question: 'Mit welcher Slippage muss ich beim Tausch von USDC zu WEGLD rechnen?',
          answer:
            'Die Slippage hängt von der verfügbaren Liquidität im USDC/WEGLD-Pool und deiner Handelsgröße ab. Für die meisten Trades funktioniert die Standard-Slippage-Toleranz gut, bei größeren Beträgen solltest du sie jedoch anpassen, um Preisauswirkungen zu vermeiden.',
        },
      ],
    },
  },

  'swap-wegld-to-usdc': {
    keywords: {
      en: ['swap WEGLD to USDC', 'sell EGLD for USDC', 'WEGLD USDC exchange', 'xExchange swap', 'MultiversX DEX', 'EGLD to stablecoin'],
      de: ['WEGLD in USDC tauschen', 'EGLD für USDC verkaufen', 'WEGLD USDC Börse', 'xExchange Tausch', 'MultiversX DEX', 'EGLD zu Stablecoin'],
    },
    useCases: {
      en: [
        'Lock in profits by converting EGLD to a stable USD-pegged asset',
        'Reduce portfolio volatility by moving to USDC',
        'Prepare funds for bridging out of the MultiversX ecosystem',
      ],
      de: [
        'Gewinne sichern durch Umwandlung von EGLD in einen stabilen USD-gebundenen Vermögenswert',
        'Portfolio-Volatilität reduzieren durch Wechsel zu USDC',
        'Mittel für das Bridging aus dem MultiversX-Ökosystem vorbereiten',
      ],
    },
    category: 'defi',
    faq: {
      en: [
        {
          question: 'How do I convert EGLD to USDC?',
          answer:
            'Swap WEGLD for USDC on xExchange. If you hold native EGLD, wrap it to WEGLD first, then swap it for USDC in a single action.',
        },
        {
          question: 'Is USDC on MultiversX the same as USDC on Ethereum?',
          answer:
            'USDC on MultiversX is a bridged version of the same USD-pegged stablecoin. It maintains its peg and can be bridged back to other chains through the MultiversX bridge.',
        },
      ],
      de: [
        {
          question: 'Wie wandle ich EGLD in USDC um?',
          answer:
            'Tausche WEGLD auf xExchange gegen USDC. Wenn du natives EGLD besitzt, wrappe es zuerst zu WEGLD und tausche es dann in einer einzigen Aktion gegen USDC.',
        },
        {
          question: 'Ist USDC auf MultiversX dasselbe wie USDC auf Ethereum?',
          answer:
            'USDC auf MultiversX ist eine gebridgte Version desselben USD-gebundenen Stablecoins. Es behält seine Bindung bei und kann über die MultiversX-Bridge zurück zu anderen Chains gebridgt werden.',
        },
      ],
    },
  },

  // --- Popular pairs with keywords only ---

  'swap-wegld-to-usdt': {
    keywords: {
      en: ['swap WEGLD to USDT', 'sell EGLD for USDT', 'xExchange swap', 'MultiversX DEX', 'EGLD to stablecoin', 'USDT'],
      de: ['WEGLD in USDT tauschen', 'EGLD für USDT verkaufen', 'xExchange Tausch', 'MultiversX DEX', 'EGLD zu Stablecoin', 'USDT'],
    },
    useCases: {
      en: [
        'Hedge EGLD positions by swapping to USDT stablecoin',
        'Convert WEGLD to USDT for cross-chain transfers',
        'Secure trading profits in a dollar-pegged stablecoin on MultiversX',
      ],
      de: [
        'EGLD-Positionen absichern durch Tausch in den USDT-Stablecoin',
        'WEGLD in USDT umwandeln für Cross-Chain-Transfers',
        'Handelsgewinne in einem dollargebundenen Stablecoin auf MultiversX sichern',
      ],
    },
    category: 'defi',
  },

  'swap-usdt-to-wegld': {
    keywords: {
      en: ['swap USDT to WEGLD', 'buy EGLD with USDT', 'xExchange swap', 'MultiversX DEX', 'stablecoin to EGLD', 'USDT'],
      de: ['USDT in WEGLD tauschen', 'EGLD mit USDT kaufen', 'xExchange Tausch', 'MultiversX DEX', 'Stablecoin zu EGLD', 'USDT'],
    },
    useCases: {
      en: [
        'Buy EGLD with USDT to start staking on MultiversX',
        'Enter MultiversX DeFi protocols using Tether stablecoins',
        'Convert idle USDT into WEGLD for yield opportunities on xExchange',
      ],
      de: [
        'EGLD mit USDT kaufen, um mit Staking auf MultiversX zu beginnen',
        'In MultiversX-DeFi-Protokolle einsteigen mit Tether-Stablecoins',
        'Ungenutztes USDT in WEGLD umwandeln für Ertragsmöglichkeiten auf xExchange',
      ],
    },
    category: 'defi',
  },

  'swap-wegld-to-wbtc': {
    keywords: {
      en: ['swap WEGLD to WBTC', 'EGLD to Bitcoin', 'xExchange swap', 'MultiversX DEX', 'WBTC', 'Wrapped Bitcoin'],
      de: ['WEGLD in WBTC tauschen', 'EGLD zu Bitcoin', 'xExchange Tausch', 'MultiversX DEX', 'WBTC', 'Wrapped Bitcoin'],
    },
    useCases: {
      en: [
        'Diversify EGLD holdings into Bitcoin on MultiversX',
        'Gain BTC exposure without leaving the MultiversX ecosystem',
        'Trade WEGLD for Wrapped Bitcoin to hedge against altcoin volatility',
      ],
      de: [
        'EGLD-Bestände in Bitcoin auf MultiversX diversifizieren',
        'BTC-Exposure erhalten, ohne das MultiversX-Ökosystem zu verlassen',
        'WEGLD gegen Wrapped Bitcoin tauschen, um sich gegen Altcoin-Volatilität abzusichern',
      ],
    },
    category: 'defi',
  },

  'swap-wbtc-to-wegld': {
    keywords: {
      en: ['swap WBTC to WEGLD', 'Bitcoin to EGLD', 'xExchange swap', 'MultiversX DEX', 'WBTC', 'Wrapped Bitcoin'],
      de: ['WBTC in WEGLD tauschen', 'Bitcoin zu EGLD', 'xExchange Tausch', 'MultiversX DEX', 'WBTC', 'Wrapped Bitcoin'],
    },
    useCases: {
      en: [
        'Convert Bitcoin holdings to EGLD for MultiversX staking rewards',
        'Move BTC value into WEGLD to participate in xExchange liquidity pools',
        'Swap Wrapped Bitcoin for EGLD to use MultiversX dApps and services',
      ],
      de: [
        'Bitcoin-Bestände in EGLD umwandeln für MultiversX-Staking-Belohnungen',
        'BTC-Wert in WEGLD transferieren, um an xExchange-Liquiditätspools teilzunehmen',
        'Wrapped Bitcoin gegen EGLD tauschen, um MultiversX-dApps und -Dienste zu nutzen',
      ],
    },
    category: 'defi',
  },

  'swap-wegld-to-weth': {
    keywords: {
      en: ['swap WEGLD to WETH', 'EGLD to Ethereum', 'xExchange swap', 'MultiversX DEX', 'WETH', 'Wrapped Ether'],
      de: ['WEGLD in WETH tauschen', 'EGLD zu Ethereum', 'xExchange Tausch', 'MultiversX DEX', 'WETH', 'Wrapped Ether'],
    },
    useCases: {
      en: [
        'Diversify EGLD holdings into Ethereum on MultiversX',
        'Gain ETH exposure without bridging to the Ethereum network',
        'Trade WEGLD for Wrapped Ether to balance portfolio across major assets',
      ],
      de: [
        'EGLD-Bestände in Ethereum auf MultiversX diversifizieren',
        'ETH-Exposure erhalten, ohne zum Ethereum-Netzwerk zu bridgen',
        'WEGLD gegen Wrapped Ether tauschen, um das Portfolio über große Assets auszubalancieren',
      ],
    },
    category: 'defi',
  },

  'swap-weth-to-wegld': {
    keywords: {
      en: ['swap WETH to WEGLD', 'Ethereum to EGLD', 'xExchange swap', 'MultiversX DEX', 'WETH', 'Wrapped Ether'],
      de: ['WETH in WEGLD tauschen', 'Ethereum zu EGLD', 'xExchange Tausch', 'MultiversX DEX', 'WETH', 'Wrapped Ether'],
    },
    useCases: {
      en: [
        'Convert Ethereum holdings to EGLD for MultiversX staking',
        'Move ETH value into WEGLD to join xExchange liquidity pools',
        'Swap Wrapped Ether for EGLD to explore MultiversX dApps',
      ],
      de: [
        'Ethereum-Bestände in EGLD umwandeln für MultiversX-Staking',
        'ETH-Wert in WEGLD transferieren, um xExchange-Liquiditätspools beizutreten',
        'Wrapped Ether gegen EGLD tauschen, um MultiversX-dApps zu erkunden',
      ],
    },
    category: 'defi',
  },

  'swap-mex-to-usdc': {
    keywords: {
      en: ['swap MEX to USDC', 'sell MEX', 'MEX stablecoin', 'xExchange swap', 'MultiversX DEX', 'MEX token'],
      de: ['MEX in USDC tauschen', 'MEX verkaufen', 'MEX Stablecoin', 'xExchange Tausch', 'MultiversX DEX', 'MEX Token'],
    },
    useCases: {
      en: [
        'Realize MEX farming rewards by converting to USDC',
        'Take profits from MEX governance token holdings',
        'Move from volatile MEX positions into stable USDC on MultiversX',
      ],
      de: [
        'MEX-Farming-Belohnungen durch Umwandlung in USDC realisieren',
        'Gewinne aus MEX-Governance-Token-Beständen mitnehmen',
        'Von volatilen MEX-Positionen in stabiles USDC auf MultiversX wechseln',
      ],
    },
    category: 'defi',
  },

  'swap-usdc-to-mex': {
    keywords: {
      en: ['swap USDC to MEX', 'buy MEX with USDC', 'xExchange swap', 'MultiversX DEX', 'MEX token'],
      de: ['USDC in MEX tauschen', 'MEX mit USDC kaufen', 'xExchange Tausch', 'MultiversX DEX', 'MEX Token'],
    },
    useCases: {
      en: [
        'Buy MEX governance tokens with stablecoins to vote on xExchange proposals',
        'Acquire MEX with USDC for liquidity farming on xExchange',
        'Trade stablecoins for MEX to earn xExchange ecosystem rewards',
      ],
      de: [
        'MEX-Governance-Token mit Stablecoins kaufen, um über xExchange-Vorschläge abzustimmen',
        'MEX mit USDC erwerben für Liquidity Farming auf xExchange',
        'Stablecoins gegen MEX tauschen, um xExchange-Ökosystem-Belohnungen zu verdienen',
      ],
    },
    category: 'defi',
  },

  'swap-htm-to-wegld': {
    keywords: {
      en: ['swap HTM to WEGLD', 'Hatom to EGLD', 'xExchange swap', 'MultiversX DEX', 'HTM token', 'Hatom'],
      de: ['HTM in WEGLD tauschen', 'Hatom zu EGLD', 'xExchange Tausch', 'MultiversX DEX', 'HTM Token', 'Hatom'],
    },
    useCases: {
      en: [
        'Convert Hatom tokens to EGLD for staking on MultiversX',
        'Realize HTM token gains by swapping to WEGLD',
        'Move from Hatom lending positions into the native MultiversX asset',
      ],
      de: [
        'Hatom-Token in EGLD umwandeln für Staking auf MultiversX',
        'HTM-Token-Gewinne durch Tausch in WEGLD realisieren',
        'Von Hatom-Lending-Positionen in den nativen MultiversX-Vermögenswert wechseln',
      ],
    },
    category: 'defi',
  },

  'swap-wegld-to-htm': {
    keywords: {
      en: ['swap WEGLD to HTM', 'buy Hatom', 'EGLD to HTM', 'xExchange swap', 'MultiversX DEX', 'HTM token', 'Hatom'],
      de: ['WEGLD in HTM tauschen', 'Hatom kaufen', 'EGLD zu HTM', 'xExchange Tausch', 'MultiversX DEX', 'HTM Token', 'Hatom'],
    },
    useCases: {
      en: [
        'Buy Hatom tokens to participate in lending protocol governance',
        'Acquire HTM with EGLD to access Hatom liquid staking features',
        'Swap WEGLD for HTM to diversify into MultiversX DeFi lending',
      ],
      de: [
        'Hatom-Token kaufen, um an der Lending-Protokoll-Governance teilzunehmen',
        'HTM mit EGLD erwerben, um Hatom-Liquid-Staking-Funktionen zu nutzen',
        'WEGLD gegen HTM tauschen, um in MultiversX-DeFi-Lending zu diversifizieren',
      ],
    },
    category: 'defi',
  },
}
