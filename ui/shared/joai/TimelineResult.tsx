import React from 'react'
import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'

export type TimelineEntry = Record<string, unknown>

function formatDate(value: unknown): string | null {
  if (!value) return null
  const d = new Date(String(value))
  if (isNaN(d.getTime())) return null
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const SOURCE_COLORS: Record<string, 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'discovery'> = {
  activity: 'info',
  message: 'success',
  item: 'warning',
  meeting: 'discovery',
  memory: 'secondary',
  order: 'secondary',
}

function SourceBadge({ source }: { source: string }) {
  return (
    <Badge variant="soft" size="sm" color={SOURCE_COLORS[source] ?? 'secondary'}>
      {source}
    </Badge>
  )
}

function EntryTitle({ entry }: { entry: TimelineEntry }) {
  const source = String(entry.source ?? '')
  switch (source) {
    case 'activity':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warp-fg">{String(entry.type)}</span>
          <SourceBadge source="activity" />
        </div>
      )
    case 'message': {
      const integration = entry.integration ? `[${entry.integration}]` : ''
      const sender = entry.senderName ? ` — ${entry.senderName}` : ''
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warp-fg">
            {String(entry.role)} {integration}
            {sender}
          </span>
          <SourceBadge source="message" />
        </div>
      )
    }
    case 'item':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warp-fg">{String(entry.title)}</span>
          <SourceBadge source="item" />
        </div>
      )
    case 'meeting':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warp-fg">{String(entry.name)}</span>
          <SourceBadge source="meeting" />
        </div>
      )
    case 'memory':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warp-fg">{String(entry.category)}</span>
          <SourceBadge source="memory" />
        </div>
      )
    case 'order':
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warp-fg">Order</span>
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
        <p className="text-sm text-warp-fg-secondary">{String(entry.description)}</p>
      ) : null
    case 'message':
      return entry.content ? (
        <p className="whitespace-pre-wrap text-sm text-warp-fg-secondary">{String(entry.content)}</p>
      ) : null
    case 'item':
      return (
        <div className="flex flex-wrap gap-2 text-xs text-warp-fg-muted">
          {entry.status ? <span>{String(entry.status)}</span> : null}
          {entry.priority && entry.priority !== 'normal' ? <span>{String(entry.priority)}</span> : null}
          {entry.dueDate ? <span>due {String(entry.dueDate)}</span> : null}
          {Array.isArray(entry.tags) && entry.tags.length > 0 ? <span>#{String(entry.tags).replace(/,/g, ' #')}</span> : null}
        </div>
      )
    case 'meeting':
      return (
        <div className="flex flex-wrap gap-2 text-xs text-warp-fg-muted">
          {entry.status ? <span>{String(entry.status)}</span> : null}
          {entry.scheduledAt ? <span>scheduled {formatDate(entry.scheduledAt)}</span> : null}
        </div>
      )
    case 'memory':
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-warp-fg-secondary">{String(entry.content ?? '')}</p>
          {Array.isArray(entry.tags) && entry.tags.length > 0 ? (
            <span className="text-xs text-warp-fg-muted">#{String(entry.tags).replace(/,/g, ' #')}</span>
          ) : null}
        </div>
      )
    case 'order':
      return (
        <div className="flex flex-wrap gap-2 text-xs text-warp-fg-muted">
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
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{emptyText}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-warp-fg">Timeline ({items.length})</h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(items, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>

      <div className="relative pl-5">
        <div className="absolute bottom-1 left-[7px] top-1 w-px bg-warp-border" />
        <div className="flex flex-col gap-4">
          {items.map((entry, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-5 top-1.5 size-2.5 rounded-full border-2 border-warp-surface bg-[var(--color-text-warp-fg-muted)]" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <EntryTitle entry={entry} />
                  <span className="shrink-0 text-xs text-warp-fg-faint">{formatDate(entry.createdAt)}</span>
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
