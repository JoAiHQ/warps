import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, truncateText } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: item.name,
    scope: item.scope,
    active: item.active,
    source: item.source,
    description: truncateText(item.description, 100),
  }))
  return (
    <ListResult
      title="Skills"
      emptyText="No skills found."
      items={items}
      primaryKey="name"
      secondaryKey="scope"
      detailKeys={["active", "source", "description"]}
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
