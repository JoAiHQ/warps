import { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import {
  truncateAddress,
  STATUS_WAITING,
  STATUS_ACTIVE,
  STATUS_WHITE_WINS,
  STATUS_BLACK_WINS,
} from '../game/components/chess-engine'

type GameId = number

type GameSummary = {
  game_id: number
  white: string
  black: string
  current_turn: number
  status: number
  move_count: number
}

function StatusBadge({ status, currentTurn }: { status: number; currentTurn: number }) {
  if (status === STATUS_WAITING) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
        Waiting
      </span>
    )
  }
  if (status === STATUS_ACTIVE) {
    const isWhite = currentTurn === 0
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
        {isWhite ? 'White' : 'Black'} to move
      </span>
    )
  }
  if (status === STATUS_WHITE_WINS) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
        White won
      </span>
    )
  }
  if (status === STATUS_BLACK_WINS) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
        Black won
      </span>
    )
  }
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
      Draw
    </span>
  )
}

function Main() {
  const { data, executeWarp } = useAppContext<GameId[]>()
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

  const handleOpenGame = useCallback(
    (gameId: number) => {
      executeWarp('@chess-game', { GAME_ID: gameId })
    },
    [executeWarp],
  )

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Games</h1>
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
      ) : games.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">{'\u2654'}</div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No games yet</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Create your first on-chain chess game and challenge someone to play.
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
          {games
            .sort((a, b) => {
              const aActive = a.status === STATUS_ACTIVE ? 0 : a.status === STATUS_WAITING ? 1 : 2
              const bActive = b.status === STATUS_ACTIVE ? 0 : b.status === STATUS_WAITING ? 1 : 2
              return aActive - bActive
            })
            .map((game) => (
              <div
                key={game.game_id}
                className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-gray-400 dark:text-gray-500">#{game.game_id}</span>
                  <StatusBadge status={game.status} currentTurn={game.current_turn} />
                </div>
                <div className="flex items-center gap-3 text-sm mb-3">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {'\u2654'} {truncateAddress(game.white)}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">vs</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {'\u265A'}{' '}
                    {game.black ? truncateAddress(game.black) : (
                      <span className="text-gray-400 dark:text-gray-500 italic">Waiting...</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500">{game.move_count} moves</span>
                  <div className="flex gap-2">
                    {game.status === STATUS_WAITING && !game.black && (
                      <button
                        onClick={() => handleJoin(game.game_id)}
                        disabled={joining === game.game_id}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50"
                      >
                        {joining === game.game_id ? 'Joining...' : 'Join'}
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenGame(game.game_id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {game.status === STATUS_ACTIVE ? 'Play' : 'View'}
                    </button>
                  </div>
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
  <App appName="Chess Games" appVersion="1.0.0">
    <Main />
  </App>,
)
