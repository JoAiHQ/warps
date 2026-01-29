import React, { useEffect, useState } from 'react'
import { App as McpApp } from '@modelcontextprotocol/ext-apps'
import { useApp, UseAppResult } from '../hooks/useApp'
import { UpgradePrompt } from './Billing/UpgradePrompt'

const AppContext = React.createContext<UseAppResult<any, any> | null>(null)

type Props = {
  children: React.ReactNode
  appName?: string
  appVersion?: string
}

export function App(props: Props) {
  const { children, appName, appVersion } = props
  const [app, setApp] = useState<McpApp | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isDevMode, setIsDevMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDev = !!(window as any).WARP_INPUTS || !!(window as any).WARP_CONFIG
    setIsDevMode(isDev)

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

    if (!isDev) {
      connect()
    }

    setApp(newApp)
  }, [appName, appVersion])

  const appResult = useApp(app as McpApp, isDevMode)

  if (!isDevMode && (!isConnected || !app)) {
    return null
  }

  if (appResult.paymentRequired) {
    const meta = appResult.meta as { title: string; description: string; paymentUrl: string }
    return <UpgradePrompt title={meta.title} description={meta.description} paymentUrl={meta.paymentUrl} />
  }

  return <AppContext.Provider value={appResult}>{children}</AppContext.Provider>
}

export { AppContext }

export function useAppContext<T = any, I = any>(): UseAppResult<T, I> {
  const context = React.useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within App.')
  return context as UseAppResult<T, I>
}
