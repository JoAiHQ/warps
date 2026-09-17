import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: item.name,
    count: item.count,
    campaignsCount: item.campaignsCount,
  }))
  return (
    <ListResult
      title="Segments"
      emptyText="No segments found."
      items={items}
      primaryKey="name"
      secondaryKey="count"
      detailKeys={["campaignsCount"]}
      detailLabels={{ count: 'Contacts', campaignsCount: 'Campaigns' }}
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
