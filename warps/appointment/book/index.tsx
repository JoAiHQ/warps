import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { isSameDay, startOfDay } from './helpers/format'
import { resolveBookingPrefill } from './helpers/prefill'
import { Calendar } from './components/Calendar'
import { SlotList } from './components/SlotList'
import { ContactForm } from './components/ContactForm'
import { BookingConfirmed } from './components/BookingConfirmed'
import { ServicePicker } from './components/ServicePicker'
import type { AppointmentService, AvailabilitySlot, BookPrefill, BookPublicData, BookingResult } from './warp.types'

function Main() {
  const { data, inputs, executeWarp, locale } = useAppContext<BookPublicData, BookPrefill>()
  const tr = useTranslations(translations).book

  const policy = data?.policy ?? null
  const services = (data?.services?.length ? data.services : (inputs?.services ?? [])).filter((service) => service.bookable !== false)
  const prefilled = resolveBookingPrefill(inputs, policy, services)
  const prefilledSlots = inputs?.slots ?? []

  const [displayTimezone, setDisplayTimezone] = useState(() => prefilled.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [targetAgentUuid, setTargetAgentUuid] = useState<string | null>(prefilled.agentUuid)
  const maxDaysAhead = policy?.maxDaysAhead ?? 14

  useEffect(() => {
    if (!targetAgentUuid && policy?.agent?.uuid) setTargetAgentUuid(policy.agent.uuid)
  }, [policy?.agent?.uuid, targetAgentUuid])

  const appliedInputs = useRef(false)
  const initialized = useRef(false)
  useEffect(() => {
    if (!data || !inputs || appliedInputs.current) return
    const draft = resolveBookingPrefill(inputs, policy, services)
    setName(draft.name)
    setEmail(draft.email)
    setPurpose(draft.purpose)
    setNotes(draft.notes)
    setSelectedService(draft.service)
    setSelectedDate(draft.date)
    setSlots(draft.slots)
    setSelectedSlot(draft.slot)
    setStep(draft.step)
    if (draft.agentUuid) setTargetAgentUuid(draft.agentUuid)
    if (draft.timezone) setDisplayTimezone(draft.timezone)
    appliedInputs.current = true
    initialized.current = true
  }, [data, inputs, policy, services])

  useEffect(() => {
    if (!data || inputs || initialized.current) return
    const draft = resolveBookingPrefill(undefined, policy, services)
    setStep(draft.step)
    if (draft.timezone) setDisplayTimezone(draft.timezone)
    initialized.current = true
  }, [data, inputs, policy, services])

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

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => prefilled.date)
  const [slots, setSlots] = useState<AvailabilitySlot[]>(() => prefilled.slots)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const fetchIdRef = useRef(0)
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(() => prefilled.slot)

  const [selectedService, setSelectedService] = useState<AppointmentService | null | undefined>(() => prefilled.service)
  const [step, setStep] = useState<'service' | 'datetime' | 'contact' | 'pending' | 'confirmed'>(() => prefilled.step)
  const [name, setName] = useState(() => prefilled.name)
  const [email, setEmail] = useState(() => prefilled.email)
  const [purpose, setPurpose] = useState(() => prefilled.purpose)
  const [notes, setNotes] = useState(() => prefilled.notes)
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState<BookingResult | null>(null)
  const [nameError, setNameError] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [cancelPending, setCancelPending] = useState(false)
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

      const durationMinutes = selectedService?.durationMinutes ?? policy?.slotIntervalMinutes ?? 30
      const result = (await executeWarp('appointment-availability', {
        title: 'Appointment',
        windowStart: windowStart.toISOString(),
        windowEnd: windowEnd.toISOString(),
        durationMinutes,
        timezone: tz,
        agentUuid: targetAgentUuid ?? undefined,
      })) as any

      if (fetchId !== fetchIdRef.current) return
      setSlots(result?.SLOTS ?? [])
    } catch {
      if (fetchId !== fetchIdRef.current) return
      setSlotsError(tr.slotsError)
    } finally {
      if (fetchId === fetchIdRef.current) setLoadingSlots(false)
    }
  }, [executeWarp, selectedService, policy?.slotIntervalMinutes, targetAgentUuid, tr.slotsError])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
    if (prefilledSlots.some((slot) => isSameDay(new Date(slot.startAt), date))) {
      setSlots(prefilledSlots)
      setSlotsError(null)
      return
    }
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

  const handleCancel = async (reason?: string) => {
    if (!booked?.id) return
    setCancelling(true)
    setCancelError(null)
    setCancelPending(false)
    try {
      const result = (await executeWarp('appointment-cancel-public', {
        meetingId: booked.id,
        reason: reason || undefined,
        agentUuid: targetAgentUuid ?? undefined,
      })) as { queued?: boolean } | undefined
      if (result?.queued) {
        setCancelPending(true)
        return
      }
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
        agentUuid: targetAgentUuid ?? selectedSlot.agentUuid,
        routedAgentUuid: selectedSlot.agentUuid,
        serviceSlug: selectedService?.slug,
      })) as any

      if (result?.queued) {
        setStep('pending')
        return
      }

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

      if (result?.MEETING_URL) {
        setConfirmUrl(result.MEETING_URL)
      }

      setStep('confirmed')
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : tr.bookingError)
      if (selectedDate) fetchSlots(selectedDate, displayTimezone)
    } finally {
      setBooking(false)
    }
  }

  const handleServiceSelect = (service: AppointmentService | null) => {
    setSelectedService(service)
    setStep('datetime')
  }

  if (!data) return <EmptyMessageSkeleton />

  if (step === 'service') {
    return (
      <ServicePicker
        services={services}
        onSelect={handleServiceSelect}
        bookLabel={tr.bookService}
        noSpecificServiceLabel={tr.noSpecificService}
        durationUnit={tr.serviceDuration}
      />
    )
  }

  if (step === 'pending') {
    return (
      <div className="flex flex-col items-center gap-5 p-6 text-center max-w-sm mx-auto">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-600 text-2xl">⏳</div>
        <div>
          <h2 className="text-xl font-semibold">{locale.startsWith('de') ? 'Zur Freigabe eingereicht' : 'Submitted for approval'}</h2>
          <p className="text-sm text-gray-500 mt-2">{locale.startsWith('de') ? 'Bestätige die Buchung im Chat. Danach erscheint der Termin in deinem Kalender.' : 'Confirm the booking in chat. The appointment will then appear in the calendar.'}</p>
        </div>
      </div>
    )
  }

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
        cancelConfirmLabel={tr.cancelConfirm}
        cancelConfirmYesLabel={tr.cancelConfirmYes}
        cancelConfirmNoLabel={tr.cancelConfirmNo}
        cancelReasonLabel={tr.cancelReasonLabel}
        cancelReasonPlaceholder={tr.cancelReasonPlaceholder}
        cancelling={cancelling}
        cancelled={cancelled}
        cancelError={cancelError}
        cancelPending={cancelPending}
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
