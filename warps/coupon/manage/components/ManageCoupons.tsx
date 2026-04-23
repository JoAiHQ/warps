import { useAppContext } from '../../../../ui/lib/components'
import { useTranslations } from '../../../../ui/lib/hooks'
import { useState } from 'react'
import { translations } from '../../i18n'

export function ManageCoupons() {
  const { data, executeWarp } = useAppContext<any[]>()
  const tr = useTranslations(translations)
  const [revokingId, setRevokingId] = useState<number | null>(null)
  const [revokedIds, setRevokedIds] = useState<Set<number>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const coupons = Array.isArray(data) ? data : data?.data || []

  const handleRevoke = async (couponId: number) => {
    if (!confirm(tr.manage.revokeConfirm)) return
    setRevokingId(couponId)
    setError(null)
    try {
      await executeWarp('coupon-revoke', { couponId })
      setRevokedIds(prev => new Set(prev).add(couponId))
    } catch {
      setError(tr.manage.revokeError)
    } finally {
      setRevokingId(null)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{tr.manage.loading}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">{tr.manage.title}</h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">{error}</div>
      )}

      {coupons.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-sm py-8 text-center">{tr.manage.noCoupons}</p>
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon: any) => {
            const isRevoked = revokedIds.has(coupon.id) || coupon.status === 'Revoked'
            const status = isRevoked ? 'revoked' : coupon.status === 'Expired' ? 'expired' : 'active'

            return (
              <div
                key={coupon.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-zinc-900 dark:text-white">
                        {coupon.code ?? coupon.reference}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : status === 'expired'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {status === 'active' ? tr.manage.active : status === 'expired' ? tr.manage.expired : tr.manage.revoked}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {(coupon.discountPercent ?? '') + tr.manage.discount}
                      {' · '}
                      {coupon.maxUses === 0
                        ? tr.manage.unlimited.replace('{used}', String(coupon.usedCount ?? 0))
                        : tr.manage.uses.replace('{used}', String(coupon.usedCount ?? 0)).replace('{max}', String(coupon.maxUses))
                      }
                    </p>
                  </div>
                  {!isRevoked && (
                    <button
                      onClick={() => handleRevoke(coupon.id)}
                      disabled={revokingId === coupon.id}
                      className="ml-3 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-50 transition-colors"
                    >
                      {revokingId === coupon.id ? '...' : tr.manage.revoke}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
