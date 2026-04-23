#!/usr/bin/env node
/**
 * Static validator for all warp JSON files in this repo.
 *
 * Catches the bug classes we've hit in the MCP flow:
 *   1. URL template has {{X}} but no input has position: "url:X" (and
 *      X is not declared in warp.vars) → dispatched requests collapse
 *      to a neighbouring route with missing path segments.
 *   2. HTTP write actions (POST / PUT / PATCH / DELETE) carry an input
 *      with position: "arg:N" → CLI positional args never make it into
 *      the JSON body, API rejects with "field required".
 *
 * Exit 0: all warps pass. Exit 1: at least one warp failed — PRs get
 * blocked.
 *
 * Run via `npm run warps:validate`.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const WARPS_DIR = path.resolve(__dirname, '..', 'warps')

const HTTP_WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

/**
 * Placeholders that look like `{{FOO_BAR}}` (all uppercase + underscores) are
 * global by convention — env vars, brand destinations, context injection — and
 * resolved by the runtime layer. Placeholders that look like `{{contactId}}`
 * (camelCase or lowercase) are per-request inputs and must be bound to a
 * url-positioned input to prevent URL collapse.
 */
const UPPERCASE_VAR_PATTERN = /^[A-Z][A-Z0-9_]*$/

type Issue = { file: string; message: string }

type WarpInput = { name?: string; as?: string; position?: string }
type WarpDestination = { url?: string; method?: string } | string
type WarpAction = { destination?: WarpDestination; inputs?: WarpInput[] }
type Warp = { vars?: Record<string, unknown>; actions?: WarpAction[] }

function walkWarpJsonFiles(root: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkWarpJsonFiles(full))
      continue
    }
    if (!entry.name.endsWith('.json')) continue
    if (entry.name.endsWith('.examples.json')) continue
    results.push(full)
  }
  return results
}

function isWarpFile(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw) as Warp & { protocol?: unknown }
    return typeof parsed.protocol === 'string' && parsed.protocol.startsWith('warp:')
  } catch {
    return false
  }
}

function extractUrlPathPlaceholders(url: string): string[] {
  // Only path-segment placeholders matter — query-string `{{X}}` is tolerated
  // by the runtime (empty substitution leaves `?foo=` which is harmless) and
  // typically driven by input name rather than `position: "url:X"`.
  const pathPart = url.split('?')[0]
  const matches = pathPart.match(/\{\{([a-zA-Z_][a-zA-Z_0-9]*)\}\}/g)
  if (!matches) return []
  return matches.map((m) => m.slice(2, -2))
}

function checkUrlPlaceholdersHaveInputs(warp: Warp, relPath: string): Issue[] {
  const issues: Issue[] = []
  const varNames = new Set(Object.keys(warp.vars ?? {}))

  for (const action of warp.actions ?? []) {
    if (!action.destination || typeof action.destination === 'string') continue
    const url = action.destination.url
    if (!url) continue

    const placeholders = extractUrlPathPlaceholders(url)
    if (placeholders.length === 0) continue

    const urlPositioned = new Set(
      (action.inputs ?? [])
        .map((i) => i.position)
        .filter((p): p is string => typeof p === 'string' && p.startsWith('url:'))
        .map((p) => p.slice(4))
    )

    for (const placeholder of placeholders) {
      if (varNames.has(placeholder)) continue
      if (UPPERCASE_VAR_PATTERN.test(placeholder)) continue
      if (!urlPositioned.has(placeholder)) {
        issues.push({
          file: relPath,
          message: `URL "${url}" has {{${placeholder}}} but no input has position "url:${placeholder}" (and it is not declared in vars)`,
        })
      }
    }
  }

  return issues
}

function checkNoArgPositionsOnHttpActions(warp: Warp, relPath: string): Issue[] {
  const issues: Issue[] = []

  for (const action of warp.actions ?? []) {
    if (!action.destination || typeof action.destination === 'string') continue
    const method = action.destination.method?.toUpperCase()
    if (!method || !HTTP_WRITE_METHODS.has(method)) continue

    for (const input of action.inputs ?? []) {
      if (input.position?.startsWith('arg:')) {
        const label = input.as ?? input.name ?? '(unnamed)'
        issues.push({
          file: relPath,
          message: `Input "${label}" has position "${input.position}" on HTTP ${method} action — CLI arg positions never reach the JSON body. Remove the position (defaults to body) or use "payload:X" / "url:X".`,
        })
      }
    }
  }

  return issues
}

function main(): void {
  const files = walkWarpJsonFiles(WARPS_DIR)
  const allIssues: Issue[] = []
  let inspected = 0

  for (const file of files) {
    let raw: string
    try {
      raw = fs.readFileSync(file, 'utf8')
    } catch {
      continue
    }
    if (!isWarpFile(raw)) continue

    let warp: Warp
    try {
      warp = JSON.parse(raw) as Warp
    } catch {
      allIssues.push({ file: path.relative(WARPS_DIR, file), message: 'Invalid JSON' })
      continue
    }

    inspected++
    const relPath = path.relative(WARPS_DIR, file)
    allIssues.push(...checkUrlPlaceholdersHaveInputs(warp, relPath))
    allIssues.push(...checkNoArgPositionsOnHttpActions(warp, relPath))
  }

  if (allIssues.length === 0) {
    console.log(`✓ ${inspected} warps validated, 0 issues.`)
    process.exit(0)
  }

  const byFile = new Map<string, string[]>()
  for (const issue of allIssues) {
    if (!byFile.has(issue.file)) byFile.set(issue.file, [])
    byFile.get(issue.file)!.push(issue.message)
  }

  console.error(`✗ ${allIssues.length} issue(s) across ${byFile.size} warp(s) (of ${inspected} inspected):\n`)
  for (const [file, messages] of byFile) {
    console.error(`  ${file}`)
    for (const message of messages) {
      console.error(`    - ${message}`)
    }
    console.error('')
  }
  process.exit(1)
}

main()
