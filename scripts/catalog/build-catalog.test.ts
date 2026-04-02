// @vitest-environment node
import { describe, it, expect } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'
import { isDraftFile, isPrivateFile, getAliasFromFileName } from './build-catalog.js'
import { buildDistributionCatalog, validateDistributionCatalog } from './distribution.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '../../')

describe('isPrivateFile', () => {
  it('returns true for #-prefixed filenames', () => {
    expect(isPrivateFile('boogas/#game-guess-number-start.json')).toBe(true)
    expect(isPrivateFile('boogas/#check-guess.json')).toBe(true)
  })

  it('returns false for normal filenames', () => {
    expect(isPrivateFile('boogas/game-guess-number-start.json')).toBe(false)
    expect(isPrivateFile('joai/warp.json')).toBe(false)
  })

  it('returns false for @-prefixed (draft) filenames', () => {
    expect(isPrivateFile('boogas/@draft-warp.json')).toBe(false)
  })
})

describe('isDraftFile', () => {
  it('returns true for @-prefixed filenames', () => {
    expect(isDraftFile('boogas/@draft-warp.json')).toBe(true)
  })

  it('returns false for normal and #-prefixed filenames', () => {
    expect(isDraftFile('boogas/warp.json')).toBe(false)
    expect(isDraftFile('boogas/#private-warp.json')).toBe(false)
  })
})

describe('getAliasFromFileName', () => {
  it('generates alias from normal file', () => {
    expect(getAliasFromFileName('boogas/game-guess-number-start.json')).toBe('boogas-game-guess-number-start')
  })

  it('strips # prefix from private files', () => {
    expect(getAliasFromFileName('boogas/#game-guess-number-start.json')).toBe('boogas-game-guess-number-start')
    expect(getAliasFromFileName('boogas/#game-guess-number-check.json')).toBe('boogas-game-guess-number-check')
    expect(getAliasFromFileName('boogas/#game-guess-number-stop.json')).toBe('boogas-game-guess-number-stop')
  })

  it('strips @ prefix from draft files', () => {
    // -warp suffix is also stripped by the alias normalizer
    expect(getAliasFromFileName('boogas/@draft-warp.json')).toBe('boogas-draft')
  })

  it('uses brand name as alias when filename is "warp"', () => {
    expect(getAliasFromFileName('joai/warp.json')).toBe('joai')
  })

  it('throws when file is not inside a brand folder', () => {
    expect(() => getAliasFromFileName('warp.json')).toThrow()
  })
})

describe('sync-to-api: listed filtering', () => {
  it('filters out listed:false entries from upserts', () => {
    const upserts = [
      { alias: 'boogas-public-warp', listed: true },
      { alias: 'boogas-game-guess-number-start', listed: false },
      { alias: 'joai-item-create', listed: true },
      { alias: 'boogas-game-guess-number-check', listed: false },
    ]

    const filtered = upserts.filter((u) => u.listed !== false)

    expect(filtered).toHaveLength(2)
    expect(filtered.map((u) => u.alias)).toEqual(['boogas-public-warp', 'joai-item-create'])
  })

  it('passes through all entries when none are unlisted', () => {
    const upserts = [
      { alias: 'joai-item-create', listed: true },
      { alias: 'joai-memory-create', listed: true },
    ]

    const filtered = upserts.filter((u) => u.listed !== false)
    expect(filtered).toHaveLength(2)
  })
})

