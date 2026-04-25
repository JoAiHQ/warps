import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'

type GameData = {
  GAME_ID: number
}

function Main() {
  const { executeWarp, executePrompt } = useAppContext<GameData>()
  const [creating, setCreating] = useState(false)
  const [gameId, setGameId] = useState<number | null>(null)
  const [waitingForAI, setWaitingForAI] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    setCreating(true)
    setError(null)
    try {
      const result = await executeWarp('@chess-create', {})
      const id = typeof result === 'object' && result !== null
        ? (result as any).GAME_ID ?? (result as any).gameId ?? result
        : result
      const gid = Number(id)
      setGameId(gid)

      setWaitingForAI(true)
      await executePrompt(
        `Join chess game #${gid} as black by calling @chess-join with GAME_ID=${gid}. After joining, tell me the game is ready.`
      )
      setWaitingForAI(false)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to create game')
      setWaitingForAI(false)
    } finally {
      setCreating(false)
    }
  }

  if (gameId !== null) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl">
            {'\u265A'}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Game Ready!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Game <span className="font-mono font-bold text-gray-900 dark:text-white">#{gameId}</span>
          </p>
        </div>

        {waitingForAI && (
          <div className="flex items-center justify-center gap-2 text-sm text-purple-600 dark:text-purple-400 mb-4">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            AI is joining as black...
          </div>
        )}

        <button
          onClick={() => executeWarp('@chess-game', { GAME_ID: gameId, AI: 'true' })}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-purple-600 hover:bg-purple-700 text-white transition-colors mb-3"
        >
          Start Playing
        </button>
        <button
          onClick={() => {
            setGameId(null)
            setCreating(false)
            setWaitingForAI(false)
          }}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          New AI Game
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl">
          {'\u265A'}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Play vs AI</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          You play white. The AI plays black and responds after each of your moves.
        </p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        onClick={handleCreate}
        disabled={creating}
        className="w-full py-4 px-6 rounded-xl font-semibold text-base bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200 dark:shadow-none"
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
          'Challenge AI'
        )}
      </button>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">How it works</h3>
        <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
          <li className="flex gap-2">
            <span className="text-purple-500 font-bold">1.</span>
            A new on-chain game is created
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 font-bold">2.</span>
            The AI joins as black automatically
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 font-bold">3.</span>
            You make your move on the board
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 font-bold">4.</span>
            The AI analyzes the position and responds
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 font-bold">5.</span>
            Every move is recorded on-chain
          </li>
        </ol>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Chess AI" appVersion="1.0.0">
    <Main />
  </App>,
)
