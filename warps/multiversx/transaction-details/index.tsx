import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { ArrowUpRight, CheckCircle, Clock, Code, DollarCircle, ExternalLink, Number, Tag, User, XCircle } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { shortenAddress, shortenHash } from '../helpers'
import { MultiversXTransactionDetailsData, MultiversXTransactionDetailsInputs } from './warp.types'

function Main() {
  const { data, inputs, config } = useAppContext<MultiversXTransactionDetailsData, MultiversXTransactionDetailsInputs>()
  const txHash = data?.TX_HASH || inputs?.TX_HASH

  if (!data && !inputs) {
    return <EmptyMessageSkeleton />
  }

  if (!txHash) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No transaction data</EmptyMessage.Title>
        <EmptyMessage.Description>Transaction information is not available.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  const env = config?.WARP_ENV || 'mainnet'
  const explorerUrl = env === 'mainnet'
    ? `https://explorer.multiversx.com/transactions/${txHash}`
    : `https://${env}-explorer.multiversx.com/transactions/${txHash}`

  const isSuccess = data?.STATUS.toLowerCase() === 'success' || data?.STATUS.toLowerCase() === 'executed'
  const isPending = data?.STATUS.toLowerCase() === 'pending' || (!data && inputs)
  const statusColor = isSuccess ? 'success' : isPending ? 'warning' : 'danger'
  const statusIcon = isSuccess ? <CheckCircle className="size-3" /> : isPending ? <Clock className="size-3" /> : <XCircle className="size-3" />

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          {statusIcon}
          <h1 className="heading-lg">Transaction Details</h1>
        </div>
        <Badge color={statusColor}>{statusIcon} {data?.STATUS || 'PENDING'}</Badge>
      </div>

      <div className="rounded-2xl border border-default bg-surface p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-secondary text-xs uppercase tracking-wide mb-1">Transaction Hash</p>
            <Tooltip content={txHash}>
              <p className="font-mono text-sm cursor-help">{shortenHash(txHash)}</p>
            </Tooltip>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-link hover:underline flex items-center justify-center gap-1 mt-2"
            >
              View on Explorer
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        {data ? (
          <>
            {data.VALUE_EGLD !== undefined && data.VALUE_EGLD > 0 && (
              <div className="border-t border-subtle pt-4 mb-4">
                <div className="text-center">
                  <dt className="flex items-center justify-center gap-2 text-secondary text-sm mb-1">
                    <DollarCircle className="size-4" />
                    Value Transferred
                  </dt>
                  <dd className="text-2xl font-bold text-primary">{data.VALUE_EGLD.toFixed(4)}</dd>
                  <dd className="text-secondary text-xs">EGLD</dd>
                </div>
              </div>
            )}

            <dl className="space-y-4 border-t border-subtle pt-4">
              <div>
                <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
                  <User className="size-4" />
                  Sender
                </dt>
                <Tooltip content={data.SENDER}>
                  <dd className="font-mono text-sm truncate cursor-help">{shortenAddress(data.SENDER)}</dd>
                </Tooltip>
              </div>

              {data.RECEIVER && (
                <div>
                  <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
                    <ArrowUpRight className="size-4" />
                    Receiver
                  </dt>
                  <Tooltip content={data.RECEIVER}>
                    <dd className="font-mono text-sm truncate cursor-help">{shortenAddress(data.RECEIVER)}</dd>
                  </Tooltip>
                </div>
              )}

              <div className="flex justify-between border-t border-subtle pt-4">
                <dt className="flex items-center gap-2 text-secondary text-sm">
                  <Number className="size-4" />
                  Nonce
                </dt>
                <dd className="font-mono text-sm">{data.NONCE.toLocaleString()}</dd>
              </div>

              <div className="flex justify-between border-t border-subtle pt-4">
                <dt className="flex items-center gap-2 text-secondary text-sm">
                  <Tag className="size-4" />
                  Gas Limit
                </dt>
                <dd className="font-mono text-sm">{data.GAS_LIMIT.toLocaleString()}</dd>
              </div>

              <div className="flex justify-between border-t border-subtle pt-4">
                <dt className="flex items-center gap-2 text-secondary text-sm">
                  <Tag className="size-4" />
                  Gas Price
                </dt>
                <dd className="font-mono text-sm">{data.GAS_PRICE.toLocaleString()}</dd>
              </div>

              {data.GAS_USED !== undefined && (
                <div className="flex justify-between border-t border-subtle pt-4">
                  <dt className="flex items-center gap-2 text-secondary text-sm">
                    <Tag className="size-4" />
                    Gas Used
                  </dt>
                  <dd className="font-mono text-sm">{data.GAS_USED.toLocaleString()}</dd>
                </div>
              )}

              {data.FEE_EGLD !== undefined && data.FEE_EGLD > 0 && (
                <div className="flex justify-between border-t border-subtle pt-4">
                  <dt className="flex items-center gap-2 text-secondary text-sm">
                    <DollarCircle className="size-4" />
                    Fee
                  </dt>
                  <dd className="font-mono text-sm">
                    {data.FEE_EGLD.toFixed(6)} <span className="text-secondary text-xs">EGLD</span>
                  </dd>
                </div>
              )}

              {data.TIMESTAMP && (
                <div className="flex justify-between border-t border-subtle pt-4">
                  <dt className="flex items-center gap-2 text-secondary text-sm">
                    <Clock className="size-4" />
                    Timestamp
                  </dt>
                  <dd className="font-mono text-sm">{new Date(data.TIMESTAMP * 1000).toLocaleString()}</dd>
                </div>
              )}

              {data.FUNCTION && (
                <div className="flex justify-between border-t border-subtle pt-4">
                  <dt className="flex items-center gap-2 text-secondary text-sm">
                    <Tag className="size-4" />
                    Function
                  </dt>
                  <dd className="font-mono text-sm font-medium bg-secondary/10 px-2 py-0.5 rounded text-primary">{data.FUNCTION}</dd>
                </div>
              )}

              {data.DATA && (
                <div className="border-t border-subtle pt-4">
                  <dt className="flex items-center gap-2 text-secondary text-sm mb-1">
                    <Code className="size-4" />
                    Transaction Data
                  </dt>
                  <Tooltip content={data.DATA}>
                    <dd className="font-mono text-xs break-all cursor-help max-h-24 overflow-y-auto">{data.DATA}</dd>
                  </Tooltip>
                </div>
              )}

              {data.SMART_CONTRACT_RESULTS && data.SMART_CONTRACT_RESULTS.length > 0 && (
                <div className="border-t border-subtle pt-4">
                  <dt className="flex items-center gap-2 text-secondary text-sm mb-2">
                    <Code className="size-4" />
                    Smart Contract Results
                  </dt>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {data.SMART_CONTRACT_RESULTS.map((result: string, idx: number) => (
                      <Tooltip key={idx} content={result}>
                        <dd className="font-mono text-xs break-all cursor-help">{shortenHash(result)}</dd>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
            </dl>
          </>
        ) : (
          <div className="border-t border-subtle pt-8 pb-4 text-center">
             <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-4 w-3/4 bg-subtle rounded" />
                <div className="h-4 w-1/2 bg-subtle rounded" />
                <p className="text-sm text-secondary mt-4">Waiting for transaction execution data...</p>
             </div>
          </div>
        )}
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
