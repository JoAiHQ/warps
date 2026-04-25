import { col, row, isWhite, pieceSymbol, sq } from './chess-engine'

type Props = {
  board: number[]
  selectedSquare: number | null
  legalTargets: number[]
  lastMove: { from: number; to: number } | null
  flipped: boolean
  onSquareClick: (sq: number) => void
}

const LIGHT = '#F0D9B5'
const DARK = '#B58863'
const SELECTED_LIGHT = '#F6F669'
const SELECTED_DARK = '#BACA2B'
const LAST_MOVE_LIGHT = '#CDD16A'
const LAST_MOVE_DARK = '#AAA23B'
const LEGAL_DOT = 'rgba(0, 0, 0, 0.15)'
const LEGAL_CAPTURE = 'rgba(0, 0, 0, 0.15)'

function ChessSquare({
  piece,
  index,
  isSelected,
  isLegalTarget,
  isLastMove,
  flipped,
  onClick,
}: {
  piece: number
  index: number
  isSelected: boolean
  isLegalTarget: boolean
  isLastMove: boolean
  flipped: boolean
  onClick: () => void
}) {
  const r = row(index)
  const c = col(index)
  const isLight = (r + c) % 2 === 0

  let bg = isLight ? LIGHT : DARK
  if (isLastMove) bg = isLight ? LAST_MOVE_LIGHT : LAST_MOVE_DARK
  if (isSelected) bg = isLight ? SELECTED_LIGHT : SELECTED_DARK

  const hasPiece = piece !== 0
  const showDot = isLegalTarget && !hasPiece
  const showCapture = isLegalTarget && hasPiece

  const displayRow = flipped ? 7 - r : r
  const displayCol = flipped ? 7 - c : c

  const showFile = displayRow === 7
  const showRank = displayCol === 0
  const fileLabel = String.fromCharCode(97 + c)
  const rankLabel = String(8 - r)

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-none"
      style={{
        backgroundColor: bg,
        width: '100%',
        paddingBottom: '100%',
      }}
      onClick={onClick}
    >
      <span
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ fontSize: 'calc(min(60px, 9vw))', lineHeight: 1 }}
      >
        {hasPiece && (
          <span
            style={{
              filter: isWhite(piece) ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'none',
              color: isWhite(piece) ? '#fff' : '#000',
              textShadow: isWhite(piece)
                ? '0 0 3px rgba(0,0,0,0.5)'
                : '0 0 3px rgba(255,255,255,0.3)',
            }}
          >
            {pieceSymbol(piece)}
          </span>
        )}
      </span>
      {showDot && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '26%',
            height: '26%',
            backgroundColor: LEGAL_DOT,
          }}
        />
      )}
      {showCapture && (
        <span
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            border: `calc(min(8px, 1.2vw)) solid ${LEGAL_CAPTURE}`,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      {showRank && (
        <span
          className="absolute top-0.5 left-0.5 text-xs font-bold pointer-events-none"
          style={{
            color: isLight ? DARK : LIGHT,
            fontSize: 'calc(min(11px, 1.8vw))',
          }}
        >
          {rankLabel}
        </span>
      )}
      {showFile && (
        <span
          className="absolute bottom-0.5 right-1 text-xs font-bold pointer-events-none"
          style={{
            color: isLight ? DARK : LIGHT,
            fontSize: 'calc(min(11px, 1.8vw))',
          }}
        >
          {fileLabel}
        </span>
      )}
    </div>
  )
}

export default function ChessBoard(props: Props) {
  const { board, selectedSquare, legalTargets, lastMove, flipped, onSquareClick } = props

  const squares = []
  for (let displayR = 0; displayR < 8; displayR++) {
    for (let displayC = 0; displayC < 8; displayC++) {
      const r = flipped ? 7 - displayR : displayR
      const c = flipped ? 7 - displayC : displayC
      const index = sq(r, c)

      squares.push(
        <ChessSquare
          key={index}
          piece={board[index]}
          index={index}
          isSelected={index === selectedSquare}
          isLegalTarget={legalTargets.includes(index)}
          isLastMove={lastMove !== null && (index === lastMove.from || index === lastMove.to)}
          flipped={flipped}
          onClick={() => onSquareClick(index)}
        />
      )
    }
  }

  return (
    <div
      className="grid grid-cols-8 rounded-lg overflow-hidden shadow-xl border border-gray-300 dark:border-gray-700"
      style={{ maxWidth: '480px', width: '100%', aspectRatio: '1' }}
    >
      {squares}
    </div>
  )
}
