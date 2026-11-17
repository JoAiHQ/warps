import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, accountingValue, mapListItems, truncateMiddle, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data, t } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => ({
    name: valueToDisplay(item.name),
    code: valueToDisplay(item.code),
    type: accountingValue(t, item.type),
    role: accountingValue(t, item.role),
    taxCode: item.defaultTaxCodeId ? truncateMiddle(item.defaultTaxCodeId, 8, 4) : null,
    archived: item.archivedAt ? t({ en: 'Archived', de: 'Archiviert' }) : null,
  }))

  return (
    <ListResult
      title={t({ en: 'Ledger accounts', de: 'Kontenplan' })}
      emptyText={t({ en: 'No ledger accounts found.', de: 'Keine Konten gefunden.' })}
      items={items}
      primaryKey="name"
      secondaryKey="code"
      detailKeys={['type', 'role', 'taxCode', 'archived']}
      detailLabels={{
        type: t({ en: 'Type', de: 'Kontoart' }),
        role: t({ en: 'Role', de: 'Funktion' }),
        taxCode: t({ en: 'Default tax code', de: 'Standard-Steuercode' }),
        archived: t({ en: 'Status', de: 'Status' }),
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
