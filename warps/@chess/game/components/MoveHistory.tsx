import { useRef, useEffect } from 'react'
import { toAlgebraic, pieceType } from './chess-engine'

type MoveData = {
  from_sq: number
  to_sq: number
  piece: number
  captured: number
  promotion: number
  move_number: number
}

type Props = {
  moves: MoveData[]
}

export default function MoveHistory({ moves }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [moves.length])

  if (moves.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-400 dark:text-gray-500">
        No moves yet
      </div>
    )
  }

  const pairs: (MoveData | null)[][] = []
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1] ?? null])
  }

  return (
    <div className="max-h-48 overflow-y-auto">
      <table className="w-full text-sm">
        <tbody>
          {pairs.map((pair, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="text-right text-gray-400 dark:text-gray-500 w-8 pr-2 py-0.5 font-mono text-xs">
                {i + 1}.
              </td>
              <td className="py-0.5 px-1.5 font-mono">
                {pair[0] && (
                  <span className="text-gray-900 dark:text-white">
                    {formatMove(pair[0])}
                  </span>
                )}
              </td>
              <td className="py-0.5 px-1.5 font-mono">
                {pair[1] && (
                  <span className="text-gray-900 dark:text-white">
                    {formatMove(pair[1])}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={endRef} />
    </div>
  )
}

function formatMove(m: MoveData): string {
  const type = pieceType(m.piece)
  if (type === 1 && m.to_sq >= 0) {
    const isCapture = m.captured !== 0
    let s = isCapture ? String.fromCharCode(97 + (m.from_sq % 8)) + 'x' : ''
    s += toAlgebraic(m.to_sq)
    if (m.promotion) {
      const pt = pieceType(m.promotion)
      const names: Record<number, string> = { 2: 'N', 3: 'B', 4: 'R', 5: 'Q' }
      s += '=' + (names[pt] ?? 'Q')
    }
    return s
  }

  const pieceNames: Record<number, string> = { 2: 'N', 3: 'B', 4: 'R', 5: 'Q', 6: 'K' }
  let notation = pieceNames[type] ?? ''
  if (m.captured !== 0) notation += 'x'
  notation += toAlgebraic(m.to_sq)
  return notation
}
