import { describe, expect, it } from 'vitest'
import warp from '../../warps/whatsapp/send-text.json'

describe('WhatsApp send text', () => {
  it('normalizes the current phone input value', () => {
    const modifier = warp.actions[0].inputs[0].modifier!
    const transform = Function(`return ${modifier.replace('transform:', '')}`)() as (
      value: string,
      inputs: Record<string, unknown>
    ) => string

    expect(transform('+436763232900', { PHONE: '+436763232900' })).toBe('436763232900')
  })
})
