import { describe, expect, it } from 'vitest'
import { interpretToolResult } from './useApp'

describe('interpretToolResult', () => {
  it('returns structuredContent when tool succeeds', () => {
    const result = { structuredContent: { MEETING_ID: 'abc123' }, content: [{ type: 'text', text: '{}' }] }
    expect(interpretToolResult('book', result)).toEqual({ MEETING_ID: 'abc123' })
  })

  it('falls back to raw result when structuredContent is missing', () => {
    const result = { content: [{ type: 'text', text: 'hello' }] }
    expect(interpretToolResult('book', result)).toEqual(result)
  })

  it('throws with the API error text when isError is true', () => {
    const result = {
      isError: true,
      content: [{ type: 'text', text: 'Selected appointment slot is no longer available.' }],
    }
    expect(() => interpretToolResult('book', result)).toThrow('Selected appointment slot is no longer available.')
  })

  it('throws with a default message when isError is true but no content', () => {
    expect(() => interpretToolResult('cancel', { isError: true })).toThrow('Tool cancel failed')
  })

  it('passes through primitives unchanged', () => {
    expect(interpretToolResult('ping', 42)).toBe(42)
    expect(interpretToolResult('ping', null)).toBe(null)
    expect(interpretToolResult('ping', undefined)).toBe(undefined)
  })
})
