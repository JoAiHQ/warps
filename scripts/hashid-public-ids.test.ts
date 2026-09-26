// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  assertPublicHashid,
  checkHashidPublicIdInputs,
  collectPublicIdsFromAddressRow,
  collectPublicIdsFromFulfillmentLocationRow,
  inputDocumentsHashid,
  looksLikeLeakedSequentialId,
  textDocumentsHashid,
} from './hashid-public-ids.js'

const fixture = JSON.parse(
  readFileSync(resolve(__dirname, 'fixtures/joai-vleap-public-ids.snapshot.json'), 'utf8'),
)

describe('hashid-public-ids helpers', () => {
  it('detects leaked sequential ids', () => {
    expect(looksLikeLeakedSequentialId(2)).toBe(true)
    expect(looksLikeLeakedSequentialId('9')).toBe(true)
    expect(looksLikeLeakedSequentialId('pEvPomgg7Q3z')).toBe(false)
    expect(looksLikeLeakedSequentialId(null)).toBe(false)
  })

  it('recognizes hashid documentation text', () => {
    expect(textDocumentsHashid('The hashid of the service')).toBe(true)
    expect(textDocumentsHashid('The hash ID of the variation')).toBe(true)
    expect(textDocumentsHashid('The fulfillment location ID')).toBe(false)
  })

  it('flags fixture API rows as leaked sequential ids (pre-API-fix)', () => {
    for (const { path, value } of collectPublicIdsFromFulfillmentLocationRow(
      fixture.fulfillmentLocation,
    )) {
      expect(looksLikeLeakedSequentialId(value), `fulfillmentLocation.${path}`).toBe(true)
    }
    for (const { path, value } of collectPublicIdsFromAddressRow(fixture.address)) {
      expect(looksLikeLeakedSequentialId(value), `address.${path}`).toBe(true)
    }
    expect(looksLikeLeakedSequentialId(fixture.serviceControl.id)).toBe(false)
    expect(looksLikeLeakedSequentialId(fixture.variationControl.id)).toBe(false)
  })

  it('assertPublicHashid rejects fixture integers and accepts control hashids', () => {
    expect(() => assertPublicHashid(fixture.fulfillmentLocation.id, 'location.id')).toThrow(
      /leaked sequential/,
    )
    expect(() => assertPublicHashid(fixture.address.id, 'address.id')).toThrow(/leaked sequential/)
    expect(() => assertPublicHashid(fixture.serviceControl.id, 'service.id')).not.toThrow()
  })

  it('inputDocumentsHashid accepts service-update style copy', () => {
    expect(
      inputDocumentsHashid({
        as: 'service_id',
        description: { en: 'The hashid of the service to update' },
        bot: 'The service hash ID.',
      }),
    ).toBe(true)
  })
})

describe('hashid warp metadata (joai fulfillment + address)', () => {
  const warpsRoot = resolve(__dirname, '../warps')

  for (const rel of [
    'joai/fulfillment-location-update.json',
    'joai/fulfillment-location-list.json',
    'joai/address-list.json',
    'joai/checkout-fulfillment-locations.json',
  ]) {
    it(`${rel} passes hashid public-id checks`, () => {
      const warp = JSON.parse(readFileSync(resolve(warpsRoot, rel), 'utf8'))
      const issues = checkHashidPublicIdInputs(warp, rel)
      expect(issues).toEqual([])
    })
  }
})
