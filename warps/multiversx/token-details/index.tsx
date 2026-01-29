import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { ExternalLink, Info, User } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { MultiversXTokenDetailsData, MultiversXTokenDetailsInputs } from './warp.types'

function Main() {
  const { data, inputs, config } = useAppContext<MultiversXTokenDetailsData, MultiversXTokenDetailsInputs>()

  const identifier = data?.IDENTIFIER || inputs?.TOKEN_IDENTIFIER

  if (!data && !inputs) {
    return <EmptyMessageSkeleton />
  }

  if (!identifier) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No token identifier</EmptyMessage.Title>
        <EmptyMessage.Description>Please provide a token identifier to check its details.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  const env = config?.WARP_ENV || 'mainnet'
  const explorerUrl = env === 'mainnet'
    ? `https://explorer.multiversx.com/tokens/${identifier}`
    : `https://${env}-explorer.multiversx.com/tokens/${identifier}`

  // Ensure supply formatted fallback
  const supplyFormatted = data?.SUPPLY_FORMATTED || 'Unknown'
  const ticker = data?.TICKER || identifier?.split('-')[0] || 'Unknown'
  const name = data?.NAME || 'Unknown Token'

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto w-full">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-surface-secondary p-2 rounded-full">
             <Info className="size-5 text-primary" />
          </div>
          <h1 className="heading-lg">Token Details</h1>
        </div>
        <Badge variant="outline" className="font-mono">{identifier}</Badge>
      </div>

      <div className="rounded-2xl border border-default bg-surface p-6 shadow-sm w-full">
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
             <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Name</p>
             <p className="text-lg font-medium text-primary">{name} <span className="text-secondary text-sm font-normal">({ticker})</span></p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="flex flex-col gap-1">
                <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Type</p>
                <div className="flex items-center gap-1">
                   {data?.TYPE && <Badge variant="soft" size="sm">{data.TYPE}</Badge>}
                   {!data?.TYPE && <span className="text-sm text-secondary">-</span>}
                </div>
             </div>

             <div className="flex flex-col gap-1">
                <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Decimals</p>
                <p className="text-sm font-mono text-primary">{data?.DECIMALS ?? '-'}</p>
             </div>
          </div>

          <div className="flex flex-col gap-1">
             <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Total Supply</p>
             <div className="flex items-center gap-1">
                <p className="text-lg font-mono text-primary">{supplyFormatted}</p>
                <span className="text-sm text-secondary">{ticker}</span>
             </div>
          </div>

          {data?.OWNER && (
             <div className="flex flex-col gap-1">
                <p className="text-secondary text-xs uppercase tracking-wide font-semibold flex items-center gap-1">
                   Owner <Tooltip content="The account that owns this token definition"><Info className="size-3 text-tertiary" /></Tooltip>
                </p>
                <div className="flex items-center gap-2 bg-surface-secondary p-2 rounded border border-subtle overflow-hidden">
                    <User className="size-3 text-secondary flex-shrink-0" />
                    <p className="font-mono text-xs truncate text-primary select-all">{data.OWNER}</p>
                </div>
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
