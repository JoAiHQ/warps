import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { ExternalLink, Tag, User } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { MultiversXViewNFTData, MultiversXViewNFTInputs } from './warp.types'

function NftImage({ url, name }: { url: string; name: string }) {
  const [error, setError] = React.useState(false)

  if (!url || error) {
    return (
      <div className="w-full aspect-square rounded-xl bg-surface-secondary flex items-center justify-center">
        <Tag className="size-12 text-tertiary" />
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={name}
      className="w-full aspect-square rounded-xl object-cover"
      onError={() => setError(true)}
    />
  )
}

function Attributes({ attributes }: { attributes: any }) {
  if (!attributes) return null

  let items: { trait_type: string; value: string }[] = []

  if (typeof attributes === 'string') {
    let decoded = attributes
    try {
      const test = atob(attributes)
      if (/^[\x20-\x7E\n\r\t]+$/.test(test)) decoded = test
    } catch { /* not base64 */ }
    items = decoded.split(';').filter(Boolean).map((pair: string) => {
      const [trait_type, ...rest] = pair.split(':')
      return { trait_type: trait_type?.trim() || '', value: rest.join(':')?.trim() || '' }
    })
  } else if (Array.isArray(attributes)) {
    items = attributes.map((a: any) => ({
      trait_type: a.trait_type || a.name || '',
      value: String(a.value || ''),
    }))
  }

  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Attributes</p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((attr, i) => (
          <div key={i} className="rounded-lg bg-surface-secondary p-2 text-center">
            <p className="text-tertiary text-[10px] uppercase tracking-wide font-semibold">{attr.trait_type}</p>
            <p className="text-sm font-medium text-primary truncate">{attr.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Main() {
  const { data, inputs, config } = useAppContext<MultiversXViewNFTData, MultiversXViewNFTInputs>()

  const identifier = data?.NFT_IDENTIFIER
  const collection = data?.COLLECTION || inputs?.COLLECTION_ID

  if (!data && !inputs) {
    return <EmptyMessageSkeleton />
  }

  if (!identifier && !collection) {
    return (
      <EmptyMessage>
        <EmptyMessage.Title>No NFT found</EmptyMessage.Title>
        <EmptyMessage.Description>Could not find an NFT in this collection.</EmptyMessage.Description>
      </EmptyMessage>
    )
  }

  const env = config?.WARP_ENV || 'mainnet'
  const explorerBase = env === 'mainnet'
    ? 'https://explorer.multiversx.com'
    : `https://${env}-explorer.multiversx.com`

  const nftExplorerUrl = identifier ? `${explorerBase}/nfts/${identifier}` : null
  const collectionExplorerUrl = collection ? `${explorerBase}/collections/${collection}` : null
  const mediaUrl = data?.MEDIA_URL || data?.THUMBNAIL_URL || ''
  const royaltiesPercent = data?.ROYALTIES ? (Number(data.ROYALTIES) / 100).toFixed(2) : null

  return (
    <div className="flex flex-col gap-4 p-4 max-w-sm mx-auto w-full">
      <NftImage url={mediaUrl} name={data?.NFT_NAME || 'NFT'} />

      <div className="flex flex-col gap-1">
        <h1 className="heading-lg">{data?.NFT_NAME || 'NFT'}</h1>
        {collection && (
          <a
            href={collectionExplorerUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-link hover:underline"
          >
            {collection}
          </a>
        )}
      </div>

      <div className="rounded-2xl border border-default bg-surface p-4 shadow-sm w-full">
        <div className="flex flex-col gap-4">
          {identifier && (
            <div className="flex flex-col gap-1">
              <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Identifier</p>
              <Badge variant="outline" className="font-mono w-fit">{identifier}</Badge>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {data?.NONCE != null && (
              <div className="flex flex-col gap-1">
                <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Nonce</p>
                <p className="text-sm font-mono text-primary">#{data.NONCE}</p>
              </div>
            )}
            {royaltiesPercent && (
              <div className="flex flex-col gap-1">
                <p className="text-secondary text-xs uppercase tracking-wide font-semibold">Royalties</p>
                <p className="text-sm font-mono text-primary">{royaltiesPercent}%</p>
              </div>
            )}
          </div>

          {data?.CREATOR && (
            <div className="flex flex-col gap-1">
              <p className="text-secondary text-xs uppercase tracking-wide font-semibold flex items-center gap-1">
                Creator <Tooltip content="The account that created this NFT"><User className="size-3 text-tertiary" /></Tooltip>
              </p>
              <div className="flex items-center gap-2 bg-surface-secondary p-2 rounded border border-subtle overflow-hidden">
                <User className="size-3 text-secondary flex-shrink-0" />
                <p className="font-mono text-xs truncate text-primary select-all">{data.CREATOR}</p>
              </div>
            </div>
          )}

          <Attributes attributes={data?.ATTRIBUTES} />

          {nftExplorerUrl && (
            <>
              <div className="w-full h-px bg-subtle my-1" />
              <div className="flex justify-center">
                <a
                  href={nftExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-link hover:underline flex items-center justify-center gap-1 font-medium"
                >
                  View on MultiversX Explorer
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </>
          )}
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
