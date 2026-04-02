import {
  AppDistributionFactory,
  AppDistributionManifest,
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

function createDefaultManifest(brandName: string, brand: WarpbaseBrand | null): AppDistributionManifest {
  const appName = getBrandDisplayName(brandName, brand)

  return {
    install: {
      summary: `Connect ${appName} to Claude, Codex, and ChatGPT through JoAi's hosted MCP app server.`,
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
      claude: {
        enabled: true,
        status: 'ready',
      },
      codex: {
        enabled: true,
        status: 'ready',
      },
      cursor: {
        enabled: true,
        status: 'ready',
      },
      openai: {
        enabled: true,
        status: 'runtime_ready',
      },
    },
  }
}

export function createDefaultAppDistribution(
  overrides?: DeepPartial<AppDistributionManifest>,
): AppDistributionFactory {
  return ({ brandName, brand }) => mergeDefined(createDefaultManifest(brandName, brand), overrides)
}
