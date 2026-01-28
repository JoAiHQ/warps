import React, { useEffect, useState } from 'react'
import { App as McpApp } from '@modelcontextprotocol/ext-apps'
import { useApp, UseAppResult } from '../hooks/useApp'
import { UpgradePrompt } from './Billing/UpgradePrompt'

const AppContext = React.createContext<UseAppResult<any> | null>(null)

type Props = {
  children: React.ReactNode
  appName?: string
  appVersion?: string
}

export function App(props: Props) {
  const { children, appName, appVersion } = props
  const [app, setApp] = useState<McpApp | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const newApp = new McpApp({
      name: appName || 'MCP App',
      version: appVersion || '1.0.0',
    })

    const connect = async () => {
      try {
        await newApp.connect()
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect to MCP host:', error)
        setIsConnected(false)
      }
    }

    connect()
    setApp(newApp)
  }, [appName, appVersion])

  const appResult = useApp(app as McpApp)

  if (!isConnected || !app) {
    return null
  }

  if (appResult.paymentRequired) {
    const meta = appResult.meta as { title: string; description: string; paymentUrl: string }
    return <UpgradePrompt title={meta.title} description={meta.description} paymentUrl={meta.paymentUrl} />
  }

  return <AppContext.Provider value={appResult}>{children}</AppContext.Provider>
}

export { AppContext }

export function useAppContext<T = any>(): UseAppResult<T> {
  const context = React.useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within App.')
  return context as UseAppResult<T>
}
