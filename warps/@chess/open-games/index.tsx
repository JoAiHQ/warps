import { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import {
  truncateAddress,
  STATUS_WAITING,
} from '../game/components/chess-engine'

type GameSummary = {
  game_id: number
  white: string
  black: string
  current_turn: number
  status: number
  move_count: number
}

function Main() {
  const { data, executeWarp } = useAppContext<number[]>()
  const [games, setGames] = useState<GameSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [joining, setJoining] = useState<number | null>(null)

  const gameIds = Array.isArray(data) ? data : []

  useEffect(() => {
    if (gameIds.length === 0) {
      setGames([])
      return
    }

    let cancelled = false
    setLoading(true)

    Promise.all(
      gameIds.map(async (id) => {
        try {
          const state: any = await executeWarp('@chess-game', { GAME_ID: id })
          return (state?.info as GameSummary) ?? undefined
        } catch {
          return undefined
        }
      }),
    ).then((results) => {
      if (cancelled) return
      setGames(results.filter((g): g is GameSummary => g !== undefined))
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [data, executeWarp])

  const handleJoin = useCallback(
    async (gameId: number) => {
      setJoining(gameId)
      try {
        await executeWarp('@chess-join', { GAME_ID: gameId })
      } catch {}
      setJoining(null)
    },
    [executeWarp],
  )

  const openGames = games.filter((g) => g.status === STATUS_WAITING)

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Open Games</h1>
        <button
          onClick={() => executeWarp('@chess-create', {})}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
        >
          + New Game
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : openGames.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">{'\u265A'}</div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No open games</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            No games are waiting for an opponent right now. Create one and challenge someone!
          </p>
          <button
            onClick={() => executeWarp('@chess-create', {})}
            className="px-6 py-3 rounded-xl font-semibold text-sm bg-amber-600 hover:bg-amber-700 text-white transition-colors"
          >
            Create Game
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {openGames.map((game) => (
            <div
              key={game.game_id}
              className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500">#{game.game_id}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                  Waiting
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="text-gray-900 dark:text-white font-medium">
                  {'\u2654'} {truncateAddress(game.white)}
                </span>
                <span className="text-gray-300 dark:text-gray-600">vs</span>
                <span className="text-gray-400 dark:text-gray-500 italic">You?</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleJoin(game.game_id)}
                  disabled={joining === game.game_id}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50"
                >
                  {joining === game.game_id ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join as Black'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Chess Open Games" appVersion="1.0.0">
    <Main />
  </App>,
)
