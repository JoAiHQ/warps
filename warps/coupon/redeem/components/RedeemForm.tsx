import { useAppContext } from '../../../../ui/lib/components'
import { useTranslations } from '../../../../ui/lib/hooks'
import { useState } from 'react'
import { translations } from '../../i18n'

export function RedeemForm() {
  const { data, executeWarp } = useAppContext<any[]>()
  const tr = useTranslations(translations)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [redeeming, setRedeeming] = useState(false)
  const [result, setResult] = useState<{ discount: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const coupons = Array.isArray(data) ? data : data?.data || []

  const handleRedeem = async () => {
    if (!selectedId) return
    setRedeeming(true)
    setError(null)
    try {
      const res = await executeWarp('coupon-redeem', { couponId: selectedId })
      setResult(res as any)
    } catch {
      setError(tr.redeem.error)
    } finally {
      setRedeeming(false)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{tr.redeem.loading}</p>
      </div>
    )
  }

  if (result) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {tr.redeem.redeemed}
        </h2>
        <p className="text-lg text-green-600 dark:text-green-400 font-semibold">
          {result.discount}{tr.redeem.discount} {tr.redeem.success.replace('{discount}', String(result.discount))}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
        {tr.redeem.title}
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {coupons.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-sm py-8 text-center">
          {tr.redeem.noCoupons}
        </p>
      ) : (
        <>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{tr.redeem.select}</p>
          <div className="space-y-2 mb-6">
            {coupons.map((coupon: any) => (
              <button
                key={coupon.id}
                onClick={() => setSelectedId(coupon.id)}
                className={`w-full text-left rounded-xl border p-4 transition-colors ${
                  selectedId === coupon.id
                    ? 'border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-800'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                      {coupon.discountPercent ?? coupon.source}{tr.redeem.discount}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {coupon.code ?? coupon.reference}
                    </p>
                  </div>
                  {selectedId === coupon.id && (
                    <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleRedeem}
            disabled={!selectedId || redeeming}
            className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium disabled:opacity-50 transition-colors"
          >
            {redeeming ? '...' : tr.redeem.redeem}
          </button>
        </>
      )}
    </div>
  )
}
