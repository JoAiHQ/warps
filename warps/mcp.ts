import { AppMcpFactory, AppMcpManifest } from './types'

const DEFAULT_MCP_MANIFEST: AppMcpManifest = {
  prefersBorder: true,
  csp: {
    connectDomains: [],
    resourceDomains: [],
    frameDomains: [],
    baseUriDomains: [],
  },
}

export function createDefaultAppMcp(
  overrides?: Partial<AppMcpManifest>,
): AppMcpFactory {
  return () => ({ ...DEFAULT_MCP_MANIFEST, ...overrides })
}
