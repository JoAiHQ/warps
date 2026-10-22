// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

type CalendarFeedWarp = {
  vars: Record<string, string>
  actions: Array<{
    destination: { url: string; headers: Record<string, string> }
    inputs: Array<{ as: string; default?: unknown; type?: string }>
  }>
}

const feedWarps = ['feed-create', 'feed-list', 'feed-update', 'feed-sync', 'feed-delete'].map((name) =>
  JSON.parse(readFileSync(resolve(__dirname, `${name}.json`), 'utf8')) as CalendarFeedWarp,
)

describe('calendar feed team routing', () => {
  it('selects the target team explicitly for every feed action', () => {
    for (const warp of feedWarps) {
      expect(warp.vars.JOAI_TEAM_SLUG).toBe('env:JOAI_TEAM_SLUG')
      expect(warp.vars.JOAI_AGENT_UUID).toBeUndefined()
      expect(warp.actions[0].destination.url).toContain('INJECT:API_BASE/v1/calendar/feeds')
      expect(warp.actions[0].destination.headers['X-Team']).toBe('{{team}}')
      expect(warp.actions[0].inputs).toContainEqual(expect.objectContaining({ as: 'team', default: '{{JOAI_TEAM_SLUG}}' }))
    }
  })

  it('uses the supported JSON input type for public properties', () => {
    for (const warp of [feedWarps[0], feedWarps[2]]) {
      expect(warp.actions[0].inputs).toContainEqual(expect.objectContaining({ as: 'properties', type: 'json' }))
    }
  })
})
