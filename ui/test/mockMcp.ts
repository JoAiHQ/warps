type ToolResultParams = {
  content?: Array<{ type: string; text: string }>
  structuredContent?: unknown
  _meta?: unknown
  isError?: boolean
}

let mockToolResult: ToolResultParams | null = null

export function setToolResult(params: ToolResultParams) {
  mockToolResult = params

  // Dispatch mock event to notify any listeners
  const event = new CustomEvent('mcp:test:tool-result') as any
  event.detail = params
  window.dispatchEvent(event)
}

// Helper function to wait for tool result in tests
export function waitForToolResult(
  callback: (params: ToolResultParams) => void
): () => void {
  const handler = (event: Event) => {
    const customEvent = event as any
    callback(customEvent.detail)
  }

  window.addEventListener('mcp:test:tool-result', handler)

  // Return cleanup function
  return () => {
    window.removeEventListener('mcp:test:tool-result', handler)
  }
}

// Get current mock tool result (synchronous access for compatibility)
export function getToolResult(): ToolResultParams | null {
  return mockToolResult
}
