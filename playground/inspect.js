import fs from 'fs'
import path from 'path'

const filePath = process.argv[2]

if (!filePath) {
  console.error('Usage: node playground/inspect.js <warp-json-path>')
  process.exit(1)
}

const resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)

if (!fs.existsSync(resolvedPath)) {
  console.error(`File not found: ${resolvedPath}`)
  process.exit(1)
}

const raw = fs.readFileSync(resolvedPath, 'utf8')
const warp = JSON.parse(raw)

const summary = {
  name: warp.name,
  title: warp.title,
  description: warp.description,
  protocol: warp.protocol,
  actions: Array.isArray(warp.actions) ? warp.actions.length : 0,
  vars: warp.vars ? Object.keys(warp.vars) : [],
}

console.log(JSON.stringify(summary, null, 2))
