import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { StatsResult, extractRecord, pickValue, truncateMiddle } from '../../../ui/shared/joai'

function formatBalance(raw: unknown): string | null {
  if (typeof raw !== 'string' && typeof raw !== 'number') return null
  const value = Number(raw)
  if (!Number.isFinite(value)) return null
  return `${(value / 1e18).toLocaleString(undefined, { maximumFractionDigits: 4 })} EGLD`
}

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const record = extractRecord(data)
  const address = pickValue(record, ['address', 'ADDRESS'])
  return (
    <StatsResult
      title="OpenBond network"
      emptyText="No network data available."
      metrics={[
        { label: 'Balance', value: formatBalance(pickValue(record, ['balance', 'BALANCE'])) },
        { label: 'Nonce', value: pickValue(record, ['nonce', 'NONCE']) },
        { label: 'Shard', value: pickValue(record, ['shard', 'SHARD']) },
        { label: 'Address', value: truncateMiddle(address, 10, 6) ?? address },
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
