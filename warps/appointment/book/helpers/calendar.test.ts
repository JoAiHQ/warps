import { describe, it, expect } from 'vitest'
import { toCalendarDate, googleCalendarUrl, outlookCalendarUrl, buildIcsContent } from './calendar'

const START = '2026-04-22T09:00:00.000Z'
const END = '2026-04-22T09:30:00.000Z'

describe('toCalendarDate', () => {
  it('strips dashes, colons, and milliseconds', () => {
    expect(toCalendarDate(START)).toBe('20260422T090000Z')
  })
})

describe('googleCalendarUrl', () => {
  it('includes the correct base URL', () => {
    expect(googleCalendarUrl('Test', START, END)).toContain('calendar.google.com')
  })

  it('encodes title and date range', () => {
    const url = googleCalendarUrl('My Meeting', START, END)
    expect(url).toContain('My+Meeting')
    expect(url).toContain('20260422T090000Z%2F20260422T093000Z')
  })

  it('includes location when joinUrl is provided', () => {
    const url = googleCalendarUrl('Test', START, END, 'https://joai.ai/join')
    expect(url).toContain('location=')
    expect(url).toContain('joai.ai')
  })

  it('omits location when joinUrl is not provided', () => {
    const url = googleCalendarUrl('Test', START, END)
    expect(url).not.toContain('location=')
  })
})

describe('outlookCalendarUrl', () => {
  it('includes the correct base URL', () => {
    expect(outlookCalendarUrl('Test', START, END)).toContain('outlook.live.com')
  })

  it('encodes subject and times', () => {
    const url = outlookCalendarUrl('Demo Call', START, END)
    expect(url).toContain('Demo+Call')
    expect(url).toContain(encodeURIComponent(START))
  })

  it('includes location when joinUrl is provided', () => {
    const url = outlookCalendarUrl('Test', START, END, 'https://joai.ai/join')
    expect(url).toContain('location=')
  })
})

describe('buildIcsContent', () => {
  it('produces valid VCALENDAR structure', () => {
    const ics = buildIcsContent('Team Sync', START, END)
    expect(ics).toContain('BEGIN:VCALENDAR')
    expect(ics).toContain('END:VCALENDAR')
    expect(ics).toContain('BEGIN:VEVENT')
    expect(ics).toContain('END:VEVENT')
  })

  it('sets DTSTART and DTEND', () => {
    const ics = buildIcsContent('Team Sync', START, END)
    expect(ics).toContain('DTSTART:20260422T090000Z')
    expect(ics).toContain('DTEND:20260422T093000Z')
  })

  it('sets SUMMARY to the title', () => {
    const ics = buildIcsContent('My Appointment', START, END)
    expect(ics).toContain('SUMMARY:My Appointment')
  })

  it('includes LOCATION when joinUrl is provided', () => {
    const ics = buildIcsContent('Test', START, END, 'https://joai.ai/join')
    expect(ics).toContain('LOCATION:https://joai.ai/join')
  })

  it('omits LOCATION when joinUrl is not provided', () => {
    const ics = buildIcsContent('Test', START, END)
    expect(ics).not.toContain('LOCATION')
  })

  it('uses CRLF line endings', () => {
    const ics = buildIcsContent('Test', START, END)
    expect(ics).toContain('\r\n')
  })
})
