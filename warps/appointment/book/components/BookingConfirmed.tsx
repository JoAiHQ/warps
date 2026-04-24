import { useState } from 'react'
import { formatDayFull, formatTime, formatTokenAmount } from '../helpers/format'
import { googleCalendarUrl, outlookCalendarUrl, downloadIcs } from '../helpers/calendar'
import type { BookingResult } from '../warp.types'

type Props = {
  booked: BookingResult
  selectedDate: Date
  displayTimezone: string
  locale: string
  title: string
  subtitle: string
  cancelLabel: string
  cancellingLabel: string
  cancelledTitle: string
  cancelledMessage: string
  cancelling: boolean
  cancelled: boolean
  cancelError: string | null
  onCancel: () => void
  servicePrice?: string
  serviceToken?: string
  serviceName?: string
  payLabel?: string
  payingLabel?: string
  paying?: boolean
  payError?: string | null
  onPay?: () => void
  shareUrl?: string
  copyLinkLabel?: string
  copiedLabel?: string
}

export function BookingConfirmed({
  booked, selectedDate, displayTimezone, locale, title, subtitle,
  cancelLabel, cancellingLabel, cancelledTitle, cancelledMessage,
  cancelling, cancelled, cancelError, onCancel,
  servicePrice, serviceToken, serviceName, payLabel, payingLabel, paying, payError, onPay,
  shareUrl, copyLinkLabel, copiedLabel,
}: Props) {
  const [copied, setCopied] = useState(false)
  if (cancelled) {
    return (
      <div className="flex flex-col items-center gap-5 p-6 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xl">✕</div>
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{cancelledTitle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cancelledMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xl">✓</div>
      <div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className="w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-sm text-left">
        <p className="font-medium text-gray-900 dark:text-white">{booked.name}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {formatDayFull(selectedDate, locale)}
          {' · '}
          {formatTime(booked.scheduledAt, displayTimezone, locale)}
          <span className="ml-1 text-xs text-gray-400">({displayTimezone})</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={googleCalendarUrl(booked.name, booked.scheduledAt, booked.endAt, booked.joinUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </a>
          <a
            href={outlookCalendarUrl(booked.name, booked.scheduledAt, booked.endAt, booked.joinUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg viewBox="0 0 23 23" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <rect fill="#F35325" x="0" y="0" width="10.5" height="10.5"/>
              <rect fill="#81BC06" x="12.5" y="0" width="10.5" height="10.5"/>
              <rect fill="#05A6F0" x="0" y="12.5" width="10.5" height="10.5"/>
              <rect fill="#FFBA08" x="12.5" y="12.5" width="10.5" height="10.5"/>
            </svg>
            Outlook
          </a>
          <button
            onClick={() => downloadIcs(booked.name, booked.scheduledAt, booked.endAt, booked.joinUrl)}
            className="flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Apple / ICS
          </button>
        </div>
      </div>
      {servicePrice && onPay && (
        <div className="w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{serviceName ?? 'Service'}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-0.5">{formatTokenAmount(servicePrice, serviceToken ?? null)}</p>
            </div>
            <button
              onClick={onPay}
              disabled={paying}
              className="rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 text-sm font-medium disabled:opacity-50 transition-opacity"
            >
              {paying ? payingLabel : payLabel}
            </button>
          </div>
          {payError && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-2">{payError}</p>
          )}
        </div>
      )}
      {shareUrl && (
        <div className="w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-sm">
          <p className="font-medium text-gray-900 dark:text-white mb-2">{copyLinkLabel ?? 'Share this link'}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 truncate text-left select-all">
              {shareUrl}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                })
              }}
              className="shrink-0 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              {copied ? (copiedLabel ?? 'Copied!') : (copyLinkLabel ?? 'Copy')}
            </button>
          </div>
        </div>
      )}
      {cancelError && (
        <div className="w-full rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300 text-left">
          {cancelError}
        </div>
      )}
      <button
        onClick={onCancel}
        disabled={cancelling}
        className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 mt-1"
      >
        {cancelling ? cancellingLabel : cancelLabel}
      </button>
    </div>
  )
}
