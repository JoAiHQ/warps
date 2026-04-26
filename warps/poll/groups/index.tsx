import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { translations } from '../i18n'

type GroupInfo = {
  admin: string
  name: string
  open_membership: boolean
  created_at: number
}

function Spinner() {
  return (
    <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

function Main() {
  const { data, executeWarp, locale } = useAppContext<GroupInfo>()
  const t = translations[locale] ?? translations['en']

  const handleCreateGroup = () => executeWarp('poll-group-create', {})
  const handleJoinGroup = () => executeWarp('poll-membership-request', {})

  if (!data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.groups.title}</h1>
        <div className="flex items-center justify-center py-12 gap-3 text-gray-400 dark:text-gray-500">
          <Spinner />
        </div>
      </div>
    )
  }

  const groupExists = data && data.name

  if (!groupExists) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.groups.title}</h1>
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.groups.noGroup}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">{t.groups.noGroupSub}</p>
          <button
            onClick={handleCreateGroup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t.groups.createGroup}
          </button>
        </div>
      </div>
    )
  }

  const membershipLabel = data.open_membership ? t.groups.openMembership : t.groups.closedMembership

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.groups.title}</h1>

      <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{data.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{membershipLabel}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            data.open_membership
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${data.open_membership ? 'bg-green-500' : 'bg-gray-400'}`} />
            {membershipLabel}
          </span>
        </div>
      </div>

      <button
        onClick={handleJoinGroup}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        {t.groups.joinGroup}
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Poll" appVersion="1.0.0">
    <Main />
  </App>
)
