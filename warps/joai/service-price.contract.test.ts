// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { resolveInputTypeAlias, WarpSerializer } from '@joai/warps'
import { describe, expect, it } from 'vitest'

type PriceWarp = {
  actions: Array<{ inputs: Array<{ as: string; type?: string; modifier?: string }> }>
}

const priceInput = (file: string) => {
  const warp = JSON.parse(readFileSync(resolve(__dirname, file), 'utf8')) as PriceWarp
  const input = warp.actions[0].inputs.find((entry) => entry.as === 'price')
  if (!input) throw new Error(`price input missing in ${file}`)
  return input
}

describe('decimal price inputs', () => {
  it.each([
    'service-create.json',
    'service-update.json',
    'product-create.json',
    'product-variation-create.json',
    'product-variation-update.json',
  ])('avoids BigInt conversion for €13.90 in %s', (file) => {
    const input = priceInput(file)
    expect(input.modifier).toBeUndefined()
    expect(resolveInputTypeAlias(input.type ?? '')).toBe('decimal')

    const serializer = new WarpSerializer()
    expect(serializer.stringToNative(serializer.nativeToString('decimal', 13.9))[1]).toBe(13.9)
    expect(serializer.stringToNative(serializer.nativeToString('decimal', 1390))[1]).toBe(1390)
  })
})
