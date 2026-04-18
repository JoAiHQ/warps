import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { translations } from '../i18n'
import type { PollResult } from './warp.types'

function totalVotes(results: PollResult[]): number {
  return results.reduce((sum, r) => sum + (r.voteCount ?? 0), 0)
}

function ResultBar({ result, total }: { result: PollResult; total: number }) {
  const pct = total > 0 ? Math.round((result.voteCount / total) * 100) : 0
  const isWinner = total > 0 && result.voteCount === Math.max(...[result.voteCount])
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{result.label}</span>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full bg-blue-500 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{result.voteCount} votes</div>
    </div>
  )
}

function Main() {
  const { data, inputs, executeWarp, locale } = useAppContext<PollResult[], { POLL_ID?: number }>()
  const t = translations[locale] ?? translations['en']

  const [pollQuestion, setPollQuestion] = useState<string | null>(null)

  const results: PollResult[] = Array.isArray(data) ? data : []
  const total = totalVotes(results)
  const pollId = inputs?.POLL_ID

  useEffect(() => {
    if (!pollId) return
    executeWarp('poll-detail', { POLL_ID: pollId })
      .then((info: any) => info?.question && setPollQuestion(info.question))
      .catch(() => {})
  }, [pollId, executeWarp])

  const winning = results.length > 0
    ? results.reduce((best, r) => r.voteCount > best.voteCount ? r : best, results[0])
    : null

  if (!data) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">{t.vote.loading}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {pollQuestion && (
        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-6">{pollQuestion}</h1>
      )}

      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">{t.vote.resultsTitle}</h2>

      {results.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No votes yet.</p>
      ) : (
        <>
          {winning && total > 0 && (
            <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-700 dark:text-blue-300 font-medium">
              Leading: {winning.label} ({Math.round((winning.voteCount / total) * 100)}%)
            </div>
          )}
          {results.map((r) => (
            <ResultBar key={r.optionIndex} result={r} total={total} />
          ))}
          <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">{total} {t.vote.totalVotes}</div>
        </>
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Poll Results" appVersion="1.0.0">
    <Main />
  </App>
)
