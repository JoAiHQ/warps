import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { StatsResult, extractRecord, pickValue } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const record = extractRecord(data)
  return (
    <StatsResult
      title="Update stats"
      emptyText="No update stats available."
      metrics={[
        { label: 'Deals', value: pickValue(record, ['DEALS_COUNT', 'dealsCount']) },
        { label: 'Events', value: pickValue(record, ['EVENTS_COUNT', 'eventsCount']) },
        { label: 'News', value: pickValue(record, ['NEWS_COUNT', 'newsCount']) },
        { label: 'Articles', value: pickValue(record, ['ARTICLES_COUNT', 'articlesCount']) },
      ]}
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
