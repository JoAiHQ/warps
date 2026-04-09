import { WarpBrand, WarpChainEnv, WarpText } from '@joai/warps'

export type SiteRoute = {
  path: string
  warp: string
  label: WarpText
  nav?: boolean
  hiddenFields?: string[]
}

export type Site = {
  enabled: boolean
  auth?: boolean
  indexPath: string
  routes: SiteRoute[]
}

export type WarpbaseBrand = {
  info: WarpBrand | null
  contracts: Record<string, (env: WarpChainEnv) => string>
  destinations: Record<string, (env: WarpChainEnv) => string>
  discover?: string[]
  site?: Site
}

export type AppDistributionProvider = 'claude' | 'codex' | 'cursor' | 'openai'

export type AppDistributionProviderStatus =
  | 'disabled'
  | 'planned'
  | 'ready'
  | 'runtime_ready'
  | 'submission_ready'

export type AppDistributionProviderAction = {
  type: 'copy' | 'link' | 'deeplink'
  label: string
  value: string
}

export type AppDistributionProviderConfig = {
  enabled?: boolean
  status?: AppDistributionProviderStatus
  warpIdentifier?: string
  title?: string
  description?: string
  sourceUrl?: string
  fallbackUrl?: string
  primaryAction?: AppDistributionProviderAction
  secondaryAction?: AppDistributionProviderAction | null
  notes?: string[]
}

export type AppMcpUiCsp = {
  connectDomains?: string[]
  resourceDomains?: string[]
  frameDomains?: string[]
  baseUriDomains?: string[]
}

export type AppMcpUiPermissions = {
  camera?: Record<string, never>
  microphone?: Record<string, never>
  geolocation?: Record<string, never>
  clipboardWrite?: Record<string, never>
}

export type AppMcpManifest = {
  prefersBorder?: boolean
  csp?: AppMcpUiCsp
  permissions?: AppMcpUiPermissions
  domain?: string
}

export type AppMcpFactoryContext = {
  env: WarpChainEnv
  brand: WarpbaseBrand | null
  brandName: string
}

export type AppMcpFactory =
  (context: AppMcpFactoryContext) =>
    AppMcpManifest | Promise<AppMcpManifest>

export type AppDistributionInstallCopy = {
  summary: string
  examplePrompts: string[]
  usageNotes?: string[]
  authPrerequisites?: string[]
}

export type AppDistributionLegal = {
  privacyUrl: string
  supportUrl?: string
  supportEmail?: string
  termsUrl?: string
}

export type AppDistributionReviewAssets = {
  screenshots: string[]
  reviewerNotes: string[]
  testPrompts: string[]
  demoFlow?: string
  credentialsReference?: string
}

export type AppDistributionManifest = {
  install: AppDistributionInstallCopy
  legal: AppDistributionLegal
  review: AppDistributionReviewAssets
  providers?: Partial<Record<AppDistributionProvider, AppDistributionProviderConfig>>
}

export type WarpExtrasFaq = {
  question: string
  answer: string
}

export type WarpExtras = {
  keywords?: Record<string, string[]>
  useCases?: Record<string, string[]>
  category?: string
  faq?: Record<string, WarpExtrasFaq[]>
}

export type AppDistributionFactoryContext = {
  env: WarpChainEnv
  brand: WarpbaseBrand | null
  brandName: string
  brandSlug: string
}

export type AppDistributionFactory =
  (context: AppDistributionFactoryContext) =>
    AppDistributionManifest | Promise<AppDistributionManifest>
