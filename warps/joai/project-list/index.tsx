import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />
  const items = mapListItems(data, (item) => ({
    name: item.name,
    status: item.status,
    outputPreset: item.outputPreset,
    outputType: item.outputType,
  }))
  return (
    <ListResult
      title="Projects"
      emptyText="No projects found."
      items={items}
      primaryKey="name"
      secondaryKey="status"
      detailKeys={["outputPreset", "outputType"]}
      detailLabels={{ outputPreset: 'Preset', outputType: 'Type' }}
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
