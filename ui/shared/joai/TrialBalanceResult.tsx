import React from 'react'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../lib/components'
import { asRecord, extractOutputRecord, formatCents, formatDateOnly, valueToDisplay } from './helpers'

export function TrialBalanceResult() {
  const { data, copyToClipboard } = useAppContext()
  const record = extractOutputRecord(data, ['TRIAL_BALANCE', 'trialBalance'])

  if (!record) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">No trial balance available.</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  const accounts = (Array.isArray(record.accounts) ? record.accounts : []).map((account) => asRecord(account) ?? {})
  const totalDebit = accounts.reduce((sum, account) => sum + (typeof account.debit === 'number' ? account.debit : 0), 0)
  const totalCredit = accounts.reduce((sum, account) => sum + (typeof account.credit === 'number' ? account.credit : 0), 0)
  const totalBalance = accounts.reduce((sum, account) => sum + (typeof account.balance === 'number' ? account.balance : 0), 0)
  const from = formatDateOnly(record.from)
  const to = formatDateOnly(record.to)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-warp-fg">Trial balance</h3>
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

      {accounts.length === 0 ? (
        <div className="flex justify-center py-10">
          <EmptyMessage fill="none">
            <EmptyMessage.Title className="text-warp-fg">No account activity in this period.</EmptyMessage.Title>
          </EmptyMessage>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">Debit</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalDebit)}</div>
            </div>
            <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">Credit</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalCredit)}</div>
            </div>
            <div className="rounded-lg border border-warp-border bg-warp-surface px-3 py-2.5">
              <div className="text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">Balance</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-warp-fg">{formatCents(totalBalance)}</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] gap-3 border-b border-warp-border bg-warp-surface-secondary/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-warp-fg-secondary">
              <span>Code</span>
              <span>Account</span>
              <span className="text-right">Debit</span>
              <span className="text-right">Credit</span>
              <span className="text-right">Balance</span>
            </div>
            {accounts.map((account, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-baseline gap-3 border-b border-warp-border px-3.5 py-2 last:border-b-0"
              >
                <span className="font-mono text-xs font-medium text-warp-fg-secondary">{valueToDisplay(account.code)}</span>
                <div className="min-w-0">
                  <div className="truncate text-sm text-warp-fg">{valueToDisplay(account.name)}</div>
                  <div className="text-[11px] capitalize text-warp-fg-muted">{valueToDisplay(account.type)}</div>
                </div>
                <span className="text-right text-sm tabular-nums text-warp-fg">{formatCents(account.debit)}</span>
                <span className="text-right text-sm tabular-nums text-warp-fg">{formatCents(account.credit)}</span>
                <span className="text-right text-sm font-medium tabular-nums text-warp-fg">{formatCents(account.balance)}</span>
              </div>
            ))}
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] gap-3 bg-warp-surface-secondary/50 px-3.5 py-2 text-sm font-semibold text-warp-fg">
              <span />
              <span>Total</span>
              <span className="text-right tabular-nums">{formatCents(totalDebit)}</span>
              <span className="text-right tabular-nums">{formatCents(totalCredit)}</span>
              <span className="text-right tabular-nums">{formatCents(totalBalance)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
