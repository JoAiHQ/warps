import { useMemo } from 'react'
import { useAppContext } from '../components/App'
import { normalizeLocale } from '../i18n'

const FALLBACK_LOCALE = 'en'

/**
 * Picks the translations object for the active locale from a `{ en, de, ... }`
 * map. Falls back to English then to any available locale. Use this in MCP
 * apps that organize translations as one file per language.
 *
 * Usage:
 *   import { translations } from '../i18n'
 *   const tr = useTranslations(translations)
 *   <h1>{tr.configure.title}</h1>
 */
export function useTranslations<T>(map: Record<string, T>): T {
  const { locale } = useAppContext()

  return useMemo(() => {
    const normalized = normalizeLocale(locale)
    return map[normalized] ?? map[FALLBACK_LOCALE] ?? Object.values(map)[0]!
  }, [map, locale])
}
