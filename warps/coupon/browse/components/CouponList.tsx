import { useAppContext } from '../../../../ui/lib/components'
import { useTranslations } from '../../../../ui/lib/hooks'
import { useState } from 'react'
import { translations, Translations } from '../../i18n'

export function CouponList() {
  const { data, executeWarp } = useAppContext<any>()
  const tr = useTranslations(translations)
  const [claimingId, setClaimingId] = useState<number | null>(null)
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const coupons = Array.isArray(data) ? data : data?.data || []

  const handleClaim = async (couponId: number) => {
    setClaimingId(couponId)
    setError(null)
    try {
      await executeWarp('coupon-claim', { couponId })
      setClaimedIds(prev => new Set(prev).add(couponId))
    } catch {
      setError(tr.browse.error)
    } finally {
      setClaimingId(null)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{tr.browse.loading}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
        {tr.browse.title}
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {coupons.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-sm py-8 text-center">
          {tr.browse.noCoupons}
        </p>
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon: any) => {
            const claimed = claimedIds.has(coupon.id)
            return (
              <div
                key={coupon.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {coupon.discountPercent ?? coupon.source}{tr.browse.discount}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {coupon.code ?? coupon.reference}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClaim(coupon.id)}
                    disabled={claimed || claimingId === coupon.id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      claimed
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200'
                    } disabled:opacity-50`}
                  >
                    {claimed ? tr.browse.claimed : claimingId === coupon.id ? '...' : tr.browse.claim}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
