import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { UnstakingSuccess } from '../../../ui/shared/multiversx/staking'
import { MregldUndelegateEgldData, MregldUndelegateEgldInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<MregldUndelegateEgldData, MregldUndelegateEgldInputs>()
  if (!data) return <EmptyMessageSkeleton />
  return <UnstakingSuccess txHash={data.TX_HASH} amount={data.AMOUNT_EGLD} />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
