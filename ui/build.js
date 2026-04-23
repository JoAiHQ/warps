import { build } from 'vite'
import react from '@vitejs/plugin-react'
import {
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  readdirSync,
  statSync,
} from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import tailwindcss from '@tailwindcss/vite'
import chokidar from 'chokidar'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const args = process.argv.slice(2);
const appName = args.find(arg => !arg.startsWith('-'));
const watchMode = args.includes('--watch') || args.includes('-w');
const typecheck = !args.includes('--no-typecheck');
let didTypecheck = false

if (watchMode && !appName) {
  console.error('Watch mode requires a specific app.')
  process.exit(1)
}

function wrapEntryPlugin(inputName, entryFile, cssFile) {
  const resolvedId = '\0' + inputName;
  return {
    name: `virtual-entry-wrapper:${entryFile}`,
    resolveId(id) {
      if (id === inputName) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return null
      return `
import ${JSON.stringify(cssFile)};
export * from ${JSON.stringify(entryFile)};
import ${JSON.stringify(entryFile)};
      `.trim()
    },
  }
}

async function typeCheck() {
  if (!typecheck || didTypecheck) {
    return
  }

  try {
    console.log('🔍 Running TypeScript check...')
    const tscPath = resolve(__dirname, '../node_modules/.bin/tsc')
    execSync(`${tscPath} --noEmit`, {
      cwd: resolve(__dirname, '..'), // Run from root where node_modules is
      stdio: 'inherit',
    })
    console.log('✓ TypeScript check passed')
    didTypecheck = true
  } catch (error) {
    console.error('✗ TypeScript check failed')
    if (!watchMode) {
      process.exit(1)
    }
    throw error
  }
}

function getGithubUrl(relativePath) {
    try {
        const remote = execSync('git remote get-url origin', { cwd: resolve(__dirname, '..') }).toString().trim();
        let repo = remote.replace(/\.git$/, '').split(/[:/]/).slice(-2).join('/');
        return `https://raw.githubusercontent.com/${repo}/main/${relativePath}`;
    } catch {
        return `https://raw.githubusercontent.com/joai-com/warps/main/${relativePath}`;
    }
}

function getCommitSha() {
    try {
        return execSync('git rev-parse --short HEAD', { cwd: resolve(__dirname, '..') }).toString().trim();
    } catch {
        return 'local';
    }
}

