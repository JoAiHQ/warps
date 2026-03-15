import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

import {
  createWarpIdentifier,
  getWarpInfoFromIdentifier,
  type WarpChainName,
  type WarpClientConfig,
} from '@joai/warps'

import {
  GLOBAL_PLACEHOLDERS,
  getNetworkForBranch,
  SOURCE_REPO,
  type SyncNetwork,
} from './sync-policy.js'

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
}

type WarpDelete = {
  key: string
  alias: string
  chain: string
  hash: string
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

type CatalogDelta = {
  schemaVersion: number
  source: 'github'
  repo: string
  branch: string
  network: SyncNetwork
  commitSha: string
  committedAt: string
  generatedAt: string
  upserts: WarpUpsert[]
  deletes: WarpDelete[]
}

const PLACEHOLDER_PREFIX = 'INJECT:'
const NON_INSCRIBED_FIELDS = new Set(['meta'])
const VALID_WARP_FIELDS = new Set([
  'protocol', 'chain', 'name', 'title', 'description', 'bot', 'preview',
  'vars', 'actions', 'next', 'output', 'messages', 'ui', 'alerts',
  'related', 'schedule', 'trigger', 'meta',
])
const CREATOR = 'github:JoAiHQ/warps'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '../../')
const WARPS_DIR = path.join(REPO_ROOT, 'warps')
const CATALOG_DIR = path.join(REPO_ROOT, 'catalog')

type CliArgs = {
  branch: string
  commitSha: string
  repo: string
  committedAt: string
  full: boolean
}

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
  const repo =
    read('repo') || process.env.GITHUB_REPOSITORY || SOURCE_REPO
  const committedAt =
    read('committed-at') ||
    process.env.GITHUB_EVENT_HEAD_COMMIT_TIMESTAMP ||
    new Date().toISOString()
  const full = args.includes('--full')

  if (!branch) {
    throw new Error('Missing branch. Pass --branch or set GITHUB_REF_NAME.')
  }

  return {
    branch,
    commitSha,
    repo,
    committedAt,
    full,
  }
}

function normalizeTranslationField(value: unknown): Dict<string> {
  if (typeof value === 'string') {
    return { en: value }
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const normalized: Dict<string> = {}
    for (const [key, entry] of Object.entries(value as Dict)) {
      if (typeof entry === 'string') normalized[key] = entry
    }

    if (Object.keys(normalized).length > 0) {
      return normalized
    }
  }

  return { en: '' }
}

function normalizeLogo(value: unknown): Dict<string> | null {
  if (value == null) return null
  if (typeof value === 'string') return { default: value }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const out: Dict<string> = {}
    for (const [key, entry] of Object.entries(value as Dict)) {
      if (typeof entry === 'string') out[key] = entry
    }

    return Object.keys(out).length > 0 ? out : null
  }

  return null
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function deterministicStringify(value: unknown): string {
  if (value === null || value === undefined) return JSON.stringify(value)

  if (Array.isArray(value)) {
    return `[${value.map((item) => deterministicStringify(item)).join(',')}]`
  }

  if (typeof value === 'object') {
    const entries = Object.keys(value as Dict)
      .sort()
      .map((key) => {
        const entry = (value as Dict)[key]
        return `${JSON.stringify(key)}:${deterministicStringify(entry)}`
      })

    return `{${entries.join(',')}}`
  }

  return JSON.stringify(value)
}

