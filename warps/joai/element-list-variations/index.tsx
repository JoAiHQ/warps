import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, primaryImageUrl } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    label: item.label ?? 'Untitled variation',
    aspectRatio: item.aspectRatio,
    imageUrl: primaryImageUrl(item),
    images: Array.isArray(item.images) ? item.images.length : 0,
  }))
  return (
    <ListResult
      title="Element variations"
      emptyText="No variations found."
      items={items}
      primaryKey="label"
      secondaryKey="aspectRatio"
      detailKeys={['images']}
      detailLabels={{ images: 'Images', aspectRatio: 'Aspect' }}
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
