import { describe, expect, it } from 'vitest'
import warp from '../../warps/joai/product-variation-lookup.json'

describe('Product variation lookup', () => {
  it('maps on-hand and available stock from the lookup response', () => {
    expect(warp.output.stock).toBe('out.data.stock.total')
    expect(warp.output.availableStock).toBe('out.data.stock.available')
  })
})
