#!/usr/bin/env node
/**
 * Idempotent: ensure JoAi warp inputs for public resource ids document hashids/slugs
 * and never use min: 1 on string ids (numeric PK validation).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  inputDocumentsPublicIdentifier,
  isJoaiResourceIdentifierField,
  stripNumericPkValidation,
  ensurePublicIdentifierDocumentation,
} from '../hashid-public-ids.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const JOAI_DIR = path.resolve(__dirname, '../../warps/joai')

function walkJsonFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walkJsonFiles(full))
      continue
    }
    if (!entry.name.endsWith('.json') || entry.name.startsWith('#')) continue
    out.push(full)
  }
  return out
}

let filesTouched = 0

for (const filePath of walkJsonFiles(JOAI_DIR)) {
  const warp = JSON.parse(fs.readFileSync(filePath, 'utf8')) as {
    actions?: Array<{ inputs?: Record<string, unknown>[] }>
  }
  let changed = false

  for (const action of warp.actions ?? []) {
    for (const input of action.inputs ?? []) {
      const as = input.as
      if (typeof as !== 'string' || !isJoaiResourceIdentifierField(as)) continue
      if (stripNumericPkValidation(input)) changed = true
      if (!inputDocumentsPublicIdentifier(input)) {
        ensurePublicIdentifierDocumentation(input)
        changed = true
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, `${JSON.stringify(warp, null, 2)}\n`)
    filesTouched++
  }
}

console.log(`Updated ${filesTouched} joai warp file(s).`)
