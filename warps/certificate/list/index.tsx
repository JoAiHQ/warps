import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import type { Certificate, CertificateStatus, ListData } from './warp.types'

function StatusBadge({ status }: { status: CertificateStatus }) {
  const styles: Record<CertificateStatus, string> = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Revoked: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Expired: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  )
}

function formatDate(ts: number, locale: string) {
  if (!ts) return '—'
  return new Date(ts * 1000).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
}

function CertRow({ cert, locale }: { cert: Certificate; locale: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
        cert.status === 'Active'
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : cert.status === 'Revoked'
          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      }`}>
        #{cert.id}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{cert.company_name}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Collection #{cert.collection_id} · {formatDate(cert.issued_at, locale)}</p>
      </div>
      <StatusBadge status={cert.status} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">No certificates yet</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Certificates you issue will appear here.</p>
      </div>
    </div>
  )
}

function Main() {
  const { data, locale } = useAppContext<Certificate[] | ListData>()

  if (!data) return <EmptyMessageSkeleton />

  const certs: Certificate[] = Array.isArray(data) ? data : (data as ListData).certificates ?? []

  const active = certs.filter((c) => c.status === 'Active')
  const others = certs.filter((c) => c.status !== 'Active')

  if (certs.length === 0) return <EmptyState />

  return (
    <div className="p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500">{certs.length} certificate{certs.length !== 1 ? 's' : ''}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          {active.length > 0 && <span className="text-green-600 dark:text-green-400 font-medium">{active.length} active</span>}
          {others.length > 0 && <span>{others.length} inactive</span>}
        </div>
      </div>
      {certs.map((cert) => (
        <CertRow key={cert.id} cert={cert} locale={locale} />
      ))}
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
