import React, { useCallback, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { startOfDay } from './helpers/format'
import { Calendar } from './components/Calendar'
import { SlotList } from './components/SlotList'
import { ContactForm } from './components/ContactForm'
import { BookingConfirmed } from './components/BookingConfirmed'
import type { AvailabilitySlot, BookPublicData, BookingResult } from './warp.types'

function Main() {
  const { data, executeWarp, locale } = useAppContext<BookPublicData>()
  const tr = useTranslations(translations).book

  const policy = data?.policy ?? null
  const agentTimezone = policy?.timezone ?? null
  const [displayTimezone, setDisplayTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone)
  const maxDaysAhead = policy?.maxDaysAhead ?? 14

  const today = startOfDay(new Date())
  const maxDate = startOfDay(new Date())
  maxDate.setDate(today.getDate() + maxDaysAhead - 1)

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
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const fetchIdRef = useRef(0)
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)

  const [step, setStep] = useState<'datetime' | 'contact' | 'confirmed'>('datetime')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')
  const [notes, setNotes] = useState('')
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState<BookingResult | null>(null)
  const [nameError, setNameError] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [cancelError, setCancelError] = useState<string | null>(null)
  const [confirmUrl, setConfirmUrl] = useState<string | null>(null)

  const fetchSlots = useCallback(async (date: Date, tz: string) => {
    const fetchId = ++fetchIdRef.current
    setLoadingSlots(true)
    setSlots([])
    setSlotsError(null)
    try {
      const now = new Date()
      const windowStart = new Date(date)
      windowStart.setHours(0, 0, 0, 0)
      if (windowStart <= now) windowStart.setTime(now.getTime() + 60_000)
      const windowEnd = new Date(date)
      windowEnd.setHours(23, 59, 59, 0)

      const result = (await executeWarp('appointment-availability', {
        title: 'Appointment',
        windowStart: windowStart.toISOString(),
        windowEnd: windowEnd.toISOString(),
        durationMinutes: policy?.slotIntervalMinutes ?? 30,
        timezone: tz,
      })) as any

      if (fetchId !== fetchIdRef.current) return
      setSlots(result?.SLOTS ?? [])
    } catch {
      if (fetchId !== fetchIdRef.current) return
      setSlotsError(tr.slotsError)
    } finally {
      if (fetchId === fetchIdRef.current) setLoadingSlots(false)
    }
  }, [executeWarp, policy?.slotIntervalMinutes, tr.slotsError])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
    fetchSlots(date, displayTimezone)
  }

  const handleMonthChange = (delta: number) => {
    setCurrentMonth((m) => {
      const next = new Date(m)
      next.setMonth(next.getMonth() + delta)
      return next
    })
  }

  const handleTimezoneChange = (tz: string) => {
    setDisplayTimezone(tz)
    if (selectedDate) fetchSlots(selectedDate, tz)
  }

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot)
    setStep('contact')
  }

  const handleCancel = async () => {
    if (!booked?.id) return
    setCancelling(true)
    setCancelError(null)
    try {
      await executeWarp('appointment-cancel-public', { meetingId: booked.id })
      setCancelled(true)
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : tr.cancelError)
    } finally {
      setCancelling(false)
    }
  }

  const handleBook = async () => {
    if (!selectedSlot) return
    if (!name.trim()) { setNameError(true); return }
    setNameError(false)
    setBooking(true)
    setBookingError(null)
    try {
      const title = purpose.trim() ? `${purpose.trim()} — ${name.trim()}` : `Appointment with ${name.trim()}`
      const result = (await executeWarp('appointment-book-confirm', {
        title,
        scheduledAt: selectedSlot.startAt,
        timezone: displayTimezone,
        attendeeName: name.trim(),
        attendeeEmail: email.trim() || undefined,
        description: notes.trim() || undefined,
        routedAgentUuid: selectedSlot.agentUuid,
      })) as any

      if (!result?.MEETING_ID) {
        throw new Error(tr.bookingError)
      }

      setBooked({
        id: result.MEETING_ID,
        name: result?.MEETING_TITLE ?? title,
        scheduledAt: selectedSlot.startAt,
        endAt: selectedSlot.endAt,
        joinUrl: result?.MEETING_URL,
      })

      const code = result?.MEETING_URL ? new URL(result.MEETING_URL).searchParams.get('code') : null
      if (code) {
        const base = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/'
        setConfirmUrl(`${window.location.origin}${base}../confirm?code=${code}`)
      }

      setStep('confirmed')
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : tr.bookingError)
      if (selectedDate) fetchSlots(selectedDate, displayTimezone)
    } finally {
      setBooking(false)
    }
  }

  if (!data) return <EmptyMessageSkeleton />

  if (step === 'confirmed' && booked && selectedDate) {
    return (
      <BookingConfirmed
        booked={booked}
        selectedDate={selectedDate}
        displayTimezone={displayTimezone}
        locale={locale}
        title={tr.confirmed}
        subtitle={tr.confirmedMessage}
        cancelLabel={tr.cancelAppointment}
        cancellingLabel={tr.cancelling}
        cancelledTitle={tr.cancelled}
        cancelledMessage={tr.cancelledMessage}
        cancelling={cancelling}
        cancelled={cancelled}
        cancelError={cancelError}
        onCancel={handleCancel}
        shareUrl={confirmUrl ?? undefined}
        copyLinkLabel={tr.copyLink}
        copiedLabel={tr.copied}
      />
    )
  }

  if (step === 'contact' && selectedSlot && selectedDate) {
    return (
      <ContactForm
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        name={name}
        email={email}
        purpose={purpose}
        notes={notes}
        nameError={nameError}
        submitting={booking}
        submitError={bookingError}
        displayTimezone={displayTimezone}
        locale={locale}
        labels={{
          backToSlots: tr.backToSlots,
          namePlaceholder: tr.namePlaceholder,
          nameRequired: tr.nameRequired,
          emailPlaceholder: tr.emailPlaceholder,
          purposePlaceholder: tr.purposePlaceholder,
          notesPlaceholder: tr.notesPlaceholder,
          confirm: tr.confirm,
          booking: tr.booking,
        }}
        onNameChange={(v) => { setName(v); setNameError(false) }}
        onEmailChange={setEmail}
        onPurposeChange={setPurpose}
        onNotesChange={setNotes}
        onBack={() => setStep('datetime')}
        onSubmit={handleBook}
      />
    )
  }

  return (
    <div className="flex divide-x divide-gray-100 dark:divide-gray-800">
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
      <div className="flex-1 flex flex-col min-w-0">
        {!selectedDate ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center">{tr.pickDate}</p>
          </div>
        ) : (
          <SlotList
            selectedDate={selectedDate}
            slots={slots}
            loading={loadingSlots}
            error={slotsError}
            displayTimezone={displayTimezone}
            locale={locale}
            noSlotsLabel={tr.noSlots}
            timeZoneLabel={tr.timeZone}
            onSelect={handleSlotSelect}
            onTimezoneChange={handleTimezoneChange}
          />
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
