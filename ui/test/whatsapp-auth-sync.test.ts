import { describe, expect, it } from 'vitest'
import auth from '../../warps/whatsapp/auth.json'
import sync from '../../warps/whatsapp/sync.json'

describe('WhatsApp personal CLI warps', () => {
  it('marks auth as a session CLI warp', () => {
    expect(auth.cli.mode).toBe('session')
    expect(auth.actions[0].prompt).toBe('/wacli auth')
    expect(auth.actions[0].cli.mode).toBe('session')
  })

  it('builds sync command from webhook inputs', () => {
    expect(sync.cli.mode).toBe('session')
    expect(sync.hook.source).toBe('wacli')
    expect(sync.actions[0].prompt).toContain('{{webhookUrl}}')
    expect(sync.actions[0].prompt).toContain('{{webhookSecret}}')
    expect(sync.actions[0].inputs.map((input) => input.as)).toEqual(['webhookUrl', 'webhookSecret'])
  })
})
