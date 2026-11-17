import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { asRecord, extractOutputRecord, formatCents, formatDateOnly, valueToDisplay } from './helpers'

const UVA_FIELD_LABELS: Record<string, string> = {
  '000': 'Total turnover',
  '022': 'Output VAT 20%',
  '029': 'Output VAT 10%',
  '057': 'Reverse charge 20%',
  '065': 'Intra-EU acquisition 20%',
  '066': 'Acquisition VAT 20%',
  '070': 'Input VAT 20%',
  '072': 'Input VAT intra-EU 20%',
}

type VatRow = {
  code: string
  label: string
  rate?: number
  kind?: string
  base: number
  tax: number
}

export function VatSummaryResult() {
  const { data, copyToClipboard } = useAppContext()
  const record = extractOutputRecord(data, ['VAT_SUMMARY', 'summary'])

  if (!record) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">No VAT summary available.</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const fieldsRecord = asRecord(record.fields) ?? {}
  const fields: VatRow[] = Object.entries(fieldsRecord).map(([code, value]) => {
    const entry = asRecord(value) ?? {}
    return {
      code,
      label: UVA_FIELD_LABELS[code] ?? `UVA field ${code}`,
      base: typeof entry.base === 'number' ? entry.base : 0,
      tax: typeof entry.tax === 'number' ? entry.tax : 0,
    }
  })

  const taxCodes: VatRow[] = (Array.isArray(record.taxCodes) ? record.taxCodes : []).map((value) => {
    const entry = asRecord(value) ?? {}
    const code = valueToDisplay(entry.code)
    return {
      code,
      label: code,
      rate: typeof entry.rate === 'number' ? entry.rate : undefined,
      kind: typeof entry.kind === 'string' ? entry.kind : undefined,
      base: typeof entry.base === 'number' ? entry.base : 0,
      tax: typeof entry.tax === 'number' ? entry.tax : 0,
    }
  })

  if (fields.length === 0 && taxCodes.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">No VAT activity in this period.</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const totals = taxCodes.length > 0 ? taxCodes : fields
  const totalBase = totals.reduce((sum, row) => sum + row.base, 0)
  const totalTax = totals.reduce((sum, row) => sum + row.tax, 0)
  const from = formatDateOnly(record.from)
  const to = formatDateOnly(record.to)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-warp-fg">VAT summary</h3>
          {from && to ? <div className="mt-0.5 text-xs text-warp-fg-muted">{from} – {to}</div> : null}
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(record, null, 2))}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">Base</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalBase)}</div>
        </div>
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">VAT</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalTax)}</div>
        </div>
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">Tax codes</div>
          <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{taxCodes.length}</div>
        </div>
      </div>

      {fields.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-3 border-b border-warp-border bg-warp-surface-secondary/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">
            <span>Field</span>
            <span>Description</span>
            <span className="text-right">Base</span>
            <span className="text-right">VAT</span>
          </div>
          {fields.map((row) => (
            <div
              key={row.code}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-baseline gap-3 border-b border-warp-border px-3.5 py-2 last:border-b-0"
            >
              <span className="font-mono text-xs font-medium text-warp-fg-secondary">{row.code}</span>
              <span className="truncate text-sm text-warp-fg">{row.label}</span>
              <span className="text-right text-sm tabular-nums text-warp-fg">{formatCents(row.base)}</span>
              <span className="text-right text-sm tabular-nums text-warp-fg">{formatCents(row.tax)}</span>
            </div>
          ))}
        </div>
      )}

      {taxCodes.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
          <div className="border-b border-warp-border bg-warp-surface-secondary/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">
            By tax code
          </div>
          {taxCodes.map((row) => (
            <div key={row.code} className="flex items-start justify-between gap-3 border-b border-warp-border px-3.5 py-2.5 last:border-b-0">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-medium text-warp-fg">{row.code}</span>
                  {row.rate !== undefined ? (
                    <span className="rounded-full bg-warp-surface-secondary px-2 py-0.5 text-[11px] font-medium text-warp-fg-secondary">
                      {row.rate}%
                    </span>
                  ) : null}
                </div>
                {row.kind ? <div className="mt-0.5 text-[11px] capitalize text-warp-fg-muted">{row.kind.replace(/_/g, ' ')}</div> : null}
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-medium tabular-nums text-warp-fg">{formatCents(row.tax)}</div>
                <div className="text-[11px] text-warp-fg-muted">Base {formatCents(row.base)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
