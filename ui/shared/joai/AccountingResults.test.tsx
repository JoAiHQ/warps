import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppContext } from '../../lib/components'
import { createTranslator } from '../../lib/i18n'
import { BankImportResult } from './BankImportResult'
import { LedgerEntryResult } from './LedgerEntryResult'
import { TrialBalanceResult } from './TrialBalanceResult'
import { VatSummaryResult } from './VatSummaryResult'

function renderWithData(ui: React.ReactNode, data: unknown, locale = 'en') {
  return render(
    <AppContext.Provider value={{ data, copyToClipboard: vi.fn(), locale, t: createTranslator(locale) } as any}>
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

  it('renders German labels and amounts for the de locale', () => {
    renderWithData(<LedgerEntryResult />, {
      LEDGER_ENTRY: {
        text: 'OpenAI 07/26',
        number: 1,
        bookedAt: '2026-07-03',
        sourceType: 'manual',
        lines: [
          { accountCode: 'LIZ', accountName: 'Lizenzgebühren', debit: 1498860, credit: 0, currency: 'EUR' },
          { accountCode: 'BA', accountName: 'Bank', debit: 0, credit: 1498860, currency: 'EUR' },
        ],
      },
    }, 'de')

    expect(screen.getByText('Buchung')).toBeInTheDocument()
    expect(screen.getByText('Soll')).toBeInTheDocument()
    expect(screen.getByText('Haben')).toBeInTheDocument()
    expect(screen.getByText('Summe')).toBeInTheDocument()
    expect(screen.getByText('Manuell')).toBeInTheDocument()
    expect(screen.getAllByText('€ 14.988,60')).toHaveLength(4)
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
    expect(screen.getByText('Standard')).toBeInTheDocument()
    expect(screen.getAllByText(/200\.00/).length).toBeGreaterThan(0)
  })

  it('shows an empty state when there is no VAT activity', () => {
    renderWithData(<VatSummaryResult />, { VAT_SUMMARY: { from: '2026-07-01', to: '2026-09-30', fields: {}, taxCodes: [] } })
    expect(screen.getByText('No VAT activity in this period.')).toBeInTheDocument()
  })

  it('renders German UVA labels and amounts for the de locale', () => {
    renderWithData(<VatSummaryResult />, {
      VAT_SUMMARY: {
        from: '2026-07-01',
        to: '2026-09-30',
        fields: { '022': { base: 147693, tax: 29539 } },
        taxCodes: [{ code: '320', rate: 20, kind: 'standard', base: 147693, tax: 29539 }],
      },
    }, 'de')

    expect(screen.getByText('UVA-Auswertung')).toBeInTheDocument()
    expect(screen.getByText('Normalsteuersatz 20%')).toBeInTheDocument()
    expect(screen.getByText('Normal')).toBeInTheDocument()
    expect(screen.getAllByText('€ 295,39').length).toBeGreaterThan(0)
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

  it('renders German labels and amounts for the de locale', () => {
    renderWithData(<TrialBalanceResult />, {
      TRIAL_BALANCE: {
        from: '2026-01-01',
        to: '2026-12-31',
        accounts: [
          { code: 'LIZ', name: 'Lizenzgebühren', type: 'expense', debit: 1498860, credit: 0, balance: 1498860 },
          { code: 'BA', name: 'Bank', type: 'asset', debit: 0, credit: 1498860, balance: -1498860 },
        ],
      },
    }, 'de')

    expect(screen.getByText('Saldenliste')).toBeInTheDocument()
    expect(screen.getAllByText('Soll')).toHaveLength(2)
    expect(screen.getAllByText('Haben')).toHaveLength(2)
    expect(screen.getAllByText('Saldo')).toHaveLength(2)
    expect(screen.getByText('Konto')).toBeInTheDocument()
    expect(screen.getByText('Bezeichnung')).toBeInTheDocument()
    expect(screen.getByText('Aktivkonto')).toBeInTheDocument()
    expect(screen.getAllByText('€ 14.988,60').length).toBeGreaterThan(0)
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

  it('renders German labels for the de locale', () => {
    renderWithData(<BankImportResult />, {
      BANK_IMPORT_RESULT: {
        import: { fileName: 'n26.csv', source: 'n26', importedCount: 3, skippedCount: 1, duplicateCount: 2 },
        errors: [],
        warnings: [],
      },
    }, 'de')

    expect(screen.getByText('Kontoauszug importiert')).toBeInTheDocument()
    expect(screen.getByText('Importiert')).toBeInTheDocument()
    expect(screen.getByText('Duplikate')).toBeInTheDocument()
    expect(screen.getByText('Übersprungen')).toBeInTheDocument()
  })
})
