import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, extractList } from '../../../ui/shared/joai'

type RelationEntry = {
  type?: string
  notes?: string | null
  contact?: { name?: string; company?: string | null } | null
}

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = extractList<RelationEntry>(data).map((entry) => ({
    name: entry.contact?.name ?? '—',
    type: entry.type,
    company: entry.contact?.company ?? undefined,
    notes: entry.notes ?? undefined,
  }))
  return (
    <ListResult
      title="Contact Relations"
      emptyText="No relations for this contact."
      items={items}
      primaryKey="name"
      secondaryKey="type"
      detailKeys={["company", "notes"]}
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
