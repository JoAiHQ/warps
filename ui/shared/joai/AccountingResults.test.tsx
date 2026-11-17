import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppContext } from '../../lib/components'
import { BankImportResult } from './BankImportResult'
import { LedgerEntryResult } from './LedgerEntryResult'
import { TrialBalanceResult } from './TrialBalanceResult'
import { VatSummaryResult } from './VatSummaryResult'

function renderWithData(ui: React.ReactNode, data: unknown) {
  return render(
    <AppContext.Provider value={{ data, copyToClipboard: vi.fn() } as any}>
      {ui}
    </AppContext.Provider>,
  )
}

describe('LedgerEntryResult', () => {
  it('renders the entry header, totals, and lines', () => {
    renderWithData(<LedgerEntryResult title="Entry booked" />, {
      LEDGER_ENTRY: {
        text: 'Invoice 42',
        number: 7,
        bookedAt: '2026-07-15',
        sourceType: 'manual',
        lines: [
          { accountCode: 'BA', accountName: 'Bank', debit: 11900, credit: 0, currency: 'EUR' },
          { accountCode: 'E20', accountName: 'Revenue', debit: 0, credit: 11900, currency: 'EUR' },
        ],
      },
    })

    expect(screen.getByText('Entry booked')).toBeInTheDocument()
    expect(screen.getByText('Invoice 42')).toBeInTheDocument()
    expect(screen.getByText('Bank')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getAllByText(/119\.00/)).toHaveLength(4)
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('marks reversals and renders the empty state', () => {
    const { unmount } = renderWithData(<LedgerEntryResult />, {
      LEDGER_ENTRY: { text: 'Reversal', reversesEntryId: 'abc', lines: [] },
    })
    expect(screen.getAllByText('Reversal')).toHaveLength(2)
    unmount()

    renderWithData(<LedgerEntryResult />, {})
    expect(screen.getByText('No ledger entry found.')).toBeInTheDocument()
  })
})

describe('VatSummaryResult', () => {
  it('renders UVA fields and tax code totals', () => {
    renderWithData(<VatSummaryResult />, {
      VAT_SUMMARY: {
        from: '2026-07-01',
        to: '2026-09-30',
        fields: { '022': { base: 100000, tax: 20000 } },
        taxCodes: [{ code: '320', rate: 20, kind: 'standard', base: 100000, tax: 20000 }],
      },
    })

    expect(screen.getByText('VAT summary')).toBeInTheDocument()
    expect(screen.getByText('Output VAT 20%')).toBeInTheDocument()
    expect(screen.getByText('320')).toBeInTheDocument()
    expect(screen.getByText('standard')).toBeInTheDocument()
    expect(screen.getAllByText(/200\.00/).length).toBeGreaterThan(0)
  })

  it('shows an empty state when there is no VAT activity', () => {
    renderWithData(<VatSummaryResult />, { VAT_SUMMARY: { from: '2026-07-01', to: '2026-09-30', fields: {}, taxCodes: [] } })
    expect(screen.getByText('No VAT activity in this period.')).toBeInTheDocument()
  })
})

describe('TrialBalanceResult', () => {
  it('renders account totals', () => {
    renderWithData(<TrialBalanceResult />, {
      TRIAL_BALANCE: {
        from: '2026-07-01',
        to: '2026-09-30',
        accounts: [
          { code: 'BA', name: 'Bank', type: 'asset', debit: 11900, credit: 0, balance: 11900 },
          { code: 'E20', name: 'Revenue', type: 'revenue', debit: 0, credit: 11900, balance: -11900 },
        ],
      },
    })

    expect(screen.getByText('Trial balance')).toBeInTheDocument()
    expect(screen.getByText('BA')).toBeInTheDocument()
    expect(screen.getByText('E20')).toBeInTheDocument()
    expect(screen.getAllByText('Balance').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/119\.00/).length).toBeGreaterThan(0)
  })

  it('shows an empty state without account activity', () => {
    renderWithData(<TrialBalanceResult />, {
      TRIAL_BALANCE: { from: '2026-07-01', to: '2026-09-30', accounts: [] },
    })
    expect(screen.getByText('No account activity in this period.')).toBeInTheDocument()
  })
})

describe('BankImportResult', () => {
  it('renders import counts and warnings', () => {
    renderWithData(<BankImportResult />, {
      BANK_IMPORT_RESULT: {
        import: {
          fileName: 'statement.csv',
          source: 'n26',
          importedCount: 3,
          skippedCount: 1,
          duplicateCount: 2,
        },
        errors: [],
        warnings: ['Row 4 skipped'],
      },
    })

    expect(screen.getByText('Statement imported')).toBeInTheDocument()
    expect(screen.getByText('statement.csv')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Row 4 skipped')).toBeInTheDocument()
  })

  it('shows an empty state without an import record', () => {
    renderWithData(<BankImportResult />, {})
    expect(screen.getByText('No import result available.')).toBeInTheDocument()
  })
})
