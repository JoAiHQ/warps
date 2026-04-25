import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'

type GameData = {
  GAME_ID: number
}

function Main() {
  const { executeWarp } = useAppContext<GameData>()
  const [creating, setCreating] = useState(false)
  const [gameId, setGameId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (gameId !== null) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl">
            {'\u2654'}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Game Created!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Share game ID <span className="font-mono font-bold text-gray-900 dark:text-white">#{gameId}</span> with your opponent
          </p>
        </div>

        <button
          onClick={() => executeWarp('@chess-game', { GAME_ID: gameId })}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors mb-3"
        >
          Open Game
        </button>
        <button
          onClick={() => {
            setGameId(null)
            setCreating(false)
          }}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Create Another
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-3xl">
          {'\u2654'}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Game</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          You play as white. Your opponent joins as black.
        </p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        onClick={async () => {
          setCreating(true)
          setError(null)
          try {
            const result = await executeWarp('@chess-create', {})
            const id = typeof result === 'object' && result !== null
              ? (result as any).GAME_ID ?? (result as any).gameId ?? result
              : result
            setGameId(Number(id))
          } catch (err: any) {
            setError(err?.message ?? 'Failed to create game')
          } finally {
            setCreating(false)
          }
        }}
        disabled={creating}
        className="w-full py-4 px-6 rounded-xl font-semibold text-base bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-200 dark:shadow-none"
      >
        {creating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Creating game...
          </span>
        ) : (
          'Create Game'
        )}
      </button>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">How it works</h3>
        <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">1.</span>
            Create a new game — you play white
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">2.</span>
            Share the game ID with your opponent
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">3.</span>
            They join as black and the game begins
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 font-bold">4.</span>
            Every move is recorded on-chain
          </li>
        </ol>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Chess Create" appVersion="1.0.0">
    <Main />
  </App>,
)
