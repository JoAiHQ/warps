import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { Terminal, Clock, ExternalLink, Warning } from '@openai/apps-sdk-ui/components/Icon'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { LaravelCloudListLogsData, LaravelCloudListLogsInputs } from './warp.types'

function LogItem({ log }: { log: any }) {
  const isError = log.level === 'error'
  const isWarning = log.level === 'warning'
  
  const textColor = isError ? 'text-danger' : isWarning ? 'text-warning' : 'text-primary'

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 py-2 border-b border-subtle last:border-0 hover:bg-surface-secondary/50 px-2 rounded transition-colors">
      <div className="flex items-center gap-2 sm:w-48 shrink-0 opacity-70">
        <Clock className="size-3 text-secondary shrink-0" />
        <span className="font-mono text-[10px] text-secondary break-keep">{formatDate(log.timestamp)}</span>
      </div>
      <div className="flex items-start gap-2 flex-1 overflow-hidden">
        <Badge color={isError ? 'danger' : isWarning ? 'warning' : 'secondary'} className="text-[10px] h-5 min-w-[60px] justify-center shrink-0 uppercase">
          {log.level}
        </Badge>
        <div className={`font-mono text-xs break-words whitespace-pre-wrap ${textColor}`}>
          {log.message}
        </div>
      </div>
    </div>
  )
}

function Main() {
  const { data, inputs } = useAppContext<LaravelCloudListLogsData, LaravelCloudListLogsInputs>()

  if (!data && !inputs) {
    return <EmptyMessageSkeleton />
  }

  const logs = data?.LOGS || []

  return (
    <div className="flex flex-col gap-4 p-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Terminal className="size-5 text-primary" />
          <h1 className="heading-lg">Environment Logs</h1>
        </div>
        <Badge color="secondary" className="font-mono">
          {logs.length}
        </Badge>
      </div>

      {logs.length === 0 ? (
        <EmptyMessage>
          <EmptyMessage.Title>No logs found</EmptyMessage.Title>
          <EmptyMessage.Description>
            There are no logs for environment <strong>{inputs?.ENVIRONMENT_ID}</strong> yet.
          </EmptyMessage.Description>
        </EmptyMessage>
      ) : (
        <div className="flex flex-col bg-[#111] dark:bg-[#000] border border-default rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center bg-surface-secondary px-4 py-2 border-b border-default text-xs font-mono text-secondary">
            <span>{inputs?.ENVIRONMENT_ID || 'Logs'}</span>
          </div>
          <div className="flex flex-col p-2 max-h-[600px] overflow-y-auto">
            {logs.map((log: any, i: number) => (
              <LogItem key={log.id || i} log={log} />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-2">
        <a
          href={`https://cloud.laravel.com/environments/${inputs?.ENVIRONMENT_ID}/logs`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-link hover:underline flex items-center gap-1 font-medium"
        >
          View in Laravel Cloud
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App>
        <Main />
      </App>
    </React.StrictMode>
  )
}
