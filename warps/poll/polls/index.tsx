import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { translations } from '../i18n'
import type { PollInfo } from './warp.types'

type PollResult = {
  optionIndex: number
  label: string
  voteCount: number
}

type PollCard = {
  id: number
  info: PollInfo
}

type Step = { type: 'list' } | { type: 'vote'; pollId: number; poll: PollInfo; results: PollResult[] } | { type: 'done'; poll: PollInfo; results: PollResult[]; votedIndex: number }

function formatDeadline(deadline: number, locale: string): string {
  if (!deadline) return ''
  return new Date(deadline * 1000).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

function isExpired(deadline: number): boolean {
  return deadline > 0 && Date.now() > deadline * 1000
}

function totalVotes(results: PollResult[]): number {
  return results.reduce((sum, r) => sum + (r.voteCount ?? 0), 0)
}

function Spinner() {
  return (
    <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

function ResultBar({ result, total, isYourVote }: { result: PollResult; total: number; isYourVote: boolean }) {
  const pct = total > 0 ? Math.round((result.voteCount / total) * 100) : 0
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-sm font-medium ${isYourVote ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
          {result.label}
          {isYourVote && (
            <span className="ml-2 text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">✓</span>
          )}
        </span>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ease-out ${isYourVote ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{result.voteCount} votes</div>
    </div>
  )
}

function Main() {
  const { data, executeWarp, locale } = useAppContext<number[]>()
  const t = translations[locale] ?? translations['en']

  const [polls, setPolls] = useState<PollCard[]>([])
  const [loadingPolls, setLoadingPolls] = useState(false)
  const [step, setStep] = useState<Step>({ type: 'list' })
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [voting, setVoting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPollDetails = useCallback(async (ids: number[]) => {
    if (ids.length === 0) {
      setPolls([])
      return
    }
    setLoadingPolls(true)
    try {
      const cards = await Promise.all(
        ids.map(async (id) => {
          try {
            const info = (await executeWarp('poll-detail', { POLL_ID: id })) as PollInfo
            return info ? ({ id, info } as PollCard) : null
          } catch {
            return null
          }
        })
      )
      setPolls(cards.filter((p): p is PollCard => p !== null))
    } finally {
      setLoadingPolls(false)
    }
  }, [executeWarp])

  useEffect(() => {
    const ids = Array.isArray(data) ? (data as number[]) : []
    loadPollDetails(ids)
  }, [data, loadPollDetails])

  const handleOpenPoll = useCallback(async (poll: PollCard) => {
    setSelectedOption(null)
    setError(null)
    let results: PollResult[] = []
    try {
      const res = (await executeWarp('poll-poll-results', { POLL_ID: poll.id })) as PollResult[]
      results = Array.isArray(res) ? res : []
    } catch {
      results = []
    }
    setStep({ type: 'vote', pollId: poll.id, poll: poll.info, results })
  }, [executeWarp])

  const handleVote = useCallback(async () => {
    if (step.type !== 'vote' || selectedOption === null) return
    setVoting(true)
    setError(null)
    try {
      await executeWarp('poll-vote-tx', { POLL_ID: step.pollId, OPTION_INDEX: selectedOption })
      const res = (await executeWarp('poll-poll-results', { POLL_ID: step.pollId })) as PollResult[]
      const results = Array.isArray(res) ? res : []
      setStep({ type: 'done', poll: step.poll, results, votedIndex: selectedOption })
    } catch (err: any) {
      const msg = (err?.message ?? '').toLowerCase()
      setError(msg.includes('already') ? t.vote.alreadyVoted : t.vote.error)
    } finally {
      setVoting(false)
    }
  }, [step, selectedOption, executeWarp, t])

  /* ---- List view ---- */
  if (step.type === 'list') {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t.polls.title}</h1>

        {!data && !loadingPolls ? (
          <div className="flex items-center justify-center py-12 gap-3 text-gray-400 dark:text-gray-500">
            <Spinner />
            <span className="text-sm">{t.polls.loading}</span>
          </div>
        ) : loadingPolls ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-[88px] rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : polls.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.polls.empty}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {polls.map((poll) => {
              const expired = isExpired(poll.info.deadline)
              return (
                <button
                  key={poll.id}
                  onClick={() => handleOpenPoll(poll)}
                  className="w-full text-left p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all duration-150 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {poll.info.question}
                    </p>
                    <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${expired ? 'text-gray-400 dark:text-gray-500' : 'text-green-600 dark:text-green-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${expired ? 'bg-gray-400' : 'bg-green-500'}`} />
                      {expired ? t.polls.closed : `${t.polls.deadline} ${formatDeadline(poll.info.deadline, locale)}`}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{poll.info.optionCount} options</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  /* ---- Vote view ---- */
  if (step.type === 'vote') {
    const expired = isExpired(step.poll.deadline)
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <button
          onClick={() => { setStep({ type: 'list' }); setSelectedOption(null); setError(null) }}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t.polls.title}
        </button>

        {step.poll.deadline > 0 && (
          <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${
            expired ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${expired ? 'bg-gray-400' : 'bg-green-500'}`} />
            {expired ? t.vote.closed : `${t.vote.deadline} ${formatDeadline(step.poll.deadline, locale)}`}
          </div>
        )}

        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-2">{step.poll.question}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{expired ? '' : t.vote.selectOption}</p>

        {step.results.length > 0 ? (
          <div className="flex flex-col gap-3 mb-6">
            {step.results.map((r) => (
              <button
                key={r.optionIndex}
                onClick={() => !expired && setSelectedOption(r.optionIndex)}
                disabled={expired}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 font-medium text-sm ${
                  selectedOption === r.optionIndex
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : expired
                    ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    selectedOption === r.optionIndex ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedOption === r.optionIndex && <span className="w-2 h-2 bg-white rounded-full" />}
                  </span>
                  {r.label}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            {Array.from({ length: step.poll.optionCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 font-medium text-sm ${
                  selectedOption === i
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedOption === i ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    {selectedOption === i && <span className="w-2 h-2 bg-white rounded-full" />}
                  </span>
                  Option {i + 1}
                </div>
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {!expired && (
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
        )}
      </div>
    )
  }

  /* ---- Results view ---- */
  const total = totalVotes(step.results)
  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <button
        onClick={() => setStep({ type: 'list' })}
        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-5 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t.polls.title}
      </button>

      <div className="flex items-center gap-2 mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t.vote.votedTitle}</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-5">{step.poll.question}</h1>

      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">{t.vote.resultsTitle}</h2>

      {step.results.map((r) => (
        <ResultBar key={r.optionIndex} result={r} total={total} isYourVote={r.optionIndex === step.votedIndex} />
      ))}

      <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">{total} {t.vote.totalVotes}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Poll" appVersion="1.0.0">
    <Main />
  </App>
)
