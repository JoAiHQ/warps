import { formatDayFull, formatTime } from '../helpers/format'
import type { AvailabilitySlot } from '../warp.types'
import { TimezoneSelect } from './TimezoneSelect'

type Props = {
  selectedDate: Date
  slots: AvailabilitySlot[]
  loading: boolean
  error: string | null
  displayTimezone: string
  locale: string
  noSlotsLabel: string
  timeZoneLabel: string
  onSelect: (slot: AvailabilitySlot) => void
  onTimezoneChange: (tz: string) => void
}

export function SlotList({ selectedDate, slots, loading, error, displayTimezone, locale, noSlotsLabel, timeZoneLabel, onSelect, onTimezoneChange }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatDayFull(selectedDate, locale)}</p>
        <TimezoneSelect value={displayTimezone} label={timeZoneLabel} onChange={onTimezoneChange} />
      </div>
      {loading ? (
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      ) : slots.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">{noSlotsLabel}</p>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => onSelect(slot)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 py-2.5 px-3 text-sm font-medium text-gray-900 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
            >
              {formatTime(slot.startAt, displayTimezone, locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
