import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { StakingSuccess } from '../../../ui/shared/multiversx/staking'
import { HatomStakeEgldData, HatomStakeEgldInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<HatomStakeEgldData, HatomStakeEgldInputs>()
  if (!data) return <EmptyMessageSkeleton />
  return <StakingSuccess txHash={data.TX_HASH} amount={data.AMOUNT_EGLD} />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
