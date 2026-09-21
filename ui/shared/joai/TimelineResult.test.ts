import { describe, expect, it } from 'vitest'
import {
  formatTimelineTime,
  getFormFieldRows,
  getUpdateFieldLabels,
  humanizeTimelineLabel,
} from './TimelineResult'

describe('humanizeTimelineLabel', () => {
  it('maps known activity and channel labels', () => {
    expect(humanizeTimelineLabel('update')).toBe('Contact updated')
    expect(humanizeTimelineLabel('whatsapp-personal')).toBe('WhatsApp')
    expect(humanizeTimelineLabel('external')).toBe('Contact')
  })
})

describe('formatTimelineTime', () => {
  it('shows time only for the same day', () => {
    const now = new Date('2026-09-21T15:00:00')
    const formatted = formatTimelineTime('2026-09-21T11:13:00', now)
    expect(formatted).toMatch(/11:13/)
    expect(formatted).not.toMatch(/Sep/)
  })

  it('includes the date for other days', () => {
    const now = new Date('2026-09-21T15:00:00')
    const formatted = formatTimelineTime('2026-09-20T11:13:00', now)
    expect(formatted).toMatch(/Sep/)
    expect(formatted).toMatch(/20/)
  })
})

describe('getUpdateFieldLabels', () => {
  it('humanizes meta.fields', () => {
    expect(getUpdateFieldLabels({ fields: ['name', 'website', 'phone'] })).toEqual([
      'Name',
      'Website',
      'Phone',
    ])
  })

  it('returns empty when fields are missing', () => {
    expect(getUpdateFieldLabels(null)).toEqual([])
    expect(getUpdateFieldLabels({})).toEqual([])
  })
})

describe('getFormFieldRows', () => {
  it('extracts non-empty form values', () => {
    expect(getFormFieldRows({ form: { name: 'Tanja', email: '', message: 'Hello' } })).toEqual([
      { label: 'Name', value: 'Tanja' },
      { label: 'Message', value: 'Hello' },
    ])
  })
})