function hashDeterministic(value: unknown): string {
  return crypto
    .createHash('sha256')
    .update(deterministicStringify(value))
    .digest('hex')
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function replaceGlobalPlaceholders(input: unknown): unknown {
  if (input == null) return input

  if (typeof input === 'string') {
    let result = input

    for (const [placeholder, replacement] of Object.entries(GLOBAL_PLACEHOLDERS)) {
      const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g')
      result = result.replace(regex, replacement)
    }

    return result
  }

  if (Array.isArray(input)) {
    return input.map((item) => replaceGlobalPlaceholders(item))
  }

  if (typeof input === 'object') {
    const out: Dict = {}
    for (const [key, value] of Object.entries(input as Dict)) {
      out[key] = replaceGlobalPlaceholders(value)
    }

    return out
  }

  return input
}

function resolveInjectPlaceholder(
  placeholder: string,
  env: SyncNetwork,
  brandFactoryOutput: any,
): string {
  const contract = brandFactoryOutput?.contracts?.[placeholder]
  if (typeof contract === 'function') {
    return contract(env)
  }

  const destination = brandFactoryOutput?.destinations?.[placeholder]
  if (typeof destination === 'function') {
    return destination(env)
  }

  throw new Error(`Unknown placeholder INJECT:${placeholder}`)
}

function resolveInjectToken(
  token: string,
  env: SyncNetwork,
  brandFactoryOutput: any,
): string {
  try {
    return resolveInjectPlaceholder(token, env, brandFactoryOutput)
  } catch {
    const slashIndex = token.indexOf('/')
    if (slashIndex === -1) {
      throw new Error(`Unknown placeholder INJECT:${token}`)
    }

    const head = token.slice(0, slashIndex)
    const tail = token.slice(slashIndex)
    const resolved = resolveInjectPlaceholder(head, env, brandFactoryOutput)
    return `${resolved}${tail}`
  }
}

function replaceInjectPlaceholders(
  input: unknown,
  env: SyncNetwork,
  brandFactoryOutput: any,
): unknown {
  if (input == null) return input

  if (typeof input === 'string') {
    return input.replace(/INJECT:([A-Za-z0-9_/]+)/g, (_full, placeholder) => {
      return resolveInjectToken(placeholder, env, brandFactoryOutput)
    })
  }

  if (Array.isArray(input)) {
    return input.map((entry) =>
      replaceInjectPlaceholders(entry, env, brandFactoryOutput),
    )
  }

  if (typeof input === 'object') {
    const out: Dict = {}
    for (const [key, value] of Object.entries(input as Dict)) {
      out[key] = replaceInjectPlaceholders(value, env, brandFactoryOutput)
    }

    return out
  }

  return input
}

function resolveAbiPath(rawValue: string, warpDir: string): string {
  const abiPath = rawValue.replace(PLACEHOLDER_PREFIX, '')

  if (abiPath.startsWith('warps/')) {
    return path.join(REPO_ROOT, abiPath)
  }

  return path.join(warpDir, abiPath)
}

function replaceAbiPlaceholders(warp: Dict, warpDir: string): Dict {
  const cloned = deepClone(warp)

  if (!Array.isArray(cloned.actions)) {
    return cloned
  }

  cloned.actions = cloned.actions.map((action: Dict) => {
    if (typeof action?.abi === 'string' && action.abi.startsWith(PLACEHOLDER_PREFIX)) {
      const abiFile = resolveAbiPath(action.abi, warpDir)

      if (!fs.existsSync(abiFile)) {
        throw new Error(`ABI file not found: ${abiFile}`)
      }

      const abiRaw = fs.readFileSync(abiFile, 'utf8')
      const abiJson = JSON.parse(abiRaw)
      const abiHash = hashDeterministic(abiJson)

      return {
        ...action,
        abi: `hash:${abiHash}`,
      }
    }

    return action
  })

  return cloned
}

function ensureNoInjectPlaceholders(input: unknown): void {
  if (input == null) return

  if (typeof input === 'string') {
    if (input.includes(PLACEHOLDER_PREFIX)) {
      throw new Error(`Unresolved placeholder found: ${input}`)
    }

    return
  }

  if (Array.isArray(input)) {
    for (const entry of input) ensureNoInjectPlaceholders(entry)
    return
  }

  if (typeof input === 'object') {
    for (const value of Object.values(input as Dict)) {
      ensureNoInjectPlaceholders(value)
    }
  }
}

function stripNonWarpFields(raw: Dict): Dict {
  const stripped: Dict = {}
  for (const key of Object.keys(raw)) {
    if (VALID_WARP_FIELDS.has(key)) {
      stripped[key] = raw[key]
    }
  }
  return stripped
}

function normalizeWarpForChecksum(raw: Dict): Dict {
  const normalized = deepClone(raw)

  for (const field of NON_INSCRIBED_FIELDS) {
    delete normalized[field]
  }

  return normalized
}

function getPathParts(fileName: string): string[] {
  return path.normalize(fileName).split(path.sep).filter(Boolean)
}

export function isDraftFile(fileName: string): boolean {
  const parts = getPathParts(fileName)
  const filename = parts[parts.length - 1] || ''
  return filename.startsWith('@')
}

export function isPrivateFile(fileName: string): boolean {
  const parts = getPathParts(fileName)
  const filename = parts[parts.length - 1] || ''
  return filename.startsWith('#')
}

function getBrandNameFromFileName(fileName: string): string | null {
  const parts = getPathParts(fileName)
  const segment = parts[0]
  if (!segment) return null
  return segment.replace(/^@/, '')
}

function isBrandInactive(fileName: string): boolean {
  const parts = getPathParts(fileName)
  const segment = parts[0]
  if (!segment) return false
  return segment.startsWith('@')
}

function getChainNameFromWarpData(warpData: Dict): string {
  const chain =
    (warpData.chain as string | undefined) ||
    ((warpData.meta as Dict | undefined)?.chain as string | undefined)

  if (typeof chain === 'string' && chain.trim()) {
    return chain.trim().toLowerCase()
  }

  return 'none'
}

export function getAliasFromFileName(fileName: string): string {
  const parts = getPathParts(fileName)
  if (parts.length < 2) {
    throw new Error(`Warp file must be in a brand folder: ${fileName}`)
  }

  const brandName = parts[0].replace(/^@/, '')
  const dirParts = parts.slice(1, -1)
  let filenameBase = parts[parts.length - 1].replace(/\.json$/, '')
  if (filenameBase.startsWith('@') || filenameBase.startsWith('#')) filenameBase = filenameBase.slice(1)

  if (filenameBase === 'warp' && dirParts.length > 0) {
    filenameBase = dirParts.pop() as string
  } else if (filenameBase === 'warp') {
    filenameBase = brandName
  }

  filenameBase = filenameBase.replace(/-warp$/, '')

  const pathParts = [...dirParts, filenameBase]
  const pathJoined = pathParts.join('-')

  if (pathJoined === brandName) return brandName
  if (pathJoined.startsWith(`${brandName}-`)) return pathJoined
  return `${brandName}-${pathJoined}`
}

function getPrimaryInfo(warp: Dict): { address: string | null; func: string | null } {
  const actions = Array.isArray(warp.actions) ? warp.actions : []
  const primary = actions[0] as Dict | undefined

  if (!primary) {
    return { address: null, func: null }
  }

  if (typeof primary.address === 'string') {
    return {
      address: primary.address,
      func: typeof primary.func === 'string' ? primary.func : null,
    }
  }

  return {
    address: null,
    func: null,
  }
}

function listWarpFiles(): Record<string, string> {
  const result: Record<string, string> = {}

  const walk = (dir: string, relDir = '') => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      if (file === 'abis' || file === 'dist' || file === 'node_modules') continue

      const fullPath = path.join(dir, file)
      const relPath = path.join(relDir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath, relPath)
        continue
      }

      if (!file.endsWith('.json')) continue

      const baseName = file.replace(/\.json$/, '')
      const directoryCounterpart = path.join(dir, baseName, 'warp.json')
      if (fs.existsSync(directoryCounterpart)) continue

      const raw = fs.readFileSync(fullPath, 'utf8')
      let parsed: Dict

      try {
        parsed = JSON.parse(raw) as Dict
      } catch {
        continue
      }

      if (typeof parsed.protocol !== 'string' || !parsed.protocol.startsWith('warp:')) {
        continue
      }

      result[relPath] = fullPath
    }
  }

  walk(WARPS_DIR)

  return result
}

