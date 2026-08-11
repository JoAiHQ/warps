import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { Copy, ExternalLink, File, FileAudio, FileImage, FileVideo, PlayCircleFilled } from '@openai/apps-sdk-ui/components/Icon'
import React from 'react'
import { useAppContext } from '../../lib/components'
import type { ListItem } from './ListResult'

type MediaKind = 'image' | 'video' | 'audio' | 'file'

type Props = {
  title: string
  emptyText: string
  items: ListItem[]
}

const stringValue = (value: unknown): string => typeof value === 'string' ? value.trim() : ''

export function getMediaUrl(item: ListItem): string {
  const library = item.library && typeof item.library === 'object' ? item.library as ListItem : {}
  return stringValue(item.url) || stringValue(library.preview_url) || stringValue(library.original_url)
}

export function getMediaKind(item: ListItem): MediaKind {
  const mime = stringValue(item.mime).toLowerCase()
  const location = `${stringValue(item.name)} ${getMediaUrl(item)}`.toLowerCase()

  if (mime.startsWith('image/') || /\.(jpe?g|png|gif|webp|svg)(?:[?#\s]|$)/.test(location)) return 'image'
  if (mime.startsWith('video/') || /\.(mp4|webm|mov|avi)(?:[?#\s]|$)/.test(location)) return 'video'
  if (mime.startsWith('audio/') || /\.(mp3|ogg|wav|aac|m4a)(?:[?#\s]|$)/.test(location)) return 'audio'
  return 'file'
}

const getMediaLabel = (item: ListItem): string => {
  const mime = stringValue(item.mime)
  if (mime) return (mime.split('/').pop() || mime).toUpperCase()
  const extension = stringValue(item.name).split('.').pop()
  return extension && extension !== item.name ? extension.toUpperCase() : 'FILE'
}

function MediaIcon({ kind, className }: { kind: MediaKind; className: string }) {
  if (kind === 'image') return <FileImage className={className} />
  if (kind === 'video') return <FileVideo className={className} />
  if (kind === 'audio') return <FileAudio className={className} />
  return <File className={className} />
}

function MediaPlaceholder({ kind, label, ariaLabel }: { kind: MediaKind; label: string; ariaLabel: string }) {
  return (
    <div aria-label={ariaLabel} className="flex h-full w-full flex-col items-center justify-center gap-2 bg-warp-surface-secondary text-warp-fg-muted">
      <MediaIcon kind={kind} className="size-8" />
      <span className="text-[10px] font-semibold tracking-wider">{label}</span>
    </div>
  )
}

function MediaPreview({ item, name }: { item: ListItem; name: string }) {
  const url = getMediaUrl(item)
  const kind = getMediaKind(item)
  const label = getMediaLabel(item)
  const [failedUrl, setFailedUrl] = React.useState('')

  if (!url || failedUrl === url) return <MediaPlaceholder kind={kind} label={label} ariaLabel={`${name} preview unavailable`} />

  if (kind === 'image') {
    return <img src={url} alt={name} loading="lazy" onError={() => setFailedUrl(url)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
  }

  if (kind === 'video') {
    return (
      <div className="relative h-full w-full bg-black">
        <video src={url} aria-label={name} muted playsInline preload="metadata" onError={() => setFailedUrl(url)} className="h-full w-full object-cover" />
        <PlayCircleFilled className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" />
      </div>
    )
  }

  if (kind === 'audio') {
    return <MediaPlaceholder kind={kind} label={label} ariaLabel={`${name} audio`} />
  }

  return <MediaPlaceholder kind={kind} label={label} ariaLabel={`${name} file`} />
}

function MediaCard({ item, index }: { item: ListItem; index: number }) {
  const name = stringValue(item.name) || `Media ${index + 1}`
  const label = getMediaLabel(item)
  const url = getMediaUrl(item)
  const openUrl = /^https?:\/\//i.test(url) ? url : ''

  return (
    <article className="group relative aspect-square min-w-0 overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
      <MediaPreview item={item} name={name} />
      {openUrl && <a href={openUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}`} className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white" />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-2.5 pb-2 pt-8 text-white">
        <span title={name} className="truncate text-xs font-medium">{name}</span>
        <span className="shrink-0 text-[9px] font-semibold tracking-wide text-white/70">{label}</span>
      </div>
      {openUrl && <ExternalLink className="pointer-events-none absolute right-2 top-2 size-3.5 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />}
    </article>
  )
}

export function MediaListResult({ title, emptyText, items }: Props) {
  const { copyToClipboard } = useAppContext()

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{emptyText}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-warp-fg">{title} ({items.length})</h3>
        <button type="button" onClick={() => copyToClipboard(JSON.stringify(items, null, 2))} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg">
          <Copy className="size-3.5" />
          Copy
        </button>
      </div>
      <div className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(8rem,1fr))]">
        {items.map((item, index) => <MediaCard key={`${stringValue(item.id) || getMediaUrl(item) || 'media'}-${index}`} item={item} index={index} />)}
      </div>
    </div>
  )
}
