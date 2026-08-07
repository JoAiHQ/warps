import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'

export type ListItem = Record<string, unknown>

type Props = {
  title: string
  emptyText: string
  items: ListItem[]
  primaryKey?: string
  secondaryKey?: string
  detailKeys?: string[]
}

export function valueToString(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export function ListResult(props: Props) {
  const { items, title, emptyText, primaryKey, secondaryKey, detailKeys } = props
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

  const keys = detailKeys ?? Object.keys(items[0] ?? {})

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
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

      <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 border-b border-warp-border px-3.5 py-2.5 last:border-b-0"
          >
            {primaryKey && item[primaryKey] !== undefined && (
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-warp-fg">{valueToString(item[primaryKey])}</span>
                {secondaryKey && item[secondaryKey] !== undefined && (
                  <span className="shrink-0 text-xs text-warp-fg-muted">{valueToString(item[secondaryKey])}</span>
                )}
              </div>
            )}
            {keys.length > 0 && (
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {keys
                  .filter((key) => key !== primaryKey && key !== secondaryKey)
                  .map((key) => (
                    <span key={key} className="text-xs text-warp-fg-muted">
                      <span className="font-medium capitalize text-warp-fg-secondary">{key.replace(/_/g, ' ')}</span>
                      <span className="mx-1">·</span>
                      {valueToString(item[key])}
                    </span>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function JsonResult({ data }: { data: unknown }) {
  const { copyToClipboard } = useAppContext()
  const text = JSON.stringify(data, null, 2)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => copyToClipboard(text)}
          className="rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>
      <pre className="max-h-80 overflow-auto rounded-lg border border-warp-border bg-warp-surface p-3 text-xs text-warp-fg-secondary">{text}</pre>
    </div>
  )
}
