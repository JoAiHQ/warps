import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { RedelegateSuccess } from '../../../ui/shared/multiversx/staking'
import { MregldRedelegateEgldData, MregldRedelegateEgldInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<MregldRedelegateEgldData, MregldRedelegateEgldInputs>()
  if (!data) return <EmptyMessageSkeleton />
  return <RedelegateSuccess txHash={data.TX_HASH} />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
