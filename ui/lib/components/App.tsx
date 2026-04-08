import React, { useEffect, useMemo, useState } from 'react'
import { App as McpApp } from '@modelcontextprotocol/ext-apps'
import { useApp, UseAppResult } from '../hooks/useApp'
import { useMcpHostContext } from '../hooks/useMcpGlobal'
import { createTranslator, normalizeLocale } from '../i18n'
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

  const hostContext = useMcpHostContext(app)

  useEffect(() => {
    const theme = hostContext?.theme
    if (!theme || theme === 'auto') return

    document.documentElement.setAttribute('data-theme', theme)
    ;(window as any).openai = { theme }
  }, [hostContext?.theme])

  const locale = useMemo(() => normalizeLocale(hostContext?.locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en')), [hostContext?.locale])
  const t = useMemo(() => createTranslator(locale), [locale])
  const appResult = useApp(app as McpApp, isDevMode, locale, t)

  if (!isDevMode && (!isConnected || !app)) {
    return null
  }

  if (appResult.paymentRequired) {
    const upgrade = appResult.data as { title: string; description: string; actionLabel?: string; paymentUrl: string; current?: number; limit?: number }
    return <UpgradePrompt title={upgrade.title} description={upgrade.description} actionLabel={upgrade.actionLabel} paymentUrl={upgrade.paymentUrl} current={upgrade.current} limit={upgrade.limit} />
  }

  return <AppContext.Provider value={appResult}>{children}</AppContext.Provider>
}

export { AppContext }

export function useAppContext<T = any, I = any>(): UseAppResult<T, I> {
  const context = React.useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within App.')
  return context as UseAppResult<T, I>
}
