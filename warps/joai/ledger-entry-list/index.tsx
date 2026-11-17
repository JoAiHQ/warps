import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, asRecord, formatCents, formatDateOnly, mapListItems, truncateMiddle, valueToDisplay } from '../../../ui/shared/joai'

function entryAmount(value: unknown): number {
  const lines = Array.isArray(value) ? value.map((line) => asRecord(line) ?? {}) : []
  return lines.reduce((sum, line) => sum + (typeof line.debit === 'number' ? line.debit : 0), 0)
}

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => ({
    text: valueToDisplay(item.text),
    amount: formatCents(entryAmount(item.lines)),
    bookedAt: formatDateOnly(item.bookedAt),
    source: valueToDisplay(item.sourceType),
    number: item.number,
    id: truncateMiddle(item.id, 8, 4),
  }))

  return (
    <ListResult
      title="Ledger entries"
      emptyText="No ledger entries found."
      items={items}
      primaryKey="text"
      secondaryKey="amount"
      detailKeys={['bookedAt', 'source', 'number', 'id']}
      detailLabels={{ bookedAt: 'Booked', source: 'Source' }}
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
