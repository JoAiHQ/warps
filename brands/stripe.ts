import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const StripeBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Stripe')
    .setDescription({
      en: "Process <strong>payments</strong>, manage <strong>subscriptions</strong>, and handle <strong>invoices</strong> with Stripe's <strong>payment API</strong>. Accept <strong>credit cards</strong> and manage <strong>recurring billing</strong>.",
      de: 'Verarbeite <strong>Zahlungen</strong>, verwalte <strong>Abonnements</strong> und bearbeite <strong>Rechnungen</strong> mit Stripes <strong>Zahlungs-API</strong>. Akzeptiere <strong>Kreditkarten</strong> und verwalte <strong>wiederkehrende Abrechnungen</strong>.',
    })
    .setLogo('https://stripe.com/img/v3/home/social.png')
    .setColors({ primary: '#635BFF' })
    .setUrls({ web: 'https://stripe.com' })
    .build(),
  contracts: {},
  destinations: {
    API_URL: (env: WarpChainEnv) => 'https://api.stripe.com/v1',
  },
})
