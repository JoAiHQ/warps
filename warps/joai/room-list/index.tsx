import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, asRecord, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: item.name,
    kind: item.kind,
    integration: asRecord(item.integration)?.type ?? item.integrationType,
    public: item.public,
    default: item.default,
    active: item.active,
  }))
  return (
    <ListResult
      title="Rooms"
      emptyText="No rooms found."
      items={items}
      primaryKey="name"
      secondaryKey="kind"
      detailKeys={["integration", "public", "default", "active"]}
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
