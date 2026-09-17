import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    title: item.title,
    type: item.type,
    status: item.status,
    startsAt: formatDateShort(item.startsAt),
    endsAt: formatDateShort(item.endsAt),
  }))
  return (
    <ListResult
      title="Updates"
      emptyText="No updates found."
      items={items}
      primaryKey="title"
      secondaryKey="type"
      detailKeys={["status", "startsAt", "endsAt"]}
      detailLabels={{ startsAt: 'Starts', endsAt: 'Ends' }}
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
