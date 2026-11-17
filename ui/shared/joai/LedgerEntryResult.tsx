import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { LocalizedText } from '../../lib/i18n'
import { accountingValue } from './accountingLabels'
import { asRecord, extractOutputRecord, formatCents, formatDateOnly, valueToDisplay } from './helpers'

type Props = {
  title?: LocalizedText
  emptyText?: LocalizedText
}

function sumLines(lines: Record<string, unknown>[], key: 'debit' | 'credit'): number {
  return lines.reduce((total, line) => total + (typeof line[key] === 'number' ? line[key] : 0), 0)
}

export function LedgerEntryResult({
  title = { en: 'Ledger entry', de: 'Buchung' },
  emptyText = { en: 'No ledger entry found.', de: 'Keine Buchung gefunden.' },
}: Props) {
  const { data, copyToClipboard, locale, t } = useAppContext()
  const record = extractOutputRecord(data, ['LEDGER_ENTRY'])

  if (!record || Object.keys(record).length === 0) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{t(emptyText)}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const lines = Array.isArray(record.lines) ? record.lines.map((line) => asRecord(line) ?? {}) : []
  const currency = typeof lines[0]?.currency === 'string' ? lines[0].currency : 'EUR'
  const totalDebit = sumLines(lines, 'debit')
  const totalCredit = sumLines(lines, 'credit')

  const meta = ([
    [t({ en: 'Number', de: 'Nr.' }), record.number],
    [t({ en: 'Booked', de: 'Buchungsdatum' }), formatDateOnly(record.bookedAt, locale)],
    [t({ en: 'Document date', de: 'Belegdatum' }), formatDateOnly(record.documentDate, locale)],
    [t({ en: 'Source', de: 'Quelle' }), accountingValue(t, record.sourceType)],
    [t({ en: 'Approval', de: 'Freigabe' }), record.approvalReference],
  ] as Array<[string, unknown]>).filter(([, value]) => value !== undefined && value !== null && value !== '')

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-warp-fg">{t(title)}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="truncate text-base font-medium text-warp-fg">{valueToDisplay(record.text)}</span>
            {record.reversesEntryId ? (
              <span className="rounded-full bg-warp-surface-secondary px-2 py-0.5 text-[11px] font-medium text-warp-fg-secondary">
                {t({ en: 'Reversal', de: 'Storno' })}
              </span>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(record, null, 2))}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          {t({ en: 'Copy', de: 'Kopieren' })}
        </button>
      </div>

      {meta.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {meta.map(([label, value]) => (
            <span key={String(label)} className="text-xs text-warp-fg-muted">
              <span className="font-medium text-warp-fg-secondary">{label}</span>
              <span className="mx-1">·</span>
              {valueToDisplay(value, locale)}
            </span>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 border-b border-warp-border bg-warp-surface-secondary/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">
          <span>{t({ en: 'Account', de: 'Konto' })}</span>
          <span className="text-right">{t({ en: 'Debit', de: 'Soll' })}</span>
          <span className="text-right">{t({ en: 'Credit', de: 'Haben' })}</span>
        </div>
        {lines.length === 0 ? (
          <div className="px-3.5 py-4 text-sm text-warp-fg-muted">{t({ en: 'No lines.', de: 'Keine Buchungszeilen.' })}</div>
        ) : (
          lines.map((line, index) => {
            const debit = typeof line.debit === 'number' ? line.debit : 0
            const credit = typeof line.credit === 'number' ? line.credit : 0
            return (
              <div
                key={index}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-3 border-b border-warp-border px-3.5 py-2.5 last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-xs font-medium tabular-nums text-warp-fg-secondary">
                      {valueToDisplay(line.accountCode)}
                    </span>
                    <span className="truncate text-sm text-warp-fg">{valueToDisplay(line.accountName)}</span>
                  </div>
                  {line.taxCode ? (
                    <div className="mt-0.5 text-[11px] text-warp-fg-muted">
                      {t({ en: 'Tax', de: 'Steuercode' })} {valueToDisplay(line.taxCode)}
                      {typeof line.taxBase === 'number' ? ` · ${t({ en: 'base', de: 'Bemessungsgrundlage' })} ${formatCents(line.taxBase, currency, locale)}` : ''}
                    </div>
                  ) : null}
                </div>
                <span className="text-right text-sm tabular-nums text-warp-fg">
                  {debit ? formatCents(debit, currency, locale) : '—'}
                </span>
                <span className="text-right text-sm tabular-nums text-warp-fg">
                  {credit ? formatCents(credit, currency, locale) : '—'}
                </span>
              </div>
            )
          })
        )}
        {lines.length > 0 && (
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 bg-warp-surface-secondary/50 px-3.5 py-2 text-sm font-semibold text-warp-fg">
            <span>{t({ en: 'Total', de: 'Summe' })}</span>
            <span className="text-right tabular-nums">{formatCents(totalDebit, currency, locale)}</span>
            <span className="text-right tabular-nums">{formatCents(totalCredit, currency, locale)}</span>
          </div>
        )}
      </div>

      {record.sourceId ? (
        <div className="text-xs text-warp-fg-muted">{t({ en: 'Source', de: 'Quelle' })} · {valueToDisplay(record.sourceId)}</div>
      ) : null}
    </div>
  )
}
