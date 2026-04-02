import { createDefaultAppMcp } from '../mcp'

export const mcp = createDefaultAppMcp({
  csp: {
    connectDomains: ['https://api.multiversx.com', 'https://devnet-api.multiversx.com'],
  },
})
