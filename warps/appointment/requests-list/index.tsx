import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { mapAppointmentRequests, RequestList } from './RequestList'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  return <RequestList items={mapAppointmentRequests(data)} />
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App><Main /></App>
    </React.StrictMode>
  )
}
