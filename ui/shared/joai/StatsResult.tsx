import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { valueToDisplay } from './helpers'

export type StatMetric = {
  label: string
  value: unknown
}

type Props = {
  title: string
  metrics: StatMetric[]
  emptyText?: string
}

export function StatsResult({ title, metrics, emptyText = 'No stats available.' }: Props) {
  const { copyToClipboard } = useAppContext()
  const visible = metrics.filter((metric) => metric.value !== null && metric.value !== undefined && metric.value !== '')

  if (visible.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{emptyText}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const copyPayload = Object.fromEntries(visible.map((metric) => [metric.label, metric.value]))

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-warp-fg">{title}</h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(copyPayload, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {visible.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
            <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{metric.label}</div>
            <div className="mt-1 text-xl font-semibold tabular-nums text-warp-fg">{valueToDisplay(metric.value)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
