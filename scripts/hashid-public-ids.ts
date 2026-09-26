/**
 * Public identifier policy (JoAi)
 *
 * Internal database primary keys must NEVER appear in agent tools, Freigabe,
 * checkout, or other public/agent-facing API JSON. The API encodes opaque
 * hashids (or documented slugs). Warps pass values through unchanged — they
 * must not invent or convert numeric ids.
 */

export type WarpInput = {
  as?: unknown
  name?: unknown
  bot?: unknown
  description?: unknown
  min?: unknown
  type?: unknown
}

export type Warp = {
  bot?: unknown
  actions?: Array<{ inputs?: WarpInput[] }>
}

export type HashidIssue = { file: string; message: string }

/** Not entity PKs exposed in URLs (tax ids, external refs, agent UUIDs). */
export const JOAI_RESOURCE_ID_AS_ALLOWLIST = new Set([
  'vatId',
  'taxId',
  'sourceExternalId',
  'agentId',
  'userId',
])

/** API models still returning integer `id` / `*Id` (fix in API, tracked by contract tests). */
export const API_INTEGER_ID_RESOURCES = ['FulfillmentLocation', 'Address'] as const

export const PUBLIC_ID_NEVER_NUMERIC_HINT =
  'Never use a numeric internal database id — only the public hashid (or slug where documented).'

const HASHID_TEXT = /hash\s*-?\s*id/i

export function isJoaiResourceIdentifierField(as: string): boolean {
  if (JOAI_RESOURCE_ID_AS_ALLOWLIST.has(as)) return false
  return as.endsWith('Id') || as.endsWith('_id')
}

export function textDocumentsHashid(...parts: Array<string | undefined>): boolean {
  const text = parts.filter(Boolean).join(' ')
  return HASHID_TEXT.test(text)
}

function descriptionStrings(description: unknown): string[] {
  if (!description || typeof description !== 'object') return []
  return Object.values(description as Record<string, unknown>).filter(
    (v): v is string => typeof v === 'string',
  )
}

export function inputDocumentsHashid(input: WarpInput): boolean {
  const desc = descriptionStrings(input.description)
  return textDocumentsHashid(
    typeof input.bot === 'string' ? input.bot : undefined,
    ...desc,
  )
}

export function inputDocumentsPublicIdentifier(input: WarpInput): boolean {
  if (inputDocumentsHashid(input)) return true
  const as = typeof input.as === 'string' ? input.as : ''
  const text = [
    typeof input.bot === 'string' ? input.bot : undefined,
    ...descriptionStrings(input.description),
  ]
    .filter(Boolean)
    .join(' ')
  if (/\bslug\b/i.test(text)) return true
  if (as === 'product_id' || as.endsWith('_id')) return /\bslug\b/i.test(text)
  return false
}

export function stripNumericPkValidation(input: WarpInput): boolean {
  if (input.type === 'string' && input.min === 1) {
    delete input.min
    return true
  }
  return false
}

export function ensurePublicIdentifierDocumentation(input: WarpInput): void {
  const hint = PUBLIC_ID_NEVER_NUMERIC_HINT
  const existing = typeof input.bot === 'string' ? input.bot.trim() : ''
  if (existing) {
    if (!/numeric internal database id/i.test(existing)) {
      input.bot = `${existing} ${hint}`
    }
  } else {
    input.bot = `Opaque public hashid from the list or get API. ${hint}`
  }
  const desc = input.description
  if (!desc || typeof desc !== 'object') {
    input.description = { en: 'Public hashid (not an internal database id)' }
    return
  }
  const en = (desc as Record<string, unknown>).en
  if (typeof en !== 'string' || !textDocumentsHashid(en)) {
    ;(desc as Record<string, unknown>).en =
      typeof en === 'string' && en.length > 0
        ? `${en} (public hashid, not an internal database id)`
        : 'Public hashid (not an internal database id)'
  }
}

export function findInputByAs(warp: Warp, inputAs: string): WarpInput | undefined {
  for (const action of warp.actions ?? []) {
    for (const input of action.inputs ?? []) {
      if (input.as === inputAs) return input
    }
  }
  return undefined
}

/** Fulfillment / address / checkout warps: root bot must mention hashids. */
export const HASHID_WARP_BOT_RULES: Array<{ file: string }> = [
  { file: 'joai/fulfillment-location-list.json' },
  { file: 'joai/fulfillment-location-create.json' },
  { file: 'joai/fulfillment-location-update.json' },
  { file: 'joai/fulfillment-location-delete.json' },
  { file: 'joai/address-list.json' },
  { file: 'joai/address-store.json' },
  { file: 'joai/checkout-fulfillment-locations.json' },
]

