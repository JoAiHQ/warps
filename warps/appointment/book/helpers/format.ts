import type { AvailabilitySlot } from '../warp.types'

export function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function formatTime(iso: string, timezone: string | null | undefined, locale: string): string {
  return new Date(iso).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone ?? undefined,
  })
}

export function formatMonthYear(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
}

export function formatDayFull(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })
}

export function formatSlotRange(slot: AvailabilitySlot, displayTz: string, locale: string): string {
  const start = formatTime(slot.startAt, displayTz, locale)
  const end = formatTime(slot.endAt, displayTz, locale)
  return `${start} – ${end}`
}

export function formatTokenAmount(amount: string | undefined, token: string | null): string {
  if (!amount) return ''
  const trimmed = parseFloat(amount).toString()
  return token ? `${trimmed} ${token}` : trimmed
}

export function getMonthDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7 // Monday-based
  const days: (Date | null)[] = Array(startOffset).fill(null)
  const count = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= count; d++) {
    days.push(new Date(year, month, d))
  }
  return days
}
