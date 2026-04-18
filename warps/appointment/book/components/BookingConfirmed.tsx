import { formatDayFull, formatTime } from '../helpers/format'
import { googleCalendarUrl, outlookCalendarUrl, downloadIcs } from '../helpers/calendar'
import type { BookingResult } from '../warp.types'

type Props = {
  booked: BookingResult
  selectedDate: Date
  displayTimezone: string
  locale: string
  title: string
  subtitle: string
}

export function BookingConfirmed({ booked, selectedDate, displayTimezone, locale, title, subtitle }: Props) {
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
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <path fill="#0078D4" d="M24 12.204c0-.528-.046-1.056-.092-1.537H12.274v2.918h6.625c-.275 1.537-1.146 2.826-2.43 3.69v3.026h3.897C22.545 18.372 24 15.546 24 12.204z"/>
              <path fill="#00A4EF" d="M12.274 24c3.3 0 6.074-1.084 8.092-2.944l-3.897-3.026c-1.1.737-2.476 1.16-4.195 1.16-3.208 0-5.958-2.155-6.9-5.073H1.34v3.119C3.358 21.428 7.553 24 12.274 24z"/>
              <path fill="#FFB900" d="M5.374 14.117A7.18 7.18 0 0 1 5.006 12c0-.737.138-1.45.368-2.117V6.764H1.34A11.951 11.951 0 0 0 0 12c0 1.93.46 3.76 1.34 5.236l4.034-3.119z"/>
              <path fill="#F25022" d="M12.274 4.81c1.788 0 3.392.621 4.653 1.836l3.484-3.484C18.302 1.196 15.528 0 12.274 0 7.553 0 3.358 2.572 1.34 6.764l4.034 3.119c.942-2.918 3.692-5.073 6.9-5.073z"/>
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
    </div>
  )
}