async function buildApp(targetAppName) {
  try {
    console.log(`Building ${targetAppName}...`)

    await typeCheck()

    const warpsRoot = resolve(__dirname, '../warps')
    const appDir = resolve(warpsRoot, targetAppName)
    const entryPoint = resolve(appDir, 'index.tsx')
    const defaultStylesCssPath = resolve(__dirname, 'styles.css')
    const appStylesCssPath = resolve(appDir, 'styles.css')
    const stylesCssPath = existsSync(appStylesCssPath) ? appStylesCssPath : defaultStylesCssPath
    
    const distDir = resolve(appDir, 'dist')
    const sha = getCommitSha()
    const outfile = `chatapp.dist.js`
    const htmlFilename = `chatapp.${sha}.dist.html`
    const virtualIdInput = `virtual-entry:${targetAppName.replace(/\//g, '_')}`

    await build({
      configFile: false,
      root: appDir,
      logLevel: 'warn', // Quieter
      plugins: [
        wrapEntryPlugin(virtualIdInput, entryPoint, stylesCssPath),
        tailwindcss({ config: resolve(__dirname, '../tailwind.config.js') }), 
        react(),
      ],
      build: {
        outDir: distDir,
        emptyOutDir: false,
        minify: 'esbuild',
        cssMinify: 'esbuild',
        cssCodeSplit: false,
        rollupOptions: {
          input: virtualIdInput,
          output: {
            format: 'es',
            entryFileNames: outfile,
            inlineDynamicImports: true,
            assetFileNames: (info) => {
              if ((info.name || '').endsWith('.css')) {
                return outfile.replace(/\.js$/, '.css')
              }
              return `[name]-[hash][extname]`
            },
          },
        },
      },
    })

    const jsPath = join(distDir, outfile)
    const cssPath = join(distDir, outfile.replace(/\.js$/, '.css'))
    const htmlPath = join(appDir, htmlFilename)

    const KEEP_COUNT = 5
    const existingDistFiles = readdirSync(appDir)
      .filter(f => /^chatapp(\..+)?\.dist\.html$/.test(f))
      .map(f => ({ name: f, mtime: statSync(join(appDir, f)).mtime }))
      .sort((a, b) => b.mtime - a.mtime)

    const toDelete = existingDistFiles
      .filter(f => f.name !== htmlFilename)
      .slice(Math.max(0, KEEP_COUNT - (existingDistFiles.some(f => f.name === htmlFilename) ? 1 : 0)))

    for (const file of toDelete) {
      unlinkSync(join(appDir, file.name))
      console.log(`  Removed old artifact: ${file.name}`)
    }

    const jsContent = readFileSync(jsPath, 'utf-8')
    let cssContent = ''

    if (existsSync(cssPath)) {
      cssContent = readFileSync(cssPath, 'utf-8')
      unlinkSync(cssPath)
    }

    unlinkSync(jsPath)
    
    const html = `<!DOCTYPE html>
<html data-theme="auto">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<style>${cssContent}</style>
</head>
<body>
<div id="root"></div>
<script type="module">
if (window.openai?.theme) {
  document.documentElement.setAttribute('data-theme', window.openai.theme);
}
${jsContent}
</script>
</body>
</html>`

    writeFileSync(htmlPath, html.trim())
    console.log(`✓ Built ${targetAppName} → ${htmlFilename}`)

    const relativePath = `warps/${targetAppName}/${htmlFilename}`;
    const url = getGithubUrl(relativePath);
    
    const warpJsonPath = join(appDir, 'warp.json');
    if (existsSync(warpJsonPath)) {
        const content = JSON.parse(readFileSync(warpJsonPath, 'utf-8'));
        const oldUi = content.ui;
        content.ui = url;
        writeFileSync(warpJsonPath, JSON.stringify(content, null, 2));
        console.log(`✓ Updated warp.json ui field: ${oldUi} -> ${url}`);
    } else {
        console.warn(`⚠️ warp.json not found at ${warpJsonPath}`);
    }

  } catch (error) {
    console.error(`✗ Build failed for ${targetAppName}:`, error)
    if (!watchMode) {
      process.exit(1)
    }
  }
}

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

async function watchApp() {
  console.log(`\n👀 Watching for changes in ${appName}...`)
  
  const warpsRoot = resolve(__dirname, '../warps')
  const appDir = resolve(warpsRoot, appName) 
  const libDir = join(__dirname, 'lib')

  const watchPaths = [
    join(appDir, '**/*.{tsx,ts,jsx,js,css}'),
    join(libDir, '**/*.{tsx,ts,jsx,js}'),
  ]

  if (appName.includes('/')) {
    const brandFolder = appName.split('/')[0]
    const brandDir = join(warpsRoot, brandFolder)
    watchPaths.push(join(brandDir, '*.{ts,tsx}'))
  }

  const watcher = chokidar.watch(watchPaths, {
    ignored: /node_modules/,
    persistent: true,
  })

  let buildTimeout = null

  watcher.on('change', (path) => {
    console.log(`\n📝 File changed: ${path}`)
    if (buildTimeout) clearTimeout(buildTimeout)
    buildTimeout = setTimeout(async () => {
      console.log(`\n🔄 Rebuilding ${appName}...`)
      await buildApp(appName)
    }, 100)
  })

  watcher.on('ready', () => {
    console.log('✓ Watch mode active')
  })

  await buildApp(appName)
}

async function main() {
  if (watchMode) {
    await watchApp()
    return
  }

  if (!appName) {
    const apps = listApps()
    console.log(`Building ${apps.length} apps...`)
    for (const targetAppName of apps) {
      await buildApp(targetAppName)
    }
    return
  }
  await buildApp(appName)
}

main()
