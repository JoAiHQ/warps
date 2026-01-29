import tailwindcss from '@tailwindcss/vite'
import chokidar from 'chokidar'
import express from 'express'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'
import { generateTypes } from '../scripts/generate-warp-types.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



const args = process.argv.slice(2)
const appNameIndex = args.findIndex(arg => !arg.startsWith('-'))
const appName = appNameIndex !== -1 ? args[appNameIndex] : null
const positionalArgs = appNameIndex !== -1 ? args.slice(appNameIndex + 1) : []

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

// Load .env if it exists
const warpConfig = {
    WARP_ENV: 'devnet' // Default to devnet
}
const envPath = resolve(__dirname, '../.env')
if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=')
        if (key && value) {
            warpConfig[key.trim()] = value.trim()
        }
    })
}

// Set defaults for CHAIN_API based on WARP_ENV
if (!warpConfig.CHAIN_API) {
    switch (warpConfig.WARP_ENV) {
        case 'devnet':
            warpConfig.CHAIN_API = 'https://devnet-api.multiversx.com'
            break
        case 'testnet':
            warpConfig.CHAIN_API = 'https://testnet-api.multiversx.com'
            break
        case 'mainnet':
        default:
            warpConfig.CHAIN_API = 'https://api.multiversx.com'
            break
    }
}

async function startServer() {
  if (!appName) {
    console.error('Please specify an app to serve.')
    console.error('Available apps:')
    const apps = listApps()
    apps.forEach(app => console.log(`  - ${app}`))
    console.error('\nUsage: npm run warp <brand>/<warp-name> [input1] [input2] ...')
    process.exit(1)
  }

  const warpsRoot = resolve(__dirname, '../warps')
  const appDir = resolve(warpsRoot, appName)

  if (!existsSync(appDir)) {
      console.error(`App directory not found: ${appDir}`)
      process.exit(1)
  }

  // Parse warp inputs from positional arguments
  const warpInputs = {}
  const warpJsonPath = join(appDir, 'warp.json')
  if (existsSync(warpJsonPath)) {
      try {
          const warp = JSON.parse(readFileSync(warpJsonPath, 'utf8'))
          const inputNames = []
          warp.actions?.forEach(action => {
              action.inputs?.forEach(input => {
                  if (input.as && !inputNames.includes(input.as)) {
                      inputNames.push(input.as)
                  }
              })
          })

          positionalArgs.forEach((val, i) => {
              if (inputNames[i]) {
                  warpInputs[inputNames[i]] = val
              } else {
                  // If we have more args than defined inputs, use generic keys
                  warpInputs[`INPUT_${i+1}`] = val
              }
          })

          if (Object.keys(warpInputs).length > 0) {
              console.log('Parsed inputs:')
              Object.entries(warpInputs).forEach(([k, v]) => console.log(`  ${k}: ${v}`))
          }
      } catch (e) {
          console.error('Error parsing warp.json for inputs:', e.message)
      }
  }

  console.log(`Environment: ${warpConfig.WARP_ENV}`)

  // Generate types before starting
  console.log('\nGenerating warp types...')
  generateTypes()

  // Watch for changes in warp.json files to regenerate types
  chokidar.watch(join(warpsRoot, '**/warp.json')).on('change', (path) => {
    console.log(`\nChange detected in ${path}, regenerating types...`)
    generateTypes()
  })

  const app = express()
  const port = 5173

  console.log(`Starting dev server for ${appName}...`)

  const vite = await createServer({
    configFile: false,
    root: appDir,
    server: {
        middlewareMode: true,
        host: '0.0.0.0'
    },
    appType: 'custom',
    plugins: [
        tailwindcss(),
        {
            name: 'html-transform',
            transformIndexHtml(html) {
                const entryPath = resolve(__dirname, 'main.tsx')
                // Inject the entry point
                return html.replace(
                    '</body>',
                    `<script type="module" src="/@fs${entryPath}"></script></body>`
                )
            }
        }
    ]
  })

  app.use(vite.middlewares)

  // Serve a default HTML shell for the app
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    console.log(`Request: ${url}`)

    // Execute the warp action to get initial data (Simulated Host Behavior)
    let warpResult = null
    try {
        const warpJsonPath = join(appDir, 'warp.json')
        if (existsSync(warpJsonPath)) {
            const warp = JSON.parse(readFileSync(warpJsonPath, 'utf8'))
            const action = warp.actions?.find(a => a.type === 'collect')

            if (action) {
                let actionUrl = action.destination.url
                // Replace inputs in URL
                Object.entries(warpInputs).forEach(([key, value]) => {
                    actionUrl = actionUrl.replace(new RegExp(`{{${key}}}`, 'g'), value)
                })
                // Replace config in URL
                Object.entries(warpConfig).forEach(([key, value]) => {
                    actionUrl = actionUrl.replace(new RegExp(`{{${key}}}`, 'g'), value)
                })

                console.log(`Fetching data from: ${actionUrl}`)
                const response = await fetch(actionUrl)
                const json = await response.json()

                const results = {}
                // Process output mapping
                if (warp.output) {
                     // First pass: direct assignments
                     Object.entries(warp.output).forEach(([key, value]) => {
                         if (value === 'out') {
                             results[key] = json
                         }
                     })

                     // Second pass: transformations
                     Object.entries(warp.output).forEach(([key, value]) => {
                         if (typeof value === 'string' && value.startsWith('transform:')) {
                             const transformCode = value.substring(10)
                             try {
                                 // Safe eval of simple transform
                                 const fn = eval(transformCode)
                                 results[key] = fn()
                             } catch (e) {
                                 console.error(`Transform error for ${key}:`, e)
                                 results[key] = null
                             }
                         }
                     })
                }
                warpResult = results
            }
        }
    } catch (e) {
        console.error('Error executing warp on server:', e)
    }

    try {
      let template = `
<!DOCTYPE html>
<html data-theme="auto">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName}</title>
  <script>
    window.WARP_INPUTS = ${JSON.stringify(warpInputs)};
    window.WARP_CONFIG = ${JSON.stringify(warpConfig)};
    window.WARP_RESULT = ${JSON.stringify(warpResult)};
  </script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
      `

      // Apply Vite HTML transforms. This injects the Vite HMR client
      template = await vite.transformIndexHtml(url, template)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      console.error(`Error processing request: ${e.message}`)
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const tryPort = (portToTry) => {
    const server = app.listen(portToTry, '0.0.0.0', () => {
      console.log(`\n  ➜  Dev server running at: http://localhost:${portToTry}\n`)
    })

    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${portToTry} is in use, trying ${portToTry + 1}...`)
        tryPort(portToTry + 1)
      } else {
        console.error(`Server error: ${e.message}`)
      }
    })
  }

  tryPort(port)


}

startServer().catch(e => {
    console.error(`Failed to start server: ${e.message}`)
    process.exit(1)
})
