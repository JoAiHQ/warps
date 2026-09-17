import { describe, expect, it } from 'vitest'
import {
  formatAvailabilityRange,
  formatCapacity,
  formatDateList,
  formatFlag,
  formatMinutes,
  groupOpeningHours,
} from './helpers'

describe('formatAvailabilityRange', () => {
  it('formats string and object ranges', () => {
    expect(formatAvailabilityRange('09:00-17:00')).toBe('09:00 – 17:00')
    expect(formatAvailabilityRange({ start: '10:00', end: '14:00' })).toBe('10:00 – 14:00')
  })
})

describe('groupOpeningHours', () => {
  const days = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  }

  it('groups days that share the same hours', () => {
    expect(groupOpeningHours({
      monday: ['09:00-17:00'],
      tuesday: ['09:00-17:00'],
      wednesday: ['09:00-17:00'],
      thursday: ['09:00-17:00'],
      friday: ['09:00-17:00'],
      sunday: ['09:00-17:00'],
    }, days)).toEqual([
      { days: 'Mon – Fri & Sun', time: '09:00 – 17:00' },
    ])
  })

  it('keeps different hours on separate lines', () => {
    expect(groupOpeningHours({
      monday: ['09:00-17:00'],
      saturday: ['10:00-14:00'],
    }, days)).toEqual([
      { days: 'Mon', time: '09:00 – 17:00' },
      { days: 'Sat', time: '10:00 – 14:00' },
    ])
  })

  it('returns empty when nothing is open', () => {
    expect(groupOpeningHours({}, days)).toEqual([])
    expect(groupOpeningHours(null, days)).toEqual([])
  })
})

describe('format helpers', () => {
  it('formats minutes, capacity, flags, and dates', () => {
    expect(formatMinutes(30, 'min')).toBe('30 min')
    expect(formatMinutes(null, 'min')).toBeNull()
    expect(formatCapacity(3, 'person', { booking: 'booking', person: 'person' })).toBe('3 / person')
    expect(formatFlag(true, 'Yes', 'No')).toBe('Yes')
    expect(formatFlag(null, 'Yes', 'No')).toBeNull()
    expect(formatDateList(['2026-12-24', '2026-12-25'])).toBe('2026-12-24, 2026-12-25')
    expect(formatDateList([])).toBe('—')
  })
})
