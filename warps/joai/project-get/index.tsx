import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { DetailResult, extractRecord, truncateText } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const record = extractRecord(data)
  const mapped = record
    ? {
        ...record,
        brief: truncateText(record.brief, 160) ?? record.brief,
      }
    : null

  return (
    <DetailResult
      title="Project"
      emptyText="No project found."
      record={mapped}
      primaryKey="name"
      secondaryKey="status"
      detailKeys={['outputPreset', 'outputType', 'brief', 'targetPlatforms', 'createdAt', 'updatedAt']}
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
