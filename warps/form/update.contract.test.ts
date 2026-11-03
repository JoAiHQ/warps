// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

type FormUpdateWarp = {
  actions: Array<{
    inputs: Array<{ as: string; type?: string; position?: string }>
  }>
}

const formUpdateWarp = JSON.parse(readFileSync(resolve(__dirname, 'update.json'), 'utf8')) as FormUpdateWarp
const inputs = formUpdateWarp.actions[0].inputs

describe('@form-update notification configuration', () => {
  it('exposes notification recipients', () => {
    expect(inputs).toContainEqual(expect.objectContaining({ as: 'notify', type: 'json' }))
  })
})
