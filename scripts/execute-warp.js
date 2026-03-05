#!/usr/bin/env node
/**
 * Execute a warp from a JSON file: run all collect actions, resolve output, print result.
 * Usage: node scripts/execute-warp.js <warp-json-path>
 *    or: npm run execute -- warps/colombia-staking/@earn-stake-calculation.json
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const warpPath = process.argv[2]
const restArgs = process.argv.slice(3)
if (!warpPath) {
  console.error('Usage: node scripts/execute-warp.js <warp-json-path> [KEY=value ...]')
  console.error('Example: npm run execute -- warps/colombia-staking/@earn-stake-calculation.json')
  console.error('Example: npm run execute -- warps/colombia-staking/@cols-buyback-with-wallet-egld.json CHAIN_API=https://api.multiversx.com ADDRESS=erd1...')
  process.exit(1)
}

const resolvedPath = path.isAbsolute(warpPath) ? warpPath : path.resolve(process.cwd(), warpPath)
if (!fs.existsSync(resolvedPath)) {
  console.error('File not found:', resolvedPath)
  process.exit(1)
}

const warp = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'))

// Config and inputs: from env, then from KEY=value args
const config = {
  CHAIN_API: process.env.CHAIN_API || 'https://api.multiversx.com'
}
const inputs = {}
for (const arg of restArgs) {
  const eq = arg.indexOf('=')
  if (eq > 0) {
    const key = arg.slice(0, eq).trim()
    const value = arg.slice(eq + 1).trim()
    inputs[key] = value
  }
}
// Resolve {{USER_WALLET}} when used as default: if ADDRESS passed, use it as USER_WALLET for replacement
if (inputs.ADDRESS && !inputs.USER_WALLET) inputs.USER_WALLET = inputs.ADDRESS

// Run all collect actions
const collectActions = (warp.actions || []).filter(a => a.type === 'collect')
const out = []

for (const action of collectActions) {
  const dest = action.destination
  if (!dest) continue
  const url = typeof dest === 'string' ? dest : dest.url
  if (!url) continue
  let finalUrl = url
  for (const [k, v] of Object.entries({ ...config, ...inputs })) {
    finalUrl = finalUrl.replace(new RegExp(`{{${k}}}`, 'g'), String(v ?? ''))
  }
  console.error('Fetching:', finalUrl)
  const res = await fetch(finalUrl)
  if (!res.ok) {
    console.error('HTTP', res.status, res.statusText)
    throw new Error(`Fetch failed: ${res.status}`)
  }
  const json = await res.json()
  out.push(json)
}

// If no collect actions, out is empty; some warps might use a single response as "out"
const result = {}
const output = warp.output || {}

// Resolve out references: out, out[0], out[1], out.0, out.1
for (const [key, value] of Object.entries(output)) {
  if (typeof value !== 'string') continue
  if (value === 'out') {
    result[key] = out.length === 1 ? out[0] : out
    continue
  }
  const match = value.match(/^out\[(\d+)\]$/) || value.match(/^out\.(\d+)$/)
  if (match) {
    const i = parseInt(match[1], 10)
    result[key] = out[i] ?? null
    continue
  }
  if (value.startsWith('transform:')) {
    // Will run after all direct assignments
    continue
  }
  // Dot path into first response, e.g. out.data.id
  if (value.startsWith('out.')) {
    const path = value.slice(4).split('.')
    let v = out[0]
    for (const p of path) {
      v = v?.[p]
    }
    result[key] = v
  }
}

// Run transforms (each has access to result and out; out = single response or array of collect results)
const outRef = out.length === 1 ? out[0] : out
for (const [key, value] of Object.entries(output)) {
  if (typeof value !== 'string' || !value.startsWith('transform:')) continue
  const code = value.slice(10).trim()
  try {
    const fn = new Function('result', 'out', `return (${code})()`)
    result[key] = fn(result, outRef)
  } catch (e) {
    console.error('Transform error for', key, e.message)
    result[key] = null
  }
}

console.log(JSON.stringify(result, null, 2))

// Resolve and print next warp(s) with parameters
const nextTemplate = warp.next
if (nextTemplate && typeof nextTemplate === 'string') {
  const [warpId, queryPart] = nextTemplate.split('?')
  if (warpId) {
    // Find {{ARRAY[].field}} placeholders
    const arrayPlaceholders = [...nextTemplate.matchAll(/\{\{(\w+)\[\]\.(\w+)\}\}/g)]
    if (arrayPlaceholders.length === 0) {
      let resolved = nextTemplate
      for (const [key, value] of Object.entries(result)) {
        resolved = resolved.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value ?? ''))
      }
      console.error('\nNext warp:', warpId.trim())
      console.error('Resolved URL:', resolved)
    } else {
      const arrayKey = arrayPlaceholders[0][1]
      const array = result[arrayKey]
      const items = Array.isArray(array) ? array : []

      const nextInvocations = items.map((item) => {
        const params = {}
        for (const [, arrName, field] of arrayPlaceholders) {
          params[field] = item[field] ?? item[arrName]?.[field]
        }
        let url = queryPart || ''
        for (const [, arrName, field] of arrayPlaceholders) {
          url = url.replace(new RegExp(`\\{\\{${arrName}\\[\\]\\.${field}\\}\\}`, 'g'), String(params[field] ?? ''))
        }
        return { params, url: url ? `${warpId.trim()}?${url}` : warpId.trim() }
      })

      console.error('\nNext warp:', warpId.trim())
      console.error('Invocations:', nextInvocations.length, '(one per item in', arrayKey + ')')
      const show = 5
      nextInvocations.slice(0, show).forEach((inv, i) => {
        console.error(`  [${i}]`, JSON.stringify(inv.params), '→', inv.url?.slice(0, 80) + (inv.url?.length > 80 ? '...' : ''))
      })
      if (nextInvocations.length > show) {
        console.error('  ...')
        const last = nextInvocations[nextInvocations.length - 1]
        console.error(`  [${nextInvocations.length - 1}]`, JSON.stringify(last.params), '→', last.url?.slice(0, 80) + (last.url?.length > 80 ? '...' : ''))
      }
    }
  }
}
