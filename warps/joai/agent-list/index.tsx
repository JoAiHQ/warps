import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, nestedName, truncateText } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: item.name,
    visibility: item.public ? 'Public' : 'Private',
    description: truncateText(item.description, 100),
    blueprint: nestedName(item.blueprint) ?? (typeof item.blueprint === 'string' ? item.blueprint : null),
  }))
  return (
    <ListResult
      title="Agents"
      emptyText="No agents found."
      items={items}
      primaryKey="name"
      secondaryKey="visibility"
      detailKeys={['description', 'blueprint']}
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
