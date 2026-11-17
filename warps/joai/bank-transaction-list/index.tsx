import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, accountingValue, formatCents, formatDateOnly, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data, locale, t } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => {
    const currency = typeof item.currency === 'string' ? item.currency : 'EUR'
    const counterparty = item.counterpartyName || item.reference
    return {
      counterparty: counterparty ? valueToDisplay(counterparty) : t({ en: 'Unknown counterparty', de: 'Unbekannter Empfänger' }),
      amount: typeof item.amount === 'number' ? formatCents(item.amount, currency, locale) : null,
      bookedAt: formatDateOnly(item.bookedAt, locale),
      status: accountingValue(t, item.status),
      account: valueToDisplay(item.bankAccountName),
      reference: item.reference ? valueToDisplay(item.reference) : null,
    }
  })

  return (
    <ListResult
      title={t({ en: 'Bank transactions', de: 'Bankbewegungen' })}
      emptyText={t({ en: 'No bank transactions found.', de: 'Keine Bankbewegungen gefunden.' })}
      items={items}
      primaryKey="counterparty"
      secondaryKey="amount"
      detailKeys={['bookedAt', 'status', 'account', 'reference']}
      detailLabels={{
        bookedAt: t({ en: 'Booked', de: 'Buchungsdatum' }),
        status: t({ en: 'Status', de: 'Status' }),
        account: t({ en: 'Account', de: 'Bankkonto' }),
        reference: t({ en: 'Reference', de: 'Verwendungszweck' }),
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
