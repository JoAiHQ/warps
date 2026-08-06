import { describe, expect, it } from 'vitest'
import { extractList } from './helpers'

describe('extractList', () => {
  it('returns a bare array unchanged', () => {
    const items = [{ id: 1 }, { id: 2 }]
    expect(extractList(items)).toEqual(items)
  })

  it('returns an empty array for empty arrays', () => {
    expect(extractList([])).toEqual([])
    expect(extractList({ data: [] })).toEqual([])
    expect(extractList({ _DATA: { data: { data: [] } } })).toEqual([])
  })

  it('returns an empty array for non-array values', () => {
    expect(extractList(null)).toEqual([])
    expect(extractList(undefined)).toEqual([])
    expect(extractList('nope')).toEqual([])
    expect(extractList(42)).toEqual([])
    expect(extractList({ error: 'boom' })).toEqual([])
    expect(extractList({ data: { meta: { x: 1 } } })).toEqual([])
  })

  it('handles a single { data: [...] } envelope', () => {
    const items = [{ name: 'A' }]
    expect(extractList({ data: items })).toEqual(items)
  })

  it('descends into nested { data: { data: [...] } } envelopes', () => {
    const items = [{ name: 'A' }, { name: 'B' }]
    expect(extractList({ data: { data: items } })).toEqual(items)
  })

  it('descends into the executor _DATA wrapper', () => {
    const items = [{ name: 'A' }]
    expect(extractList({ _DATA: { data: { data: items } } })).toEqual(items)
  })

  it('returns the first array among mapped output aliases', () => {
    const items = [{ name: 'A' }]
    expect(extractList({ AGENTS: items, NEXT_CURSOR: null })).toEqual(items)
  })

  it('prefers a top-level data array over nested values', () => {
    const items = [{ name: 'A' }]
    expect(extractList({ data: items, _DATA: { data: { data: [{ name: 'WRONG' }] } } })).toEqual(items)
  })
})
