import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { AvailabilitySlot, BookPublicData, BookingResult } from './warp.types'

type Step = 'date' | 'slots' | 'contact' | 'confirmed'

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTime(iso: string, timezone: string | null | undefined, locale: string): string {
  return new Date(iso).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone ?? undefined,
  })
}

function formatSlotRange(slot: AvailabilitySlot, timezone: string | null | undefined, locale: string): string {
  const start = formatTime(slot.startAt, timezone, locale)
  const end = formatTime(slot.endAt, timezone, locale)
  return `${start} – ${end}`
}

function buildDateGrid(maxDaysAhead: number): Date[] {
  const days: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < Math.min(maxDaysAhead, 14); i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function Main() {
  const { data, executeTool, locale } = useAppContext<BookPublicData>()
  const tr = useTranslations(translations).book

  const [step, setStep] = useState<Step>('date')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')
  const [notes, setNotes] = useState('')
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState<BookingResult | null>(null)
  const [nameError, setNameError] = useState(false)

  const policy = data?.policy ?? null
  const timezone = policy?.timezone ?? null
  const maxDaysAhead = policy?.maxDaysAhead ?? 14
  const dateGrid = buildDateGrid(maxDaysAhead)

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

      const fetched = (result as any)?.slots ?? []
      setSlots(fetched)
    } finally {
      setLoadingSlots(false)
    }
  }, [executeTool])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
    setStep('slots')
    fetchSlots(date)
  }

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot)
    setStep('contact')
  }

  const handleBook = async () => {
    if (!selectedSlot) return
    if (!name.trim()) {
      setNameError(true)
      return
    }
    setNameError(false)
    setBooking(true)
    try {
      const title = purpose.trim() ? `${purpose.trim()} — ${name.trim()}` : `Appointment with ${name.trim()}`
      const result = (await executeTool('appointment-book', {
        title,
        scheduledAt: selectedSlot.startAt,
        timezone: timezone ?? undefined,
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

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  if (step === 'confirmed' && booked) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 text-2xl">✓</div>
        <h2 className="text-xl font-semibold">{tr.confirmed}</h2>
        <p className="text-sm text-gray-500">{tr.confirmedMessage}</p>
        <div className="rounded-xl bg-gray-50 p-4 text-sm w-full max-w-sm text-left">
          <p className="font-medium">{booked.name}</p>
          <p className="text-gray-500 mt-1">
            {selectedDate && formatDate(selectedDate, locale)} ·{' '}
            {formatTime(booked.scheduledAt, timezone, locale)}
          </p>
          {booked.inviteUrl && (
            <a href={booked.inviteUrl} className="mt-3 inline-block text-blue-600 underline text-xs" target="_blank" rel="noopener noreferrer">
              Add to calendar
            </a>
          )}
        </div>
      </div>
    )
  }

  if (step === 'contact' && selectedSlot) {
    return (
      <div className="flex flex-col gap-5 p-4 w-full max-w-md mx-auto">
        <button onClick={() => setStep('slots')} className="text-sm text-blue-600 self-start">
          ← {tr.backToSlots}
        </button>

        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm">
          <span className="font-medium">{selectedDate && formatDate(selectedDate, locale)}</span>
          <span className="text-gray-500 ml-2">{formatSlotRange(selectedSlot, timezone, locale)}</span>
        </div>

        <h2 className="text-base font-semibold">{tr.yourDetails}</h2>

        <div className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              placeholder={tr.namePlaceholder}
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(false) }}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${nameError ? 'border-red-400' : 'border-gray-200'}`}
            />
            {nameError && <p className="text-xs text-red-500 mt-1">{tr.nameRequired}</p>}
          </div>
          <input
            type="email"
            placeholder={tr.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder={tr.purposePlaceholder}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder={tr.notesPlaceholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleBook}
          disabled={booking}
          className="w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {booking ? tr.booking : tr.confirm}
        </button>
      </div>
    )
  }

  if (step === 'slots') {
    return (
      <div className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto">
        <button onClick={() => setStep('date')} className="text-sm text-blue-600 self-start">
          ← {tr.backToSlots}
        </button>

        {selectedDate && (
          <h2 className="text-base font-semibold">{formatDate(selectedDate, locale)}</h2>
        )}

        {loadingSlots ? (
          <p className="text-sm text-gray-400">{tr.loadingSlots}</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-gray-400">{tr.noSlots}</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {slots.map((slot, i) => (
              <button
                key={i}
                onClick={() => handleSlotSelect(slot)}
                className="rounded-xl border border-gray-200 py-3 px-4 text-sm font-medium text-center hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {formatTime(slot.startAt, timezone, locale)}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // step === 'date'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto">
      <h2 className="text-base font-semibold">{tr.pickDate}</h2>
      <div className="grid grid-cols-3 gap-2">
        {dateGrid.map((date, i) => {
          const isToday = isSameDay(date, today)
          const isTomorrow = isSameDay(date, tomorrow)
          const label = isToday ? tr.today : isTomorrow ? tr.tomorrow : date.toLocaleDateString(locale, { weekday: 'short' })
          const dayNum = date.getDate()

          return (
            <button
              key={i}
              onClick={() => handleDateSelect(date)}
              className="flex flex-col items-center rounded-xl border border-gray-200 py-3 px-2 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-lg font-semibold mt-0.5">{dayNum}</span>
            </button>
          )
        })}
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
