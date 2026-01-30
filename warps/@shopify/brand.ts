import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Shopify')
    .setDescription({
      en: "Manage your <strong>online store</strong>, <strong>products</strong>, <strong>orders</strong>, and <strong>customers</strong> with Shopify. Create and update products, process orders, and manage inventory using Shopify's <strong>GraphQL Admin API</strong>.",
      de: 'Verwalte deinen <strong>Online-Shop</strong>, <strong>Produkte</strong>, <strong>Bestellungen</strong> und <strong>Kunden</strong> mit Shopify. Erstelle und aktualisiere Produkte, verarbeite Bestellungen und verwalte Inventar mit Shopifys <strong>GraphQL Admin API</strong>.',
    })
    .setLogo(
      'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480480dd0334cf44b5a95.svg'
    )
    .setColors({ primary: '#96BF48' })
    .setUrls({ web: 'https://www.shopify.com' })
    .build(),
  contracts: {},
  destinations: {
    API_GRAPHQL: (env: WarpChainEnv) => 'https://{{SHOP}}.myshopify.com/admin/api/2024-10/graphql.json',
    API_REST: (env: WarpChainEnv) => 'https://{{SHOP}}.myshopify.com/admin/api/2024-10',
  },
})
