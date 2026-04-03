const { execSync, spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

const root = __dirname

if (!fs.existsSync(path.join(root, 'node_modules'))) {
  console.log('Installing dependencies...')
  execSync('npm install', { cwd: root, stdio: 'inherit' })
}

const vite = spawn('node', [path.join(root, 'node_modules', '.bin', 'vite')], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env },
})

vite.on('exit', code => process.exit(code))
