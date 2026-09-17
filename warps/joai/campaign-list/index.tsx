import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => {
    const segment = item.segment && typeof item.segment === 'object'
      ? (item.segment as Record<string, unknown>).name
      : item.segmentName
    return {
      name: item.name,
      status: item.status,
      channel: item.channel,
      audience: segment,
      progress: item.totalCount != null ? `${item.sentCount ?? 0}/${item.totalCount}` : item.sentCount,
      scheduledAt: formatDateShort(item.scheduledAt),
    }
  })
  return (
    <ListResult
      title="Campaigns"
      emptyText="No campaigns found."
      items={items}
      primaryKey="name"
      secondaryKey="status"
      detailKeys={['channel', 'audience', 'progress', 'scheduledAt']}
      detailLabels={{ progress: 'Sent', scheduledAt: 'Scheduled', audience: 'Audience' }}
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
