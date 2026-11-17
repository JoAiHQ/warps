import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, accountingValue, asRecord, formatCents, formatDateOnly, mapListItems, truncateMiddle, valueToDisplay } from '../../../ui/shared/joai'

function entryAmount(value: unknown): number {
  const lines = Array.isArray(value) ? value.map((line) => asRecord(line) ?? {}) : []
  return lines.reduce((sum, line) => sum + (typeof line.debit === 'number' ? line.debit : 0), 0)
}

function Main() {
  const { data, locale, t } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => ({
    text: valueToDisplay(item.text),
    amount: formatCents(entryAmount(item.lines), 'EUR', locale),
    bookedAt: formatDateOnly(item.bookedAt, locale),
    source: accountingValue(t, item.sourceType),
    number: item.number,
    id: truncateMiddle(item.id, 8, 4),
  }))

  return (
    <ListResult
      title={t({ en: 'Ledger entries', de: 'Buchungen' })}
      emptyText={t({ en: 'No ledger entries found.', de: 'Keine Buchungen gefunden.' })}
      items={items}
      primaryKey="text"
      secondaryKey="amount"
      detailKeys={['bookedAt', 'source', 'number', 'id']}
      detailLabels={{
        bookedAt: t({ en: 'Booked', de: 'Buchungsdatum' }),
        source: t({ en: 'Source', de: 'Quelle' }),
        number: t({ en: 'Number', de: 'Nr.' }),
        id: t({ en: 'ID', de: 'ID' }),
      }}
    />
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
