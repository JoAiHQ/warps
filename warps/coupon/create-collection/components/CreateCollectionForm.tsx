import { useAppContext } from '../../../../ui/lib/components'
import { useTranslations } from '../../../../ui/lib/hooks'
import { useState } from 'react'
import { translations } from '../../i18n'

export function CreateCollectionForm() {
  const { executeWarp } = useAppContext()
  const tr = useTranslations(translations)
  const [name, setName] = useState('')
  const [ticker, setTicker] = useState('')
  const [creating, setCreating] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)
    try {
      await executeWarp('coupon-create-collection', { name, ticker })
      setSuccess(true)
    } catch {
      setError(tr.createCollection.error)
    } finally {
      setCreating(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{tr.createCollection.success}</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
        {tr.createCollection.title}
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            {tr.createCollection.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={tr.createCollection.namePlaceholder}
            required
            maxLength={64}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            {tr.createCollection.tickerLabel}
          </label>
          <input
            type="text"
            value={ticker}
            onChange={e => setTicker(e.target.value.toUpperCase())}
            placeholder={tr.createCollection.tickerPlaceholder}
            required
            minLength={3}
            maxLength={10}
            pattern="[A-Z]{3,10}"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {tr.createCollection.tickerHint}
          </p>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">{tr.createCollection.cost}</p>

        <button
          type="submit"
          disabled={creating || !name || ticker.length < 3}
          className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium disabled:opacity-50 transition-colors"
        >
          {creating ? tr.createCollection.creating : tr.createCollection.create}
        </button>
      </form>
    </div>
  )
}
