// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { isDraftFile, isPrivateFile, getAliasFromFileName } from './build-catalog.js'

describe('isPrivateFile', () => {
  it('returns true for #-prefixed filenames', () => {
    expect(isPrivateFile('boogas/#game-guess-number-start.json')).toBe(true)
    expect(isPrivateFile('boogas/#check-guess.json')).toBe(true)
  })

  it('returns false for normal filenames', () => {
    expect(isPrivateFile('boogas/game-guess-number-start.json')).toBe(false)
    expect(isPrivateFile('joai/warp.json')).toBe(false)
  })

  it('returns false for @-prefixed (draft) filenames', () => {
    expect(isPrivateFile('boogas/@draft-warp.json')).toBe(false)
  })
})

describe('isDraftFile', () => {
  it('returns true for @-prefixed filenames', () => {
    expect(isDraftFile('boogas/@draft-warp.json')).toBe(true)
  })

  it('returns false for normal and #-prefixed filenames', () => {
    expect(isDraftFile('boogas/warp.json')).toBe(false)
    expect(isDraftFile('boogas/#private-warp.json')).toBe(false)
  })
})

describe('getAliasFromFileName', () => {
  it('generates alias from normal file', () => {
    expect(getAliasFromFileName('boogas/game-guess-number-start.json')).toBe('boogas-game-guess-number-start')
  })

  it('strips # prefix from private files', () => {
    expect(getAliasFromFileName('boogas/#game-guess-number-start.json')).toBe('boogas-game-guess-number-start')
    expect(getAliasFromFileName('boogas/#game-guess-number-check.json')).toBe('boogas-game-guess-number-check')
    expect(getAliasFromFileName('boogas/#game-guess-number-stop.json')).toBe('boogas-game-guess-number-stop')
  })

  it('strips @ prefix from draft files', () => {
    // -warp suffix is also stripped by the alias normalizer
    expect(getAliasFromFileName('boogas/@draft-warp.json')).toBe('boogas-draft')
  })

  it('uses brand name as alias when filename is "warp"', () => {
    expect(getAliasFromFileName('joai/warp.json')).toBe('joai')
  })

  it('throws when file is not inside a brand folder', () => {
    expect(() => getAliasFromFileName('warp.json')).toThrow()
  })
})

describe('sync-to-api: listed filtering', () => {
  it('filters out listed:false entries from upserts', () => {
    const upserts = [
      { alias: 'boogas-public-warp', listed: true },
      { alias: 'boogas-game-guess-number-start', listed: false },
      { alias: 'joai-item-create', listed: true },
      { alias: 'boogas-game-guess-number-check', listed: false },
    ]

    const filtered = upserts.filter((u) => u.listed !== false)

    expect(filtered).toHaveLength(2)
    expect(filtered.map((u) => u.alias)).toEqual(['boogas-public-warp', 'joai-item-create'])
  })

  it('passes through all entries when none are unlisted', () => {
    const upserts = [
      { alias: 'joai-item-create', listed: true },
      { alias: 'joai-memory-create', listed: true },
    ]

    const filtered = upserts.filter((u) => u.listed !== false)
    expect(filtered).toHaveLength(2)
  })
})
