import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatCents, mapListItems, resolveLocalized, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: resolveLocalized(item.name),
    price: formatCents(item.price),
    duration: typeof item.durationMinutes === 'number' ? `${item.durationMinutes} min` : null,
    bookable: item.bookable,
    public: item.public,
    slug: item.slug,
    tags: valueToDisplay(item.tags),
  }))
  return (
    <ListResult
      title="Services"
      emptyText="No services found."
      items={items}
      primaryKey="name"
      secondaryKey="price"
      detailKeys={["duration", "bookable", "public", "slug", "tags"]}
      detailLabels={{ duration: 'Duration' }}
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
