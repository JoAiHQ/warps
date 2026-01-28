import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { AvatarProfile, DollarCircle, Number } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { shortenAddress } from '../helpers'
import { AccountToolData } from '../types'

function Main() {
  const { data } = useAppContext<AccountToolData>()

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  if (!data.ACCOUNT_DATA) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No account data</EmptyMessage.Title>
        <EmptyMessage.Description>Account information is not available.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="heading-lg">MultiversX Account</h1>
        <Tooltip content={data.ACCOUNT_DATA.address}>
          <p className="font-mono text-sm text-secondary mt-1 cursor-help">{shortenAddress(data.ACCOUNT_DATA.address)}</p>
        </Tooltip>
        {data.USERNAME && (
          <Badge color="info" className="mt-2">
            @{data.USERNAME}
          </Badge>
        )}
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-secondary">
              <DollarCircle className="size-5" />
              Balance
            </dt>
            <dd className="text-xl font-bold text-primary">
              {data.BALANCE_FORMATTED} <span className="text-sm text-secondary">EGLD</span>
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-subtle pt-4">
            <dt className="flex items-center gap-2 text-secondary">
              <Number className="size-5" />
              Nonce
            </dt>
            <dd className="font-medium">{data.NONCE.toLocaleString()}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-subtle pt-4">
            <dt className="flex items-center gap-2 text-secondary">
              <AvatarProfile className="size-5" />
              Shard
            </dt>
            <dd className="font-medium">{data.ACCOUNT_DATA.shard}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App>
        <Main />
      </App>
    </React.StrictMode>
  )
}
