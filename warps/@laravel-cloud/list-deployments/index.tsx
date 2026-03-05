import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { CheckCircle, Clock, ExternalLink, XCircle, Bolt, Branch, MarkerCode } from '@openai/apps-sdk-ui/components/Icon'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { LaravelCloudListDeploymentsData, LaravelCloudListDeploymentsInputs } from './warp.types'

function DeploymentItem({ deployment }: { deployment: any }) {
  const isSuccess = deployment.status === 'finished' || deployment.status === 'completed'
  const isPending = deployment.status === 'pending' || deployment.status === 'running' || deployment.status === 'starting'
  const isFailed = deployment.status === 'failed' || deployment.status === 'cancelled'

  const statusColor = isSuccess ? 'success' : isPending ? 'warning' : 'danger'
  const statusIcon = isSuccess ? <CheckCircle className="size-3" /> : isPending ? <Clock className="size-3" /> : <XCircle className="size-3" />

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-default bg-surface hover:bg-surface-secondary transition-colors shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Bolt className="size-4 text-secondary" />
          <span className="font-mono text-xs font-semibold text-primary">{deployment.id}</span>
        </div>
        <Badge color={statusColor} className="capitalize">
          {statusIcon} {deployment.status}
        </Badge>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <MarkerCode className="size-4 text-secondary mt-0.5" />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-primary line-clamp-2">
              {deployment.commit_message || 'No commit message'}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
               <Branch className="size-3 text-secondary" />
               <p className="text-xs font-mono text-secondary">
                 {deployment.commit_hash?.substring(0, 7) || 'N/A'}
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-subtle">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] uppercase tracking-wider font-bold text-secondary">Started</p>
          <p className="text-[11px] text-primary">{formatDate(deployment.started_at)}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] uppercase tracking-wider font-bold text-secondary">Finished</p>
          <p className="text-[11px] text-primary">{formatDate(deployment.finished_at)}</p>
        </div>
      </div>
    </div>
  )
}

function Main() {
  const { data, inputs } = useAppContext<LaravelCloudListDeploymentsData, LaravelCloudListDeploymentsInputs>()

  if (!data && !inputs) {
    return <EmptyMessageSkeleton />
  }

  const deployments = data?.DEPLOYMENTS || []

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Bolt className="size-5 text-primary" />
          <h1 className="heading-lg">Deployments</h1>
        </div>
        <Badge color="secondary" className="font-mono">
          {deployments.length}
        </Badge>
      </div>

      {deployments.length === 0 ? (
        <EmptyMessage>
          <EmptyMessage.Title>No deployments found</EmptyMessage.Title>
          <EmptyMessage.Description>
            There are no deployments for environment <strong>{inputs?.ENVIRONMENT_ID}</strong> yet.
          </EmptyMessage.Description>
        </EmptyMessage>
      ) : (
        <div className="flex flex-col gap-3">
          {deployments.map((deployment: any) => (
            <DeploymentItem key={deployment.id} deployment={deployment} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-2">
        <a
          href={`https://cloud.laravel.com/environments/${inputs?.ENVIRONMENT_ID}/deployments`}
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
