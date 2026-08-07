import { afterEach, describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { resolveTheme, useTheme } from './theme'

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.colorScheme = ''
  delete (window as Window & { openai?: unknown }).openai
})

describe('resolveTheme', () => {
  it('returns explicit light/dark preferences', () => {
    expect(resolveTheme('light')).toBe('light')
    expect(resolveTheme('dark')).toBe('dark')
  })

  it('falls back to the host-injected theme when the preference is unset', () => {
    ;(window as Window & { openai?: { theme?: string } }).openai = { theme: 'dark' }
    expect(resolveTheme(undefined)).toBe('dark')
    expect(resolveTheme('auto')).toBe('dark')
  })

  it('follows the OS color-scheme when nothing concrete is provided', () => {
    // jsdom does not implement matchMedia, so the fallback is light.
    expect(resolveTheme(undefined)).toBe('light')
    expect(resolveTheme('auto')).toBe('light')
  })
})

describe('useTheme', () => {
  it('applies the theme to the document via the OpenAI SDK helper', () => {
    renderHook(() => useTheme('dark'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('applies a resolved theme when the preference is auto', () => {
    renderHook(() => useTheme('auto'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
