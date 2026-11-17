import { useState, useEffect } from 'react'
import { App } from '@modelcontextprotocol/ext-apps'
import { McpHostContext } from './types'

export function useMcpGlobal<K extends keyof McpHostContext>(
  key: K,
  app: App,
  connected = false
): McpHostContext[K] {
  const [value, setValue] = useState<McpHostContext[K] | undefined>(() => {
    const hostContext = app?.getHostContext()
    return hostContext?.[key] ?? undefined
  })

  // The initial host context arrives with connect(), not as a change notification.
  useEffect(() => {
    if (!app || !connected) return
    const initial = app.getHostContext()?.[key]
    if (initial !== undefined) setValue(initial)
  }, [app, connected, key])

  useEffect(() => {
    if (!app) return

    const handleContextChanged = (ctx: any) => {
      if (ctx[key] !== undefined && ctx[key] !== value) {
        setValue(ctx[key])
      }
    }

    app.onhostcontextchanged = handleContextChanged

    return () => {
      app.onhostcontextchanged = () => {}
    }
  }, [app, key, value])

  return value
}

export function useMcpHostContext(app: App | null, connected = false): McpHostContext | null {
  const [context, setContext] = useState<McpHostContext | null>(() => {
    return app?.getHostContext() ?? null
  })

  // The initial host context arrives with connect(), not as a change notification.
  useEffect(() => {
    if (!app || !connected) return
    setContext(app.getHostContext() ?? null)
  }, [app, connected])

  useEffect(() => {
    if (!app) return

    const handleContextChanged = () => {
      setContext(app?.getHostContext() ?? null)
    }

    app.onhostcontextchanged = handleContextChanged

    return () => {
      app.onhostcontextchanged = () => {}
    }
  }, [app])

  return context
}
