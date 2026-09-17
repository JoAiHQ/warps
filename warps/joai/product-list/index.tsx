import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatCents, mapListItems, priceFromVariations, primaryImageUrl, resolveLocalized, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: resolveLocalized(item.name),
    price: formatCents(priceFromVariations(item)),
    slug: item.slug,
    active: item.active,
    public: item.public,
    tags: valueToDisplay(item.tags),
    imageUrl: primaryImageUrl(item),
  }))
  return (
    <ListResult
      title="Products"
      emptyText="No products found."
      items={items}
      primaryKey="name"
      secondaryKey="price"
      detailKeys={['slug', 'active', 'public', 'tags']}
      imageKey="imageUrl"
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
