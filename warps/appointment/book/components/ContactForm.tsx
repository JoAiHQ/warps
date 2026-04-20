import { formatDayFull, formatSlotRange } from '../helpers/format'
import type { AvailabilitySlot } from '../warp.types'

type Labels = {
  backToSlots: string
  namePlaceholder: string
  nameRequired: string
  emailPlaceholder: string
  purposePlaceholder: string
  notesPlaceholder: string
  confirm: string
  booking: string
}

type Props = {
  selectedDate: Date
  selectedSlot: AvailabilitySlot
  name: string
  email: string
  purpose: string
  notes: string
  nameError: boolean
  submitting: boolean
  submitError: string | null
  displayTimezone: string
  locale: string
  labels: Labels
  onNameChange: (v: string) => void
  onEmailChange: (v: string) => void
  onPurposeChange: (v: string) => void
  onNotesChange: (v: string) => void
  onBack: () => void
  onSubmit: () => void
}

export function ContactForm({
  selectedDate, selectedSlot, name, email, purpose, notes, nameError, submitting, submitError,
  displayTimezone, locale, labels, onNameChange, onEmailChange, onPurposeChange, onNotesChange, onBack, onSubmit,
}: Props) {
  return (
    <div className="flex flex-col gap-5 p-4">
      <button onClick={onBack} className="text-sm text-blue-600 dark:text-blue-400 self-start -mb-1">
        ← {labels.backToSlots}
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
            placeholder={labels.namePlaceholder}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            autoFocus
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white ${nameError ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
          />
          {nameError && <p className="text-xs text-red-500 mt-1">{labels.nameRequired}</p>}
        </div>
        <input
          type="email"
          placeholder={labels.emailPlaceholder}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
        />
        <input
          type="text"
          placeholder={labels.purposePlaceholder}
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
        />
        <textarea
          placeholder={labels.notesPlaceholder}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white resize-none"
        />
      </div>

      {submitError && (
        <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {submitError}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 text-sm font-medium disabled:opacity-50 transition-opacity"
      >
        {submitting ? labels.booking : labels.confirm}
      </button>
    </div>
  )
}
