const { execSync } = require('child_process')
const http = require('http')

const git = '"C:\\Program Files\\Git\\cmd\\git.exe"'
const cwd = __dirname
const log = []

function run(cmd) {
  log.push(`> git ${cmd}`)
  try {
    const out = execSync(`${git} ${cmd}`, { cwd, encoding: 'utf8', stdio: ['pipe','pipe','pipe'] })
    if (out.trim()) log.push(out.trim())
  } catch (e) {
    const msg = ((e.stdout || '') + (e.stderr || '')).trim() || e.message
    log.push('! ' + msg)
  }
}

run('config user.email "jason10033@github.com"')
run('config user.name "Jason"')
run('add -A')
run('commit -m "Change Extremely infectious to Highly infectious on Summary page"')
const fs = require('fs')
const token = fs.readFileSync(require('path').join(__dirname, '.github-token'), 'utf8').trim()
run(`remote set-url origin https://${token}@github.com/jason10033/hiv-interpretation.git`)
run('push origin main')
log.push('\n--- Done. Check https://hiv-interpretation.netlify.app ---')
log.forEach(l => console.log(l))

// Keep alive so preview_logs can capture output
http.createServer((req, res) => res.end(log.join('\n'))).listen(9999)