describe('distribution catalog', () => {
  it('builds a public app catalog from listed brand warps', async () => {
    const catalog = await buildDistributionCatalog(
      REPO_ROOT,
      {
        schemaVersion: 1,
        source: 'github',
        repo: 'JoAiHQ/warps',
        branch: 'main',
        network: 'mainnet',
        commitSha: 'test',
        generatedAt: '2026-04-01T00:00:00.000Z',
        warps: [
          {
            key: 'multiversx:joai-agent-create',
            identifier: '@multiversx:joai-agent-create',
            alias: 'joai-agent-create',
            chain: 'multiversx',
            hash: 'warp-hash-1',
            checksum: 'warp-hash-1',
            name: 'JoAi: Create Agent',
            title: { en: 'Create Agent' },
            description: { en: 'Create a JoAi agent.' },
            preview: null,
            creator: 'github:JoAiHQ/warps',
            privileges: [],
            listed: true,
            visibility: 'public',
            primaryAddress: null,
            primaryFunc: null,
            brand: {
              hash: 'brand-hash-1',
              slug: 'joai',
              active: true,
              protocol: 'brand:1.0.0',
              name: 'JoAi',
              description: { en: 'JoAi brand' },
              logo: { default: 'https://example.com/logo.svg' },
              urls: { web: 'https://joai.ai' },
              colors: { primary: '#98FF98' },
            },
            warp: {
              actions: [{ type: 'collect' }],
            },
            extras: null,
          },
          {
            key: 'multiversx:joai-private-warp',
            identifier: '@multiversx:joai-private-warp',
            alias: 'joai-private-warp',
            chain: 'multiversx',
            hash: 'warp-hash-2',
            checksum: 'warp-hash-2',
            name: 'JoAi: Private Warp',
            title: { en: 'Private Warp' },
            description: { en: 'Private warp' },
            preview: null,
            creator: 'github:JoAiHQ/warps',
            privileges: [],
            listed: false,
            visibility: 'public',
            primaryAddress: null,
            primaryFunc: null,
            brand: {
              hash: 'brand-hash-1',
              slug: 'joai',
              active: true,
              protocol: 'brand:1.0.0',
              name: 'JoAi',
              description: { en: 'JoAi brand' },
              logo: { default: 'https://example.com/logo.svg' },
              urls: { web: 'https://joai.ai' },
              colors: { primary: '#98FF98' },
            },
            warp: {
              actions: [{ type: 'contract' }],
            },
            extras: null,
          },
        ],
      },
      new Map(),
    )

    expect(catalog.apps).toHaveLength(1)
    expect(catalog.apps[0]).toMatchObject({
      slug: 'joai',
      visibility: 'public',
      mcpUrl: 'https://cortex.joai.ai/mcp/apps/joai',
      providers: {
        claude: { enabled: true, status: 'ready' },
        codex: { enabled: true, status: 'ready' },
        cursor: { enabled: true, status: 'ready' },
        openai: { enabled: true, status: 'runtime_ready' },
      },
    })
    expect(catalog.apps[0].actions).toEqual([
      {
        alias: 'joai-agent-create',
        identifier: '@multiversx:joai-agent-create',
        chain: 'multiversx',
        name: 'JoAi: Create Agent',
        title: { en: 'Create Agent' },
        description: { en: 'Create a JoAi agent.' },
        actionTypes: ['collect'],
      },
    ])
    expect(validateDistributionCatalog(catalog)).toEqual([])
  })

  it('keeps draft-only brand apps in the distribution catalog as private', async () => {
    const catalog = await buildDistributionCatalog(
      REPO_ROOT,
      {
        schemaVersion: 1,
        source: 'github',
        repo: 'JoAiHQ/warps',
        branch: 'main',
        network: 'mainnet',
        commitSha: 'test',
        generatedAt: '2026-04-01T00:00:00.000Z',
        warps: [
          {
            key: 'multiversx:joai-private-warp',
            identifier: '@multiversx:joai-private-warp',
            alias: 'joai-private-warp',
            chain: 'multiversx',
            hash: 'warp-hash-2',
            checksum: 'warp-hash-2',
            name: 'JoAi: Private Warp',
            title: { en: 'Private Warp' },
            description: { en: 'Private warp' },
            preview: null,
            creator: 'github:JoAiHQ/warps',
            privileges: [],
            listed: true,
            visibility: 'private',
            primaryAddress: null,
            primaryFunc: null,
            brand: {
              hash: 'brand-hash-1',
              slug: 'joai',
              active: false,
              protocol: 'brand:1.0.0',
              name: 'JoAi',
              description: { en: 'JoAi brand' },
              logo: { default: 'https://example.com/logo.svg' },
              urls: { web: 'https://joai.ai' },
              colors: { primary: '#98FF98' },
            },
            warp: {
              actions: [{ type: 'contract' }],
            },
            extras: null,
          },
        ],
      },
      new Map(),
    )

    expect(catalog.apps).toHaveLength(1)
    expect(catalog.apps[0]).toMatchObject({
      slug: 'joai',
      visibility: 'private',
    })
    expect(validateDistributionCatalog(catalog)).toEqual([])
  })

  it('keeps mixed-visibility brand apps public when any warp is public', async () => {
    const catalog = await buildDistributionCatalog(
      REPO_ROOT,
      {
        schemaVersion: 1,
        source: 'github',
        repo: 'JoAiHQ/warps',
        branch: 'main',
        network: 'mainnet',
        commitSha: 'test',
        generatedAt: '2026-04-01T00:00:00.000Z',
        warps: [
          {
            key: 'multiversx:joai-public-warp',
            identifier: '@multiversx:joai-public-warp',
            alias: 'joai-public-warp',
            chain: 'multiversx',
            hash: 'warp-hash-3',
            checksum: 'warp-hash-3',
            name: 'JoAi: Public Warp',
            title: { en: 'Public Warp' },
            description: { en: 'Public warp' },
            preview: null,
            creator: 'github:JoAiHQ/warps',
            privileges: [],
            listed: true,
            visibility: 'public',
            primaryAddress: null,
            primaryFunc: null,
            brand: {
              hash: 'brand-hash-1',
              slug: 'joai',
              active: true,
              protocol: 'brand:1.0.0',
              name: 'JoAi',
              description: { en: 'JoAi brand' },
              logo: { default: 'https://example.com/logo.svg' },
              urls: { web: 'https://joai.ai' },
              colors: { primary: '#98FF98' },
            },
            warp: {
              actions: [{ type: 'collect' }],
            },
            extras: null,
          },
          {
            key: 'multiversx:joai-private-warp',
            identifier: '@multiversx:joai-private-warp',
            alias: 'joai-private-warp',
            chain: 'multiversx',
            hash: 'warp-hash-4',
            checksum: 'warp-hash-4',
            name: 'JoAi: Private Warp',
            title: { en: 'Private Warp' },
            description: { en: 'Private warp' },
            preview: null,
            creator: 'github:JoAiHQ/warps',
            privileges: [],
            listed: true,
            visibility: 'private',
            primaryAddress: null,
            primaryFunc: null,
            brand: {
              hash: 'brand-hash-1',
              slug: 'joai',
              active: true,
              protocol: 'brand:1.0.0',
              name: 'JoAi',
              description: { en: 'JoAi brand' },
              logo: { default: 'https://example.com/logo.svg' },
              urls: { web: 'https://joai.ai' },
              colors: { primary: '#98FF98' },
            },
            warp: {
              actions: [{ type: 'contract' }],
            },
            extras: null,
          },
        ],
      },
      new Map(),
    )

    expect(catalog.apps).toHaveLength(1)
    expect(catalog.apps[0]).toMatchObject({
      slug: 'joai',
      visibility: 'public',
    })
    expect(validateDistributionCatalog(catalog)).toEqual([])
  })

  it('requires screenshots only for submission-ready OpenAI apps', () => {
    const errors = validateDistributionCatalog({
      schemaVersion: 1,
      source: 'github',
      repo: 'JoAiHQ/warps',
      branch: 'main',
      network: 'mainnet',
      commitSha: 'test',
      generatedAt: '2026-04-01T00:00:00.000Z',
      apps: [
        {
          slug: 'joai',
          visibility: 'public',
          name: 'JoAi',
          description: { en: 'JoAi' },
          logo: { default: 'https://example.com/logo.svg' },
          urls: { web: 'https://joai.ai' },
          hash: 'brand-hash',
          mcpUrl: 'https://cortex.joai.ai/mcp/apps/joai',
          install: {
            summary: 'summary',
            examplePrompts: ['prompt'],
            usageNotes: [],
            authPrerequisites: [],
          },
          legal: {
            privacyUrl: 'https://legal.vleap.ai/policies/privacy.html',
            supportEmail: 'support@joai.ai',
          },
          review: {
            screenshots: [],
            reviewerNotes: ['note'],
            testPrompts: ['prompt'],
          },
          mcp: {
            prefersBorder: true,
            csp: {
              connectDomains: [],
              resourceDomains: [],
              frameDomains: [],
              baseUriDomains: [],
            },
            permissions: {},
            domain: undefined,
          },
          providers: {
            claude: { provider: 'claude', enabled: true, status: 'ready', notes: [] },
            codex: { provider: 'codex', enabled: true, status: 'ready', notes: [] },
            cursor: { provider: 'cursor', enabled: true, status: 'ready', notes: [] },
            openai: { provider: 'openai', enabled: true, status: 'submission_ready', notes: [] },
          },
          actions: [],
        },
      ],
    })

    expect(errors).toContain('joai: openai marked submission_ready without screenshots')
  })
})
