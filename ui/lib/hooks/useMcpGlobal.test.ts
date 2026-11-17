import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useMcpGlobal, useMcpHostContext } from './useMcpGlobal'

function createApp() {
  let hostContext: Record<string, unknown> | undefined
  const app = {
    onhostcontextchanged: () => {},
    getHostContext: () => hostContext,
  }
  return { app: app as any, connect: (context: Record<string, unknown>) => (hostContext = context) }
}

describe('useMcpHostContext', () => {
  it('reads the host context that arrives with connect', () => {
    const { app, connect } = createApp()
    const { result, rerender } = renderHook(({ connected }) => useMcpHostContext(app, connected), { initialProps: { connected: false } })
    expect(result.current).toBeNull()

    act(() => {
      connect({ locale: 'de', theme: 'dark' })
    })
    rerender({ connected: true })

    expect(result.current?.locale).toBe('de')
    expect(result.current?.theme).toBe('dark')
  })
})

describe('useMcpGlobal', () => {
  it('reads a host context value that arrives with connect', () => {
    const { app, connect } = createApp()
    const { result, rerender } = renderHook(({ connected }) => useMcpGlobal('locale', app, connected), { initialProps: { connected: false } })
    expect(result.current).toBeUndefined()

    act(() => {
      connect({ locale: 'de' })
    })
    rerender({ connected: true })

    expect(result.current).toBe('de')
  })
})
