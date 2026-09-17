import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import {
  StatsResult,
  asRecord,
  extractRecord,
  humanizeKey,
  pickValue,
} from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const record = extractRecord(data)
  const reasons = asRecord(pickValue(record, ['REASONS', 'reasons']))
  const reasonMetrics = reasons
    ? Object.entries(reasons).map(([key, value]) => ({
        label: humanizeKey(key),
        value,
      }))
    : []

  return (
    <StatsResult
      title="Audience preview"
      emptyText="No audience preview available."
      metrics={[
        { label: 'Total', value: pickValue(record, ['TOTAL', 'total']) },
        { label: 'Sendable', value: pickValue(record, ['SENDABLE', 'sendable']) },
        { label: 'Will skip', value: pickValue(record, ['WILL_SKIP', 'willSkip']) },
        ...reasonMetrics,
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
