import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'

type TemplateMeta = {
  slug?: string
  app?: string
  channel?: string
  step?: number
  delay_days?: number
  variables?: string
}

type Template = {
  id: string
  name: string
  meta?: TemplateMeta
}

type Contact = {
  id: string
  name: string
  phone?: string
  email?: string
  tags?: string[]
  props?: Record<string, string | number>
}

type DashboardData = {
  enrolled?: Contact[]
  parked?: Contact[]
  replied?: Contact[]
  templates?: Template[]
}

function StatusBadge({ status }: { status: 'enrolled' | 'parked' | 'replied' }) {
  const colors = {
    enrolled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    parked: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    replied: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  }

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[status]}`}>
      {status}
    </span>
  )
}

function ContactRow({ contact, status }: { contact: Contact; status: 'enrolled' | 'parked' | 'replied' }) {
  const initials = contact.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const sequence = contact.props?.outreach_sequence as string | undefined
  const step = contact.props?.outreach_step as number | undefined

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300 shrink-0">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{contact.name}</p>
        {sequence && (
          <p className="text-xs text-gray-400 truncate">
            {sequence}{step ? ` · Step ${step}` : ''}
          </p>
        )}
      </div>
      <StatusBadge status={status} />
    </div>
  )
}

function TemplateRow({ template }: { template: Template }) {
  const meta = template.meta
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{template.name}</p>
        {meta && (
          <p className="text-xs text-gray-400 truncate">
            {meta.slug}{meta.channel ? ` · ${meta.channel}` : ''}{meta.step ? ` · Step ${meta.step}` : ''}
          </p>
        )}
      </div>
    </div>
  )
}

function Main() {
  const { data, locale } = useAppContext<DashboardData>()
  const tr = useTranslations(translations).dashboard

  if (!data) return <EmptyMessageSkeleton />

  const enrolled = data.enrolled || []
  const parked = data.parked || []
  const replied = data.replied || []
  const templates = (data.templates || []).filter(t => t.meta?.app === 'outreach')

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{enrolled.length}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">{tr.enrolled}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{parked.length}</p>
          <p className="text-xs text-yellow-600 dark:text-yellow-400">{tr.parked}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{replied.length}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">{tr.replied}</p>
        </div>
      </div>

      {enrolled.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
            {tr.enrolledContacts}
          </p>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {enrolled.map(c => <ContactRow key={c.id} contact={c} status="enrolled" />)}
          </div>
        </div>
      )}

      {parked.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
            {tr.parkedContacts}
          </p>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {parked.map(c => <ContactRow key={c.id} contact={c} status="parked" />)}
          </div>
        </div>
      )}

      {replied.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
            {tr.repliedContacts}
          </p>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {replied.map(c => <ContactRow key={c.id} contact={c} status="replied" />)}
          </div>
        </div>
      )}

      {templates.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
            {tr.templates}
          </p>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {templates.map(t => <TemplateRow key={t.id} template={t} />)}
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App appName="Outreach Dashboard" appVersion="1.0.0">
    <Main />
  </App>
)
