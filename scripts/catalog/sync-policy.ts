export const SOURCE_REPO = 'JoAiHQ/warps'

export const SYNC_ENDPOINT_PATH = '/warps/sync/github'

export const BRANCH_TO_NETWORK = {
  dev: 'devnet',
  main: 'mainnet',
} as const

export type SyncBranch = keyof typeof BRANCH_TO_NETWORK
export type SyncNetwork = (typeof BRANCH_TO_NETWORK)[SyncBranch]

export const NETWORK_TO_API_BASE_URL: Record<SyncNetwork, string> = {
  devnet: 'https://devnet-api.joai.ai',
  mainnet: 'https://api.joai.ai',
}

export const GLOBAL_PLACEHOLDERS: Record<string, string> = {
  CHATAPP_HOST:
    'https://raw.githubusercontent.com/JoAiHQ/warps/refs/heads/main/dist',
}

export function getNetworkForBranch(branch: string): SyncNetwork | null {
  return (BRANCH_TO_NETWORK as Record<string, SyncNetwork>)[branch] ?? null
}

export function getSyncUrlForNetwork(network: SyncNetwork): string {
  return `${NETWORK_TO_API_BASE_URL[network]}${SYNC_ENDPOINT_PATH}`
}
