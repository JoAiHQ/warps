import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { act, waitFor } from '@testing-library/react'

const WARPS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../warps')

type UiApp = { rel: string; entry: string; emptyText: string }

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

/**
 * Discover every warp UI that renders list data via extractList(). These are the
 * UIs that can regress into a phantom "No X found." empty state when the response
 * envelope shape or the warp output mapping drifts (see joai/agent-list).
 */
function discoverListUis(): UiApp[] {
  const apps: UiApp[] = []
  for (const brand of readdirSync(WARPS_DIR)) {
    const brandDir = path.join(WARPS_DIR, brand)
    if (!isDir(brandDir)) continue
    for (const name of readdirSync(brandDir)) {
      const appDir = path.join(brandDir, name)
      if (!isDir(appDir)) continue
      const entry = path.join(appDir, 'index.tsx')
      if (!existsSync(entry)) continue
      const source = readFileSync(entry, 'utf8')
      if (!source.includes('extractList')) continue
      apps.push({
        rel: `${brand}/${name}`,
        entry,
        emptyText: source.match(/emptyText=\{?["']([^"'}]*)["']/)?.[1] ?? '',
      })
    }
  }
  return apps
}

const APPS = discoverListUis()

/**
 * A realistic non-empty executor result. The warp output is the `_DATA`-wrapped
 * HTTP envelope `{ data: { data: [...] } }`. Fixture items carry the common keys
 * the list UIs read (name/title/type/status/description) so every UI renders rows.
 */
const FIXTURE = {
  _DATA: {
    data: {
      data: [
        {
          name: 'Fixture Alpha',
          title: 'Fixture Alpha',
          uuid: 'fixture-alpha',
          type: 'sample',
          status: 'active',
          description: 'sample entry',
        },
        {
          name: 'Fixture Beta',
          title: 'Fixture Beta',
          uuid: 'fixture-beta',
          type: 'sample',
          status: 'active',
          description: 'sample entry',
        },
      ],
    },
  },
}

function mountApp(data: unknown): void {
  ;(window as any).WARP_RESULT = { structuredContent: data }
  ;(window as any).WARP_INPUTS = {}
  ;(window as any).WARP_CONFIG = {}
  document.body.innerHTML = '<div id="root"></div>'
}

describe('list UIs render their data (no phantom empty states)', () => {
  it('discovers at least one list UI to test', () => {
    expect(APPS.length).toBeGreaterThan(0)
  })

  for (const app of APPS) {
    it(`renders items for ${app.rel}`, async () => {
      mountApp(FIXTURE)
      await act(async () => {
        await import(/* @vite-ignore */ app.entry)
      })
      // The shared list components render a heading with the item count. If
      // extraction fails (wrong response shape / output mapping), the UI shows
      // the empty state instead and this wait times out — catching the regression.
      await waitFor(
        () => {
          expect(document.body).toHaveTextContent('(2)')
        },
        { timeout: 10_000 }
      )
      if (app.emptyText) {
        expect(document.body).not.toHaveTextContent(app.emptyText)
      }
    })
  }
})
