import {
  AppDistributionFactory,
  AppDistributionManifest,
  AppDistributionProvider,
  AppDistributionProviderAction,
  AppDistributionProviderConfig,
  WarpbaseBrand,
} from './types'

const JOAI_LEGAL_NOTICE_URL = 'https://legal.vleap.ai/general/legal-notice.html'
const JOAI_PRIVACY_URL = 'https://legal.vleap.ai/policies/privacy.html'
const JOAI_SUPPORT_URL = 'https://joai.ai'
const JOAI_SUPPORT_EMAIL = 'support@joai.ai'

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? U[]
    : T[K] extends Record<string, unknown>
      ? DeepPartial<T[K]>
      : T[K]
}

function mergeDefined<T extends Record<string, any>>(base: T, overrides?: DeepPartial<T>): T {
  if (!overrides) return base

  const next: Record<string, unknown> = { ...base }

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) continue

    const current = next[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      current &&
      typeof current === 'object' &&
      !Array.isArray(current)
    ) {
      next[key] = mergeDefined(current as Record<string, any>, value as DeepPartial<Record<string, any>>)
      continue
    }

    next[key] = value
  }

  return next as T
}

function getBrandDisplayName(brandName: string, brand: WarpbaseBrand | null): string {
  const runtimeName = brand?.info?.name
  if (typeof runtimeName === 'string' && runtimeName.trim()) return runtimeName.trim()

  return brandName
    .split(/[-_]/g)
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ')
}

function getAppPageUrl(brandSlug: string): string {
  return `https://joai.ai/en/apps/${brandSlug}`
}

function getPluginName(brandSlug: string): string {
  return `joai-${brandSlug}`
}

function getMcpUrl(env: string, brandSlug: string): string {
  if (env === 'devnet') return `https://devnet-cortex.joai.ai/mcp/apps/${brandSlug}`
  return `https://cortex.joai.ai/mcp/apps/${brandSlug}`
}

function createCursorMcpInstallLink(mcpUrl: string, pluginName: string): string {
  return `https://cursor.com/en-US/install-mcp?name=${encodeURIComponent(pluginName)}&config=${encodeURIComponent(Buffer.from(JSON.stringify({ url: mcpUrl })).toString('base64'))}`
}

function createAction(type: AppDistributionProviderAction['type'], label: string, value: string): AppDistributionProviderAction {
  return { type, label, value }
}

function createDefaultProviderDistribution(
  provider: AppDistributionProvider,
  brandSlug: string,
  mcpUrl: string,
): AppDistributionProviderConfig {
  const pluginName = getPluginName(brandSlug)
  const appPageUrl = getAppPageUrl(brandSlug)

  switch (provider) {
    case 'claude':
      return {
        enabled: true,
        status: 'ready',
        warpIdentifier: 'anthropic-joai-plugin-install',
        title: 'Claude',
        description: 'Open Claude connector settings and add the MCP URL.',
        sourceUrl: appPageUrl,
        fallbackUrl: mcpUrl,
        primaryAction: createAction('link', 'Open Claude', 'https://claude.ai/settings/connectors'),
        secondaryAction: null,
        notes: [],
      }
    case 'codex':
      return {
        enabled: false,
        status: 'disabled',
        warpIdentifier: 'openai-joai-plugin-install',
        title: 'Codex Plugin',
        description: 'Deprecated. Use ChatGPT instead.',
        sourceUrl: 'https://github.com/JoAiHQ/codex-plugins',
        fallbackUrl: mcpUrl,
        primaryAction: createAction('copy', 'Copy plugin name', pluginName),
        secondaryAction: null,
        notes: ['Codex marketplace installs are deprecated in favor of ChatGPT.'],
      }
    case 'cursor':
      return {
        enabled: true,
        status: 'ready',
        warpIdentifier: 'cursor-joai-plugin-install',
        title: 'Cursor Plugin',
        description: 'Install this app in Cursor with one click.',
        sourceUrl: appPageUrl,
        fallbackUrl: mcpUrl,
        primaryAction: createAction('deeplink', 'Install in Cursor', createCursorMcpInstallLink(mcpUrl, pluginName)),
        secondaryAction: null,
        notes: ['The one-click install opens Cursor directly with this app prefilled.'],
      }
    case 'openai':
      return {
        enabled: true,
        status: 'runtime_ready',
        warpIdentifier: 'openai-joai-app-connect',
        title: 'ChatGPT',
        description: 'Open ChatGPT Apps settings, enable Developer mode, then create an app with the MCP URL.',
        sourceUrl: appPageUrl,
        fallbackUrl: mcpUrl,
        primaryAction: createAction('link', 'Open ChatGPT apps', 'https://chatgpt.com/#settings/Connectors/Advanced'),
        secondaryAction: null,
        notes: ['Use Developer mode in Apps settings to add the hosted MCP URL.'],
      }
  }
}

function createDefaultManifest(brandName: string, brand: WarpbaseBrand | null, brandSlug: string, env: string): AppDistributionManifest {
  const appName = getBrandDisplayName(brandName, brand)
  const mcpUrl = getMcpUrl(env, brandSlug)

  return {
    install: {
      summary: `Connect ${appName} to Claude, Cursor, and ChatGPT through JoAi's hosted MCP app server.`,
      examplePrompts: [
        `List the ${appName} tools available in this app.`,
        `Explain what setup or authentication ${appName} needs before I run an action.`,
        `Use ${appName} to help me with the task I describe next.`,
      ],
      usageNotes: [
        'Every listed action becomes an MCP tool when the app server is connected.',
        'Prefer the generated provider plugin when one is available, and fall back to the raw MCP URL otherwise.',
      ],
      authPrerequisites: [
        'Some actions require provider credentials or OAuth on first use.',
      ],
    },
    legal: {
      privacyUrl: JOAI_PRIVACY_URL,
      termsUrl: JOAI_LEGAL_NOTICE_URL,
      supportUrl: JOAI_SUPPORT_URL,
      supportEmail: JOAI_SUPPORT_EMAIL,
    },
    review: {
      screenshots: [],
      reviewerNotes: [
        `This app wraps ${appName}'s public warp actions behind JoAi's hosted MCP app server.`,
        'The generated submission bundle is ready for runtime validation even when marketplace screenshots have not been attached yet.',
      ],
      testPrompts: [
        `List the ${appName} tools available in this app.`,
        `What authentication does ${appName} require before you can use it?`,
        `Use the best ${appName} tool for the task I describe next.`,
      ],
      demoFlow: 'Connect the hosted MCP URL, authenticate if prompted, then call one of the listed app actions.',
      credentialsReference: 'Use the same provider credentials or OAuth flow that the underlying warp actions already require.',
    },
    providers: {
      claude: createDefaultProviderDistribution('claude', brandSlug, mcpUrl),
      codex: createDefaultProviderDistribution('codex', brandSlug, mcpUrl),
      cursor: createDefaultProviderDistribution('cursor', brandSlug, mcpUrl),
      openai: createDefaultProviderDistribution('openai', brandSlug, mcpUrl),
    },
  }
}

export function createDefaultAppDistribution(
  overrides?: DeepPartial<AppDistributionManifest>,
): AppDistributionFactory {
  return ({ brandName, brand, brandSlug, env }) => mergeDefined(createDefaultManifest(brandName, brand, brandSlug, env), overrides)
}