export function checkJoaiPublicIdentifierInputs(warp: Warp, relPath: string): HashidIssue[] {
  if (!relPath.startsWith('joai/')) return []

  const issues: HashidIssue[] = []

  for (const action of warp.actions ?? []) {
    for (const input of action.inputs ?? []) {
      const as = input.as
      if (typeof as !== 'string' || !isJoaiResourceIdentifierField(as)) continue

      if (input.type === 'string' && input.min === 1) {
        issues.push({
          file: relPath,
          message: `Input "${as}" has min: 1 on a string — internal database ids must not be validated or implied`,
        })
      }
      if (!inputDocumentsPublicIdentifier(input)) {
        issues.push({
          file: relPath,
          message: `Input "${as}" must document a public hashid or slug — never internal database ids`,
        })
      }
    }
  }

  if (HASHID_WARP_BOT_RULES.some((r) => r.file === relPath)) {
    const bot = typeof warp.bot === 'string' ? warp.bot : ''
    if (!textDocumentsHashid(bot) && !/numeric internal database id/i.test(bot)) {
      issues.push({
        file: relPath,
        message: `Warp bot must state that list/create API ids are hashids, not internal database ids`,
      })
    }
  }

  return issues
}

/** @deprecated Use checkJoaiPublicIdentifierInputs — kept for targeted contract tests. */
export const HASHID_PUBLIC_ID_INPUTS: Array<{ file: string; inputAs: string }> = [
  { file: 'joai/fulfillment-location-update.json', inputAs: 'locationId' },
  { file: 'joai/fulfillment-location-update.json', inputAs: 'addressId' },
  { file: 'joai/fulfillment-location-create.json', inputAs: 'addressId' },
  { file: 'joai/fulfillment-location-delete.json', inputAs: 'locationId' },
  { file: 'joai/address-update.json', inputAs: 'addressId' },
  { file: 'joai/address-delete.json', inputAs: 'addressId' },
  { file: 'joai/checkout-snapshot.json', inputAs: 'billingAddressId' },
  { file: 'joai/checkout-snapshot.json', inputAs: 'shippingAddressId' },
  { file: 'joai/checkout-snapshot.json', inputAs: 'fulfillmentLocationId' },
  { file: 'joai/checkout-snapshot.json', inputAs: 'shippingRateId' },
  { file: 'joai/subscription-delivery-update.json', inputAs: 'shippingAddressId' },
  { file: 'joai/subscription-delivery-update.json', inputAs: 'fulfillmentLocationId' },
  { file: 'joai/subscription-delivery-update.json', inputAs: 'shippingRateId' },
]

export function checkHashidPublicIdInputs(warp: Warp, relPath: string): HashidIssue[] {
  return checkJoaiPublicIdentifierInputs(warp, relPath)
}

/** Detect sequential integer ids leaked in agent-facing JSON (API bug). */
export function looksLikeLeakedSequentialId(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'number' && Number.isInteger(value)) return true
  if (typeof value === 'string' && /^\d+$/.test(value)) return true
  return false
}

const PUBLIC_ID_JSON_KEY = /^(id|[a-zA-Z]+Id)$/

export function collectLeakedSequentialIds(
  value: unknown,
  path = '',
  depth = 0,
): Array<{ path: string; value: unknown }> {
  if (depth > 12 || value === null || value === undefined) return []
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => collectLeakedSequentialIds(item, `${path}[${i}]`, depth + 1))
  }
  if (typeof value === 'object') {
    const out: Array<{ path: string; value: unknown }> = []
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      const childPath = path ? `${path}.${key}` : key
      if (PUBLIC_ID_JSON_KEY.test(key) && looksLikeLeakedSequentialId(child)) {
        out.push({ path: childPath, value: child })
      }
      out.push(...collectLeakedSequentialIds(child, childPath, depth + 1))
    }
    return out
  }
  return []
}

export function assertNoLeakedSequentialIdsInJson(body: unknown, label: string): void {
  const leaks = collectLeakedSequentialIds(body)
  if (leaks.length > 0) {
    const sample = leaks
      .slice(0, 5)
      .map((l) => `${l.path}=${JSON.stringify(l.value)}`)
      .join(', ')
    throw new Error(
      `${label}: response exposes internal database id(s) — ${sample}${leaks.length > 5 ? ` (+${leaks.length - 5} more)` : ''}`,
    )
  }
}

export function assertPublicHashid(value: unknown, label: string): void {
  if (value === null || value === undefined) return
  if (looksLikeLeakedSequentialId(value)) {
    throw new Error(
      `${label} must be a hashid string, got leaked internal database id: ${JSON.stringify(value)}`,
    )
  }
  if (typeof value !== 'string' || value.length < 8 || !/^[A-Za-z0-9]+$/.test(value)) {
    throw new Error(`${label} must be a hashid string, got: ${JSON.stringify(value)}`)
  }
}

export function collectPublicIdsFromFulfillmentLocationRow(row: Record<string, unknown>): Array<{
  path: string
  value: unknown
}> {
  const out: Array<{ path: string; value: unknown }> = []
  if ('id' in row) out.push({ path: 'id', value: row.id })
  if ('addressId' in row && row.addressId != null) {
    out.push({ path: 'addressId', value: row.addressId })
  }
  return out
}

export function collectPublicIdsFromAddressRow(row: Record<string, unknown>): Array<{
  path: string
  value: unknown
}> {
  if (!('id' in row)) return []
  return [{ path: 'id', value: row.id }]
}
