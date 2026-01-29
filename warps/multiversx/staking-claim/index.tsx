import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { CheckCircle, DollarCircle, ExternalLink } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { shortenAddress, shortenHash } from '../helpers'
import { MultiversXStakingClaimRewardsData, MultiversXStakingClaimRewardsInputs } from './warp.types'

function Main() {
  const { data } = useAppContext<MultiversXStakingClaimRewardsData, MultiversXStakingClaimRewardsInputs>()

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  if (!data.TX_HASH) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No data available</EmptyMessage.Title>
        <EmptyMessage.Description>Rewards claim information is not available.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  const explorerUrl = `https://explorer.multiversx.com/transactions/${data.TX_HASH}`

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">Rewards Claimed!</h1>
        </div>
        <Badge color="success">Transaction Successful</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-secondary text-sm mb-1">Claimed Amount</p>
            <p className="text-3xl font-bold text-success">{data.REWARDS_CLAIMED_EGLD.toFixed(4)}</p>
            <p className="text-secondary text-sm">EGLD</p>
          </div>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <DollarCircle className="size-4" />
              Provider
            </dt>
            <Tooltip content={data.PROVIDER}>
              <dd className="font-mono text-sm truncate cursor-help">{shortenAddress(data.PROVIDER)}</dd>
            </Tooltip>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <Tooltip content={data.TX_HASH}>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-link hover:underline cursor-pointer block truncate"
              >
                {shortenHash(data.TX_HASH)}
              </a>
            </Tooltip>
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
