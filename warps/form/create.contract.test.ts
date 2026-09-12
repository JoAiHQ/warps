// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

type FormCreateWarp = {
  vars: Record<string, string>
  actions: Array<{
    destination: { headers: Record<string, string> }
    inputs: Array<{ as: string; default?: unknown }>
  }>
}

const formCreateWarp = JSON.parse(readFileSync(resolve(__dirname, 'create.json'), 'utf8')) as FormCreateWarp
const inputs = formCreateWarp.actions[0].inputs

describe('@form-create team routing', () => {
  it('routes cross-team form creation with X-Team', () => {
    expect(formCreateWarp.vars.JOAI_TEAM_SLUG).toBe('env:JOAI_TEAM_SLUG')
    expect(formCreateWarp.actions[0].destination.headers['X-Team']).toBe('{{team}}')
    expect(inputs).toContainEqual(expect.objectContaining({ as: 'team', default: '{{JOAI_TEAM_SLUG}}' }))
  })

  it('does not attach the connected agent to a different team', () => {
    expect(formCreateWarp.vars.JOAI_AGENT_UUID).toBeUndefined()
    expect(inputs).not.toContainEqual(expect.objectContaining({ as: 'agent' }))
  })
})
