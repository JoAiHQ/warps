import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, truncateMiddle } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => {
    const address = typeof item.address === 'string' ? item.address : ''
    return {
      address: truncateMiddle(address, 6, 4) ?? '—',
      chain: item.chain,
      provider: item.provider,
      active: item.active,
      fullAddress: address || null,
    }
  })
  return (
    <ListResult
      title="Wallets"
      emptyText="No wallets found."
      items={items}
      primaryKey="address"
      secondaryKey="chain"
      detailKeys={['provider', 'active', 'fullAddress']}
      detailLabels={{ fullAddress: 'Address' }}
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
