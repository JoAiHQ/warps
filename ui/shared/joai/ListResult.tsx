import React from 'react'
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
      <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{emptyText}</p>
      </div>
    )
  }

  const keys = detailKeys ?? Object.keys(items[0] ?? {})

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {title} ({items.length})
        </h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(items, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 px-3 py-2">
            {primaryKey && item[primaryKey] !== undefined && (
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                  {valueToString(item[primaryKey])}
                </span>
                {secondaryKey && item[secondaryKey] !== undefined && (
                  <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {valueToString(item[secondaryKey])}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {keys
                .filter((key) => key !== primaryKey && key !== secondaryKey)
                .map((key) => (
                  <span key={key} className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span> {valueToString(item[key])}
                  </span>
                ))}
            </div>
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
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          Copy
        </button>
      </div>
      <pre className="max-h-80 overflow-auto rounded-xl bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">{text}</pre>
    </div>
  )
}
