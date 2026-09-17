import React from 'react'
import ReactDOM from 'react-dom/client'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { PolicyView } from './PolicyView'
import type { PolicyGetData } from './types'

function Main() {
  const { data } = useAppContext<PolicyGetData>()
  const tr = useTranslations(translations).policyGet

  if (!data) return <EmptyMessageSkeleton />

  const policy = data.policy
  if (!policy) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">{tr.empty}</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  return <PolicyView policy={policy} />
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
