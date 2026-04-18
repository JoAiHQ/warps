import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { BroadcastChannel, BroadcastPublicData, OutreachContact } from './warp.types'

function recipientsForChannel(contacts: OutreachContact[], channel: BroadcastChannel): OutreachContact[] {
  if (channel === 'whatsapp') return contacts.filter((c) => !!c.phone)
  if (channel === 'email') return contacts.filter((c) => !!c.email)
  return contacts
}

function ContactRow({ contact }: { contact: OutreachContact }) {
  const initials = contact.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300 shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{contact.name}</p>
        {contact.company && <p className="text-xs text-gray-400 truncate">{contact.company}</p>}
      </div>
    </div>
  )
}

type ChannelTabProps = {
  active: boolean
  label: string
  count: number
  onClick: () => void
}

function ChannelTab({ active, label, count, onClick }: ChannelTabProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
        active
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      ].join(' ')}
    >
      {label}
      <span className={['text-xs px-1.5 py-0.5 rounded-full', active ? 'bg-white/20 dark:bg-gray-900/20' : 'bg-gray-100 dark:bg-gray-800'].join(' ')}>
        {count}
      </span>
    </button>
  )
}

function Main() {
  const { data, executeWarp, locale } = useAppContext<BroadcastPublicData>()
  const tr = useTranslations(translations).broadcast

  const [channel, setChannel] = useState<BroadcastChannel>('whatsapp')
  const [message, setMessage] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!data) return <EmptyMessageSkeleton />

  const { contacts } = data
  const recipients = recipientsForChannel(contacts, channel)

  const handleSend = async () => {
    if (!message.trim()) {
      setError(tr.messageRequired)
      return
    }
    if (recipients.length === 0) {
      setError(tr.noRecipientsWithChannel.replace('{channel}', channel))
      return
    }
    setError(null)
    setConfirming(true)
  }

  const handleConfirm = async () => {
    setSending(true)
    setConfirming(false)
    try {
      await executeWarp('outreach_broadcast', {
        contactIds: recipients.map((c) => c.id),
        message: message.trim(),
        channel,
      })
      setSent(true)
    } catch (e) {
      setError(String(e))
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    const count = recipients.length
    const sentMsg = (count === 1 ? tr.sentMessage : tr.sentMessagePlural).replace('{count}', String(count))
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-2xl">✓</div>
        <p className="font-semibold text-gray-900 dark:text-white">{tr.sent}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{sentMsg}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Channel selector */}
      <div className="flex gap-2">
        <ChannelTab
          active={channel === 'whatsapp'}
          label={tr.channelWhatsapp}
          count={contacts.filter((c) => !!c.phone).length}
          onClick={() => setChannel('whatsapp')}
        />
        <ChannelTab
          active={channel === 'email'}
          label={tr.channelEmail}
          count={contacts.filter((c) => !!c.email).length}
          onClick={() => setChannel('email')}
        />
      </div>

      {/* Recipients */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          {tr.recipients} ({recipients.length})
        </p>
        {recipients.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">{contacts.length === 0 ? tr.noContacts : tr.noRecipientsWithChannel.replace('{channel}', channel)}</p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-48 overflow-y-auto">
            {recipients.map((contact) => (
              <ContactRow key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={tr.messagePlaceholder}
          rows={4}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      {/* Send */}
      <button
        onClick={handleSend}
        disabled={sending || recipients.length === 0}
        className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
      >
        {sending ? tr.sending : tr.send}
      </button>

      {/* Confirm modal */}
      {confirming && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4">
            <p className="font-semibold text-gray-900 dark:text-white">{tr.confirmTitle.replace('{count}', String(recipients.length))}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tr.confirmDescription.replace('{channel}', channel)}</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirming(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                {tr.cancel}
              </button>
              <button onClick={handleConfirm} className="flex-1 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition">
                {tr.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App appName="Outreach Broadcast" appVersion="1.0.0">
    <Main />
  </App>
)
