import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatCents, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data, locale, t } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => {
    const currency = typeof item.currency === 'string' ? item.currency : 'EUR'
    return {
      name: valueToDisplay(item.name),
      provider: valueToDisplay(item.provider),
      iban: valueToDisplay(item.iban),
      currency,
      ledger: valueToDisplay(item.ledgerAccountCode),
      balance: typeof item.openingBalance === 'number' ? formatCents(item.openingBalance, currency, locale) : null,
    }
  })

  return (
    <ListResult
      title={t({ en: 'Bank accounts', de: 'Bankkonten' })}
      emptyText={t({ en: 'No bank accounts found.', de: 'Keine Bankkonten gefunden.' })}
      items={items}
      primaryKey="name"
      secondaryKey="provider"
      detailKeys={['iban', 'currency', 'ledger', 'balance']}
      detailLabels={{
        iban: t({ en: 'IBAN', de: 'IBAN' }),
        currency: t({ en: 'Currency', de: 'Währung' }),
        ledger: t({ en: 'Ledger account', de: 'Sachkonto' }),
        balance: t({ en: 'Opening balance', de: 'Anfangsbestand' }),
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
