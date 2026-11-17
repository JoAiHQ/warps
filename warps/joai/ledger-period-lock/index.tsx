import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { DetailResult, extractOutputRecord } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  return (
    <DetailResult
      title="Period locked"
      emptyText="No locked period found."
      record={extractOutputRecord(data, ['LEDGER_PERIOD'])}
      detailKeys={['startsOn', 'endsOn', 'lockedAt', 'id']}
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
