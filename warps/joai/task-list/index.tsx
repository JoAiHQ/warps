import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, formatDateShort, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    warp: item.warp,
    schedule: item.cronExpression,
    active: item.active,
    runs: item.runs,
    lastRunAt: formatDateShort(item.lastRunAt),
  }))
  return (
    <ListResult
      title="Tasks"
      emptyText="No tasks found."
      items={items}
      primaryKey="warp"
      secondaryKey="schedule"
      detailKeys={["active", "runs", "lastRunAt"]}
      detailLabels={{ lastRunAt: 'Last run', schedule: 'Schedule' }}
    />
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
