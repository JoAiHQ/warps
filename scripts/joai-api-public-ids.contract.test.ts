// @vitest-environment node
/**
 * Optional live contract against JoAi API. Enable when API encodes public ids:
 *   JOAI_API_CONTRACT=1 JOAI_TEAM_SLUG=vleap JOAI_AGENT_AUTH_KEY=... npm test
 */
import { describe, expect, it } from 'vitest'
import {
  assertPublicHashid,
  collectPublicIdsFromAddressRow,
  collectPublicIdsFromFulfillmentLocationRow,
} from './hashid-public-ids.js'

const runLive = process.env.JOAI_API_CONTRACT === '1'
const team = process.env.JOAI_TEAM_SLUG ?? 'vleap'
const authKey = process.env.JOAI_AGENT_AUTH_KEY
const apiBase = process.env.JOAI_API_BASE ?? 'https://api.joai.ai'

async function apiGet(path: string): Promise<unknown> {
  if (!authKey) throw new Error('JOAI_AGENT_AUTH_KEY is required for live API contract tests')
  const res = await fetch(`${apiBase}${path}`, {
    headers: {
      'X-Agent-Auth-Key': authKey,
      'X-Team': team,
      Accept: 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

describe.skipIf(!runLive)('JoAi API public id contract (live)', () => {
  it('team fulfillment-locations expose hashid id fields', async () => {
    const body = (await apiGet(`/v1/teams/${team}/fulfillment-locations`)) as {
      data?: unknown[]
    }
    const rows = Array.isArray(body.data) ? body.data : []
    for (const row of rows) {
      if (!row || typeof row !== 'object') continue
      for (const { path, value } of collectPublicIdsFromFulfillmentLocationRow(
        row as Record<string, unknown>,
      )) {
        assertPublicHashid(value, `fulfillment-locations[].${path}`)
      }
    }
  })

  it('team billing addresses expose hashid id fields', async () => {
    const body = (await apiGet(`/v1/addresses?team=${encodeURIComponent(team)}`)) as {
      data?: unknown[]
    }
    const rows = Array.isArray(body.data) ? body.data : []
    for (const row of rows) {
      if (!row || typeof row !== 'object') continue
      for (const { path, value } of collectPublicIdsFromAddressRow(row as Record<string, unknown>)) {
        assertPublicHashid(value, `addresses[].${path}`)
      }
    }
  })

  it('checkout fulfillment-locations expose hashid id fields', async () => {
    const body = (await apiGet(
      `/v1/shops/${team}/checkout/fulfillment-locations`,
    )) as { data?: unknown[] }
    const rows = Array.isArray(body.data) ? body.data : []
    expect(rows.length).toBeGreaterThan(0)
    for (const row of rows) {
      if (!row || typeof row !== 'object') continue
      for (const { path, value } of collectPublicIdsFromFulfillmentLocationRow(
        row as Record<string, unknown>,
      )) {
        assertPublicHashid(value, `checkout.fulfillment-locations[].${path}`)
      }
    }
  })
})

describe('JoAi API public id contract (offline gate)', () => {
  it('documents how to run live contract after API hashid rollout', () => {
    expect(runLive).toBe(false)
    expect(process.env.JOAI_API_CONTRACT ?? '').not.toBe('1')
  })
})
