import { PROMOTION_PIECES } from './chess-engine'

type Props = {
  isWhite: boolean
  onSelect: (pieceType: number) => void
  onCancel: () => void
}

export default function PromotionDialog({ isWhite, onSelect, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
          Promote pawn
        </h3>
        <div className="flex gap-3">
          {PROMOTION_PIECES.map((p) => (
            <button
              key={p.type}
              onClick={() => onSelect(p.type)}
              className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-3xl"
              style={{
                color: isWhite ? '#fff' : '#000',
                textShadow: isWhite ? '0 0 3px rgba(0,0,0,0.5)' : '0 0 3px rgba(255,255,255,0.3)',
              }}
            >
              {isWhite ? p.symbol : String.fromCharCode(p.symbol.charCodeAt(0) + 6)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
