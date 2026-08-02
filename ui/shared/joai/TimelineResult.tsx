import React from 'react'
import { useAppContext } from '../../lib/components'

export type TimelineEntry = Record<string, unknown>

function formatDate(value: unknown): string | null {
  if (!value) return null
  const d = new Date(String(value))
  if (isNaN(d.getTime())) return null
  return d.toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

const SOURCE_COLORS: Record<string, string> = {
  activity: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
  message: 'bg-green-500/15 text-green-600 dark:text-green-300 border-green-500/30',
  item: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
  meeting: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
  memory: 'bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30',
  order: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
}

function SourceBadge({ source }: { source: string }) {
  const color = SOURCE_COLORS[source] ?? SOURCE_COLORS.activity
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${color}`}>
      {source}
    </span>
  )
}

function EntryTitle({ entry }: { entry: TimelineEntry }) {
  const source = String(entry.source ?? '')
  switch (source) {
    case 'activity':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{String(entry.type)}</span>
          <SourceBadge source="activity" />
        </div>
      )
    case 'message': {
      const integration = entry.integration ? `[${entry.integration}]` : ''
      const sender = entry.senderName ? ` — ${entry.senderName}` : ''
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {String(entry.role)} {integration}{sender}
          </span>
          <SourceBadge source="message" />
        </div>
      )
    }
    case 'item':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{String(entry.title)}</span>
          <SourceBadge source="item" />
        </div>
      )
    case 'meeting':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{String(entry.name)}</span>
          <SourceBadge source="meeting" />
        </div>
      )
    case 'memory':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{String(entry.category)}</span>
          <SourceBadge source="memory" />
        </div>
      )
    case 'order':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Order</span>
          <SourceBadge source="order" />
        </div>
      )
    default:
      return <SourceBadge source={String(entry.source ?? 'entry')} />
  }
}

function EntryBody({ entry }: { entry: TimelineEntry }) {
  const source = String(entry.source ?? '')
  switch (source) {
    case 'activity':
      return entry.description ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">{String(entry.description)}</p>
      ) : null
    case 'message':
      return entry.content ? (
        <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">{String(entry.content)}</p>
      ) : null
    case 'item':
      return (
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
          {entry.status ? <span>{String(entry.status)}</span> : null}
          {entry.priority && entry.priority !== 'normal' ? <span>{String(entry.priority)}</span> : null}
          {entry.dueDate ? <span>due {String(entry.dueDate)}</span> : null}
          {Array.isArray(entry.tags) && entry.tags.length > 0 ? <span>#{String(entry.tags).replace(/,/g, ' #')}</span> : null}
        </div>
      )
    case 'meeting':
      return (
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
          {entry.status ? <span>{String(entry.status)}</span> : null}
          {entry.scheduledAt ? <span>scheduled {formatDate(entry.scheduledAt)}</span> : null}
        </div>
      )
    case 'memory':
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">{String(entry.content ?? '')}</p>
          {Array.isArray(entry.tags) && entry.tags.length > 0 ? (
            <span className="text-xs text-gray-500 dark:text-gray-400">#{String(entry.tags).replace(/,/g, ' #')}</span>
          ) : null}
        </div>
      )
    case 'order':
      return (
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
          {entry.status ? <span>{String(entry.status)}</span> : null}
          {entry.total != null ? <span>{String(entry.total)} €</span> : null}
          {entry.itemCount != null ? <span>{String(entry.itemCount)} item(s)</span> : null}
        </div>
      )
    default:
      return null
  }
}

export function TimelineResult({ items, emptyText }: { items: TimelineEntry[]; emptyText: string }) {
  const { copyToClipboard } = useAppContext()

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Timeline ({items.length})</h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(items, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          Copy
        </button>
      </div>

      <div className="relative pl-5">
        <div className="absolute bottom-1 left-[7px] top-1 w-px bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col gap-4">
          {items.map((entry, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-5 top-1.5 size-2.5 rounded-full border-2 border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-600" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <EntryTitle entry={entry} />
                  <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <EntryBody entry={entry} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
