import { ListItem } from './ListResult'

/**
 * Extract the array of items from a warp collect result.
 * The warp output is usually the response envelope `{ data: [...], meta: ... }`,
 * but can also be a bare array or an object keyed by the output alias.
 */
export function extractList<T = ListItem>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (Array.isArray(record.data)) return record.data as T[]
    for (const key of Object.keys(record)) {
      if (Array.isArray(record[key])) return record[key] as T[]
    }
  }
  return []
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null
}
