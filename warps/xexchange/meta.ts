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
    faq: {
      en: [
        {
          question: 'What is the difference between USDT and USDC when swapping from WEGLD?',
          answer:
            'Both are USD-pegged stablecoins on MultiversX. USDT (Tether) and USDC (Circle) maintain a 1:1 dollar peg, but they differ in issuer and reserve backing. Choose based on which stablecoin you prefer to hold or need for further transfers.',
        },
      ],
      de: [
        {
          question: 'Was ist der Unterschied zwischen USDT und USDC beim Tausch von WEGLD?',
          answer:
            'Beide sind USD-gebundene Stablecoins auf MultiversX. USDT (Tether) und USDC (Circle) halten eine 1:1-Dollar-Bindung, unterscheiden sich aber in Herausgeber und Reservedeckung. Wähle je nachdem, welchen Stablecoin du bevorzugst oder für weitere Transfers benötigst.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Can I use Tether (USDT) to buy EGLD on xExchange?',
          answer:
            'Yes, you can swap USDT for WEGLD directly on xExchange. USDT on MultiversX is a bridged version of Tether, and the swap gives you WEGLD which can be unwrapped to native EGLD.',
        },
      ],
      de: [
        {
          question: 'Kann ich mit Tether (USDT) EGLD auf xExchange kaufen?',
          answer:
            'Ja, du kannst USDT direkt auf xExchange gegen WEGLD tauschen. USDT auf MultiversX ist eine gebridgte Version von Tether, und der Tausch liefert dir WEGLD, das du in natives EGLD unwrappen kannst.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Is WBTC on MultiversX the same as holding real Bitcoin?',
          answer:
            'WBTC (Wrapped Bitcoin) is a bridged token that represents Bitcoin on MultiversX. It tracks the BTC price 1:1 and lets you gain Bitcoin exposure while staying within the MultiversX DeFi ecosystem.',
        },
      ],
      de: [
        {
          question: 'Ist WBTC auf MultiversX dasselbe wie echtes Bitcoin?',
          answer:
            'WBTC (Wrapped Bitcoin) ist ein gebridgter Token, der Bitcoin auf MultiversX repräsentiert. Er bildet den BTC-Preis 1:1 ab und ermöglicht dir Bitcoin-Exposure, ohne das MultiversX-DeFi-Ökosystem verlassen zu müssen.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Why would I swap my Wrapped Bitcoin for WEGLD instead of holding BTC?',
          answer:
            'Swapping WBTC to WEGLD lets you stake EGLD for network rewards, participate in MultiversX DeFi protocols, and use native dApps -- opportunities not available while holding a bridged Bitcoin token.',
        },
      ],
      de: [
        {
          question: 'Warum sollte ich mein Wrapped Bitcoin gegen WEGLD tauschen, statt BTC zu halten?',
          answer:
            'Der Tausch von WBTC zu WEGLD ermöglicht dir, EGLD zu staken und Netzwerk-Belohnungen zu erhalten, an MultiversX-DeFi-Protokollen teilzunehmen und native dApps zu nutzen -- Möglichkeiten, die mit einem gebridgten Bitcoin-Token nicht verfügbar sind.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'What is WETH on MultiversX and how does it relate to Ethereum?',
          answer:
            'WETH (Wrapped Ether) is a bridged version of Ethereum\'s native ETH token available on MultiversX. It tracks the ETH price and lets you hold Ethereum exposure without leaving the MultiversX network.',
        },
      ],
      de: [
        {
          question: 'Was ist WETH auf MultiversX und wie hängt es mit Ethereum zusammen?',
          answer:
            'WETH (Wrapped Ether) ist eine gebridgte Version von Ethereums nativem ETH-Token auf MultiversX. Er bildet den ETH-Preis ab und ermöglicht dir Ethereum-Exposure, ohne das MultiversX-Netzwerk verlassen zu müssen.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Can I convert my bridged Ethereum to EGLD for staking?',
          answer:
            'Yes, you can swap WETH (Wrapped Ether) to WEGLD on xExchange and then unwrap it to native EGLD. This lets you move from a bridged Ethereum position directly into EGLD staking on MultiversX.',
        },
      ],
      de: [
        {
          question: 'Kann ich mein gebridgtes Ethereum in EGLD zum Staken umwandeln?',
          answer:
            'Ja, du kannst WETH (Wrapped Ether) auf xExchange gegen WEGLD tauschen und es dann in natives EGLD unwrappen. So wechselst du direkt von einer gebridgten Ethereum-Position ins EGLD-Staking auf MultiversX.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'How do I cash out my MEX governance token rewards to a stablecoin?',
          answer:
            'You can swap MEX directly to USDC on xExchange. This converts your xExchange governance token earnings into a dollar-pegged stablecoin, locking in the value of your rewards.',
        },
      ],
      de: [
        {
          question: 'Wie löse ich meine MEX-Governance-Token-Belohnungen in einen Stablecoin ein?',
          answer:
            'Du kannst MEX direkt auf xExchange gegen USDC tauschen. Damit wandelst du deine xExchange-Governance-Token-Erträge in einen dollargebundenen Stablecoin um und sicherst den Wert deiner Belohnungen.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'Why would I buy MEX with USDC instead of with EGLD?',
          answer:
            'Buying MEX with USDC lets you acquire the xExchange governance token from a stable-value position without selling your EGLD holdings. This is useful if you want to keep your EGLD staked while still participating in xExchange governance.',
        },
      ],
      de: [
        {
          question: 'Warum sollte ich MEX mit USDC statt mit EGLD kaufen?',
          answer:
            'Der Kauf von MEX mit USDC ermöglicht dir, den xExchange-Governance-Token aus einer wertstabilen Position heraus zu erwerben, ohne deine EGLD-Bestände zu verkaufen. Das ist praktisch, wenn du dein EGLD weiter staken und trotzdem an der xExchange-Governance teilnehmen möchtest.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'What is HTM and why would I swap it for WEGLD?',
          answer:
            'HTM is the governance token of Hatom, the leading lending and liquid staking protocol on MultiversX. Swapping HTM to WEGLD lets you convert your Hatom protocol position into the native MultiversX asset for staking or other DeFi uses.',
        },
      ],
      de: [
        {
          question: 'Was ist HTM und warum sollte ich es gegen WEGLD tauschen?',
          answer:
            'HTM ist der Governance-Token von Hatom, dem führenden Lending- und Liquid-Staking-Protokoll auf MultiversX. Der Tausch von HTM zu WEGLD ermöglicht dir, deine Hatom-Position in den nativen MultiversX-Vermögenswert umzuwandeln -- zum Staken oder für andere DeFi-Nutzungen.',
        },
      ],
    },
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
    faq: {
      en: [
        {
          question: 'What can I do with HTM tokens after swapping from WEGLD?',
          answer:
            'HTM gives you governance rights in the Hatom lending and liquid staking protocol on MultiversX. You can vote on protocol proposals, provide liquidity in HTM pairs, or hold it to benefit from the growth of the Hatom ecosystem.',
        },
      ],
      de: [
        {
          question: 'Was kann ich mit HTM-Token machen, nachdem ich von WEGLD getauscht habe?',
          answer:
            'HTM gibt dir Governance-Rechte im Hatom-Lending- und Liquid-Staking-Protokoll auf MultiversX. Du kannst über Protokoll-Vorschläge abstimmen, Liquidität in HTM-Paaren bereitstellen oder HTM halten, um vom Wachstum des Hatom-Ökosystems zu profitieren.',
        },
      ],
    },
  },
}
