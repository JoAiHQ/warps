/**
 * Inline localization for MCP apps.
 *
 * Translations live next to usage as `{ en, de, ... }` objects — same shape
 * as `WarpI18nText` in warp.json. The `t()` helper picks the right value for
 * the active locale, falling back to English then to any available value.
 *
 * Usage:
 *   const { t } = useAppContext()
 *   <h1>{t({ en: 'Save', de: 'Speichern' })}</h1>
 */

export type LocalizedText = string | { [locale: string]: string }

export type Translator = (text: LocalizedText) => string

const FALLBACK_LOCALE = 'en'

/**
 * Normalizes a locale string (e.g. "de-DE", "DE", "de_AT") to the lowercased
 * primary subtag ("de"). Translations are keyed by primary subtag.
 */
export function normalizeLocale(locale: string | null | undefined): string {
  if (!locale) return FALLBACK_LOCALE
  return locale.split(/[-_]/)[0]!.toLowerCase()
}

export function pickLocale(text: LocalizedText, locale: string): string {
  if (typeof text === 'string') return text
  const normalized = normalizeLocale(locale)
  if (text[normalized]) return text[normalized]!
  if (text[FALLBACK_LOCALE]) return text[FALLBACK_LOCALE]!
  const first = Object.values(text)[0]
  return typeof first === 'string' ? first : ''
}

export function createTranslator(locale: string): Translator {
  return (text) => pickLocale(text, locale)
}
