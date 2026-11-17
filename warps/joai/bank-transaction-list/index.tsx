import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatCents, formatDateOnly, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => {
    const currency = typeof item.currency === 'string' ? item.currency : 'EUR'
    const counterparty = item.counterpartyName || item.reference
    return {
      counterparty: counterparty ? valueToDisplay(counterparty) : 'Unknown counterparty',
      amount: typeof item.amount === 'number' ? formatCents(item.amount, currency) : null,
      bookedAt: formatDateOnly(item.bookedAt),
      status: valueToDisplay(item.status),
      account: valueToDisplay(item.bankAccountName),
      reference: item.reference ? valueToDisplay(item.reference) : null,
    }
  })

  return (
    <ListResult
      title="Bank transactions"
      emptyText="No bank transactions found."
      items={items}
      primaryKey="counterparty"
      secondaryKey="amount"
      detailKeys={['bookedAt', 'status', 'account', 'reference']}
      detailLabels={{ bookedAt: 'Booked', account: 'Account' }}
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