async function getBrandFactoryOutput(
  brandName: string,
  env: SyncNetwork,
): Promise<any | null> {
  const noAtPath = path.join(WARPS_DIR, brandName, 'brand.ts')
  const withAtPath = path.join(WARPS_DIR, `@${brandName}`, 'brand.ts')
  const brandPath = fs.existsSync(noAtPath) ? noAtPath : withAtPath

  if (!fs.existsSync(brandPath)) return null

  const module = await import(pathToFileURL(brandPath).href)
  const brandFactory = module.brand as ((config: WarpClientConfig) => Promise<any>) | undefined

  if (typeof brandFactory !== 'function') {
    throw new Error(`Brand factory not found in ${brandPath}`)
  }

  const config = {
    currentUrl: 'https://joai.ai',
    env,
    user: { wallets: {} },
    preferences: { providers: {} },
    transform: {},
  } as WarpClientConfig

  return await brandFactory(config)
}

function toBrandPayload(brandFactoryOutput: any, active: boolean): BrandPayload {
  const info = deepClone((brandFactoryOutput?.info ?? {}) as Dict)
  delete info.meta

  const name = typeof info.name === 'string' && info.name.trim() ? info.name.trim() : 'Unnamed Brand'
  const brandHash = hashDeterministic(info)

  return {
    hash: brandHash,
    slug: toSlug(name),
    active,
    protocol: typeof info.protocol === 'string' ? info.protocol : 'brand:1.0.0',
    name,
    description: normalizeTranslationField(info.description),
    logo: normalizeLogo(info.logo) ?? {},
    ...(info.urls && typeof info.urls === 'object' ? { urls: info.urls as Dict } : {}),
    ...(info.colors && typeof info.colors === 'object' ? { colors: info.colors as Dict } : {}),
  }
}

