import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, resolveLocalized, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: resolveLocalized(item.name),
    verified: item.verified,
    slug: item.slug,
    category: item.category,
    tags: valueToDisplay(item.tags),
  }))
  return (
    <ListResult
      title="Blueprints"
      emptyText="No blueprints found."
      items={items}
      primaryKey="name"
      secondaryKey="verified"
      detailKeys={["slug", "category", "tags"]}
      detailLabels={{ verified: 'Verified' }}
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
