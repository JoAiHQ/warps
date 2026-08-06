import { ListItem } from './ListResult'

/**
 * Extract the array of items from a warp collect result.
 * The warp output is usually the response envelope `{ data: [...], meta: ... }`,
 * but can also be a bare array, an object keyed by the output alias, or a
 * nested envelope produced by the executor (`{ _DATA: { data: { data: [...] } } }`).
 * Descends into `data`/`_DATA` wrappers until the first array is found.
 */
export function extractList<T = ListItem>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (Array.isArray(record.data)) return record.data as T[]
    for (const key of Object.keys(record)) {
      const child = record[key]
      if (Array.isArray(child)) return child as T[]
      if (child && typeof child === 'object') {
        const nested = extractList<T>(child)
        if (nested.length > 0) return nested
      }
    }
  }
  return []
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null
}
