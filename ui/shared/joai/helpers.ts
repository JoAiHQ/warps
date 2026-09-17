import { ListItem } from './ListResult'

/**
 * Extract the array of items from a warp collect result.
 * The warp output is usually the response envelope `{ data: [...], meta: ... }`,
 * but can also be a bare array, an object keyed by the output alias, or the
 * executor `_DATA` wrapper around that envelope. Descends into `data`/`_DATA`
 * wrappers until the first array is found (handles nested wraps defensively).
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

/**
 * Extract a single resource object from a warp collect result.
 * Unwraps `{ data: resource }` and executor `{ _DATA: { data: resource } }`
 * envelopes. Flat mapped outputs (e.g. stats keys) are returned as-is.
 */
export function extractRecord(value: unknown): Record<string, unknown> | null {
  const record = asRecord(value)
  if (!record) return null

  const wrapped = asRecord(record.data) ?? asRecord(record._DATA)
  if (wrapped) {
    const nested = extractRecord(wrapped)
    if (nested) return nested
  }

  return record
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null
}

export function pickValue(record: Record<string, unknown> | null | undefined, keys: string[]): unknown {
  if (!record) return undefined
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) return record[key]
  }
  return undefined
}

export function humanizeKey(key: string): string {
  const spaced = key
    .replace(/_/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .trim()
    .toLowerCase()
  return spaced.replace(/^\w/, (char) => char.toUpperCase())
}

export function valueToDisplay(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) {
    if (value.length === 0) return '—'
    if (value.every((item) => typeof item === 'string' || typeof item === 'number')) {
      return value.join(', ')
    }
    return `${value.length} items`
  }
  if (typeof value === 'object') {
    const localized = resolveLocalized(value)
    if (localized !== '—') return localized
    return JSON.stringify(value)
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
      return formatDateShort(trimmed) ?? trimmed
    }
    return trimmed || '—'
  }
  return String(value)
}

export function resolveLocalized(value: unknown, locale = 'en'): string {
  if (typeof value === 'string' && value.trim()) return value
  const record = asRecord(value)
  if (!record) return '—'
  const preferred = record[locale] ?? record.en
  if (typeof preferred === 'string' && preferred.trim()) return preferred
  const first = Object.values(record).find((entry) => typeof entry === 'string' && entry.trim())
  return typeof first === 'string' ? first : '—'
}

export function formatCents(value: unknown, currency = 'EUR'): string | null {
  if (typeof value !== 'number' || Number.isNaN(value)) return null
  return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }).format(value / 100)
}

export function formatDateShort(value: unknown): string | null {
  if (!value) return null
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateText(value: unknown, max = 120): string | null {
  if (typeof value !== 'string' || !value.trim()) return null
  if (value.length <= max) return value
  return `${value.slice(0, max - 1)}…`
}

export function nestedName(value: unknown, keys: string[] = ['name']): string | null {
  const record = asRecord(value)
  if (!record) return null
  for (const key of keys) {
    const resolved = resolveLocalized(record[key])
    if (resolved !== '—') return resolved
  }
  return null
}

export function priceFromVariations(product: Record<string, unknown>): number | null {
  const variations = Array.isArray(product.variations) ? product.variations : []
  const prices = variations
    .map((variation) => asRecord(variation)?.price)
    .filter((price): price is number => typeof price === 'number')
  if (!prices.length) return typeof product.price === 'number' ? product.price : null
  return Math.min(...prices)
}

export function primaryImageUrl(value: Record<string, unknown>): string | null {
  const primary = asRecord(value.primaryImage)
  if (typeof primary?.url === 'string' && primary.url) return primary.url
  const images = Array.isArray(value.images) ? value.images : []
  for (const image of images) {
    const url = asRecord(image)?.url
    if (typeof url === 'string' && url) return url
  }
  return null
}

export function truncateMiddle(value: unknown, head = 6, tail = 4): string | null {
  if (typeof value !== 'string' || !value) return null
  if (value.length <= head + tail + 1) return value
  return `${value.slice(0, head)}…${value.slice(-tail)}`
}

export function mapListItems<T extends Record<string, unknown>>(
  data: unknown,
  mapper: (item: Record<string, unknown>) => T,
): T[] {
  return extractList<Record<string, unknown>>(data).map((item) => mapper(asRecord(item) ?? {}))
}
