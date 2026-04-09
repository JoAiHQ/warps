import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('helloCash')
    .setDescription({
      en: 'Manage <strong>invoices</strong>, <strong>customers</strong>, and <strong>articles</strong> with helloCash — Austria\'s leading <strong>POS and invoicing system</strong> for small businesses.',
      de: 'Verwalte <strong>Rechnungen</strong>, <strong>Kunden</strong> und <strong>Artikel</strong> mit helloCash — Österreichs führendem <strong>Kassensystem</strong> für Kleinunternehmen.',
    })
    .setLogo('https://hellocash.at/wp-content/uploads/2021/05/hellocash-logo.svg')
    .setColors({ primary: '#E8533F' })
    .setUrls({ web: 'https://hellocash.at' })
    .build(),
  contracts: {},
  destinations: {
    API_URL: () => 'https://api.hellocash.business/api/v1',
  },
})
