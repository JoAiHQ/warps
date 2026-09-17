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
    chain: item.chain,
    category: item.category,
    verified: item.verified,
    versionsCount: item.versionsCount,
    slug: item.slug,
  }))
  return (
    <ListResult
      title="Contracts"
      emptyText="No contracts found."
      items={items}
      primaryKey="name"
      secondaryKey="chain"
      detailKeys={["category", "verified", "versionsCount", "slug"]}
      detailLabels={{ versionsCount: 'Versions' }}
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
