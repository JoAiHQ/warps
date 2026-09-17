import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    text: item.text,
    scheduledAt: formatDateShort(item.scheduledAt),
    dispatchedAt: formatDateShort(item.dispatchedAt),
  }))
  return (
    <ListResult
      title="Reminders"
      emptyText="No reminders found."
      items={items}
      primaryKey="text"
      secondaryKey="scheduledAt"
      detailKeys={["dispatchedAt"]}
      detailLabels={{ scheduledAt: 'Scheduled', dispatchedAt: 'Sent' }}
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
