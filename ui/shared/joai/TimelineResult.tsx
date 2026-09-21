import React from 'react'
import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { asRecord, formatCents, humanizeKey } from './helpers'

export type TimelineEntry = Record<string, unknown>

const SOURCE_COLORS: Record<string, 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'discovery'> = {
  activity: 'info',
  message: 'success',
  item: 'warning',
  meeting: 'discovery',
  memory: 'secondary',
  order: 'secondary',
}

const SOURCE_DOT: Record<string, string> = {
  activity: 'bg-sky-500',
  message: 'bg-emerald-500',
  item: 'bg-amber-500',
  meeting: 'bg-violet-500',
  memory: 'bg-zinc-400',
  order: 'bg-zinc-400',
}

const ACTIVITY_LABELS: Record<string, string> = {
  update: 'Contact updated',
  call: 'Call',
  meeting: 'Meeting',
  note: 'Note',
  form: 'Form submission',
  message: 'Message logged',
  custom: 'Activity',
  loyalty: 'Loyalty',
  email: 'Email',
}

const ROLE_LABELS: Record<string, string> = {
  agent: 'Agent',
  external: 'Contact',
  user: 'Contact',
  assistant: 'Agent',
}

const INTEGRATION_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  'whatsapp-personal': 'WhatsApp',
  'whatsapp-business': 'WhatsApp',
  imessage: 'iMessage',
  'apple-imessage': 'iMessage',
  instagram: 'Instagram',
  email: 'Email',
  sms: 'SMS',
  telegram: 'Telegram',
}

export const formatTimelineTime = (value: unknown, now = new Date()): string | null => {
  if (!value) return null
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return null

  const sameDay =
    date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate()

  if (sameDay) {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  }

  const sameYear = date.getFullYear() === now.getFullYear()
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const humanizeTimelineLabel = (value: unknown): string => {
  if (typeof value !== 'string' || !value.trim()) return ''
  const key = value.trim()
  if (ACTIVITY_LABELS[key]) return ACTIVITY_LABELS[key]
  if (ROLE_LABELS[key]) return ROLE_LABELS[key]
  if (INTEGRATION_LABELS[key]) return INTEGRATION_LABELS[key]
  return humanizeKey(key.replace(/[-_]+/g, ' '))
}

export const getUpdateFieldLabels = (meta: unknown): string[] => {
  const fields = asRecord(meta)?.fields
  if (!Array.isArray(fields)) return []
  return fields
    .filter((field): field is string => typeof field === 'string' && field.trim().length > 0)
    .map((field) => humanizeKey(field))
}

export const getFormFieldRows = (meta: unknown): { label: string; value: string }[] => {
  const form = asRecord(asRecord(meta)?.form)
  if (!form) return []
  return Object.entries(form)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0)
    .map(([key, value]) => ({ label: humanizeKey(key), value }))
}

const displayAuthor = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string' && value.trim()) return value
  const record = asRecord(value)
  if (typeof record?.name === 'string' && record.name.trim()) return record.name
  return null
}

function SourceBadge({ source }: { source: string }) {
  return (
    <Badge variant="soft" size="sm" color={SOURCE_COLORS[source] ?? 'secondary'}>
      {source}
    </Badge>
  )
}

function MetaChips({ values }: { values: string[] }) {
  if (values.length === 0) return null
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {values.map((value) => (
        <span
          key={value}
          className="inline-flex items-center rounded-md bg-warp-surface-secondary px-1.5 py-0.5 text-[10px] font-medium text-warp-fg-muted"
        >
          {value}
        </span>
      ))}
    </div>
  )
}

function EntryHeader({
  title,
  source,
  createdAt,
  subtitle,
}: {
  title: string
  source: string
  createdAt: unknown
  subtitle?: string | null
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex flex-wrap items-center gap-1.5">
        <span className="text-sm font-medium text-warp-fg">{title}</span>
        {subtitle ? <span className="text-xs text-warp-fg-muted">{subtitle}</span> : null}
        <SourceBadge source={source} />
      </div>
      <span className="shrink-0 text-xs text-warp-fg-faint">{formatTimelineTime(createdAt)}</span>
    </div>
  )
}

function MessageBubble({ entry }: { entry: TimelineEntry }) {
  const role = String(entry.role ?? '')
  const isAgent = role === 'agent' || role === 'assistant'
  const sender = entry.senderName
    ? String(entry.senderName)
    : humanizeTimelineLabel(role) || (isAgent ? 'Agent' : 'Contact')
  const channel = entry.integration ? humanizeTimelineLabel(String(entry.integration)) : null
  const subject = typeof entry.subject === 'string' && entry.subject.trim() ? entry.subject : null
  const content = typeof entry.content === 'string' ? entry.content : ''

  return (
    <div className={`mt-1.5 flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm ${
          isAgent
            ? 'rounded-br-md bg-warp-primary text-warp-fg-inverse'
            : 'rounded-bl-md bg-warp-surface-secondary text-warp-fg'
        }`}
      >
        <div
          className={`mb-0.5 flex flex-wrap items-baseline gap-1.5 text-[11px] font-medium ${
            isAgent ? 'text-warp-fg-inverse/70' : 'text-warp-fg-muted'
          }`}
        >
          <span>{sender}</span>
          {channel ? <span>· {channel}</span> : null}
        </div>
        {subject ? <p className="mb-1 text-xs font-semibold opacity-90">{subject}</p> : null}
        {content ? <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p> : null}
      </div>
    </div>
  )
}

