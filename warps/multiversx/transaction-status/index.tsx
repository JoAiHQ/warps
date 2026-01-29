import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { CheckCircle, Clock, ExternalLink, XCircle } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { shortenHash } from '../helpers'
import { MultiversXTransactionStatusData, MultiversXTransactionStatusInputs } from './warp.types'

function Main() {
  const { data, inputs, config } = useAppContext<MultiversXTransactionStatusData, MultiversXTransactionStatusInputs>()

  const txHash = data?.TX_HASH || inputs?.TX_HASH

  if (!data && !inputs) {
    return <EmptyMessageSkeleton />
  }

  if (!txHash) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No transaction hash</EmptyMessage.Title>
        <EmptyMessage.Description>Please provide a transaction hash to check its status.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  const env = config?.WARP_ENV || 'mainnet'
  const explorerUrl = env === 'mainnet'
    ? `https://explorer.multiversx.com/transactions/${txHash}`
    : `https://${env}-explorer.multiversx.com/transactions/${txHash}`

  const isSuccess = data?.IS_SUCCESS
  const isPending = data?.IS_PENDING || (!data && inputs)
  const isFailed = data?.IS_FAILED

  const statusColor = isSuccess ? 'success' : isPending ? 'warning' : 'danger'
  const statusIcon = isSuccess ? <CheckCircle className="size-3" /> : isPending ? <Clock className="size-3" /> : <XCircle className="size-3" />

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto w-full">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          {statusIcon}
          <h1 className="heading-lg">Transaction Details</h1>
        </div>
        <Badge color={statusColor}>{statusIcon} {(data?.STATUS || 'pending').toUpperCase()}</Badge>
      </div>

      <div className="rounded-2xl border border-default bg-surface p-6 shadow-sm w-full">
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
             <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Transaction Hash</p>
             <div className="flex items-center gap-2 bg-surface-secondary p-2 rounded border border-subtle">
                <p className="font-mono text-xs break-all text-primary">{txHash}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data?.SENDER && (
                <div className="flex flex-col gap-1">
                    <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Sender</p>
                    <Tooltip content={data.SENDER}>
                        <p className="font-mono text-sm text-primary truncate cursor-help bg-surface-secondary p-2 rounded border border-subtle">
                            {shortenHash(data.SENDER)}
                        </p>
                    </Tooltip>
                </div>
            )}

            {data?.RECEIVER && (
                <div className="flex flex-col gap-1">
                    <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Receiver</p>
                    <Tooltip content={data.RECEIVER}>
                        <p className="font-mono text-sm text-primary truncate cursor-help bg-surface-secondary p-2 rounded border border-subtle">
                            {shortenHash(data.RECEIVER)}
                        </p>
                    </Tooltip>
                </div>
            )}
          </div>

          {(data?.VALUE || data?.GAS_USED) && (
              <div className="grid grid-cols-2 gap-4 mt-1">
                {data?.VALUE && (
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Value</p>
                        <p className="text-sm font-medium text-primary">
                            {(parseInt(data.VALUE) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 4 })} EGLD
                        </p>
                    </div>
                )}

                {data?.GAS_USED && (
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Gas Used</p>
                        <p className="text-sm text-secondary font-mono">{parseInt(data.GAS_USED as any).toLocaleString()}</p>
                    </div>
                )}
              </div>
          )}

          <div className="w-full h-px bg-subtle my-2" />

          <div className="flex justify-center">
             <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-link hover:underline flex items-center justify-center gap-1 font-medium"
            >
              View on MultiversX Explorer
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
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
