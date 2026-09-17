import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { DetailResult, extractRecord } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  return (
    <DetailResult
      title="Contract"
      emptyText="No contract found."
      record={extractRecord(data)}
      primaryKey="name"
      secondaryKey="chain"
      detailKeys={['slug', 'category', 'verified', 'description', 'versionsCount', 'createdAt', 'updatedAt']}
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
