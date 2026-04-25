export const EMPTY = 0
export const W_PAWN = 1
export const W_KNIGHT = 2
export const W_BISHOP = 3
export const W_ROOK = 4
export const W_QUEEN = 5
export const W_KING = 6
export const B_PAWN = 7
export const B_KNIGHT = 8
export const B_BISHOP = 9
export const B_ROOK = 10
export const B_QUEEN = 11
export const B_KING = 12

export const STATUS_WAITING = 0
export const STATUS_ACTIVE = 1
export const STATUS_WHITE_WINS = 2
export const STATUS_BLACK_WINS = 3
export const STATUS_DRAW = 4

export function isWhite(p: number): boolean {
  return p >= 1 && p <= 6
}
export function isBlack(p: number): boolean {
  return p >= 7 && p <= 12
}
export function pieceColor(p: number): 'white' | 'black' | null {
  if (isWhite(p)) return 'white'
  if (isBlack(p)) return 'black'
  return null
}
export function pieceType(p: number): number {
  if (p === 0) return 0
  return isWhite(p) ? p : p - 6
}

export function row(sq: number): number {
  return Math.floor(sq / 8)
}
export function col(sq: number): number {
  return sq % 8
}
export function sq(r: number, c: number): number {
  return r * 8 + c
}
export function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8
}

export type Board = number[]

export function initialBoard(): Board {
  return [
    B_ROOK, B_KNIGHT, B_BISHOP, B_QUEEN, B_KING, B_BISHOP, B_KNIGHT, B_ROOK,
    B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN,
    W_ROOK, W_KNIGHT, W_BISHOP, W_QUEEN, W_KING, W_BISHOP, W_KNIGHT, W_ROOK,
  ]
}

export type Move = {
  from: number
  to: number
  promotion?: number
}

export function getPseudoLegalMoves(board: Board, fromSq: number): Move[] {
  const piece = board[fromSq]
  if (piece === EMPTY) return []

  const moves: Move[] = []
  const white = isWhite(piece)
  const type = pieceType(piece)
  const r = row(fromSq)
  const c = col(fromSq)

  const addIfValid = (tr: number, tc: number) => {
    if (!inBounds(tr, tc)) return
    const target = board[sq(tr, tc)]
    if (target === EMPTY || isWhite(target) !== white) {
      moves.push({ from: fromSq, to: sq(tr, tc) })
    }
  }

  if (type === 1) {
    const dir = white ? -1 : 1
    const startRow = white ? 6 : 1
    const promoRow = white ? 0 : 7
    const tr = r + dir
    if (inBounds(tr, c) && board[sq(tr, c)] === EMPTY) {
      if (tr === promoRow) {
        for (const p of [W_QUEEN, W_ROOK, W_BISHOP, W_KNIGHT]) {
          moves.push({ from: fromSq, to: sq(tr, c), promotion: p })
        }
      } else {
        moves.push({ from: fromSq, to: sq(tr, c) })
      }
      if (r === startRow) {
        const tr2 = r + dir * 2
        if (board[sq(tr2, c)] === EMPTY) {
          moves.push({ from: fromSq, to: sq(tr2, c) })
        }
      }
    }
    for (const dc of [-1, 1]) {
      const tc = c + dc
      if (!inBounds(tr, tc)) continue
      const target = board[sq(tr, tc)]
      if (target !== EMPTY && isWhite(target) !== white) {
        if (tr === promoRow) {
          for (const p of [W_QUEEN, W_ROOK, W_BISHOP, W_KNIGHT]) {
            moves.push({ from: fromSq, to: sq(tr, tc), promotion: p })
          }
        } else {
          moves.push({ from: fromSq, to: sq(tr, tc) })
        }
      }
    }
  } else if (type === 2) {
    for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
      addIfValid(r + dr, c + dc)
    }
  } else if (type === 3) {
    addSliding(board, fromSq, moves, white, [[-1, -1], [-1, 1], [1, -1], [1, 1]])
  } else if (type === 4) {
    addSliding(board, fromSq, moves, white, [[-1, 0], [1, 0], [0, -1], [0, 1]])
  } else if (type === 5) {
    addSliding(board, fromSq, moves, white, [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]])
  } else if (type === 6) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        addIfValid(r + dr, c + dc)
      }
    }
  }

  return moves
}

function addSliding(board: Board, fromSq: number, moves: Move[], white: boolean, directions: number[][]) {
  const r = row(fromSq)
  const c = col(fromSq)
  for (const [dr, dc] of directions) {
    let tr = r + dr
    let tc = c + dc
    while (inBounds(tr, tc)) {
      const target = board[sq(tr, tc)]
      if (target === EMPTY) {
        moves.push({ from: fromSq, to: sq(tr, tc) })
      } else {
        if (isWhite(target) !== white) {
          moves.push({ from: fromSq, to: sq(tr, tc) })
        }
        break
      }
      tr += dr
      tc += dc
    }
  }
}

export function findKing(board: Board, white: boolean): number {
  const king = white ? W_KING : B_KING
  for (let i = 0; i < 64; i++) {
    if (board[i] === king) return i
  }
  return -1
}

