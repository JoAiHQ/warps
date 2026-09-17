import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: item.name,
    type: item.type,
    createdAt: formatDateShort(item.createdAt),
  }))
  return (
    <ListResult
      title="Documents"
      emptyText="No documents found."
      items={items}
      primaryKey="name"
      secondaryKey="type"
      detailKeys={["createdAt"]}
      detailLabels={{ createdAt: 'Created' }}
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
