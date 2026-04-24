import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { BookingConfirmed } from '../book/components/BookingConfirmed'
import type { ConfirmMeetingData } from './warp.types'

function Main() {
  const { data, executeWarp, locale } = useAppContext<ConfirmMeetingData>()
  const tr = useTranslations(translations).confirm

  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)

  if (!data) return <EmptyMessageSkeleton />

  const scheduledAt = data.SCHEDULED_AT
  const scheduledEndAt = data.SCHEDULED_END_AT
  const conferenceUrl = data.CONFERENCE_URL

  if (!scheduledAt) {
    return (
      <div className="flex flex-col items-center gap-5 p-6 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xl">?</div>
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{tr.notFound}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tr.notFoundMessage}</p>
        </div>
      </div>
    )
  }

  const selectedDate = new Date(scheduledAt)
  const displayTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const booked = {
    id: data.MEETING_ID,
    name: data.MEETING_NAME,
    scheduledAt,
    endAt: scheduledEndAt ?? scheduledAt,
    joinUrl: conferenceUrl ?? undefined,
  }

  const handleCancel = async () => {
    if (!data.MEETING_ID) return
    setCancelling(true)
    setCancelError(null)
    try {
      await executeWarp('appointment-cancel-public', { meetingId: data.MEETING_ID })
      setCancelled(true)
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : tr.cancelError)
    } finally {
      setCancelling(false)
    }
  }

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
    />
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
