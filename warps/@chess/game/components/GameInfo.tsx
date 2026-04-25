import {
  STATUS_WAITING,
  STATUS_ACTIVE,
  STATUS_WHITE_WINS,
  STATUS_BLACK_WINS,
  STATUS_DRAW,
  truncateAddress,
  pieceSymbol,
  W_KING,
  B_KING,
  isInCheck,
} from './chess-engine'
import type { Board } from './chess-engine'

type Props = {
  info: {
    game_id: number
    white: string
    black: string
    current_turn: number
    status: number
    created_at: number
    move_count: number
  }
  board: Board
  playerAddress: string | null
  onResign: () => void
  resigning: boolean
}

function StatusBadge({ status, currentTurn, board }: { status: number; currentTurn: number; board: Board }) {
  if (status === STATUS_WAITING) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
        Waiting for opponent
      </span>
    )
  }

  if (status === STATUS_WHITE_WINS) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
        White wins
      </span>
    )
  }

  if (status === STATUS_BLACK_WINS) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
        Black wins
      </span>
    )
  }

  if (status === STATUS_DRAW) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
        Draw
      </span>
    )
  }

  const whiteToMove = currentTurn === 0
  const inCheck = isInCheck(board, whiteToMove)

  if (inCheck) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Check!
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      {whiteToMove ? 'White' : 'Black'} to move
    </span>
  )
}

export default function GameInfo({ info, board, playerAddress, onResign, resigning }: Props) {
  const isPlayer = playerAddress === info.white || playerAddress === info.black

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <StatusBadge status={info.status} currentTurn={info.current_turn} board={board} />
        <span className="text-xs text-gray-400 dark:text-gray-500">Game #{info.game_id}</span>
      </div>

      <div className="space-y-2">
        <PlayerRow
          address={info.white}
          isActive={info.current_turn === 0 && info.status === STATUS_ACTIVE}
          isYou={playerAddress === info.white}
          kingSymbol={pieceSymbol(W_KING)}
        />
        <PlayerRow
          address={info.black || 'Waiting...'}
          isActive={info.current_turn === 1 && info.status === STATUS_ACTIVE}
          isYou={playerAddress === info.black}
          kingSymbol={pieceSymbol(B_KING)}
          isPlaceholder={!info.black}
        />
      </div>

      <div className="text-xs text-gray-400 dark:text-gray-500">
        {info.move_count} moves played
      </div>

      {isPlayer && info.status === STATUS_ACTIVE && (
        <button
          onClick={onResign}
          disabled={resigning}
          className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50"
        >
          {resigning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Resigning...
            </span>
          ) : (
            'Resign'
          )}
        </button>
      )}
    </div>
  )
}

function PlayerRow({
  address,
  isActive,
  isYou,
  kingSymbol,
  isPlaceholder,
}: {
  address: string
  isActive: boolean
  isYou: boolean
  kingSymbol: string
  isPlaceholder?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          : 'bg-gray-50 dark:bg-gray-800/50'
      }`}
    >
      <span className="text-xl">{kingSymbol}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-mono truncate ${isPlaceholder ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-900 dark:text-white'}`}
          >
            {truncateAddress(address)}
          </span>
          {isYou && (
            <span className="px-1.5 py-0.5 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded">
              You
            </span>
          )}
        </div>
      </div>
      {isActive && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0" />}
    </div>
  )
}
