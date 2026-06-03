import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'

const API_BASE = 'https://api.joai.ai/v1'

const typeLabels: Record<string, string> = {
  deal: 'Deal',
  event: 'Event',
  update: 'Update',
}

const typeEmoji: Record<string, string> = {
  deal: '🏷️',
  event: '📅',
  update: '📢',
}

function getAuthKey(): string | null {
  const config = (window as any).WARP_CONFIG
  if (config?.vars?.JOAI_AGENT_AUTH_KEY) return config.vars.JOAI_AGENT_AUTH_KEY
  const inputs = (window as any).WARP_INPUTS
  if (inputs?.JOAI_AGENT_AUTH_KEY) return inputs.JOAI_AGENT_AUTH_KEY
  return null
}

function Main() {
  const { data, executeWarp, locale } = useAppContext()
  const authKey = getAuthKey()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [type, setType] = useState('deal')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!authKey) return <EmptyMessageSkeleton />
  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-2xl">✓</div>
        <p className="font-semibold text-gray-900 dark:text-white">Published!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your update is now live.</p>
      </div>
    )
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'reference')

      const res = await fetch(`${API_BASE}/media`, {
        method: 'POST',
        headers: { 'X-Agent-Auth-Key': authKey },
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      const json = await res.json()
      setImageUrl(json.data?.url ?? json.url ?? '')
    } catch {
      setError('Image upload failed. Try a URL instead.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Title is required'); return }
    setError(null)
    setSaving(true)

    try {
      const payload: Record<string, any> = {
        title: title.trim(),
        type,
      }
      if (body.trim()) payload.body = body.trim()
      if (imageUrl.trim()) payload.imageUrl = imageUrl.trim()
      if (linkUrl.trim()) payload.linkUrl = linkUrl.trim()
      if (startsAt) {
        payload.startsAt = new Date(startsAt).toISOString()
      }
      if (endsAt) {
        payload.endsAt = new Date(endsAt).toISOString()
      }

      const res = await fetch(`${API_BASE}/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Agent-Auth-Key': authKey,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Failed to create update')
      }

      setSaving(false)
      setDone(true)
    } catch (e) {
      setError(String(e))
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 p-1">
      {/* Title */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Heute: 20% auf alle Bowls"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
        />
      </div>

      {/* Type */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Type</label>
        <div className="flex gap-2">
          {['deal', 'event', 'update'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={[
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                type === t
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
              ].join(' ')}
            >
              <span>{typeEmoji[t]}</span>
              {typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Description</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Details about this update..."
          rows={4}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
        />
      </div>

      {/* Image */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Cover Image</label>
        <div className="flex gap-2">
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL..."
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
          />
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="h-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-40"
            >
              {uploading ? '...' : 'Upload'}
            </button>
          </div>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="mt-2 w-full h-32 object-cover rounded-xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
      </div>

      {/* Link */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Link URL</label>
        <input
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
        />
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Starts</label>
          <input
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 block">Ends</label>
          <input
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
          />
        </div>
      </div>

      {/* Preview */}
      {(title || body || imageUrl) && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {imageUrl && (
            <img src={imageUrl} alt="" className="w-full h-32 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          )}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-400 uppercase">{typeLabels[type]}</span>
              {startsAt && <span className="text-xs text-gray-400">{new Date(startsAt).toLocaleDateString()}</span>}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title || 'Untitled'}</h3>
            {body && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{body}</p>}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={saving || !title.trim()}
        className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
      >
        {saving ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App appName="JoAi Updates" appVersion="1.0.0">
    <Main />
  </App>
)
