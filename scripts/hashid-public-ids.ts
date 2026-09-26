/**
 * Public API identifiers (fulfillment locations, addresses, etc.) must be
 * hashids end-to-end. Warps pass values through unchanged; the API encodes.
 * These helpers enforce warp metadata and optional live API contract checks.
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

/** Inputs that must document hashid in description/bot (not numeric PKs). */
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
  { file: 'joai/subscription-delivery-update.json', inputAs: 'shippingAddressId' },
  { file: 'joai/subscription-delivery-update.json', inputAs: 'fulfillmentLocationId' },
  { file: 'joai/subscription-delivery-update.json', inputAs: 'shippingRateId' },
]

/** List/checkout warps: root bot must tell the agent ids from the API are hashids. */
export const HASHID_WARP_BOT_RULES: Array<{ file: string }> = [
  { file: 'joai/fulfillment-location-list.json' },
  { file: 'joai/fulfillment-location-create.json' },
  { file: 'joai/fulfillment-location-update.json' },
  { file: 'joai/fulfillment-location-delete.json' },
  { file: 'joai/address-list.json' },
  { file: 'joai/address-store.json' },
  { file: 'joai/checkout-fulfillment-locations.json' },
]

const HASHID_TEXT = /hash\s*-?\s*id/i

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

export function findInputByAs(warp: Warp, inputAs: string): WarpInput | undefined {
  for (const action of warp.actions ?? []) {
    for (const input of action.inputs ?? []) {
      if (input.as === inputAs) return input
    }
  }
  return undefined
}

export function checkHashidPublicIdInputs(warp: Warp, relPath: string): HashidIssue[] {
  const issues: HashidIssue[] = []
  const rules = HASHID_PUBLIC_ID_INPUTS.filter((r) => r.file === relPath)

  for (const { inputAs } of rules) {
    const input = findInputByAs(warp, inputAs)
    if (!input) {
      issues.push({
        file: relPath,
        message: `Expected input as "${inputAs}" for hashid documentation check but it was not found`,
      })
      continue
    }
    if (!inputDocumentsHashid(input)) {
      issues.push({
        file: relPath,
        message: `Input "${inputAs}" must mention hashid in description or bot (public API ids are hashids, not integers)`,
      })
    }
    if (input.type === 'string' && input.min === 1) {
      issues.push({
        file: relPath,
        message: `Input "${inputAs}" has min: 1 on a string — use hashid docs instead of numeric PK validation`,
      })
    }
  }

  if (HASHID_WARP_BOT_RULES.some((r) => r.file === relPath)) {
    const bot = typeof warp.bot === 'string' ? warp.bot : ''
    if (!textDocumentsHashid(bot)) {
      issues.push({
        file: relPath,
        message: `Warp bot must mention hashid for ids returned by list/create APIs`,
      })
    }
  }

  return issues
}

/** Detect sequential integer ids leaked in agent-facing JSON (API bug). */
export function looksLikeLeakedSequentialId(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'number' && Number.isInteger(value)) return true
  if (typeof value === 'string' && /^\d+$/.test(value)) return true
  return false
}

export function assertPublicHashid(value: unknown, label: string): void {
  if (value === null || value === undefined) return
  if (looksLikeLeakedSequentialId(value)) {
    throw new Error(`${label} must be a hashid string, got leaked sequential id: ${JSON.stringify(value)}`)
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
