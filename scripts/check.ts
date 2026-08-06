#!/usr/bin/env node
/**
 * Single entry point for all repository checks:
 *   1. TypeScript type-check
 *   2. Warp definition validation
 *   3. UI/unit tests (vitest)
 *
 * Runs each step and exits non-zero on the first failure.
 *
 * Run via `npm run check`.
 */

import { execSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const bin = (name: string) => resolve(root, 'node_modules', '.bin', name)

function step(label: string, command: string): void {
  console.log(`\n▶ ${label}`)
  try {
    execSync(command, { cwd: root, stdio: 'inherit' })
  } catch (error) {
    console.error(`✗ ${label} failed`)
    process.exit(1)
  }
}

step('Type-check', `${bin('tsc')} --noEmit`)
step('Validate warps', 'node --import tsx scripts/validate-warps.ts')
step('Tests', `${bin('vitest')} run --config ui/vite.config.ts`)

console.log('\n✓ All checks passed.')
