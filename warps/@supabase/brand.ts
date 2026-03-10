import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Supabase')
    .setDescription({
      en: '<strong>Query</strong>, <strong>insert</strong>, <strong>update</strong>, and <strong>delete</strong> data from your Supabase <strong>PostgreSQL database</strong>. Call <strong>RPC functions</strong> and manage your <strong>backend data</strong> via the Supabase <strong>REST API</strong>.',
      de: '<strong>Abfragen</strong>, <strong>einfügen</strong>, <strong>aktualisieren</strong> und <strong>löschen</strong> von Daten aus Ihrer Supabase <strong>PostgreSQL-Datenbank</strong>. <strong>RPC-Funktionen</strong> aufrufen und <strong>Backend-Daten</strong> über die Supabase <strong>REST API</strong> verwalten.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/supabase.svg')
    .setColors({ primary: '#3FCF8E' })
    .setUrls({ web: 'https://supabase.com' })
    .build(),
  contracts: {},
  destinations: {},
})
