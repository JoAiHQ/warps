import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems, truncateMiddle } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    version: item.version != null ? `v${item.version}` : truncateMiddle(item.id, 8, 4),
    status: item.status,
    type: item.type,
    env: item.env,
    txHash: truncateMiddle(item.txHash, 8, 6),
    createdAt: formatDateShort(item.createdAt),
  }))
  return (
    <ListResult
      title="Contract versions"
      emptyText="No contract versions found."
      items={items}
      primaryKey="version"
      secondaryKey="status"
      detailKeys={['type', 'env', 'txHash', 'createdAt']}
      detailLabels={{ txHash: 'Tx', createdAt: 'Created' }}
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
