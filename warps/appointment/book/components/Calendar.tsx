import { startOfDay, isSameDay, formatMonthYear, getMonthDays } from '../helpers/format'

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

type Props = {
  currentMonth: Date
  selectedDate: Date | null
  minDate: Date
  maxDate: Date
  disabledWeekdays: Set<number>
  onMonthChange: (delta: number) => void
  onSelect: (date: Date) => void
  locale: string
}

export function Calendar({ currentMonth, selectedDate, minDate, maxDate, disabledWeekdays, onMonthChange, onSelect, locale }: Props) {
  const today = startOfDay(new Date())
  const days = getMonthDays(currentMonth.getFullYear(), currentMonth.getMonth())

  const canGoPrev = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  const canGoNext = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1) <= new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 1)

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onMonthChange(-1)}
          disabled={!canGoPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-400"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatMonthYear(currentMonth, locale)}</span>
        <button
          onClick={() => onMonthChange(1)}
          disabled={!canGoNext}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600 dark:text-gray-400"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 dark:text-gray-500 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />

          const dayOfWeek = (date.getDay() + 6) % 7
          const isPast = startOfDay(date) < today
          const isBeyond = startOfDay(date) > maxDate
          const isDisabled = isPast || isBeyond || disabledWeekdays.has(dayOfWeek)
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
          const isToday = isSameDay(date, today)

          return (
            <button
              key={date.toISOString()}
              onClick={() => !isDisabled && onSelect(date)}
              disabled={isDisabled}
              className={[
                'relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors',
                isSelected
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold'
                  : isDisabled
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer',
              ].join(' ')}
            >
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
              )}
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