function EntryTitle({ entry }: { entry: TimelineEntry }) {
  const source = String(entry.source ?? '')
  switch (source) {
    case 'activity': {
      const type = String(entry.type ?? 'custom')
      const author = displayAuthor(entry.author) ?? (typeof entry.agentName === 'string' ? entry.agentName : null)
      return (
        <EntryHeader
          title={humanizeTimelineLabel(type) || 'Activity'}
          source="activity"
          createdAt={entry.createdAt}
          subtitle={author ? `· ${author}` : null}
        />
      )
    }
    case 'message': {
      const channel = entry.integration ? humanizeTimelineLabel(String(entry.integration)) : null
      return (
        <EntryHeader
          title={channel || 'Message'}
          source="message"
          createdAt={entry.createdAt}
        />
      )
    }
    case 'item':
      return (
        <EntryHeader
          title={String(entry.title ?? 'Item')}
          source="item"
          createdAt={entry.createdAt}
        />
      )
    case 'meeting':
      return (
        <EntryHeader
          title={String(entry.name ?? 'Meeting')}
          source="meeting"
          createdAt={entry.createdAt}
        />
      )
    case 'memory':
      return (
        <EntryHeader
          title={humanizeTimelineLabel(entry.category) || 'Memory'}
          source="memory"
          createdAt={entry.createdAt}
        />
      )
    case 'order':
      return <EntryHeader title="Order" source="order" createdAt={entry.createdAt} />
    default:
      return <EntryHeader title="Entry" source={source || 'entry'} createdAt={entry.createdAt} />
  }
}

function EntryBody({ entry }: { entry: TimelineEntry }) {
  const source = String(entry.source ?? '')
  switch (source) {
    case 'activity': {
      const updateFields = String(entry.type ?? '') === 'update' ? getUpdateFieldLabels(entry.meta) : []
      const formFields = String(entry.type ?? '') === 'form' ? getFormFieldRows(entry.meta) : []
      const description = typeof entry.description === 'string' && entry.description.trim()
        ? entry.description
        : null
      return (
        <div className="flex flex-col gap-1">
          {description ? <p className="text-sm leading-relaxed text-warp-fg-secondary">{description}</p> : null}
          <MetaChips values={updateFields} />
          {formFields.length > 0 ? (
            <div className="mt-1 grid gap-1 rounded-xl bg-warp-surface-secondary px-2.5 py-2">
              {formFields.map((field) => (
                <div key={field.label} className="grid grid-cols-[5.5rem_1fr] gap-2 text-xs">
                  <span className="font-medium text-warp-fg-muted">{field.label}</span>
                  <span className="min-w-0 break-words text-warp-fg-secondary">{field.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )
    }
    case 'message':
      return <MessageBubble entry={entry} />
    case 'item':
      return (
        <div className="flex flex-col gap-1">
          {entry.description ? (
            <p className="text-sm leading-relaxed text-warp-fg-secondary">{String(entry.description)}</p>
          ) : null}
          <MetaChips
            values={[
              entry.status ? humanizeTimelineLabel(String(entry.status)) : '',
              entry.priority && entry.priority !== 'normal' ? humanizeTimelineLabel(String(entry.priority)) : '',
              entry.dueDate ? `Due ${formatTimelineTime(entry.dueDate) ?? String(entry.dueDate)}` : '',
              ...(Array.isArray(entry.tags) ? entry.tags.map((tag) => `#${String(tag)}`) : []),
            ].filter(Boolean)}
          />
        </div>
      )
    case 'meeting':
      return (
        <MetaChips
          values={[
            entry.status ? humanizeTimelineLabel(String(entry.status)) : '',
            entry.scheduledAt ? `Scheduled ${formatTimelineTime(entry.scheduledAt) ?? ''}` : '',
          ].filter(Boolean)}
        />
      )
    case 'memory':
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm leading-relaxed text-warp-fg-secondary">{String(entry.content ?? '')}</p>
          <MetaChips values={Array.isArray(entry.tags) ? entry.tags.map((tag) => `#${String(tag)}`) : []} />
        </div>
      )
    case 'order':
      return (
        <MetaChips
          values={[
            entry.status ? humanizeTimelineLabel(String(entry.status)) : '',
            entry.total != null ? formatCents(entry.total) ?? String(entry.total) : '',
            entry.itemCount != null ? `${String(entry.itemCount)} item(s)` : '',
          ].filter(Boolean)}
        />
      )
    default:
      return null
  }
}

export function TimelineResult({
  items,
  emptyText,
  title = 'Timeline',
}: {
  items: TimelineEntry[]
  emptyText: string
  title?: string
}) {
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
        <h3 className="text-sm font-semibold text-warp-fg">
          {title} ({items.length})
        </h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(items, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>

      <div className="relative pl-5">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-warp-border" />
        <div className="flex flex-col gap-4">
          {items.map((entry, index) => {
            const source = String(entry.source ?? '')
            return (
              <div key={typeof entry.id === 'string' ? entry.id : index} className="relative">
                <span
                  className={`absolute -left-5 top-1.5 size-2.5 rounded-full border-2 border-warp-surface ${SOURCE_DOT[source] ?? 'bg-warp-fg-muted'}`}
                />
                <div className="flex flex-col gap-0.5">
                  <EntryTitle entry={entry} />
                  <EntryBody entry={entry} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
