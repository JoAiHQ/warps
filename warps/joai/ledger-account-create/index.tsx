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
      title="Ledger account created"
      emptyText="No ledger account found."
      record={extractOutputRecord(data, ['LEDGER_ACCOUNT'])}
      primaryKey="name"
      secondaryKey="code"
      detailKeys={['type', 'role', 'defaultTaxCodeId', 'archivedAt']}
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
