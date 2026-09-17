import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatCents, formatDateShort, mapListItems, nestedName, truncateMiddle } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => {
    const lineItems = Array.isArray(item.items) ? item.items : Array.isArray(item.lineItems) ? item.lineItems : []
    return {
      customer: nestedName(item.contact) ?? 'Unknown customer',
      status: item.status,
      type: item.type,
      total: formatCents(item.total),
      provider: item.provider,
      items: lineItems.length || item.itemCount,
      id: truncateMiddle(item.id, 8, 4),
      createdAt: formatDateShort(item.createdAt),
    }
  })
  return (
    <ListResult
      title="Orders"
      emptyText="No orders found."
      items={items}
      primaryKey="customer"
      secondaryKey="status"
      detailKeys={['type', 'total', 'provider', 'items', 'id', 'createdAt']}
      detailLabels={{ total: 'Total', createdAt: 'Created', id: 'Order', items: 'Items' }}
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
