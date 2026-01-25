import { WarpClientConfig } from '@joai/warps'
import { AssetBrand } from './brands/asset'
import { BoogasBrand, BoogasPrivileges } from './brands/boogas'
import { ColombiaStakingBrand } from './brands/colombia-staking'
import { CursorBrand } from './brands/cursor'
import { DeepbookBrand } from './brands/deepbook'
import { FastsetBrand } from './brands/fastset'
import { GithubBrand } from './brands/github'
import { GoogleCalendarBrand } from './brands/google-calendar'
import { HatomBrand } from './brands/hatom'
import { HttpBrand } from './brands/http'
import { JitoBrand } from './brands/jito'
import { JoaiBrand } from './brands/joai'
import { LinearBrand } from './brands/linear'
import { MregldBrand } from './brands/mregld'
import { MultiversxBrand } from './brands/multiversx'
import { NearBrand } from './brands/near'
import { OmnisetBrand } from './brands/omniset'
import { OoxBrand } from './brands/oox'
import { PeermeBrand } from './brands/peerme'
import { PolymarketBrand } from './brands/polymarket'
import { ProjectxBrand } from './brands/projectx'
import { RedditBrand } from './brands/reddit'
import { ResendBrand } from './brands/resend'
import { ShopifyBrand } from './brands/shopify'
import { SolanaBrand } from './brands/solana'
import { StripeBrand } from './brands/stripe'
import { SuiBrand } from './brands/sui'
import { Trade3exBrand } from './brands/trade3ex'
import { TypefullyBrand } from './brands/typefully'
import { WarpsBrand } from './brands/warps'
import { XBrand } from './brands/x'
import { XallianceBrand, XalliancePrivileges } from './brands/xalliance'
import { XexchangeBrand } from './brands/xexchange'
import { XmoneyBrand } from './brands/xmoney'
import { XoxnoBrand } from './brands/xoxno'
import { WarpbaseBrand } from './brands/types'

export const Brands: Record<string, (config: WarpClientConfig) => Promise<WarpbaseBrand>> = {
  joai: JoaiBrand,
  multiversx: MultiversxBrand,
  near: NearBrand,
  solana: SolanaBrand,
  sui: SuiBrand,
  peerme: PeermeBrand,
  warps: WarpsBrand,
  xalliance: XallianceBrand,
  xexchange: XexchangeBrand,
  xmoney: XmoneyBrand,
  xoxno: XoxnoBrand,
  hatom: HatomBrand,
  omniset: OmnisetBrand,
  'colombia-staking': ColombiaStakingBrand,
  trade3ex: Trade3exBrand,
  typefully: TypefullyBrand,
  stripe: StripeBrand,
  oox: OoxBrand,
  reddit: RedditBrand,
  resend: ResendBrand,
  shopify: ShopifyBrand,
  boogas: BoogasBrand,
  projectx: ProjectxBrand,
  jito: JitoBrand,
  polymarket: PolymarketBrand,
  cursor: CursorBrand,
  github: GithubBrand,
  'google-calendar': GoogleCalendarBrand,
  http: HttpBrand,
  linear: LinearBrand,
  mregld: MregldBrand,
  asset: AssetBrand,
  fastset: FastsetBrand,
  deepbook: DeepbookBrand,
  x: XBrand,
}

export const Privileges = {
  ...XalliancePrivileges,
  ...BoogasPrivileges,
}
