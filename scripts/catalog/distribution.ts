import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

import type { SyncNetwork } from './sync-policy.js'
import type {
  AppDistributionFactory,
  AppDistributionFactoryContext,
  AppDistributionManifest,
  AppDistributionProvider,
  AppDistributionProviderConfig,
  AppDistributionProviderStatus,
  AppMcpFactory,
  AppMcpFactoryContext,
  AppMcpManifest,
  WarpbaseBrand,
  WarpExtras,
} from '../../warps/types.js'
import { createDefaultAppDistribution } from '../../warps/distribution.js'
import { createDefaultAppMcp } from '../../warps/mcp.js'

type Dict<T = unknown> = Record<string, T>

type BrandPayload = {
  hash: string
  slug: string
  active: boolean
  protocol: string
  name: string
  description: Dict<string>
  logo: string | Dict<string>
  urls?: Dict
  colors?: Dict
}

type WarpUpsert = {
  key: string
  identifier: string
  alias: string
  chain: string
  hash: string
  checksum: string
  name: string
  title: Dict<string>
  description: Dict<string>
  preview: string | null
  creator: string
  privileges: string[]
  listed: boolean
  primaryAddress: string | null
  primaryFunc: string | null
  brand: BrandPayload | null
  warp: Dict
  extras: WarpExtras | null
}

type CatalogManifest = {
  schemaVersion: number
  source: 'github'
  repo: string
  branch: string
  network: SyncNetwork
  commitSha: string
  generatedAt: string
  warps: WarpUpsert[]
}

export type DistributionCatalogAction = {
  alias: string
  identifier: string
  chain: string | null
  name: string
  title: Dict<string>
  description: Dict<string>
  actionTypes: string[]
}

export type ResolvedProviderDistribution = {
  provider: AppDistributionProvider
  enabled: boolean
  status: AppDistributionProviderStatus
  notes: string[]
}

export type ResolvedAppDistribution = {
  slug: string
  name: string
  description: Dict<string>
  logo: string | Dict<string>
  colors: Dict
  urls: Dict
  hash: string
  mcpUrl: string
  install: AppDistributionManifest['install']
  legal: AppDistributionManifest['legal']
  review: AppDistributionManifest['review']
  mcp: NormalizedMcpConfig
  providers: Record<AppDistributionProvider, ResolvedProviderDistribution>
  actions: DistributionCatalogAction[]
}

export type DistributionCatalogManifest = {
  schemaVersion: number
  source: 'github'
  repo: string
  branch: string
  network: SyncNetwork
  commitSha: string
  generatedAt: string
  apps: ResolvedAppDistribution[]
}

const PROVIDERS: AppDistributionProvider[] = ['claude', 'codex', 'cursor', 'openai']

function toMcpUrl(network: SyncNetwork, slug: string): string {
  if (network === 'devnet') return `https://devnet-cortex.joai.ai/mcp/apps/${slug}`
  return `https://cortex.joai.ai/mcp/apps/${slug}`
}

function getBrandDirectory(repoRoot: string, brandName: string): string {
  const noAtPath = path.join(repoRoot, 'warps', brandName)
  const withAtPath = path.join(repoRoot, 'warps', `@${brandName}`)
  return fs.existsSync(noAtPath) ? noAtPath : withAtPath
}

function normalizeStringList(values: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(values)) return [...fallback]
  return [
    ...new Set(
      values
        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
        .map((value) => value.trim()),
    ),
  ]
}

function normalizeProviderConfig(
  provider: AppDistributionProvider,
  config: AppDistributionProviderConfig | undefined,
  review: AppDistributionManifest['review'],
): ResolvedProviderDistribution {
  const enabled = config?.enabled !== false
  let status = config?.status

  if (!enabled) {
    status = 'disabled'
  } else if (!status) {
    status = provider === 'openai'
      ? (review.screenshots.length > 0 ? 'submission_ready' : 'runtime_ready')
      : 'ready'
  }

  return {
    provider,
    enabled,
    status,
    notes: normalizeStringList(config?.notes),
  }
}

