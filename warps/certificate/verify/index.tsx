import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import type { Certificate, CertificateStatus } from './warp.types'

function StatusBadge({ status }: { status: CertificateStatus }) {
  const styles: Record<CertificateStatus, string> = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Revoked: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Expired: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-green-500' : status === 'Revoked' ? 'bg-red-500' : 'bg-amber-500'}`} />
      {status}
    </span>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="mt-0.5 text-sm text-gray-900 dark:text-white break-all">{value}</p>
    </div>
  )
}

function truncate(addr: string, chars = 8) {
  if (addr.length <= chars * 2 + 3) return addr
  return `${addr.slice(0, chars)}...${addr.slice(-chars)}`
}

function formatDate(ts: number, locale: string) {
  if (!ts) return '—'
  return new Date(ts * 1000).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}

function BlockchainBadge() {
  return (
    <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400 dark:text-gray-500">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
      Verified on MultiversX Blockchain
    </div>
  )
}

function Main() {
  const { data, locale } = useAppContext<Certificate>()

  if (!data) return <EmptyMessageSkeleton />

  const cert = data
  const isActive = cert.status === 'Active'

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className={`rounded-xl border-2 p-5 flex flex-col gap-4 ${
        isActive
          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Certificate #{cert.id}</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white leading-tight truncate">{cert.company_name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Collection #{cert.collection_id}</p>
          </div>
          <StatusBadge status={cert.status} />
        </div>

        <div className="w-full h-px bg-gray-200 dark:bg-gray-700" />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Issued" value={formatDate(cert.issued_at, locale)} />
          <Field label="Expires" value={cert.expires_at ? formatDate(cert.expires_at, locale) : 'Never'} />
          <Field label="Issuer" value={truncate(cert.issuer)} />
          {cert.recipient && <Field label="Recipient" value={truncate(cert.recipient)} />}
        </div>

        {cert.pdf_hash && (
          <div>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Document fingerprint</p>
            <p className="mt-0.5 text-xs font-mono text-gray-500 dark:text-gray-400 break-all">{cert.pdf_hash}</p>
          </div>
        )}

        {cert.pdf_url && (
          <a
            href={cert.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            View Certificate PDF
          </a>
        )}
      </div>

      <BlockchainBadge />
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
