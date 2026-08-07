import { useEffect, useState } from 'react'
import { applyDocumentTheme } from '@openai/apps-sdk-ui/theme'

export type ThemePreference = 'light' | 'dark' | 'auto'
export type Theme = 'light' | 'dark'

function systemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Resolve a host theme preference to a concrete preference. An explicit
 * light/dark wins; otherwise the theme injected by the host before the app
 * loaded (`window.openai.theme`, e.g. the JoAi PWA embed) is used; otherwise
 * the preference is 'auto' and follows the OS color-scheme.
 */
function effectivePreference(preference: ThemePreference | undefined): ThemePreference {
  if (preference === 'light' || preference === 'dark') return preference
  const injected = (window as Window & { openai?: { theme?: ThemePreference } }).openai?.theme
  if (injected === 'light' || injected === 'dark') return injected
  return 'auto'
}

/** Resolve a host theme preference to a concrete light/dark theme. */
export function resolveTheme(preference: ThemePreference | undefined): Theme {
  const effective = effectivePreference(preference)
  return effective === 'auto' ? systemTheme() : effective
}

/**
 * Apply the host theme preference to the document using the OpenAI chat SDK
 * helper (`applyDocumentTheme` sets `data-theme` and `color-scheme`). When the
 * effective preference is 'auto' the OS color-scheme is followed live.
 * Returns the resolved theme so components can adapt.
 */
export function useTheme(preference: ThemePreference | undefined): Theme {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(preference))

  useEffect(() => {
    setTheme(resolveTheme(preference))
  }, [preference])

  useEffect(() => {
    applyDocumentTheme(theme)
  }, [theme])

  const auto = effectivePreference(preference) === 'auto'
  useEffect(() => {
    if (!auto || typeof window.matchMedia !== 'function') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setTheme(systemTheme())
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [auto])

  return theme
}
