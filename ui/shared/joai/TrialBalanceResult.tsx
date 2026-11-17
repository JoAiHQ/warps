import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { accountingValue } from './accountingLabels'
import { asRecord, extractOutputRecord, formatCents, formatDateOnly, valueToDisplay } from './helpers'

export function TrialBalanceResult() {
  const { data, copyToClipboard, locale, t } = useAppContext()
  const record = extractOutputRecord(data, ['TRIAL_BALANCE', 'trialBalance'])

  if (!record) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{t({ en: 'No trial balance available.', de: 'Keine Saldenliste verfügbar.' })}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const accounts = (Array.isArray(record.accounts) ? record.accounts : []).map((account) => asRecord(account) ?? {})
  const totalDebit = accounts.reduce((sum, account) => sum + (typeof account.debit === 'number' ? account.debit : 0), 0)
  const totalCredit = accounts.reduce((sum, account) => sum + (typeof account.credit === 'number' ? account.credit : 0), 0)
  const totalBalance = accounts.reduce((sum, account) => sum + (typeof account.balance === 'number' ? account.balance : 0), 0)
  const from = formatDateOnly(record.from, locale)
  const to = formatDateOnly(record.to, locale)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-warp-fg">{t({ en: 'Trial balance', de: 'Saldenliste' })}</h3>
          {from && to ? <div className="mt-0.5 text-xs text-warp-fg-muted">{from} – {to}</div> : null}
        </div>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(record, null, 2))}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          {t({ en: 'Copy', de: 'Kopieren' })}
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className="flex justify-center py-10">
          <EmptyMessage fill="none">
            <EmptyMessage.Title className="text-warp-fg">{t({ en: 'No account activity in this period.', de: 'Keine Kontenbewegungen in diesem Zeitraum.' })}</EmptyMessage.Title>
          </EmptyMessage>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{t({ en: 'Debit', de: 'Soll' })}</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalDebit, 'EUR', locale)}</div>
            </div>
            <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{t({ en: 'Credit', de: 'Haben' })}</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalCredit, 'EUR', locale)}</div>
            </div>
            <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">{t({ en: 'Balance', de: 'Saldo' })}</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalBalance, 'EUR', locale)}</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] gap-3 border-b border-warp-border bg-warp-surface-secondary/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">
              <span>{t({ en: 'Code', de: 'Konto' })}</span>
              <span>{t({ en: 'Account', de: 'Bezeichnung' })}</span>
              <span className="text-right">{t({ en: 'Debit', de: 'Soll' })}</span>
              <span className="text-right">{t({ en: 'Credit', de: 'Haben' })}</span>
              <span className="text-right">{t({ en: 'Balance', de: 'Saldo' })}</span>
            </div>
            {accounts.map((account, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-baseline gap-3 border-b border-warp-border px-3.5 py-2 last:border-b-0"
              >
                <span className="font-mono text-xs font-medium text-warp-fg-secondary">{valueToDisplay(account.code)}</span>
                <div className="min-w-0">
                  <div className="truncate text-sm text-warp-fg">{valueToDisplay(account.name)}</div>
                  <div className="text-[11px] capitalize text-warp-fg-muted">{accountingValue(t, account.type) ?? '—'}</div>
                </div>
                <span className="text-right text-sm tabular-nums text-warp-fg">{formatCents(account.debit, 'EUR', locale)}</span>
                <span className="text-right text-sm tabular-nums text-warp-fg">{formatCents(account.credit, 'EUR', locale)}</span>
                <span className="text-right text-sm font-medium tabular-nums text-warp-fg">{formatCents(account.balance, 'EUR', locale)}</span>
              </div>
            ))}
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] gap-3 bg-warp-surface-secondary/50 px-3.5 py-2 text-sm font-semibold text-warp-fg">
              <span />
              <span>{t({ en: 'Total', de: 'Summe' })}</span>
              <span className="text-right tabular-nums">{formatCents(totalDebit, 'EUR', locale)}</span>
              <span className="text-right tabular-nums">{formatCents(totalCredit, 'EUR', locale)}</span>
              <span className="text-right tabular-nums">{formatCents(totalBalance, 'EUR', locale)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
