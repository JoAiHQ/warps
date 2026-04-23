import { useAppContext } from '../../../../ui/lib/components'
import { useTranslations } from '../../../../ui/lib/hooks'
import { useState } from 'react'
import { translations } from '../../i18n'

const DISCOUNT_OPTIONS = [5, 10, 15, 20, 25, 30, 50, 75, 100]
const USES_OPTIONS = [
  { value: '0', label: '∞ Unlimited' },
  { value: '1', label: '1 — single use' },
  { value: '5', label: '5 uses' },
  { value: '10', label: '10 uses' },
  { value: '25', label: '25 uses' },
  { value: '50', label: '50 uses' },
  { value: '100', label: '100 uses' },
]
const EXPIRY_OPTIONS = [
  { value: '0', label: 'Never expires' },
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
  { value: '180', label: '6 months' },
  { value: '365', label: '1 year' },
]

export function CreateCouponForm() {
  const { data, executeWarp } = useAppContext<any>()
  const tr = useTranslations(translations)
  const [collectionId, setCollectionId] = useState('')
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState('10')
  const [maxUses, setMaxUses] = useState('0')
  const [expiryDays, setExpiryDays] = useState('30')
  const [creating, setCreating] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const collections = data?.collections || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)
    try {
      await executeWarp('coupon-create', {
        collectionId: Number(collectionId),
        code,
        discountPercent: Number(discount),
        maxUses: Number(maxUses),
        expiryDays: Number(expiryDays),
      })
      setSuccess(true)
    } catch {
      setError(tr.create.error)
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
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {tr.create.success.replace('{code}', code)}
        </h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">{tr.create.title}</h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{tr.create.collectionLabel}</label>
          {collections.length === 0 ? (
            <p className="text-sm text-amber-600 dark:text-amber-400">{tr.create.noCollection}</p>
          ) : (
            <select
              value={collectionId}
              onChange={e => setCollectionId(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm"
            >
              <option value="">{tr.create.collectionPlaceholder}</option>
              {collections.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name || `Collection ${c.id}`}</option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{tr.create.codeLabel}</label>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder={tr.create.codePlaceholder}
            required
            maxLength={32}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{tr.create.discountLabel}</label>
          <div className="flex flex-wrap gap-2">
            {DISCOUNT_OPTIONS.map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDiscount(String(d))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  discount === String(d)
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {d}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{tr.create.maxUsesLabel}</label>
          <select
            value={maxUses}
            onChange={e => setMaxUses(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm"
          >
            {USES_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{tr.create.expiryLabel}</label>
          <select
            value={expiryDays}
            onChange={e => setExpiryDays(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm"
          >
            {EXPIRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <button
          type="submit"
          disabled={creating || !code || !collectionId}
          className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium disabled:opacity-50 transition-colors"
        >
          {creating ? tr.create.creating : tr.create.create}
        </button>
      </form>
    </div>
  )
}
