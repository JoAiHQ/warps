import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import ChessBoard from './components/ChessBoard'
import GameInfo from './components/GameInfo'
import MoveHistory from './components/MoveHistory'
import PromotionDialog from './components/PromotionDialog'
import {
  isWhite,
  getLegalMoves,
  initialBoard,
  pieceType,
  boardToText,
  toAlgebraic,
  STATUS_ACTIVE,
  STATUS_WHITE_WINS,
  STATUS_BLACK_WINS,
} from './components/chess-engine'
import type { Board, Move } from './components/chess-engine'

type GameInfoType = {
  game_id: number
  white: string
  black: string
  current_turn: number
  status: number
  created_at: number
  move_count: number
  last_move_at: number
}

type MoveDataType = {
  from_sq: number
  to_sq: number
  piece: number
  captured: number
  promotion: number
  move_number: number
}

type GameStateData = {
  info: GameInfoType
  board: number[]
  moves: MoveDataType[]
}

type Inputs = {
  GAME_ID: string
  PLAYER?: string
  AI?: string
}

function LoadingSpinner({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
        <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  )
}

function GameOverBanner({ status, playerAddress, info, isAIGame }: { status: number; playerAddress: string | null; info: GameInfoType; isAIGame: boolean }) {
  let message = ''
  let icon = ''
  if (status === STATUS_WHITE_WINS) {
    if (isAIGame) {
      message = 'You beat the AI!'
    } else {
      message = playerAddress === info.white ? 'You won!' : 'White wins!'
    }
    icon = '\u265A'
  } else if (status === STATUS_BLACK_WINS) {
    if (isAIGame) {
      message = 'AI wins!'
    } else {
      message = playerAddress === info.black ? 'You won!' : 'Black wins!'
    }
    icon = '\u265A'
  } else {
    message = 'Draw'
    icon = '\u00BD'
  }

  return (
    <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-bold text-amber-800 dark:text-amber-200">{message}</div>
      <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Game over</div>
    </div>
  )
}

function AIThinkingBanner() {
  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl text-center">
      <div className="flex items-center justify-center gap-3">
        <svg className="w-5 h-5 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <div>
          <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">AI is thinking...</div>
          <div className="text-xs text-purple-500 dark:text-purple-400 mt-0.5">Analyzing the position</div>
        </div>
      </div>
    </div>
  )
}

