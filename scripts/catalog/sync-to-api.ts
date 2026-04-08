import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  getNetworkForBranch,
  getSyncUrlForNetwork,
  SOURCE_REPO,
} from './sync-policy.js'

type CliArgs = {
  branch: string
  commitSha: string
  repo: string
}

type CatalogDelta = {
  schemaVersion: number
  source: 'github'
  repo: string
  branch: string
  network: 'devnet' | 'mainnet'
  commitSha: string
  committedAt: string
  generatedAt: string
  upserts: unknown[]
  deletes: unknown[]
}

type DistributionCatalog = {
  apps?: Array<{
    slug: string
    visibility: 'public' | 'private'
    install: unknown
    legal: unknown
    review: unknown
    mcp: unknown
    providers: unknown
  }>
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '../../')

function parseArgs(): CliArgs {
  const args = process.argv.slice(2)
  const read = (name: string): string | undefined => {
    const index = args.findIndex((arg) => arg === `--${name}`)
    if (index === -1) return undefined
    return args[index + 1]
  }

  const branch =
    read('branch') || process.env.GITHUB_REF_NAME || process.env.BRANCH || ''
  const commitSha =
    read('commit') ||
    process.env.GITHUB_SHA ||
    process.env.COMMIT_SHA ||
    'local'
  const repo = read('repo') || process.env.GITHUB_REPOSITORY || SOURCE_REPO

  if (!branch) {
    throw new Error('Missing branch. Pass --branch or set GITHUB_REF_NAME.')
  }

  return { branch, commitSha, repo }
}

function readDelta(network: 'devnet' | 'mainnet'): CatalogDelta {
  const filePath = path.join(REPO_ROOT, 'catalog', network, 'delta.json')

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing delta file: ${filePath}`)
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as CatalogDelta
}

function readDistribution(network: 'devnet' | 'mainnet'): DistributionCatalog {
  const filePath = path.join(REPO_ROOT, 'catalog', network, 'distribution.json')

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing distribution file: ${filePath}`)
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as DistributionCatalog
}

async function main() {
  const token = process.env.WARP_GITHUB_SYNC_TOKEN
  if (!token) {
    throw new Error('Missing WARP_GITHUB_SYNC_TOKEN')
  }

  const args = parseArgs()
  const network = getNetworkForBranch(args.branch)

  if (!network) {
    console.log(`Branch '${args.branch}' is not mapped for sync. Skipping API sync.`)
    return
  }

  const delta = readDelta(network)
  const distribution = readDistribution(network)
  const distributionBySlug = new Map(
    (distribution.apps ?? []).map((app) => [
      app.slug,
      {
        visibility: app.visibility,
        install: app.install,
        legal: app.legal,
        review: app.review,
        mcp: app.mcp,
        providers: app.providers,
      },
    ]),
  )

  if ((delta.upserts?.length ?? 0) === 0 && (delta.deletes?.length ?? 0) === 0) {
    console.log(`No delta changes for ${network}. Skipping API sync.`)
    return
  }

  const body = {
    ...delta,
    upserts: (delta.upserts as any[])
      .filter((u) => u.listed !== false)
      .map(({ visibility: _visibility, ...upsert }) => {
        const brandSlug = upsert?.brand?.slug
        const appDistribution = typeof brandSlug === 'string' ? distributionBySlug.get(brandSlug) : undefined

        if (!appDistribution || !upsert?.brand || typeof upsert.brand !== 'object') return upsert

        return {
          ...upsert,
          brand: {
            ...upsert.brand,
            distribution: appDistribution,
          },
        }
      }),
    repo: args.repo,
    commitSha: args.commitSha,
  }
  const bodyJson = JSON.stringify(body)
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const signature = crypto
    .createHmac('sha256', token)
    .update(`${timestamp}.${bodyJson}`)
    .digest('hex')

  const url = getSyncUrlForNetwork(network)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Warp-Sync-Timestamp': timestamp,
      'X-Warp-Sync-Signature': signature,
    },
    body: bodyJson,
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Sync request failed (${response.status}): ${errorBody}`)
  }

  const payload = await response.json().catch(() => null)
  console.log(`Synced ${network} successfully.`, payload ?? '')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
