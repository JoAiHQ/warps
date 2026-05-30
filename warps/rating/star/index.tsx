import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '../../ui/lib/components'
import { ReviewForm } from './components/ReviewForm'

function Main() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <ReviewForm />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <App appName="Review" appVersion="1.0.0">
    <Main />
  </App>
)
