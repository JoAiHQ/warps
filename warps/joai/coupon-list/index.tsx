import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatCents, formatDateShort, mapListItems, resolveLocalized } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    code: item.code ?? resolveLocalized(item.name),
    discount: item.percent != null ? `${item.percent}%` : formatCents(item.amount),
    usesLeft: item.usesLeft,
    expiresAt: formatDateShort(item.expiresAt),
    active: item.active,
  }))
  return (
    <ListResult
      title="Coupons"
      emptyText="No coupons found."
      items={items}
      primaryKey="code"
      secondaryKey="discount"
      detailKeys={["usesLeft", "expiresAt", "active"]}
      detailLabels={{ usesLeft: 'Uses left', expiresAt: 'Expires' }}
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