function loadPreviousManifest(network: SyncNetwork): CatalogManifest | null {
  const filePath = path.join(CATALOG_DIR, network, 'manifest.json')
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as CatalogManifest
}

function computeDelta(
  current: CatalogManifest,
  previous: CatalogManifest | null,
  committedAt: string,
): CatalogDelta {
  const previousMap = new Map<string, WarpUpsert>()
  for (const entry of previous?.warps ?? []) {
    previousMap.set(entry.key, entry)
  }

  const upserts: WarpUpsert[] = []
  const currentMap = new Map<string, WarpUpsert>()

  for (const entry of current.warps) {
    currentMap.set(entry.key, entry)

    const old = previousMap.get(entry.key)
    if (!old) {
      upserts.push(entry)
      continue
    }

    const oldSignature = `${old.hash}:${old.brand?.hash ?? ''}`
    const newSignature = `${entry.hash}:${entry.brand?.hash ?? ''}`

    if (oldSignature !== newSignature) {
      upserts.push(entry)
    }
  }

  const deletes: WarpDelete[] = []
  for (const oldEntry of previous?.warps ?? []) {
    if (currentMap.has(oldEntry.key)) continue

    deletes.push({
      key: oldEntry.key,
      alias: oldEntry.alias,
      chain: oldEntry.chain,
      hash: oldEntry.hash,
    })
  }

  return {
    schemaVersion: 1,
    source: 'github',
    repo: current.repo,
    branch: current.branch,
    network: current.network,
    commitSha: current.commitSha,
    committedAt,
    generatedAt: current.generatedAt,
    upserts,
    deletes,
  }
}

function writeJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
}

