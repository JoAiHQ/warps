import express from 'express'
import { createServer } from 'vite'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, readdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const args = process.argv.slice(2)
const appName = args.find(arg => !arg.startsWith('-'))

function listApps() {
  const warpsRoot = resolve(__dirname, '../warps')
  const entries = []
  if (!existsSync(warpsRoot)) return entries
  const brands = readdirSync(warpsRoot, { withFileTypes: true })
  for (const brand of brands) {
    if (!brand.isDirectory()) continue
    const brandDir = join(warpsRoot, brand.name)
    const warps = readdirSync(brandDir, { withFileTypes: true })
    for (const warp of warps) {
        if (!warp.isDirectory()) continue
        if (existsSync(join(brandDir, warp.name, 'index.tsx'))) {
            entries.push(`${brand.name}/${warp.name}`)
        }
    }
  }
  return entries
}

async function startServer() {
  if (!appName) {
    console.error('Please specify an app to serve.')
    console.error('Available apps:')
    const apps = listApps()
    apps.forEach(app => console.log(`  - ${app}`))
    console.error('\nUsage: npm run dev <brand>/<warp-name>')
    process.exit(1)
  }

  const app = express()
  const port = 5173

  const warpsRoot = resolve(__dirname, '../warps')
  const appDir = resolve(warpsRoot, appName)

  if (!existsSync(appDir)) {
      console.error(`App directory not found: ${appDir}`)
      process.exit(1)
  }

  console.log(`Starting dev server for ${appName}...`)

  const vite = await createServer({
    configFile: false,
    root: appDir,
    server: { middlewareMode: true },
    appType: 'custom',
    plugins: [
        {
            name: 'html-transform',
            transformIndexHtml(html) {
                // Inject the entry point
                return html.replace(
                    '</body>',
                    `<script type="module" src="/index.tsx"></script></body>`
                )
            }
        }
    ]
  })

  // Create a minimal index.html if it doesn't exist (it won't, usually)
  // But Vite needs one to serve. We can serve a virtual one or rely on the one in memory.
  // Actually, for the dev server to work nicely with our setup where we just have index.tsx,
  // we might need to serve a wrapper HTML.
  
  app.use(vite.middlewares)

  // Serve a default HTML shell for the app
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = `
<!DOCTYPE html>
<html data-theme="auto">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>
      `
      
      // Apply Vite HTML transforms. This injects the Vite HMR client, and
      // also applies the HTML plugin defined above (though we manually injected the script anyway).
      template = await vite.transformIndexHtml(url, template)
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`\n  ➜  Dev server running at: http://localhost:${port}\n`)
  })
}

startServer()
