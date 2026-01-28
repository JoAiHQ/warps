/**
 * MCP Apps host context
 * Based on @modelcontextprotocol/ext-apps API
 */
export interface McpHostContext {
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
  displayMode?: 'inline' | 'pip' | 'fullscreen';
  viewport?: {
    maxHeight?: number;
  };
  safeAreaInsets?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  availableDisplayModes?: ('inline' | 'pip' | 'fullscreen')[];
  userAgent?: string;
  toolInfo?: unknown;
}

/**
 * Widget state that can be persisted
 */
export type McpWidgetState = Record<string, unknown> | null;
