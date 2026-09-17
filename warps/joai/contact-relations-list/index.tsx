import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, truncateText } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => {
    const contact = item.contact && typeof item.contact === 'object' ? (item.contact as Record<string, unknown>) : null
    return {
      name: contact?.name ?? '—',
      type: item.type,
      company: contact?.company,
      notes: truncateText(item.notes, 120),
    }
  })
  return (
    <ListResult
      title="Contact Relations"
      emptyText="No relations for this contact."
      items={items}
      primaryKey="name"
      secondaryKey="type"
      detailKeys={['company', 'notes']}
      detailLabels={{ company: 'Company', notes: 'Notes' }}
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
