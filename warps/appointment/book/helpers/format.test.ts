import { describe, it, expect } from 'vitest'
import { startOfDay, isSameDay, formatTime, formatMonthYear, formatDayFull, formatSlotRange, getMonthDays } from './format'

describe('startOfDay', () => {
  it('zeroes out time components', () => {
    const d = startOfDay(new Date('2026-04-18T15:30:45Z'))
    expect(d.getHours()).toBe(0)
    expect(d.getMinutes()).toBe(0)
    expect(d.getSeconds()).toBe(0)
    expect(d.getMilliseconds()).toBe(0)
  })

  it('does not mutate the input', () => {
    const input = new Date('2026-04-18T15:30:00Z')
    startOfDay(input)
    expect(input.getHours()).not.toBe(0)
  })
})

describe('isSameDay', () => {
  it('returns true for same calendar day', () => {
    expect(isSameDay(new Date(2026, 3, 18, 8), new Date(2026, 3, 18, 22))).toBe(true)
  })

  it('returns false for different days', () => {
    expect(isSameDay(new Date(2026, 3, 18), new Date(2026, 3, 19))).toBe(false)
  })

  it('returns false for same day in different months', () => {
    expect(isSameDay(new Date(2026, 3, 18), new Date(2026, 4, 18))).toBe(false)
  })
})

describe('formatTime', () => {
  it('formats a UTC ISO string to locale time', () => {
    const result = formatTime('2026-04-18T10:00:00Z', 'UTC', 'en-US')
    expect(result).toContain('10')
    expect(result).toContain('00')
  })

  it('respects the given timezone', () => {
    const utc = formatTime('2026-04-18T10:00:00Z', 'UTC', 'en-US')
    const vienna = formatTime('2026-04-18T10:00:00Z', 'Europe/Vienna', 'en-US')
    expect(utc).not.toBe(vienna)
  })

  it('handles null timezone', () => {
    expect(() => formatTime('2026-04-18T10:00:00Z', null, 'en-US')).not.toThrow()
  })
})

describe('getMonthDays', () => {
  it('returns the correct number of days for a month', () => {
    const days = getMonthDays(2026, 3) // April 2026
    const nonNull = days.filter(Boolean)
    expect(nonNull).toHaveLength(30)
  })

  it('pads with nulls so the first day starts on Monday column', () => {
    // April 2026 starts on Wednesday → offset 2 (Mon=0)
    const days = getMonthDays(2026, 3)
    expect(days[0]).toBeNull()
    expect(days[1]).toBeNull()
    expect(days[2]).not.toBeNull()
  })

  it('handles February in a leap year', () => {
    const days = getMonthDays(2024, 1) // Feb 2024
    expect(days.filter(Boolean)).toHaveLength(29)
  })
})

describe('formatSlotRange', () => {
  it('formats start and end separated by –', () => {
    const slot = { startAt: '2026-04-18T09:00:00Z', endAt: '2026-04-18T09:30:00Z', agentUuid: '', agentName: '' }
    const result = formatSlotRange(slot, 'UTC', 'en-US')
    expect(result).toContain('–')
    expect(result).toMatch(/09/)
  })
})

describe('formatMonthYear', () => {
  it('formats month and year', () => {
    const result = formatMonthYear(new Date(2026, 3, 1), 'en-US')
    expect(result).toContain('2026')
    expect(result.toLowerCase()).toContain('april')
  })
})

describe('formatDayFull', () => {
  it('includes weekday, month, and day', () => {
    const result = formatDayFull(new Date(2026, 3, 18), 'en-US') // Saturday
    expect(result.toLowerCase()).toContain('april')
    expect(result).toContain('18')
  })
})
