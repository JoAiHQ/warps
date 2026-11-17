import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, truncateMiddle, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => ({
    name: valueToDisplay(item.name),
    code: valueToDisplay(item.code),
    type: valueToDisplay(item.type),
    role: item.role ? valueToDisplay(item.role) : null,
    taxCode: item.defaultTaxCodeId ? truncateMiddle(item.defaultTaxCodeId, 8, 4) : null,
    archived: item.archivedAt ? 'Archived' : null,
  }))

  return (
    <ListResult
      title="Ledger accounts"
      emptyText="No ledger accounts found."
      items={items}
      primaryKey="name"
      secondaryKey="code"
      detailKeys={['type', 'role', 'taxCode', 'archived']}
      detailLabels={{ taxCode: 'Default tax code', archived: 'Status' }}
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
