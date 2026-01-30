import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { CheckCircle, ChevronDown, ChevronRight, Clock, DollarCircle, Sparkles } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { AppExecute } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { formatEgld, shortenAddress } from '../helpers'
import { Config } from './config'
import { MultiversXStakingViewDelegationsData, MultiversXStakingViewDelegationsInputs } from './warp.types'

export function DelegationCard({ delegation, executeTool }: { delegation: any; executeTool: AppExecute }) {
  const [expanded, setExpanded] = useState(false)
  const [claimRequested, setClaimRequested] = useState(false)
  const activeStake = formatEgld(delegation.userActiveStake)
  const rewards = formatEgld(delegation.claimableRewards)
  const unbondable = formatEgld(delegation.userUnBondable)
  const undelegatedList = delegation.userUndelegatedList ?? []
  const hasUndelegated = undelegatedList.length > 0
  const hasUnbondable = BigInt(delegation.userUnBondable) > 0
  const hasRewards = BigInt(delegation.claimableRewards) > 0

  return (
    <div className="rounded-2xl border border-default bg-surface p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-secondary text-sm">Provider</p>
          <Tooltip content={delegation.contract}>
            <p className="font-mono text-sm truncate cursor-help">{shortenAddress(delegation.contract)}</p>
          </Tooltip>
        </div>
        {hasUndelegated && (
          <Badge color="warning" className="ml-2 shrink-0">
            Pending
          </Badge>
        )}
      </div>
      <dl className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <dt className="flex items-center gap-1.5 text-secondary text-sm">
            <DollarCircle className="size-4" />
            Active Stake
          </dt>
          <dd className="text-lg font-semibold text-primary mt-1">
            {activeStake} <span className="text-sm text-secondary">EGLD</span>
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-secondary text-sm">
            <Sparkles className="size-4" />
            Rewards
          </dt>
          <dd className="text-lg font-semibold text-success mt-1">
            {rewards} <span className="text-sm text-secondary">EGLD</span>
          </dd>
        </div>
      </dl>
      {hasRewards && !claimRequested && (
        <Button
          color="success"
          size="sm"
          block
          className="mb-3"
          onClick={() => {
            setClaimRequested(true)
            executeTool(Config.Tools.StakingClaim, {
              PROVIDER: delegation.contract,
            })
          }}
        >
          <Sparkles />
          Claim Rewards
        </Button>
      )}
      {hasRewards && claimRequested && (
        <div
          className="mb-3 rounded-xl border border-success/30 bg-success/10 px-3 py-2 text-sm text-success flex items-center gap-2 shadow-sm"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="size-4" />
          Claim request sent.
        </div>
      )}
      {(hasUndelegated || hasUnbondable) && (
        <div className="border-t border-subtle pt-3 mt-3">
          <button onClick={() => setExpanded(!expanded)} className="text-sm text-link hover:underline flex items-center gap-1">
            {expanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            Unbonding Details
          </button>
          {expanded && (
            <dl className="mt-3 space-y-2">
              {hasUnbondable && (
                <div className="flex justify-between text-sm">
                  <dt className="flex items-center gap-1.5 text-secondary">
                    <Clock className="size-4" />
                    Ready to withdraw
                  </dt>
                  <dd className="font-medium">{unbondable} EGLD</dd>
                </div>
              )}
              {undelegatedList.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-sm">
                  <dt className="text-secondary">Undelegating {item.seconds === 0 ? '(ready)' : `(${item.seconds}s remaining)`}</dt>
                  <dd className="font-medium">{formatEgld(item.amount)} EGLD</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  )
}

export function Main() {
  const [claimAllRequested, setClaimAllRequested] = useState(false)
  const { data, executeTool, executePrompt } = useAppContext<MultiversXStakingViewDelegationsData, MultiversXStakingViewDelegationsInputs>()

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  if (!data.DELEGATIONS || data.DELEGATIONS.length === 0) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No delegations found</EmptyMessage.Title>
        <EmptyMessage.Description>You don't have any active delegations to display.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <h1 className="heading-lg">Your staked eGold</h1>
        <p className="text-secondary text-sm mt-1">
          {data.PROVIDER_COUNT} provider{data.PROVIDER_COUNT !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="rounded-2xl border border-default bg-surface-secondary p-4">
        <dl className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <dt className="text-secondary text-xs uppercase tracking-wide">Total Staked</dt>
            <dd className="text-2xl font-bold text-primary mt-1">{data.TOTAL_STAKED_EGLD.toFixed(2)}</dd>
            <dd className="text-secondary text-xs">EGLD</dd>
          </div>
          <div className="text-center">
            <dt className="text-secondary text-xs uppercase tracking-wide">Total Rewards</dt>
            <dd className="text-2xl font-bold text-success mt-1">{data.TOTAL_REWARDS_EGLD.toFixed(2)}</dd>
            <dd className="text-secondary text-xs">EGLD</dd>
          </div>
        </dl>
      </div>
      {!claimAllRequested ? (
        <Button
          color="success"
          block
          onClick={() => {
            setClaimAllRequested(true)
            executePrompt('Claim all my staking rewards')
          }}
        >
          <Sparkles />
          Claim All Rewards
        </Button>
      ) : (
        <div
          className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success flex items-center justify-center gap-2 shadow-sm"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="size-4" />
          Claim request sent.
        </div>
      )}
      <div className="space-y-3">
        <h2 className="text-secondary text-sm font-semibold uppercase tracking-wide">Delegations</h2>
        {data.DELEGATIONS.map((delegation: any, idx: number) => (
          <DelegationCard key={`${delegation.contract}-${idx}`} delegation={delegation} executeTool={executeTool} />
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
