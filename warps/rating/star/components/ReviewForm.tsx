import React, { useState } from 'react'
import { useAppContext } from '../../../../ui/lib/components'

type Step = 'rate' | 'details' | 'done'

export function ReviewForm() {
  const { executeWarp, t, locale } = useAppContext()
  const [step, setStep] = useState<Step>('rate')
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await executeWarp('review', { rating, name, phone })
      setSuccess(t({ en: 'Thanks!', de: 'Danke!' }) + ` ${name}!`)
      setStep('done')
    } catch (err: any) {
      setError(err?.message ?? t({ en: 'Something went wrong', de: 'Etwas ist schief gelaufen' }))
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="py-12">
        <p className="text-xl font-bold text-gray-900 dark:text-white">{success}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t({ en: `You rated ${rating}/5.`, de: `Du hast ${rating}/5 bewertet.` })}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {step === 'rate' && (
        <>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t({ en: 'How do you rate your visit?', de: 'Wie bewertest du deinen Besuch?' })}
          </h1>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star === rating ? 0 : star)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-10 h-10 ${star <= rating ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={rating < 1}
            onClick={() => setStep('details')}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 transition-all"
          >
            {t({ en: 'Next', de: 'Weiter' })}
          </button>
        </>
      )}

      {step === 'details' && (
        <>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t({ en: 'Your details', de: 'Deine Angaben' })}
          </h1>
          <input
            type="text"
            placeholder={t({ en: 'Your name', de: 'Dein Name' })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder={t({ en: 'Phone (optional)', de: 'Telefon (optional)' })}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('rate')}
              className="flex-1 py-3 rounded-xl font-semibold text-sm bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-gray-900 dark:text-white transition-all"
            >
              {t({ en: 'Back', de: 'Zurück' })}
            </button>
            <button
              type="button"
              disabled={!name || submitting}
              onClick={submit}
              className="flex-1 py-3 rounded-xl font-semibold text-sm bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 transition-all"
            >
              {submitting
                ? t({ en: 'Sending...', de: 'Sende...' })
                : t({ en: 'Submit review', de: 'Bewertung abschicken' })}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
