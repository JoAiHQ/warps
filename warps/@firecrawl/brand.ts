import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Firecrawl')
    .setDescription({
      en: 'Scrape <strong>web pages</strong>, crawl <strong>entire websites</strong>, search the <strong>web</strong>, and map <strong>site structures</strong>. Extract <strong>clean markdown</strong>, HTML, and structured data from any URL with AI-powered <strong>web intelligence</strong>.',
      de: 'Scrape <strong>Webseiten</strong>, crawle <strong>ganze Websites</strong>, durchsuche das <strong>Web</strong> und mappe <strong>Site-Strukturen</strong>. Extrahiere <strong>sauberes Markdown</strong>, HTML und strukturierte Daten von jeder URL mit KI-gestützter <strong>Web-Intelligenz</strong>.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/firecrawl.svg')
    .setColors({ primary: '#FA5D19' })
    .setUrls({ web: 'https://firecrawl.dev' })
    .build(),
  contracts: {},
  destinations: {
    API_URL: (env: WarpChainEnv) => 'https://api.firecrawl.dev/v1',
  },
})
