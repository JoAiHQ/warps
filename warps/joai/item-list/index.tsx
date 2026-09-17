import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    title: item.title,
    status: item.status,
    priority: item.priority,
    dueDate: formatDateShort(item.dueDate) ?? item.dueDate,
    tags: valueToDisplay(item.tags),
  }))
  return (
    <ListResult
      title="Items"
      emptyText="No items found."
      items={items}
      primaryKey="title"
      secondaryKey="status"
      detailKeys={["priority", "dueDate", "tags"]}
      detailLabels={{ dueDate: 'Due' }}
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
