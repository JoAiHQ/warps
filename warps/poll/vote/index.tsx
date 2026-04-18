import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { translations } from '../i18n'
import type { PollInfo, PollResult } from './warp.types'

function formatDeadline(deadline: number, locale: string): string {
  if (!deadline) return ''
  const date = new Date(deadline * 1000)
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

function isExpired(deadline: number): boolean {
  return deadline > 0 && Date.now() > deadline * 1000
}

function totalVotes(results: PollResult[]): number {
  return results.reduce((sum, r) => sum + (r.voteCount ?? 0), 0)
}

function ResultBar({ result, total, isYourVote }: { result: PollResult; total: number; isYourVote: boolean }) {
  const pct = total > 0 ? Math.round((result.voteCount / total) * 100) : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-medium ${isYourVote ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
          {result.label}
          {isYourVote && <span className="ml-2 text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">✓</span>}
        </span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ease-out ${isYourVote ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{result.voteCount} votes</div>
    </div>
  )
}

function Main() {
  const { data, inputs, executeWarp, locale } = useAppContext<PollInfo>()
  const t = (translations[locale] ?? translations['en'])

  const pollId = inputs?.POLL_ID ?? (data as any)?.pollId
  const poll = data as PollInfo | undefined

  const [results, setResults] = useState<PollResult[] | null>(null)
  const [loadingResults, setLoadingResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [voting, setVoting] = useState(false)
  const [voted, setVoted] = useState(false)
  const [votedIndex, setVotedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadResults = useCallback(async (id: unknown) => {
    if (!id) return
    setLoadingResults(true)
    try {
      const res = await executeWarp('poll-poll-results', { POLL_ID: id })
      const list = Array.isArray(res) ? (res as PollResult[]) : []
      setResults(list)
    } catch {
      setResults([])
    } finally {
      setLoadingResults(false)
    }
  }, [executeWarp])

  useEffect(() => {
    loadResults(pollId)
  }, [pollId, loadResults])

  const handleVote = useCallback(async () => {
    if (selectedOption === null || !pollId) return
    setVoting(true)
    setError(null)
    try {
      await executeWarp('poll-vote-tx', { POLL_ID: pollId, OPTION_INDEX: selectedOption })
      setVotedIndex(selectedOption)
      setVoted(true)
      await loadResults(pollId)
    } catch (err: any) {
      const msg = err?.message ?? ''
      if (msg.includes('already')) {
        setError(t.vote.alreadyVoted)
      } else {
        setError(t.vote.error)
      }
    } finally {
      setVoting(false)
    }
  }, [selectedOption, pollId, executeWarp, loadResults, t])

  if (!poll) {
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

  const expired = isExpired(poll.deadline)
  const showResults = voted || expired

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Poll header */}
      <div className="mb-6">
        {poll.deadline > 0 && (
          <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${
            expired
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${expired ? 'bg-gray-400' : 'bg-green-500'}`} />
            {expired ? t.vote.closed : `${t.vote.deadline} ${formatDeadline(poll.deadline, locale)}`}
          </div>
        )}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{poll.question}</h1>
      </div>

      {showResults ? (
        /* Results view */
        <div>
          {voted && (
            <div className="flex items-center gap-2 mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t.vote.votedTitle}</span>
            </div>
          )}

          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">{t.vote.resultsTitle}</h2>

          {loadingResults ? (
            <div className="text-sm text-gray-400 dark:text-gray-500">{t.vote.loadingOptions}</div>
          ) : results && results.length > 0 ? (
            <>
              {results.map((r) => (
                <ResultBar key={r.optionIndex} result={r} total={totalVotes(results)} isYourVote={r.optionIndex === votedIndex} />
              ))}
              <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                {totalVotes(results)} {t.vote.totalVotes}
              </div>
            </>
          ) : null}
        </div>
      ) : (
        /* Voting view */
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t.vote.selectOption}</p>

          {loadingResults ? (
            <div className="text-sm text-gray-400 dark:text-gray-500">{t.vote.loadingOptions}</div>
          ) : (
            <div className="flex flex-col gap-3 mb-6">
              {results && results.length > 0 ? (
                results.map((r) => (
                  <button
                    key={r.optionIndex}
                    onClick={() => setSelectedOption(r.optionIndex)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 font-medium text-sm ${
                      selectedOption === r.optionIndex
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        selectedOption === r.optionIndex
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedOption === r.optionIndex && (
                          <span className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </span>
                      {r.label}
                    </div>
                  </button>
                ))
              ) : (
                Array.from({ length: poll.optionCount }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 font-medium text-sm ${
                      selectedOption === i
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        selectedOption === i ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedOption === i && <span className="w-2 h-2 bg-white rounded-full" />}
                      </span>
                      Option {i + 1}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleVote}
            disabled={selectedOption === null || voting}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
          >
            {voting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {t.vote.voting}
              </span>
            ) : t.vote.castVote}
          </button>
        </div>
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Poll Vote" appVersion="1.0.0">
    <Main />
  </App>
)
