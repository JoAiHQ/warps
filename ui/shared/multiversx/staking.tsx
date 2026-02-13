import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { CheckCircle, ExternalLink, Sparkles, Clock, Info, DollarCircle } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'

type BaseProps = {
  txHash: string
}

type StakingSuccessProps = BaseProps & {
  amount: number
  title?: string
}

type UnstakingSuccessProps = BaseProps & {
  amount: number
  title?: string
}

type RedelegateSuccessProps = BaseProps & {
  title?: string
}

type ClaimSuccessProps = BaseProps & {
  amount: number
  providerName: string
  title?: string
}

type LiquidStakeSuccessProps = BaseProps & {
  amount: number
  title?: string
}

type LiquidUnstakeSuccessProps = BaseProps & {
  title?: string
  instantWithdrawalNote?: boolean
}

type LiquidWithdrawSuccessProps = BaseProps & {
  title?: string
}

function ExplorerLink({ txHash }: { txHash: string }) {
  const explorerUrl = `https://explorer.multiversx.com/transactions/${txHash}`
  const shortHash = `${txHash.slice(0, 16)}...${txHash.slice(-8)}`
  
  return (
    <Tooltip content={txHash}>
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-sm text-link hover:underline cursor-pointer block truncate"
      >
        {shortHash}
      </a>
    </Tooltip>
  )
}

export function StakingSuccess({ txHash, amount, title = 'Staked Successfully!' }: StakingSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="success">Transaction Confirmed</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-secondary text-sm mb-1">Amount Staked</p>
            <p className="text-3xl font-bold text-success">{amount.toFixed(4)}</p>
            <p className="text-secondary text-sm">EGLD</p>
          </div>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export function UnstakingSuccess({ txHash, amount, title = 'Undelegated Successfully!' }: UnstakingSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="success">Transaction Confirmed</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-secondary text-sm mb-1">Amount Undelegated</p>
            <p className="text-3xl font-bold text-warning">{amount.toFixed(4)}</p>
            <p className="text-secondary text-sm">EGLD</p>
          </div>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export function RedelegateSuccess({ txHash, title = 'Rewards Restaked!' }: RedelegateSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="success">Transaction Confirmed</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <Sparkles className="size-8 text-warning mx-auto mb-2" />
            <p className="text-secondary text-sm mb-1">Staking rewards have been</p>
            <p className="text-2xl font-bold text-success">Added to Your Stake</p>
          </div>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export function ClaimSuccess({ txHash, amount, providerName, title = 'Rewards Claimed!' }: ClaimSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="success">Transaction Confirmed</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-secondary text-sm mb-1">Claimed Amount</p>
            <p className="text-3xl font-bold text-success">{amount.toFixed(4)}</p>
            <p className="text-secondary text-sm">EGLD</p>
          </div>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <DollarCircle className="size-4" />
              Provider
            </dt>
            <Tooltip content={providerName}>
              <dd className="font-mono text-sm truncate cursor-help">{providerName}</dd>
            </Tooltip>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export function LiquidStakeSuccess({ txHash, amount, title = 'Liquid Staked!' }: LiquidStakeSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="success">Transaction Confirmed</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <Info className="size-8 text-link mx-auto mb-2" />
            <p className="text-secondary text-sm mb-1">Amount Staked</p>
            <p className="text-3xl font-bold text-success">{amount.toFixed(4)}</p>
            <p className="text-secondary text-sm">EGLD</p>
          </div>
        </div>
        <div className="rounded-lg bg-surface-secondary p-3 mb-4">
          <p className="text-secondary text-xs text-center">
            You received liquid staking tokens representing your staked position
          </p>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export function LiquidUnstakeSuccess({ txHash, title = 'Unstaking Initiated!', instantWithdrawalNote }: LiquidUnstakeSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="warning">Processing</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <Clock className="size-8 text-warning mx-auto mb-2" />
            <p className="text-secondary text-sm mb-1">Tokens Submitted for Unstaking</p>
            <p className="text-lg font-semibold">Unbonding Period Started</p>
          </div>
        </div>
        <div className="rounded-lg bg-surface-secondary p-3 mb-4">
          <p className="text-secondary text-xs text-center">
            You will receive unstake tokens that can be withdrawn after the unbonding period
            {instantWithdrawalNote && '. Instant withdrawals may be available if liquidity is sufficient.'}
          </p>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export function LiquidWithdrawSuccess({ txHash, title = 'Withdrawn Successfully!' }: LiquidWithdrawSuccessProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="size-8 text-success" />
          <h1 className="heading-lg">{title}</h1>
        </div>
        <Badge color="success">Transaction Confirmed</Badge>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <DollarCircle className="size-8 text-success mx-auto mb-2" />
            <p className="text-secondary text-sm mb-1">eGold Withdrawn</p>
            <p className="text-lg font-semibold text-success">Funds Available in Wallet</p>
          </div>
        </div>
        <div className="rounded-lg bg-surface-secondary p-3 mb-4">
          <p className="text-secondary text-xs text-center">
            Your eGold has been successfully withdrawn to your wallet
          </p>
        </div>
        <dl className="space-y-4 border-t border-subtle pt-4">
          <div>
            <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
              <ExternalLink className="size-4" />
              Transaction
            </dt>
            <dd><ExplorerLink txHash={txHash} /></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
