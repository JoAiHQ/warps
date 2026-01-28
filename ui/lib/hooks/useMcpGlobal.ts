import { useState, useEffect } from 'react'
import { App } from '@modelcontextprotocol/ext-apps'
import { McpHostContext } from './types'

export function useMcpGlobal<K extends keyof McpHostContext>(
  key: K,
  app: App
): McpHostContext[K] {
  const [value, setValue] = useState<McpHostContext[K] | undefined>(() => {
    const hostContext = app?.getHostContext()
    return hostContext?.[key] ?? undefined
  })

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

export function useMcpHostContext(app: App | null): McpHostContext | null {
  const [context, setContext] = useState<McpHostContext | null>(() => {
    return app?.getHostContext() ?? null
  })

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
