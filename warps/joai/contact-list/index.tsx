import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => {
    const name =
      (typeof item.name === 'string' && item.name.trim()) ||
      (typeof item.email === 'string' && item.email) ||
      (typeof item.phone === 'string' && item.phone) ||
      'Unnamed contact'
    return {
      name,
      company: item.company,
      email: item.email,
      phone: item.phone,
      tags: valueToDisplay(item.tags),
      health: item.health,
      lastActivityAt: formatDateShort(item.lastActivityAt),
    }
  })
  return (
    <ListResult
      title="Contacts"
      emptyText="No contacts found."
      items={items}
      primaryKey="name"
      secondaryKey="company"
      detailKeys={['email', 'phone', 'tags', 'health', 'lastActivityAt']}
      detailLabels={{ lastActivityAt: 'Last activity' }}
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