async function buildManifest(args: CliArgs, network: SyncNetwork): Promise<CatalogManifest> {
  const files = listWarpFiles()
  const brandCache = new Map<string, BrandPayload | null>()
  const brandFactoryCache = new Map<string, any | null>()
  const warps: WarpUpsert[] = []

  for (const [fileName, absolutePath] of Object.entries(files)) {
    const isPrivate = isPrivateFile(fileName)

    if (network === 'mainnet' && isDraftFile(fileName)) continue

    const raw = fs.readFileSync(absolutePath, 'utf8')
    const parsed = JSON.parse(raw) as Dict
    const brandName = getBrandNameFromFileName(fileName)

    if (network === 'mainnet' && isBrandInactive(fileName)) {
      continue
    }

    let brandPayload: BrandPayload | null = null

    if (brandName) {
      if (!brandFactoryCache.has(brandName)) {
        brandFactoryCache.set(
          brandName,
          await getBrandFactoryOutput(brandName, network),
        )
      }

      const brandFactoryOutput = brandFactoryCache.get(brandName) ?? null

      if (!brandCache.has(brandName)) {
        if (brandFactoryOutput) {
          brandCache.set(
            brandName,
            toBrandPayload(brandFactoryOutput, !isBrandInactive(fileName)),
          )
        } else {
          brandCache.set(brandName, null)
        }
      }

      brandPayload = brandCache.get(brandName) ?? null
    }

    let workingWarp = deepClone(parsed)
    workingWarp = replaceAbiPlaceholders(workingWarp, path.dirname(absolutePath))

    if (brandName) {
      const brandFactoryOutput = brandFactoryCache.get(brandName) ?? null

      if (brandFactoryOutput) {
        workingWarp = replaceInjectPlaceholders(
          workingWarp,
          network,
          brandFactoryOutput,
        ) as Dict
      }
    }

    workingWarp = replaceGlobalPlaceholders(workingWarp) as Dict
    ensureNoInjectPlaceholders(workingWarp)

    const checksumTarget = normalizeWarpForChecksum(workingWarp)
    const checksum = hashDeterministic(checksumTarget)

    const chain = getChainNameFromWarpData(parsed)
    const aliasBase = getAliasFromFileName(fileName)
    const identifier = createWarpIdentifier(
      chain === 'none' ? null : chain as WarpChainName,
      'alias',
      aliasBase,
    )

    const alias = chain === 'none'
      ? aliasBase
      : (getWarpInfoFromIdentifier(identifier)?.identifierBase ?? aliasBase)

    const key = `${chain}:${alias}`
    const primaryInfo = getPrimaryInfo(workingWarp)

    warps.push({
      key,
      identifier,
      alias,
      chain,
      hash: checksum,
      checksum,
      name: typeof workingWarp.name === 'string' ? workingWarp.name : alias,
      title: normalizeTranslationField(workingWarp.title),
      description: normalizeTranslationField(workingWarp.description),
      preview: typeof workingWarp.preview === 'string' ? workingWarp.preview : null,
      creator: CREATOR,
      privileges: [],
      listed: !isPrivate,
      primaryAddress: primaryInfo.address,
      primaryFunc: primaryInfo.func,
      brand: brandPayload,
      warp: stripNonWarpFields(workingWarp),
    })
  }

  warps.sort((a, b) => a.key.localeCompare(b.key))

  return {
    schemaVersion: 1,
    source: 'github',
    repo: args.repo,
    branch: args.branch,
    network,
    commitSha: args.commitSha,
    generatedAt: new Date().toISOString(),
    warps,
  }
}

async function main() {
  const args = parseArgs()
  const network = getNetworkForBranch(args.branch)

  if (!network) {
    console.log(`Branch '${args.branch}' is not mapped for sync. Skipping catalog build.`)
    return
  }

  const manifest = await buildManifest(args, network)
  const previousManifest = args.full ? null : loadPreviousManifest(network)
  const delta = computeDelta(manifest, previousManifest, args.committedAt)

  const networkCatalogDir = path.join(CATALOG_DIR, network)
  writeJson(path.join(networkCatalogDir, 'manifest.json'), manifest)
  writeJson(path.join(networkCatalogDir, 'delta.json'), delta)

  console.log(
    `Catalog generated for ${network}: ${manifest.warps.length} warps, ${delta.upserts.length} upserts, ${delta.deletes.length} deletes.`,
  )
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
