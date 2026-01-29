import { App } from '@modelcontextprotocol/ext-apps'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type AppExecute = (toolName: string, args?: Record<string, unknown>) => Promise<unknown>

export type UseAppResult<T, I = any> = {
  data?: T
  inputs?: I
  config?: Record<string, string>
  paymentRequired: boolean
  executeTool: AppExecute
  executePrompt: (prompt: string) => Promise<void>
  meta?: unknown
}

type ToolOutputEnvelope = {
  structuredContent?: unknown
}

function unwrapStructuredContent(output: unknown): unknown {
  const envelope = output && typeof output === 'object' ? (output as ToolOutputEnvelope) : undefined
  return envelope?.structuredContent ?? output
}

function toRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  return value as Record<string, unknown>
}

function extractMeta(value: unknown): unknown | undefined {
  const record = toRecord(value)
  if (!record || !Object.prototype.hasOwnProperty.call(record, '_meta')) {
    return undefined
  }
  return record['_meta']
}

function findUpgradeRecord(values: unknown[]): Record<string, unknown> | undefined {
  for (const value of values) {
    const record = toRecord(value)
    if (record && record['billing_upgrade'] === true) {
      return record
    }
  }
  return undefined
}

export function useApp<T = any, I = any>(app: App, isDevMode = false): UseAppResult<T, I> {
  const [toolResult, setToolResult] = useState<unknown | null>(() => {
    if (typeof window !== 'undefined' && (window as any).WARP_RESULT) {
      return (window as any).WARP_RESULT
    }
    return null
  })
  const [inputs, setInputs] = useState<I | undefined>(() => {
    if (typeof window !== 'undefined' && (window as any).WARP_INPUTS) {
      return (window as any).WARP_INPUTS as I
    }
    return undefined
  })
  const [config] = useState<Record<string, string> | undefined>(() => {
    if (typeof window !== 'undefined' && (window as any).WARP_CONFIG) {
      return (window as any).WARP_CONFIG
    }
    return undefined
  })

  const structuredData = useMemo(() => {
    if (!toolResult) return undefined
    return unwrapStructuredContent(toolResult)
  }, [toolResult])
  const data = useMemo(() => structuredData as T | undefined, [structuredData])

  const upgradeRecord = useMemo(
    () => findUpgradeRecord([structuredData, toolResult]),
    [structuredData, toolResult]
  )
  const meta = useMemo(
    () => extractMeta(structuredData) ?? extractMeta(toolResult) ?? toolResult ?? upgradeRecord,
    [structuredData, toolResult, upgradeRecord]
  )

  const execute = useCallback<AppExecute>(async (toolName, args = {}) => {
    if (isDevMode) {
      console.log('[Dev Mode] Would execute tool:', toolName, args)
      setToolResult(args)
      return args
    }
    const result = await app.callServerTool({ name: toolName, arguments: args })
    setToolResult(result)
    return result
  }, [app, isDevMode])

  const sendFollowUp = useCallback(async (prompt: string) => {
    if (isDevMode) {
      console.log('[Dev Mode] Would send prompt:', prompt)
      return
    }
    await app.sendMessage({
      role: 'user',
      content: [{ type: 'text', text: prompt }],
    })
  }, [isDevMode])

  useEffect(() => {
    if (isDevMode) {
      return
    }

    const handleToolInput = (params: any) => {
      console.log('Tool input:', params.arguments)
      if (params.arguments) {
        setInputs(params.arguments as I)
      }
      setToolResult(params)
    }

    const handleToolResult = (params: any) => {
      setToolResult(params)
    }

    if (app) {
      app.ontoolinput = handleToolInput
      app.ontoolresult = handleToolResult
    }

    return () => {
      if (app) {
        app.ontoolinput = () => {}
        app.ontoolresult = () => {}
      }
    }
  }, [app, isDevMode])

  return {
    data,
    inputs,
    config,
    paymentRequired: Boolean(upgradeRecord),
    executeTool: execute,
    executePrompt: sendFollowUp,
    meta,
  }
}
