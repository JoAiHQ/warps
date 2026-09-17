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
      title="Campaign stats"
      emptyText="No campaign stats available."
      metrics={[
        { label: 'Total campaigns', value: pickValue(record, ['TOTAL_CAMPAIGNS', 'totalCampaigns']) },
        { label: 'Drafts ready', value: pickValue(record, ['DRAFT_CAMPAIGNS', 'draftCampaigns']) },
        { label: 'Contacts reached', value: pickValue(record, ['TOTAL_SENT', 'totalSent']) },
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
