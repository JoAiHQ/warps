import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { CheckCircle, DollarCircle, ExternalLink, Sparkles } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { shortenAddress, shortenHash } from '../helpers'
import { MultiversXStakingClaimRewardsAllData, MultiversXStakingClaimRewardsAllInputs } from './warp.types'

function ClaimCard({ claim }: { claim: any }) {
  const explorerUrl = `https://explorer.multiversx.com/transactions/${claim.txHash}`

  return (
    <div className="rounded-2xl border border-default bg-surface p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-secondary text-sm">Provider</p>
          <Tooltip content={claim.provider}>
            <p className="font-mono text-sm truncate cursor-help">{shortenAddress(claim.provider)}</p>
          </Tooltip>
        </div>
        <Badge color="success" className="ml-2 shrink-0">
          <CheckCircle className="size-3" />
        </Badge>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-secondary text-sm">
          <Sparkles className="size-4" />
          Claimed
        </div>
        <div className="text-lg font-semibold text-success">
          {claim.rewardsClaimedEgld.toFixed(4)} <span className="text-sm text-secondary">EGLD</span>
        </div>
      </div>
      <div className="border-t border-subtle pt-3">
        <p className="text-secondary text-xs mb-1">Transaction</p>
        <Tooltip content={claim.txHash}>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-link hover:underline cursor-pointer flex items-center gap-1 truncate"
          >
            {shortenHash(claim.txHash)}
            <ExternalLink className="size-3 shrink-0" />
          </a>
        </Tooltip>
      </div>
    </div>
  )
}

function Main() {
  const { data } = useAppContext<MultiversXStakingClaimRewardsAllData, MultiversXStakingClaimRewardsAllInputs>()

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  if (!data.CLAIMS || data.CLAIMS.length === 0) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No claims found</EmptyMessage.Title>
        <EmptyMessage.Description>No rewards were claimed.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">All Rewards Claimed!</h1>
        </div>
        <p className="text-secondary text-sm">
          {data.PROVIDER_COUNT} provider{data.PROVIDER_COUNT !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="rounded-2xl border border-default bg-surface-secondary p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-secondary text-xs uppercase tracking-wide mb-2">
            <DollarCircle className="size-4" />
            Total Claimed
          </div>
          <p className="text-3xl font-bold text-success">{data.TOTAL_REWARDS_CLAIMED_EGLD.toFixed(4)}</p>
          <p className="text-secondary text-sm mt-1">EGLD</p>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-secondary text-sm font-semibold uppercase tracking-wide">Claims</h2>
        {data.CLAIMS.map((claim: any, idx: number) => (
          <ClaimCard key={`${claim.provider}-${idx}`} claim={claim} />
        ))}
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
