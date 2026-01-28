import { useCallback, useMemo, useEffect, useState } from 'react'
import { App } from '@modelcontextprotocol/ext-apps'

export type AppExecute = (toolName: string, args?: Record<string, unknown>) => Promise<unknown>

export type UseAppResult<T> = {
  data?: T
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

export function useApp<T = any>(app: App): UseAppResult<T> {
  const [toolResult, setToolResult] = useState<unknown | null>(null)
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
    const result = await app.callServerTool({ name: toolName, arguments: args })
    setToolResult(result)
    return result
  }, [app])

  const sendFollowUp = useCallback(async (prompt: string) => {
    await app.sendMessage({
      role: 'user',
      content: [{ type: 'text', text: prompt }],
    })
  }, [app])

  useEffect(() => {
    const handleToolInput = (params: any) => {
      console.log('Tool input:', params.arguments)
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
  }, [app])

  return {
    data,
    paymentRequired: Boolean(upgradeRecord),
    executeTool: execute,
    executePrompt: sendFollowUp,
    meta,
  }
}
