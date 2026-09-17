import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { TimelineResult, mapListItems, nestedName, truncateText } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    source: 'activity',
    type: item.type,
    description: truncateText(item.description, 180) ?? item.description,
    createdAt: item.createdAt,
    author: nestedName(item.author) ?? item.agentName,
  }))
  return (
    <TimelineResult
      title="Contact activities"
      emptyText="No activities for this contact."
      items={items}
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
