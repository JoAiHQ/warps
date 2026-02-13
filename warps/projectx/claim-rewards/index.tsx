import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ClaimSuccess } from '../../../ui/shared/multiversx/staking'
import { ProjectxClaimRewardsData, ProjectxClaimRewardsInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<ProjectxClaimRewardsData, ProjectxClaimRewardsInputs>()
  if (!data) return <EmptyMessageSkeleton />
  return <ClaimSuccess txHash={data.TX_HASH} amount={data.REWARDS_CLAIMED_EGLD} providerName="ProjectX" />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