type NormalizedMcpConfig = {
  prefersBorder: boolean
  csp: {
    connectDomains: string[]
    resourceDomains: string[]
    frameDomains: string[]
    baseUriDomains: string[]
  }
  permissions: NonNullable<AppMcpManifest['permissions']>
  domain: string | undefined
}

function normalizeMcpConfig(manifest: AppMcpManifest): NormalizedMcpConfig {
  const csp = manifest.csp ?? {}

  return {
    prefersBorder: manifest.prefersBorder !== false,
    csp: {
      connectDomains: normalizeStringList(csp.connectDomains),
      resourceDomains: normalizeStringList(csp.resourceDomains),
      frameDomains: normalizeStringList(csp.frameDomains),
      baseUriDomains: normalizeStringList(csp.baseUriDomains),
    },
    permissions: manifest.permissions ?? {},
    domain: manifest.domain,
  }
}

function normalizeManifest(manifest: AppDistributionManifest): AppDistributionManifest {
  return {
    install: {
      summary: manifest.install.summary.trim(),
      examplePrompts: normalizeStringList(manifest.install.examplePrompts),
      usageNotes: normalizeStringList(manifest.install.usageNotes),
      authPrerequisites: normalizeStringList(manifest.install.authPrerequisites),
    },
    legal: {
      privacyUrl: manifest.legal.privacyUrl.trim(),
      supportUrl: manifest.legal.supportUrl?.trim(),
      supportEmail: manifest.legal.supportEmail?.trim(),
      termsUrl: manifest.legal.termsUrl?.trim(),
    },
    review: {
      screenshots: normalizeStringList(manifest.review.screenshots),
      reviewerNotes: normalizeStringList(manifest.review.reviewerNotes),
      testPrompts: normalizeStringList(manifest.review.testPrompts),
      demoFlow: manifest.review.demoFlow?.trim(),
      credentialsReference: manifest.review.credentialsReference?.trim(),
    },
    providers: manifest.providers ?? {},
  }
}

async function loadDistributionFactory(
  repoRoot: string,
  brandName: string,
): Promise<AppDistributionFactory> {
  const brandDir = getBrandDirectory(repoRoot, brandName)
  const distributionPath = path.join(brandDir, 'distribution.ts')

  if (!fs.existsSync(distributionPath)) return createDefaultAppDistribution()

  const module = await import(pathToFileURL(distributionPath).href)
  const candidate = (module.distribution ?? module.default) as
    | AppDistributionFactory
    | AppDistributionManifest
    | undefined

  if (typeof candidate === 'function') return candidate
  if (candidate && typeof candidate === 'object') return () => candidate

  throw new Error(`Distribution manifest not found in ${distributionPath}`)
}

async function loadMcpFactory(
  repoRoot: string,
  brandName: string,
): Promise<AppMcpFactory> {
  const brandDir = getBrandDirectory(repoRoot, brandName)
  const mcpPath = path.join(brandDir, 'mcp.ts')

  if (!fs.existsSync(mcpPath)) return createDefaultAppMcp()

  const module = await import(pathToFileURL(mcpPath).href)
  const candidate = (module.mcp ?? module.default) as
    | AppMcpFactory
    | AppMcpManifest
    | undefined

  if (typeof candidate === 'function') return candidate
  if (candidate && typeof candidate === 'object') return () => candidate

  throw new Error(`MCP manifest not found in ${mcpPath}`)
}

type ResolvedBrandManifests = {
  distribution: AppDistributionManifest
  mcp: NormalizedMcpConfig
}

async function resolveBrandManifests(
  repoRoot: string,
  brandName: string,
  displayName: string,
  network: SyncNetwork,
  brand: WarpbaseBrand | null,
): Promise<ResolvedBrandManifests> {
  const context = { env: network, brand, brandName: displayName }

  const [distributionFactory, mcpFactory] = await Promise.all([
    loadDistributionFactory(repoRoot, brandName),
    loadMcpFactory(repoRoot, brandName),
  ])

  const [distribution, mcpManifest] = await Promise.all([
    distributionFactory(context as AppDistributionFactoryContext),
    mcpFactory(context as AppMcpFactoryContext),
  ])

  return {
    distribution: normalizeManifest(distribution),
    mcp: normalizeMcpConfig(mcpManifest),
  }
}

