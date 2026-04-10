/**
 * generate-screenshots.mjs
 * Generates warp screenshots from examples.json files co-located with each warp.
 *
 * Usage:
 *   node scripts/generate-screenshots.mjs <slug>           # single brand
 *   node scripts/generate-screenshots.mjs --all            # all brands
 *   node scripts/generate-screenshots.mjs --delta <file>   # only changed brands (reads delta JSON)
 *
 * Output: warps/<slug>/images/{warp}.png, {warp}-dark.png, etc.
 *
 * Brand info is read from catalog/mainnet/distribution.json.
 * Warp examples are read from warps/<slug>/<warp>.examples.json or warps/<slug>/<warp>/examples.json.
 */

import puppeteer from 'puppeteer'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'fs'
import { resolve, dirname, basename, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ─── Args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const allFlag = args.includes('--all')
const deltaIdx = args.indexOf('--delta')
const deltaFile = deltaIdx !== -1 ? args[deltaIdx + 1] : null
const slug = args.find((a) => !a.startsWith('--') && (deltaIdx === -1 || args.indexOf(a) !== deltaIdx + 1))

if (!slug && !allFlag && !deltaFile) {
  console.error('Usage: node scripts/generate-screenshots.mjs <slug> | --all | --delta <file>')
  process.exit(1)
}

// ─── Load brand info from catalog ──────────────────────────────────────────

function loadCatalog() {
  const catalogPath = resolve(ROOT, 'catalog/mainnet/distribution.json')
  if (!existsSync(catalogPath)) return []
  const data = JSON.parse(readFileSync(catalogPath, 'utf8'))
  return data.apps || []
}

function getBrandInfo(catalogApps, brandSlug) {
  const app = catalogApps.find((a) => a.slug === brandSlug || a.slug === brandSlug + 's' || a.slug === brandSlug.replace(/s$/, ''))
  if (!app) return null
  return {
    name: app.name,
    tagline: app.description?.en?.slice(0, 60) || '',
    logo: app.logo?.default || '',
    color: app.colors?.primary || '#6366f1',
    footer: app.name,
  }
}

// ─── Discover examples.json files for a brand ──────────────────────────────

function discoverExamples(brandSlug) {
  const brandDir = resolve(ROOT, 'warps', brandSlug)
  if (!existsSync(brandDir)) return []

  const warps = []
  const entries = readdirSync(brandDir)

  for (const entry of entries) {
    const fullPath = join(brandDir, entry)

    // Directory-based warp: warps/{brand}/{warp}/examples.json
    if (statSync(fullPath).isDirectory() && entry !== 'images') {
      const examplesPath = join(fullPath, 'examples.json')
      if (existsSync(examplesPath)) {
        const data = JSON.parse(readFileSync(examplesPath, 'utf8'))
        const distHtml = join(fullPath, 'chatapp.dist.html')
        warps.push({
          slug: entry,
          ...data,
          distHtml: existsSync(distHtml) ? distHtml : null,
        })
      }
    }

    // File-based warp: warps/{brand}/{warp}.examples.json
    if (entry.endsWith('.examples.json')) {
      const warpSlug = entry.replace('.examples.json', '')
      const data = JSON.parse(readFileSync(fullPath, 'utf8'))
      warps.push({
        slug: warpSlug,
        ...data,
        distHtml: null,
      })
    }
  }

  return warps
}

// ─── Resolve which brands to process ───────────────────────────────────────

function resolveBrands() {
  if (slug) return [slug]

  if (allFlag) {
    const warpsDir = resolve(ROOT, 'warps')
    return readdirSync(warpsDir).filter((d) => statSync(join(warpsDir, d)).isDirectory())
  }

  if (deltaFile) {
    const delta = JSON.parse(readFileSync(resolve(ROOT, deltaFile), 'utf8'))
    const brands = new Set()
    for (const entry of delta.added || []) brands.add(entry.split('/')[0])
    for (const entry of delta.changed || []) brands.add(entry.split('/')[0])
    return [...brands]
  }

  return []
}

// ─── HTML templates ────────────────────────────────────────────────────────

function buildRawHtml(brand, warp, dark = false) {
  const accentColor = brand.color === '#22F7DD' ? '#0aa890' : brand.color
  const bg = dark ? '#0d0d0d' : '#f7f7f8'
  const text = dark ? '#f0f0f0' : '#111'
  const sub = dark ? '#999' : '#666'
  const iconBg = dark ? '#1a1a1a' : '#fff'
  const iconBorder = dark ? '#2a2a2a' : '#e5e5e5'

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 706px; height: 500px; background: ${bg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: ${text}; overflow: hidden; display: flex; align-items: center; justify-content: center; }
</style></head><body>
<div style="text-align: center; max-width: 480px; padding: 40px;">
  <div style="width: 64px; height: 64px; background: ${iconBg}; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${iconBorder}; margin-bottom: 24px; overflow: hidden;">
    <img src="${brand.logo}" style="width: 38px; height: 38px; object-fit: contain;" />
  </div>
  <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${accentColor}; margin-bottom: 8px;">${brand.name}</div>
  <div style="font-size: 24px; font-weight: 700; color: ${text}; line-height: 1.3; margin-bottom: 12px;">${warp.name}</div>
  <div style="font-size: 14px; color: ${sub}; line-height: 1.5;">${warp.description}</div>
</div>
</body></html>`
}

function buildPreviewHtml(brand, warp) {
  const { name: brandName, tagline, logo, color, footer } = brand
  const { preview } = warp
  const accentColor = color === '#22F7DD' ? '#0aa890' : color

  const cardHtml = (preview.cards || []).map((card) => `
    <div style="background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px 20px; flex: 1; min-width: 0;">
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: ${accentColor}; margin-bottom: 12px;">${card.label}</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${card.rows.map((row) => `
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px;">
            <span style="font-size: 13px; color: #888; white-space: nowrap;">${row.key}</span>
            <span style="font-size: 13px; color: #111; font-weight: 500; text-align: right;">${row.value}</span>
          </div>`).join('')}
      </div>
    </div>`).join('')

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 706px; height: 500px; background: #f7f7f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; overflow: hidden; }
</style></head><body>
<div style="padding: 32px; height: 100%; display: flex; flex-direction: column; gap: 24px;">
  <div style="display: flex; align-items: center; gap: 14px;">
    <div style="width: 44px; height: 44px; background: #f0f0f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid #e0e0e0; overflow: hidden;">
      <img src="${logo}" style="width: 28px; height: 28px; object-fit: contain;" />
    </div>
    <div>
      <div style="font-size: 17px; font-weight: 600; color: #111;">${brandName}</div>
      <div style="font-size: 13px; color: #888; margin-top: 1px;">${tagline}</div>
    </div>
    <div style="margin-left: auto;">
      <div style="font-size: 11px; font-weight: 600; color: ${color}; background: ${color}18; border: 1px solid ${color}40; border-radius: 6px; padding: 4px 10px; letter-spacing: 0.04em; text-transform: uppercase;">${warp.name}</div>
    </div>
  </div>
  <div style="display: inline-flex; align-items: center; gap: 8px; background: #efefef; border: 1px solid #e0e0e0; border-radius: 100px; padding: 8px 16px; align-self: flex-start;">
    <div style="width: 6px; height: 6px; background: ${accentColor}; border-radius: 50%; flex-shrink: 0;"></div>
    <span style="font-size: 14px; color: #444;">${preview.query}</span>
  </div>
  <div style="display: flex; gap: 16px; flex: 1;">${cardHtml}</div>
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <div style="font-size: 11px; color: #aaa;">Powered by JoAi · joai.ai</div>
    <div style="display: flex; gap: 6px; align-items: center;">
      <div style="width: 6px; height: 6px; border-radius: 50%; background: ${accentColor};"></div>
      <div style="font-size: 11px; color: #aaa;">${footer || brandName}</div>
    </div>
  </div>
</div>
</body></html>`
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const catalogApps = loadCatalog()
  const brands = resolveBrands()

  if (brands.length === 0) {
    console.log('No brands to process.')
    return
  }

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 706, height: 500, deviceScaleFactor: 1 })

  let totalGenerated = 0

  for (const brandSlug of brands) {
    const brand = getBrandInfo(catalogApps, brandSlug)
    if (!brand) {
      console.warn(`  ⚠ ${brandSlug}: not in catalog, skipping`)
      continue
    }

    const warps = discoverExamples(brandSlug)
    if (warps.length === 0) continue

    const outDir = resolve(ROOT, 'warps', brandSlug, 'images')
    mkdirSync(outDir, { recursive: true })

    console.log(`${brand.name} (${warps.length} warps with examples)`)

    async function screenshotStatic(html, filename) {
      await page.setContent(html, { waitUntil: 'domcontentloaded' })
      await new Promise((r) => setTimeout(r, 1500))
      await page.evaluate(() =>
        Promise.all(Array.from(document.images).map((img) =>
          img.complete ? Promise.resolve() : new Promise((r) => img.addEventListener('load', r))
        ))
      )
      await page.screenshot({ path: resolve(outDir, filename), type: 'png' })
      console.log(`  ✓ ${filename}`)
      totalGenerated++
    }

    async function screenshotWarpUi(distHtml, mockData, filename, warp, dark = false) {
      const accentColor = brand.color === '#22F7DD' ? '#0aa890' : brand.color
      const theme = dark ? 'dark' : 'light'
      const bg = dark ? '#0d0d0d' : '#f7f7f8'
      const headerBg = dark ? '#111' : '#fff'
      const headerBorder = dark ? '#2a2a2a' : '#e5e5e5'
      const titleColor = dark ? '#f0f0f0' : '#111'
      const descColor = dark ? '#777' : '#888'
      const iconBg = dark ? '#1a1a1a' : '#f0f0f0'
      const iconBorder = dark ? '#2a2a2a' : '#e0e0e0'

      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme }])
      await page.evaluateOnNewDocument((data) => {
        window.WARP_RESULT = data
        window.WARP_INPUTS = {}
        window.WARP_CONFIG = {}
      }, mockData)
      await page.goto(`file://${distHtml}`, { waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {})
      await page.evaluate((ctx) => {
        document.documentElement.setAttribute('data-theme', ctx.theme)
        document.documentElement.style.colorScheme = ctx.theme
        const existing = document.body.innerHTML
        document.body.style.cssText = `margin:0;padding:0;background:${ctx.bg};overflow:hidden;`
        document.body.innerHTML = `
          <div style="height:500px;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <div style="padding:20px 24px 16px;border-bottom:1px solid ${ctx.headerBorder};background:${ctx.headerBg};flex-shrink:0;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:36px;height:36px;background:${ctx.iconBg};border-radius:8px;display:flex;align-items:center;justify-content:center;border:1px solid ${ctx.iconBorder};overflow:hidden;">
                  <img src="${ctx.logo}" style="width:22px;height:22px;object-fit:contain;" />
                </div>
                <div>
                  <div style="font-size:15px;font-weight:600;color:${ctx.titleColor};">${ctx.warpName}</div>
                  <div style="font-size:12px;color:${ctx.descColor};margin-top:1px;">${ctx.warpDesc}</div>
                </div>
                <div style="margin-left:auto;font-size:10px;font-weight:600;color:${ctx.accent};background:${ctx.accent}18;border:1px solid ${ctx.accent}40;border-radius:5px;padding:3px 8px;text-transform:uppercase;letter-spacing:0.04em;">${ctx.brandName}</div>
              </div>
            </div>
            <div style="flex:1;overflow:hidden;">${existing}</div>
          </div>`
      }, { theme, bg, headerBg, headerBorder, titleColor, descColor, iconBg, iconBorder, brandName: brand.name, warpName: warp.name, warpDesc: warp.description, logo: brand.logo, accent: accentColor })
      await new Promise((r) => setTimeout(r, 2000))
      await page.screenshot({ path: resolve(outDir, filename), type: 'png' })
      console.log(`  ✓ ${filename}`)
      totalGenerated++
    }

    for (const warp of warps) {
      // 1. Raw title card (light + dark)
      await screenshotStatic(buildRawHtml(brand, warp, false), `${warp.slug}.png`)
      await screenshotStatic(buildRawHtml(brand, warp, true), `${warp.slug}-dark.png`)

      // 2. Rendered UI (if dist HTML exists)
      if (warp.distHtml) {
        await screenshotWarpUi(warp.distHtml, warp.mockData || {}, `${warp.slug}-rendered.png`, warp, false)
        await screenshotWarpUi(warp.distHtml, warp.mockData || {}, `${warp.slug}-rendered-dark.png`, warp, true)
      }

      // 3. Preview (marketing card)
      if (warp.preview) {
        await screenshotStatic(buildPreviewHtml(brand, warp), `${warp.slug}-preview.png`)
      }
    }
  }

  await browser.close()
  console.log(`\nDone! Generated ${totalGenerated} screenshots for ${brands.length} brand(s).`)

  // Open in Finder when running for a single brand
  if (slug) {
    const outDir = resolve(ROOT, 'warps', slug, 'images')
    execSync(`open ${outDir}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
