import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { TimelineResult, extractList, nestedName, truncateText } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = extractList(data).map((entry) => {
    const item = entry && typeof entry === 'object' ? (entry as Record<string, unknown>) : {}
    const content = truncateText(item.content, 280) ?? item.content
    return {
      ...item,
      content,
      description: truncateText(item.description, 180) ?? item.description,
      author: nestedName(item.author) ?? item.agentName ?? item.author,
    }
  })
  return <TimelineResult items={items} emptyText="No timeline entries for this contact." />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
