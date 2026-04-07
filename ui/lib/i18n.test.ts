import { describe, expect, it } from 'vitest'
import { createTranslator, normalizeLocale, pickLocale } from './i18n'

describe('normalizeLocale', () => {
  it('returns the lowercased primary subtag', () => {
    expect(normalizeLocale('en')).toBe('en')
    expect(normalizeLocale('EN')).toBe('en')
    expect(normalizeLocale('en-US')).toBe('en')
    expect(normalizeLocale('en_GB')).toBe('en')
    expect(normalizeLocale('DE-AT')).toBe('de')
    expect(normalizeLocale('zh-Hant-HK')).toBe('zh')
  })

  it('falls back to en for empty or null input', () => {
    expect(normalizeLocale(null)).toBe('en')
    expect(normalizeLocale(undefined)).toBe('en')
    expect(normalizeLocale('')).toBe('en')
  })
})

describe('pickLocale', () => {
  const text = { en: 'Save', de: 'Speichern', fr: 'Enregistrer' }

  it('picks the value for the active locale', () => {
    expect(pickLocale(text, 'en')).toBe('Save')
    expect(pickLocale(text, 'de')).toBe('Speichern')
    expect(pickLocale(text, 'fr')).toBe('Enregistrer')
  })

  it('normalizes regional variants to the primary subtag', () => {
    expect(pickLocale(text, 'de-AT')).toBe('Speichern')
    expect(pickLocale(text, 'en-GB')).toBe('Save')
    expect(pickLocale(text, 'fr_CA')).toBe('Enregistrer')
  })

  it('falls back to English when the locale is missing', () => {
    expect(pickLocale(text, 'es')).toBe('Save')
    expect(pickLocale(text, 'ja')).toBe('Save')
  })

  it('falls back to the first available value when English is missing', () => {
    const onlyDe = { de: 'Nur Deutsch' }
    expect(pickLocale(onlyDe, 'fr')).toBe('Nur Deutsch')
  })

  it('returns plain strings unchanged', () => {
    expect(pickLocale('Already a string', 'de')).toBe('Already a string')
    expect(pickLocale('', 'en')).toBe('')
  })

  it('returns an empty string when the dictionary is empty', () => {
    expect(pickLocale({}, 'en')).toBe('')
  })
})

describe('createTranslator', () => {
  it('binds a translator to a locale', () => {
    const t = createTranslator('de')
    expect(t({ en: 'Save', de: 'Speichern' })).toBe('Speichern')
    expect(t({ en: 'Cancel', de: 'Abbrechen' })).toBe('Abbrechen')
  })

  it('respects regional variants by normalizing', () => {
    const t = createTranslator('en-US')
    expect(t({ en: 'Color', de: 'Farbe' })).toBe('Color')
  })

  it('falls back to English when the locale is unsupported', () => {
    const t = createTranslator('ja')
    expect(t({ en: 'Save', de: 'Speichern' })).toBe('Save')
  })

  it('handles plain strings without translation', () => {
    const t = createTranslator('de')
    expect(t('Plain text')).toBe('Plain text')
  })
})
