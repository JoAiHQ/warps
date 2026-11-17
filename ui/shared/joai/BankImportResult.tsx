import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { asRecord, extractOutputRecord, formatDateShort, pickValue, valueToDisplay } from './helpers'

function issueList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((entry) => (typeof entry === 'string' ? entry : JSON.stringify(entry)))
    .filter((entry) => entry.trim().length > 0)
}

export function BankImportResult() {
  const { data, copyToClipboard, locale, t } = useAppContext()
  const output = extractOutputRecord(data, ['BANK_IMPORT_RESULT'])
  const statement = asRecord(pickValue(output, ['import', 'BANK_IMPORT']))
  const record = statement ? output : null

  if (!record || !statement) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{t({ en: 'No import result available.', de: 'Kein Importergebnis verfügbar.' })}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const errors = issueList(record.errors)
  const warnings = issueList(record.warnings)
  const imported = typeof statement.importedCount === 'number' ? statement.importedCount : 0
  const skipped = typeof statement.skippedCount === 'number' ? statement.skippedCount : 0
  const duplicates = typeof statement.duplicateCount === 'number' ? statement.duplicateCount : 0

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-warp-fg">{t({ en: 'Statement imported', de: 'Kontoauszug importiert' })}</h3>
          <div className="mt-0.5 flex flex-wrap gap-x-2 text-xs text-warp-fg-muted">
            <span>{valueToDisplay(statement.fileName)}</span>
            <span>·</span>
            <span className="uppercase">{valueToDisplay(statement.source)}</span>
            {statement.createdAt ? (
              <>
                <span>·</span>
                <span>{formatDateShort(statement.createdAt, locale)}</span>
              </>
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

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{t({ en: 'Imported', de: 'Importiert' })}</div>
          <div className="mt-1 text-xl font-semibold tabular-nums text-warp-fg">{imported}</div>
        </div>
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{t({ en: 'Duplicates', de: 'Duplikate' })}</div>
          <div className="mt-1 text-xl font-semibold tabular-nums text-warp-fg">{duplicates}</div>
        </div>
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
          <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{t({ en: 'Skipped', de: 'Übersprungen' })}</div>
          <div className="mt-1 text-xl font-semibold tabular-nums text-warp-fg">{skipped}</div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3.5 py-2.5">
          <div className="text-xs font-semibold text-warp-fg">{t({ en: 'Errors', de: 'Fehler' })}</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-warp-fg-secondary">
            {errors.slice(0, 10).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="rounded-lg border border-warp-border bg-warp-surface px-3.5 py-2.5">
          <div className="text-xs font-semibold text-warp-fg">{t({ en: 'Warnings', de: 'Warnungen' })}</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-warp-fg-secondary">
            {warnings.slice(0, 10).map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
