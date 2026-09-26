// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  HASHID_PUBLIC_ID_INPUTS,
  HASHID_WARP_BOT_RULES,
  checkHashidPublicIdInputs,
} from '../../scripts/hashid-public-ids.js'

const warpsRoot = resolve(__dirname, '..')

const uniqueWarpFiles = [
  ...new Set([
    ...HASHID_PUBLIC_ID_INPUTS.map((r) => r.file),
    ...HASHID_WARP_BOT_RULES.map((r) => r.file),
  ]),
].sort()

describe('joai hashid public-id warp contracts', () => {
  for (const rel of uniqueWarpFiles) {
    it(`${rel} documents hashids for agent-facing ids`, () => {
      const warp = JSON.parse(readFileSync(resolve(warpsRoot, rel), 'utf8'))
      expect(checkHashidPublicIdInputs(warp, rel)).toEqual([])
    })
  }
})
