import React from 'react'
import { useAppContext } from '../../lib/components'

export type MessageEntry = Record<string, unknown>

function formatTime(value: unknown): string | null {
  if (!value) return null
  const d = new Date(String(value))
  if (isNaN(d.getTime())) return null
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export function MessageThreadResult({ items, emptyText }: { items: MessageEntry[]; emptyText: string }) {
  const { copyToClipboard } = useAppContext()

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Messages ({items.length})</h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(items, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((message, index) => {
          const isUser = String(message.role ?? '') === 'user'
          const sender = message.senderName ? String(message.senderName) : isUser ? 'User' : 'Agent'
          return (
            <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  isUser
                    ? 'bg-brand-primary-dark text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                <div className={`mb-0.5 flex items-baseline gap-2 text-[11px] font-medium ${isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                  <span>{sender}</span>
                  {formatTime(message.createdAt) ? <span>{formatTime(message.createdAt)}</span> : null}
                </div>
                <p className="whitespace-pre-wrap break-words">{String(message.content ?? '')}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
