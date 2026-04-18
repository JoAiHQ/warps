import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { AvailabilitySlot, BookPublicData, BookingResult } from './warp.types'

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function formatTime(iso: string, timezone: string | null | undefined, locale: string): string {
  return new Date(iso).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone ?? undefined,
  })
}

function formatMonthYear(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
}

function formatDayFull(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })
}

function formatSlotRange(slot: AvailabilitySlot, displayTz: string, locale: string): string {
  const start = formatTime(slot.startAt, displayTz, locale)
  const end = formatTime(slot.endAt, displayTz, locale)
  return `${start} – ${end}`
}

function getMonthDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  // Monday-based week: Monday=0 ... Sunday=6
  const startOffset = (first.getDay() + 6) % 7
  const days: (Date | null)[] = Array(startOffset).fill(null)
  const count = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= count; d++) {
    days.push(new Date(year, month, d))
  }
  return days
}

type CalendarProps = {
  currentMonth: Date
  selectedDate: Date | null
  minDate: Date
  maxDate: Date
  disabledWeekdays: Set<number> // 0=Mon ... 6=Sun
  onMonthChange: (delta: number) => void
  onSelect: (date: Date) => void
  locale: string
}

function Calendar({ currentMonth, selectedDate, minDate, maxDate, disabledWeekdays, onMonthChange, onSelect, locale }: CalendarProps) {
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

          const dayOfWeek = (date.getDay() + 6) % 7 // 0=Mon
          const isPast = startOfDay(date) < today
          const isBeyond = startOfDay(date) > maxDate
          const isUnavailable = disabledWeekdays.has(dayOfWeek)
          const isDisabled = isPast || isBeyond || isUnavailable
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

function Main() {
  const { data, executeTool, locale } = useAppContext<BookPublicData>()
  const tr = useTranslations(translations).book

  const policy = data?.policy ?? null
  const agentTimezone = policy?.timezone ?? null
  const displayTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const maxDaysAhead = policy?.maxDaysAhead ?? 14

  const today = startOfDay(new Date())
  const maxDate = startOfDay(new Date())
  maxDate.setDate(today.getDate() + maxDaysAhead - 1)

  // Weekdays with no availability at all (to grey them out in calendar)
  const disabledWeekdays = React.useMemo<Set<number>>(() => {
    const avail = policy?.availability
    if (!avail) return new Set()
    const dayMap: Record<string, number> = { monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4, saturday: 5, sunday: 6 }
    const available = new Set(Object.keys(avail).map((k) => dayMap[k]).filter((v) => v !== undefined))
    if (available.size === 0) return new Set()
    const disabled = new Set<number>()
    for (let i = 0; i <= 6; i++) {
      if (!available.has(i)) disabled.add(i)
    }
    return disabled
  }, [policy?.availability])

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)

  const [step, setStep] = useState<'datetime' | 'contact' | 'confirmed'>('datetime')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')
  const [notes, setNotes] = useState('')
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState<BookingResult | null>(null)
  const [nameError, setNameError] = useState(false)

  const fetchSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true)
    setSlots([])
    try {
      const windowStart = new Date(date)
      windowStart.setHours(0, 0, 0, 0)
      const windowEnd = new Date(date)
      windowEnd.setHours(23, 59, 59, 0)

      const result = (await executeTool('appointment-availability', {
        title: 'Appointment',
        windowStart: windowStart.toISOString(),
        windowEnd: windowEnd.toISOString(),
        durationMinutes: 30,
      })) as { slots?: AvailabilitySlot[] } | undefined

      setSlots((result as any)?.slots ?? [])
    } finally {
      setLoadingSlots(false)
    }
  }, [executeTool])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
    fetchSlots(date)
  }

  const handleMonthChange = (delta: number) => {
    setCurrentMonth((m) => {
      const next = new Date(m)
      next.setMonth(next.getMonth() + delta)
      return next
    })
  }

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot)
    setStep('contact')
  }

  const handleBook = async () => {
    if (!selectedSlot) return
    if (!name.trim()) { setNameError(true); return }
    setNameError(false)
    setBooking(true)
    try {
      const title = purpose.trim() ? `${purpose.trim()} — ${name.trim()}` : `Appointment with ${name.trim()}`
      const result = (await executeTool('appointment-book', {
        title,
        scheduledAt: selectedSlot.startAt,
        timezone: agentTimezone ?? undefined,
        attendeeName: name.trim(),
        attendeeEmail: email.trim() || undefined,
        description: notes.trim() || undefined,
        routedAgentUuid: selectedSlot.agentUuid,
      })) as any

      setBooked({
        id: result?.id ?? '',
        name: result?.name ?? title,
        scheduledAt: selectedSlot.startAt,
        inviteUrl: result?.inviteUrl,
      })
      setStep('confirmed')
    } finally {
      setBooking(false)
    }
  }

  if (!data) return <EmptyMessageSkeleton />

  if (step === 'confirmed' && booked) {
    return (
      <div className="flex flex-col items-center gap-5 p-6 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xl">✓</div>
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{tr.confirmed}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tr.confirmedMessage}</p>
        </div>
        <div className="w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-sm text-left">
          <p className="font-medium text-gray-900 dark:text-white">{booked.name}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {selectedDate && formatDayFull(selectedDate, locale)}
            {' · '}
            {formatTime(booked.scheduledAt, displayTimezone, locale)}
            <span className="ml-1 text-xs text-gray-400">({displayTimezone})</span>
          </p>
          {booked.inviteUrl && (
            <a href={booked.inviteUrl} className="mt-3 inline-block text-blue-600 dark:text-blue-400 text-xs underline" target="_blank" rel="noopener noreferrer">
              Add to calendar →
            </a>
          )}
        </div>
      </div>
    )
  }

  if (step === 'contact' && selectedSlot && selectedDate) {
    return (
      <div className="flex flex-col gap-5 p-4">
        <button onClick={() => setStep('datetime')} className="text-sm text-blue-600 dark:text-blue-400 self-start -mb-1">
          ← {tr.backToSlots}
        </button>

        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm">
          <p className="font-medium text-gray-900 dark:text-white">{formatDayFull(selectedDate, locale)}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-0.5">
            {formatSlotRange(selectedSlot, displayTimezone, locale)}
            <span className="ml-1 text-xs text-gray-400">({displayTimezone})</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              placeholder={tr.namePlaceholder}
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(false) }}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white ${nameError ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
            />
            {nameError && <p className="text-xs text-red-500 mt-1">{tr.nameRequired}</p>}
          </div>
          <input
            type="email"
            placeholder={tr.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder={tr.purposePlaceholder}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          />
          <textarea
            placeholder={tr.notesPlaceholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white resize-none"
          />
        </div>

        <button
          onClick={handleBook}
          disabled={booking}
          className="w-full rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 text-sm font-medium disabled:opacity-50 transition-opacity"
        >
          {booking ? tr.booking : tr.confirm}
        </button>
      </div>
    )
  }

  // step === 'datetime'
  return (
    <div className="flex divide-x divide-gray-100 dark:divide-gray-800">
      {/* Calendar */}
      <div className="p-4 flex-shrink-0">
        <Calendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          minDate={today}
          maxDate={maxDate}
          disabledWeekdays={disabledWeekdays}
          onMonthChange={handleMonthChange}
          onSelect={handleDateSelect}
          locale={locale}
        />
      </div>

      {/* Slots — fills full column height alongside calendar */}
      <div className="flex-1 flex flex-col min-w-0">
        {!selectedDate ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center">{tr.pickDate}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4 h-full">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatDayFull(selectedDate, locale)}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{displayTimezone}</p>
            </div>
            {loadingSlots ? (
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
                ))}
              </div>
            ) : slots.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">{tr.noSlots}</p>
            ) : (
              <div className="flex flex-col gap-2 overflow-y-auto">
                {slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => handleSlotSelect(slot)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 py-2.5 px-3 text-sm font-medium text-gray-900 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {formatTime(slot.startAt, displayTimezone, locale)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App>
        <Main />
      </App>
    </React.StrictMode>
  )
}