function toActionSummary(entry: WarpUpsert): DistributionCatalogAction {
  const actionTypes = Array.isArray(entry.warp.actions)
    ? entry.warp.actions
      .map((action) => (action && typeof action === 'object' && typeof (action as Dict).type === 'string' ? (action as Dict).type as string : null))
      .filter((value): value is string => Boolean(value))
    : []

  return {
    alias: entry.alias,
    identifier: entry.identifier,
    chain: entry.chain === 'none' ? null : entry.chain,
    name: entry.name,
    title: entry.title,
    description: entry.description,
    actionTypes,
  }
}

function getBrandNameFromWarp(entry: WarpUpsert): string | null {
  const [head] = entry.alias.split('-')
  return head || null
}

export async function buildDistributionCatalog(
  repoRoot: string,
  manifest: CatalogManifest,
  brandFactoryCache: Map<string, WarpbaseBrand | null>,
): Promise<DistributionCatalogManifest> {
  const appEntries = new Map<string, { brand: BrandPayload; brandName: string; warps: WarpUpsert[] }>()

  for (const entry of manifest.warps) {
    if (!entry.listed || !entry.brand || entry.brand.active === false) continue

    const current = appEntries.get(entry.brand.slug)
    if (current) {
      current.warps.push(entry)
      continue
    }

    const brandName = getBrandNameFromWarp(entry)
    if (!brandName) continue

    appEntries.set(entry.brand.slug, {
      brand: entry.brand,
      brandName,
      warps: [entry],
    })
  }

  const apps = await Promise.all(
    [...appEntries.values()].map(async ({ brand, brandName, warps }) => {
      const { distribution, mcp } = await resolveBrandManifests(
        repoRoot,
        brandName,
        brand.name,
        manifest.network,
        brandFactoryCache.get(brandName) ?? null,
      )

      const providers = Object.fromEntries(
        PROVIDERS.map((provider) => [
          provider,
          normalizeProviderConfig(provider, distribution.providers?.[provider], distribution.review),
        ]),
      ) as Record<AppDistributionProvider, ResolvedProviderDistribution>

      return {
        slug: brand.slug,
        name: brand.name,
        description: brand.description,
        logo: brand.logo,
        colors: brand.colors ?? {},
        urls: brand.urls ?? {},
        hash: brand.hash,
        mcpUrl: toMcpUrl(manifest.network, brand.slug),
        install: distribution.install,
        legal: distribution.legal,
        review: distribution.review,
        mcp,
        providers,
        actions: warps
          .slice()
          .sort((a, b) => a.alias.localeCompare(b.alias))
          .map((entry) => toActionSummary(entry)),
      } satisfies ResolvedAppDistribution
    }),
  )

  apps.sort((a, b) => a.slug.localeCompare(b.slug))

  return {
    schemaVersion: 1,
    source: manifest.source,
    repo: manifest.repo,
    branch: manifest.branch,
    network: manifest.network,
    commitSha: manifest.commitSha,
    generatedAt: manifest.generatedAt,
    apps,
  }
}

export function validateDistributionCatalog(catalog: DistributionCatalogManifest): string[] {
  const errors: string[] = []

  for (const app of catalog.apps) {
    if (!app.install.summary) errors.push(`${app.slug}: missing install.summary`)
    if (app.install.examplePrompts.length === 0) errors.push(`${app.slug}: missing install.examplePrompts`)
    if (!app.legal.privacyUrl) errors.push(`${app.slug}: missing legal.privacyUrl`)
    if (!app.legal.supportUrl && !app.legal.supportEmail) {
      errors.push(`${app.slug}: missing legal.supportUrl or legal.supportEmail`)
    }
    if (app.review.testPrompts.length === 0) errors.push(`${app.slug}: missing review.testPrompts`)
    if (!app.mcp.csp) errors.push(`${app.slug}: missing mcp.csp`)
    if (app.providers.openai.enabled && app.providers.openai.status === 'submission_ready' && app.review.screenshots.length === 0) {
      errors.push(`${app.slug}: openai marked submission_ready without screenshots`)
    }
  }

  return errors
}
