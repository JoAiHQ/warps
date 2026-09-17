import type { PolicyAvailabilityRange } from './types'

export const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

export type Weekday = (typeof WEEKDAYS)[number]

export type OpeningHoursLine = {
  days: string
  time: string
}

export const formatAvailabilityRange = (range: PolicyAvailabilityRange, separator = '–'): string => {
  if (typeof range === 'string') return range.replace(/\s*-\s*/, ` ${separator} `)
  return `${range.start} ${separator} ${range.end}`
}

export const formatMinutes = (value: number | null | undefined, unit: string): string | null => {
  if (value == null) return null
  return `${value} ${unit}`
}

export const formatCapacity = (
  capacity: number | null | undefined,
  unit: 'booking' | 'person' | null | undefined,
  labels: { booking: string; person: string },
): string | null => {
  if (capacity == null) return null
  const unitLabel = unit === 'person' ? labels.person : labels.booking
  return `${capacity} / ${unitLabel}`
}

export const formatFlag = (value: boolean | null | undefined, yes: string, no: string): string | null => {
  if (value == null) return null
  return value ? yes : no
}

export const formatDateList = (dates: string[] | null | undefined, empty = '—'): string => {
  if (!dates?.length) return empty
  return dates.join(', ')
}

export const groupOpeningHours = (
  availability: Record<string, PolicyAvailabilityRange[]> | null | undefined,
  dayLabels: Record<Weekday, string>,
  options?: {
    dayRangeSeparator?: string
    dayListSeparator?: string
    lastDayListSeparator?: string
    timeRangeSeparator?: string
  },
): OpeningHoursLine[] => {
  if (!availability) return []

  const dayRangeSeparator = options?.dayRangeSeparator ?? '–'
  const dayListSeparator = options?.dayListSeparator ?? ', '
  const lastDayListSeparator = options?.lastDayListSeparator ?? ' & '
  const timeRangeSeparator = options?.timeRangeSeparator ?? '–'

  const lines: { dayIndexes: number[]; time: string }[] = []

  for (const [dayIndex, day] of WEEKDAYS.entries()) {
    const ranges = availability[day]
    if (!ranges?.length) continue

    const time = ranges.map((range) => formatAvailabilityRange(range, timeRangeSeparator)).join(', ')
    const existing = lines.find((line) => line.time === time)
    if (existing) existing.dayIndexes.push(dayIndex)
    else lines.push({ dayIndexes: [dayIndex], time })
  }

  return lines.map((line) => ({
    days: formatDayIndexes(line.dayIndexes, dayLabels, dayRangeSeparator, dayListSeparator, lastDayListSeparator),
    time: line.time,
  }))
}

const formatDayIndexes = (
  indexes: number[],
  dayLabels: Record<Weekday, string>,
  dayRangeSeparator: string,
  dayListSeparator: string,
  lastDayListSeparator: string,
): string => {
  const ranges: string[] = []
  let start = indexes[0]!
  let previous = indexes[0]!

  for (const index of indexes.slice(1)) {
    if (index === previous + 1) {
      previous = index
      continue
    }

    ranges.push(formatDayRange(start, previous, dayLabels, dayRangeSeparator))
    start = index
    previous = index
  }

  ranges.push(formatDayRange(start, previous, dayLabels, dayRangeSeparator))

  if (ranges.length <= 1) return ranges[0] ?? ''
  return `${ranges.slice(0, -1).join(dayListSeparator)}${lastDayListSeparator}${ranges.at(-1)}`
}

const formatDayRange = (
  start: number,
  end: number,
  dayLabels: Record<Weekday, string>,
  dayRangeSeparator: string,
): string => {
  const startLabel = dayLabels[WEEKDAYS[start]!]
  if (start === end) return startLabel
  return `${startLabel} ${dayRangeSeparator} ${dayLabels[WEEKDAYS[end]!]}`
}
