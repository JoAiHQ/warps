import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems, nestedName } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    title: item.title,
    status: item.status,
    type: item.type,
    contact: nestedName(item.contact),
    deliveredAt: formatDateShort(item.deliveredAt),
  }))
  return (
    <ListResult
      title="Artifacts"
      emptyText="No artifacts found."
      items={items}
      primaryKey="title"
      secondaryKey="status"
      detailKeys={["type", "contact", "deliveredAt"]}
      detailLabels={{ deliveredAt: 'Delivered' }}
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
