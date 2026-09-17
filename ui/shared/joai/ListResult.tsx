import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { humanizeKey, valueToDisplay } from './helpers'

export type ListItem = Record<string, unknown>

type Props = {
  title: string
  emptyText: string
  items: ListItem[]
  primaryKey?: string
  secondaryKey?: string
  detailKeys?: string[]
  detailLabels?: Record<string, string>
  imageKey?: string
}

export function ListResult(props: Props) {
  const { items, title, emptyText, primaryKey, secondaryKey, detailKeys, detailLabels, imageKey } = props
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
        {items.map((item, index) => {
          const imageUrl = imageKey && typeof item[imageKey] === 'string' ? String(item[imageKey]) : null
          const hasPrimary = !!primaryKey && item[primaryKey] !== undefined && item[primaryKey] !== null && item[primaryKey] !== ''
          const detailEntries = keys
            .filter((key) => key !== primaryKey && key !== secondaryKey && key !== imageKey)
            .filter((key) => item[key] !== undefined && item[key] !== null && item[key] !== '')

          return (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-warp-border px-3.5 py-2.5 last:border-b-0"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt=""
                  className="size-10 shrink-0 rounded-md object-cover bg-warp-surface-secondary"
                />
              )}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                {hasPrimary ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-warp-fg">{valueToDisplay(item[primaryKey])}</span>
                    {secondaryKey && item[secondaryKey] !== undefined && item[secondaryKey] !== null && item[secondaryKey] !== '' && (
                      <span className="shrink-0 rounded-full bg-warp-surface-secondary px-2 py-0.5 text-[11px] font-medium text-warp-fg-secondary">
                        {valueToDisplay(item[secondaryKey])}
                      </span>
                    )}
                  </div>
                ) : secondaryKey && item[secondaryKey] !== undefined ? (
                  <span className="text-sm font-medium text-warp-fg">{valueToDisplay(item[secondaryKey])}</span>
                ) : null}
                {detailEntries.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    {detailEntries.map((key) => (
                      <span key={key} className="text-xs text-warp-fg-muted">
                        <span className="font-medium text-warp-fg-secondary">{detailLabels?.[key] ?? humanizeKey(key)}</span>
                        <span className="mx-1">·</span>
                        {valueToDisplay(item[key])}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
