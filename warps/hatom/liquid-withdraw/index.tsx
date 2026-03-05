import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { LiquidWithdrawSuccess } from '../../../ui/shared/multiversx/staking'
import { HatomLiquidWithdrawData, HatomLiquidWithdrawInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<HatomLiquidWithdrawData, HatomLiquidWithdrawInputs>()
  if (!data) return <EmptyMessageSkeleton />
  return <LiquidWithdrawSuccess txHash={data.TX_HASH} />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
