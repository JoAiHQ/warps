import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { ListResult, mapListItems, valueToDisplay } from '../../../ui/shared/joai'

function Main() {
  const { data } = useAppContext()
  if (!data) return <EmptyMessageSkeleton />

  const items = mapListItems(data, (item) => ({
    code: valueToDisplay(item.code),
    rate: typeof item.rate === 'number' ? `${item.rate}%` : null,
    kind: valueToDisplay(item.kind).replace(/_/g, ' '),
    uva: valueToDisplay(item.vatReportFields),
    system: item.system,
  }))

  return (
    <ListResult
      title="Tax codes"
      emptyText="No tax codes found."
      items={items}
      primaryKey="code"
      secondaryKey="rate"
      detailKeys={['kind', 'uva', 'system']}
      detailLabels={{ uva: 'UVA fields', system: 'System code' }}
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
