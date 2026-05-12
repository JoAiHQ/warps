import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Work Order')
    .setDescription({
      en: 'Create work orders, service reports, and invoices for field work. Track technician hours, match materials to products, and generate PDF documentation.',
      de: 'Erstelle Arbeitsscheine, Serviceberichte und Rechnungen für Außeneinsätze. Erfasse Technikerstunden, ordne Material Produkten zu und generiere PDF-Dokumentation.',
      fr: "Créez des bons de travail, des rapports de service et des factures pour les interventions sur le terrain. Suivez les heures des techniciens, associez les matériaux aux produits et générez des PDF.",
      es: 'Cree órdenes de trabajo, informes de servicio y facturas para el trabajo de campo. Realice un seguimiento de las horas de los técnicos, asigne materiales a productos y genere documentación en PDF.',
      ro: 'Creați ordine de lucru, rapoarte de service și facturi pentru intervenții pe teren. Urmăriți orele tehnicienilor, asociați materialele cu produsele și generați documentație PDF.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
  site: {
    enabled: false,
    auth: false,
    indexPath: '/',
    routes: [],
  },
})