function Main() {
  const { data, inputs, executeWarp, executePrompt } = useAppContext<GameStateData, Inputs>()

  const isAIGame = inputs?.AI === 'true'

  const [selectedSquare, setSelectedSquare] = useState<number | null>(null)
  const [legalTargets, setLegalTargets] = useState<number[]>([])
  const [pendingPromotion, setPendingPromotion] = useState<Move | null>(null)
  const [moving, setMoving] = useState(false)
  const [resigning, setResigning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [aiThinking, setAiThinking] = useState(false)
  const prevMoveCount = useRef<number>(0)
  const aiTriggered = useRef<number>(0)

  const state = data as GameStateData | undefined
  const info = state?.info
  const contractBoard = state?.board
  const moves = state?.moves ?? []

  const board: Board = useMemo(() => {
    if (!contractBoard || contractBoard.length === 64) return contractBoard ?? initialBoard()
    return initialBoard()
  }, [contractBoard])

  const playerAddress: string | null = useMemo(() => {
    if (!info) return null
    if (inputs?.PLAYER) return inputs.PLAYER
    return null
  }, [info, inputs?.PLAYER])

  const isPlayerTurn = useMemo(() => {
    if (!info || info.status !== STATUS_ACTIVE || !playerAddress) return false
    if (info.current_turn === 0 && playerAddress === info.white) return true
    if (info.current_turn === 1 && playerAddress === info.black) return true
    return false
  }, [info, playerAddress])

  useEffect(() => {
    if (info && playerAddress === info.black) {
      setFlipped(true)
    } else {
      setFlipped(false)
    }
  }, [info?.black, info?.white, playerAddress])

  useEffect(() => {
    setSelectedSquare(null)
    setLegalTargets([])
    setError(null)
    setPendingPromotion(null)
  }, [info?.move_count])

  useEffect(() => {
    if (!isAIGame || !info || info.status !== STATUS_ACTIVE) return
    if (info.current_turn !== 1) return

    const moveCount = info.move_count
    if (moveCount === aiTriggered.current) return
    if (moveCount === prevMoveCount.current && prevMoveCount.current > 0) return

    aiTriggered.current = moveCount
    prevMoveCount.current = moveCount
    setAiThinking(true)
    setError(null)

    const boardText = boardToText(board)
    const lastMoveStr = moves.length > 0
      ? `The last move was ${toAlgebraic(moves[moves.length - 1].from_sq)} to ${toAlgebraic(moves[moves.length - 1].to_sq)}.`
      : ''

    const prompt = [
      `You are playing black in chess game #${info.game_id}.`,
      `It is your turn.`,
      lastMoveStr,
      ``,
      `Current board (uppercase=white, lowercase=black):`,
      boardText,
      ``,
      `Analyze the position and make your best move as black.`,
      `Call @chess-move with GAME_ID=${info.game_id}, FROM=<square_index>, TO=<square_index>, PROMOTION=0.`,
      `Square indices: a1=56, b1=57, ..., h1=63, a2=48, ..., a8=0, h8=7.`,
      `Think about piece development, center control, king safety, captures, checks, and tactical opportunities.`,
      `Reply with ONLY your move — call the warp directly.`,
    ].filter(Boolean).join('\n')

    executePrompt(prompt).catch(() => {
      setAiThinking(false)
      setError('AI failed to respond. Try again.')
    })
  }, [isAIGame, info?.current_turn, info?.move_count, info?.status, info?.game_id, board, moves, executePrompt])

  useEffect(() => {
    if (!aiThinking || !info) return
    if (info.current_turn === 0 || info.status >= STATUS_WHITE_WINS) {
      setAiThinking(false)
      prevMoveCount.current = info.move_count
    }
  }, [aiThinking, info?.current_turn, info?.move_count, info?.status])

  const lastMove = useMemo(() => {
    if (moves.length === 0) return null
    const last = moves[moves.length - 1]
    return { from: last.from_sq, to: last.to_sq }
  }, [moves])

  const handleSquareClick = useCallback(
    (sq: number) => {
      if (!isPlayerTurn || moving || aiThinking) return

      setError(null)

      if (selectedSquare !== null) {
        if (sq === selectedSquare) {
          setSelectedSquare(null)
          setLegalTargets([])
          return
        }

        const piece = board[selectedSquare]
        const isPawn = piece !== 0 && pieceType(piece) === 1
        const toRow = Math.floor(sq / 8)
        const isPromotionRank = isPawn && (toRow === 0 || toRow === 7)

        if (isPromotionRank && legalTargets.includes(sq)) {
          const move: Move = { from: selectedSquare, to: sq, promotion: 0 }
          setPendingPromotion(move)
          return
        }

        if (legalTargets.includes(sq)) {
          submitMove(selectedSquare, sq, 0)
          return
        }

        const newPiece = board[sq]
        if (newPiece !== 0) {
          const selectedWhite = isWhite(board[selectedSquare])
          const clickedWhite = isWhite(newPiece)
          if (selectedWhite === clickedWhite) {
            const targets = getLegalMoves(board, sq).map((m) => m.to)
            setSelectedSquare(sq)
            setLegalTargets(targets)
            return
          }
        }

        setSelectedSquare(null)
        setLegalTargets([])
        return
      }

      const piece = board[sq]
      if (piece === 0) return

      const pieceIsWhite = isWhite(piece)
      const playerIsWhite = playerAddress === info?.white
      if (pieceIsWhite !== playerIsWhite) return

      const targets = getLegalMoves(board, sq).map((m) => m.to)
      setSelectedSquare(sq)
      setLegalTargets(targets)
    },
    [selectedSquare, legalTargets, board, isPlayerTurn, moving, aiThinking, playerAddress, info],
  )

  const submitMove = useCallback(
    async (from: number, to: number, promotion: number) => {
      if (!info) return
      setMoving(true)
      setSelectedSquare(null)
      setLegalTargets([])
      setError(null)

      try {
        await executeWarp('@chess-move', {
          GAME_ID: info.game_id,
          FROM: from,
          TO: to,
          PROMOTION: promotion,
        })
      } catch (err: any) {
        const msg = err?.message ?? 'Move failed'
        if (msg.includes('not your turn')) {
          setError('Not your turn')
        } else if (msg.includes('invalid move')) {
          setError('Invalid move')
        } else {
          setError(msg)
        }
      } finally {
        setMoving(false)
      }
    },
    [info, executeWarp],
  )

  const handlePromotion = useCallback(
    (pieceType: number) => {
      if (!pendingPromotion) return
      setPendingPromotion(null)
      submitMove(pendingPromotion.from, pendingPromotion.to, pieceType)
    },
    [pendingPromotion, submitMove],
  )

  const handleResign = useCallback(async () => {
    if (!info) return
    setResigning(true)
    try {
      await executeWarp('@chess-resign', { GAME_ID: info.game_id })
    } catch {
      setError('Failed to resign')
    } finally {
      setResigning(false)
    }
  }, [info, executeWarp])

  if (!state || !info) {
    return <LoadingSpinner message="Loading game..." />
  }

  const isGameOver = info.status >= STATUS_WHITE_WINS

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-shrink-0">
          <ChessBoard
            board={board}
            selectedSquare={selectedSquare}
            legalTargets={legalTargets}
            lastMove={lastMove}
            flipped={flipped}
            onSquareClick={handleSquareClick}
          />
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setFlipped(!flipped)}
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Flip board
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-4">
          {isAIGame && aiThinking && !isGameOver && <AIThinkingBanner />}
          {isGameOver && <GameOverBanner status={info.status} playerAddress={playerAddress} info={info} isAIGame={isAIGame} />}

          <GameInfo
            info={info}
            board={board}
            playerAddress={playerAddress}
            onResign={handleResign}
            resigning={resigning}
            isAIGame={isAIGame}
          />

          <div>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Move History
            </h3>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
              <MoveHistory moves={moves} />
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {moving && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Submitting move...
            </div>
          )}
        </div>
      </div>

      {pendingPromotion && (
        <PromotionDialog
          isWhite={playerAddress === info.white}
          onSelect={handlePromotion}
          onCancel={() => setPendingPromotion(null)}
        />
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Chess Game" appVersion="1.0.0">
    <Main />
  </App>,
)