export function isSquareAttacked(board: Board, targetSq: number, byWhite: boolean): boolean {
  for (let i = 0; i < 64; i++) {
    const p = board[i]
    if (p === EMPTY) continue
    if (isWhite(p) !== byWhite) continue
    const type = pieceType(p)
    const r = row(i)
    const c = col(i)
    const tr = row(targetSq)
    const tc = col(targetSq)
    const dr = tr - r
    const dc = tc - c

    if (type === 1) {
      const dir = byWhite ? -1 : 1
      if (dr === dir && Math.abs(dc) === 1) return true
    } else if (type === 2) {
      if ((Math.abs(dr) === 2 && Math.abs(dc) === 1) || (Math.abs(dr) === 1 && Math.abs(dc) === 2)) return true
    } else if (type === 3) {
      if (Math.abs(dr) === Math.abs(dc) && dr !== 0 && isPathClear(board, r, c, tr, tc)) return true
    } else if (type === 4) {
      if ((dr === 0 || dc === 0) && (dr !== 0 || dc !== 0) && isPathClear(board, r, c, tr, tc)) return true
    } else if (type === 5) {
      const isDiag = Math.abs(dr) === Math.abs(dc) && dr !== 0
      const isStraight = (dr === 0 || dc === 0) && (dr !== 0 || dc !== 0)
      if ((isDiag || isStraight) && isPathClear(board, r, c, tr, tc)) return true
    } else if (type === 6) {
      if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1 && (dr !== 0 || dc !== 0)) return true
    }
  }
  return false
}

function isPathClear(board: Board, fr: number, fc: number, tr: number, tc: number): boolean {
  const dr = Math.sign(tr - fr)
  const dc = Math.sign(tc - fc)
  let r = fr + dr
  let c = fc + dc
  while (r !== tr || c !== tc) {
    if (board[sq(r, c)] !== EMPTY) return false
    r += dr
    c += dc
  }
  return true
}

export function isInCheck(board: Board, white: boolean): boolean {
  const kingSq = findKing(board, white)
  if (kingSq < 0) return false
  return isSquareAttacked(board, kingSq, !white)
}

export function applyMove(board: Board, move: Move): Board {
  const next = [...board]
  const piece = next[move.from]
  next[move.from] = EMPTY
  if (move.promotion) {
    const white = isWhite(piece)
    next[move.to] = white ? move.promotion : move.promotion + 6
  } else {
    next[move.to] = piece
  }
  return next
}

export function getLegalMoves(board: Board, fromSq: number): Move[] {
  const piece = board[fromSq]
  if (piece === EMPTY) return []

  const white = isWhite(piece)
  const pseudo = getPseudoLegalMoves(board, fromSq)

  return pseudo.filter((m) => {
    const next = applyMove(board, m)
    return !isInCheck(next, white)
  })
}

export function hasAnyLegalMove(board: Board, white: boolean): boolean {
  for (let i = 0; i < 64; i++) {
    if (board[i] === EMPTY || isWhite(board[i]) !== white) continue
    if (getLegalMoves(board, i).length > 0) return true
  }
  return false
}

export function getGameStatus(board: Board, whiteToMove: boolean): 'check' | 'checkmate' | 'stalemate' | 'playing' {
  const inCheck = isInCheck(board, whiteToMove)
  const hasMove = hasAnyLegalMove(board, whiteToMove)

  if (!hasMove) {
    return inCheck ? 'checkmate' : 'stalemate'
  }
  return inCheck ? 'check' : 'playing'
}

const PIECE_SYMBOLS: Record<number, string> = {
  [W_KING]: '\u2654',
  [W_QUEEN]: '\u2655',
  [W_ROOK]: '\u2656',
  [W_BISHOP]: '\u2657',
  [W_KNIGHT]: '\u2658',
  [W_PAWN]: '\u2659',
  [B_KING]: '\u265A',
  [B_QUEEN]: '\u265B',
  [B_ROOK]: '\u265C',
  [B_BISHOP]: '\u265D',
  [B_KNIGHT]: '\u265E',
  [B_PAWN]: '\u265F',
}

export function pieceSymbol(p: number): string {
  return PIECE_SYMBOLS[p] ?? ''
}

const FILE_LETTERS = 'abcdefgh'
export function toAlgebraic(sq: number): string {
  return FILE_LETTERS[col(sq)] + (8 - row(sq))
}

export function moveToNotation(move: Move, board: Board): string {
  const piece = board[move.from]
  const type = pieceType(piece)
  const isCapture = board[move.to] !== EMPTY
  const dest = toAlgebraic(move.to)

  if (type === 1) {
    let s = isCapture ? FILE_LETTERS[col(move.from)] + 'x' : ''
    s += dest
    if (move.promotion) {
      const promoNames: Record<number, string> = { 2: 'N', 3: 'B', 4: 'R', 5: 'Q' }
      s += '=' + (promoNames[pieceType(move.promotion)] ?? 'Q')
    }
    return s
  }

  const pieceNames: Record<number, string> = { 2: 'N', 3: 'B', 4: 'R', 5: 'Q', 6: 'K' }
  let notation = pieceNames[type] ?? '?'
  if (isCapture) notation += 'x'
  notation += dest

  return notation
}

export function truncateAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

export const PROMOTION_PIECES = [
  { type: W_QUEEN, label: 'Queen', symbol: '\u2655' },
  { type: W_ROOK, label: 'Rook', symbol: '\u2656' },
  { type: W_BISHOP, label: 'Bishop', symbol: '\u2657' },
  { type: W_KNIGHT, label: 'Knight', symbol: '\u2658' },
]
