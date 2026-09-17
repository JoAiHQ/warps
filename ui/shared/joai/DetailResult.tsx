import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { humanizeKey, valueToDisplay } from './helpers'

type Props = {
  title: string
  emptyText: string
  record: Record<string, unknown> | null
  primaryKey?: string
  secondaryKey?: string
  detailKeys?: string[]
}

export function DetailResult({ title, emptyText, record, primaryKey, secondaryKey, detailKeys }: Props) {
  const { copyToClipboard } = useAppContext()

  if (!record || Object.keys(record).length === 0) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{emptyText}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const primary = primaryKey ? record[primaryKey] : undefined
  const secondary = secondaryKey ? record[secondaryKey] : undefined
  const keys = (detailKeys ?? Object.keys(record)).filter(
    (key) => key !== primaryKey && key !== secondaryKey && record[key] !== undefined && record[key] !== null && record[key] !== '',
  )

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-warp-fg">{title}</h3>
          {primary !== undefined && (
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="truncate text-base font-medium text-warp-fg">{valueToDisplay(primary)}</span>
              {secondary !== undefined && (
                <span className="rounded-full bg-warp-surface-secondary px-2 py-0.5 text-[11px] font-medium text-warp-fg-secondary">
                  {valueToDisplay(secondary)}
                </span>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(record, null, 2))}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>

      {keys.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
          {keys.map((key, index) => (
            <div
              key={key}
              className={`flex items-start justify-between gap-3 px-3 py-1.5 ${
                index < keys.length - 1 ? 'border-b border-warp-border' : ''
              }`}
            >
              <span className="shrink-0 text-sm text-warp-fg-secondary">{humanizeKey(key)}</span>
              <span className="break-all text-right text-sm font-medium text-warp-fg">{valueToDisplay(record[key])}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
