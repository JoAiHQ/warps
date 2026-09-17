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
      title="Blueprint"
      emptyText="No blueprint found."
      record={extractRecord(data)}
      primaryKey="name"
      secondaryKey="slug"
      detailKeys={['verified', 'documentCount', 'category', 'tags', 'description', 'createdAt']}
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
