import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, accountingValue, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data, locale, t } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => ({
    code: valueToDisplay(item.code),
    rate: typeof item.rate === 'number' ? `${item.rate}%` : null,
    kind: accountingValue(t, item.kind),
    uva: valueToDisplay(item.vatReportFields),
    system: typeof item.system === 'boolean' ? valueToDisplay(item.system, locale) : item.system,
  }))

  return (
    <ListResult
      title={t({ en: 'Tax codes', de: 'Steuercodes' })}
      emptyText={t({ en: 'No tax codes found.', de: 'Keine Steuercodes gefunden.' })}
      items={items}
      primaryKey="code"
      secondaryKey="rate"
      detailKeys={['kind', 'uva', 'system']}
      detailLabels={{
        kind: t({ en: 'Kind', de: 'Art' }),
        uva: t({ en: 'UVA fields', de: 'UVA-Kennzahlen' }),
        system: t({ en: 'System code', de: 'Systemcode' }),
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
