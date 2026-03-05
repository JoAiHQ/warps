import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { LiquidUnstakeSuccess } from '../../../ui/shared/multiversx/staking'
import { XoxnoLiquidUnstakeData, XoxnoLiquidUnstakeInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<XoxnoLiquidUnstakeData, XoxnoLiquidUnstakeInputs>()
  if (!data) return <EmptyMessageSkeleton />
  return <LiquidUnstakeSuccess txHash={data.TX_HASH} instantWithdrawalNote />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
