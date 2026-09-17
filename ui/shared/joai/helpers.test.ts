import { describe, expect, it } from 'vitest'
import {
  extractList,
  extractRecord,
  formatCents,
  formatDateShort,
  humanizeKey,
  pickValue,
  priceFromVariations,
  primaryImageUrl,
  resolveLocalized,
  truncateText,
  truncateMiddle,
  valueToDisplay,
} from './helpers'

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
    expect(extractList({ _DATA: { data: items } })).toEqual(items)
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

describe('extractRecord', () => {
  it('returns a bare resource object', () => {
    expect(extractRecord({ name: 'Alpha', status: 'ready' })).toEqual({ name: 'Alpha', status: 'ready' })
  })

  it('unwraps data and _DATA envelopes', () => {
    const resource = { name: 'Alpha', status: 'ready' }
    expect(extractRecord({ data: resource })).toEqual(resource)
    expect(extractRecord({ _DATA: { data: resource } })).toEqual(resource)
    expect(extractRecord({ data: { data: resource } })).toEqual(resource)
  })

  it('keeps flat mapped stats outputs', () => {
    expect(extractRecord({ TOTAL_CAMPAIGNS: 3, DRAFT_CAMPAIGNS: 1 })).toEqual({
      TOTAL_CAMPAIGNS: 3,
      DRAFT_CAMPAIGNS: 1,
    })
  })

  it('returns null for non-objects', () => {
    expect(extractRecord(null)).toBeNull()
    expect(extractRecord([{ name: 'A' }])).toBeNull()
  })
})

describe('display helpers', () => {
  it('picks the first present key', () => {
    expect(pickValue({ TOTAL_CAMPAIGNS: 4, totalCampaigns: 9 }, ['totalCampaigns', 'TOTAL_CAMPAIGNS'])).toBe(9)
    expect(pickValue({ TOTAL_CAMPAIGNS: 4 }, ['totalCampaigns', 'TOTAL_CAMPAIGNS'])).toBe(4)
    expect(pickValue({}, ['missing'])).toBeUndefined()
  })

  it('humanizes keys', () => {
    expect(humanizeKey('TOTAL_CAMPAIGNS')).toBe('Total campaigns')
    expect(humanizeKey('outputPreset')).toBe('Output preset')
  })

  it('formats display values and localized names', () => {
    expect(valueToDisplay(true)).toBe('Yes')
    expect(valueToDisplay(false)).toBe('No')
    expect(valueToDisplay(['a', 'b'])).toBe('a, b')
    expect(valueToDisplay([{ id: 1 }])).toBe('1 items')
    expect(valueToDisplay(null)).toBe('—')
    expect(resolveLocalized({ en: 'Haircut', de: 'Haarschnitt' })).toBe('Haircut')
    expect(resolveLocalized({ de: 'Haarschnitt' })).toBe('Haarschnitt')
    expect(valueToDisplay({ en: 'Haircut', de: 'Haarschnitt' })).toBe('Haircut')
    expect(valueToDisplay('2026-04-18T10:00:00Z')).toBe(formatDateShort('2026-04-18T10:00:00Z'))
  })

  it('formats money, dates, truncates, prices and images', () => {
    expect(formatCents(1999, 'EUR')).toMatch(/19/)
    expect(formatDateShort('2026-04-18T10:00:00Z')).toBeTruthy()
    expect(truncateText('abcdefghij', 8)).toBe('abcdefg…')
    expect(truncateMiddle('erd1abcdefghijklmnop', 6, 4)).toBe('erd1ab…mnop')
    expect(priceFromVariations({ variations: [{ price: 500 }, { price: 300 }] })).toBe(300)
    expect(primaryImageUrl({ primaryImage: { url: 'https://x/a.jpg' } })).toBe('https://x/a.jpg')
    expect(primaryImageUrl({ images: [{ url: 'https://x/b.jpg' }] })).toBe('https://x/b.jpg')
  })
})
