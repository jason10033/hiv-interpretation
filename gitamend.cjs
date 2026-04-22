const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const http = require('http')

const git = '"C:\\Program Files\\Git\\cmd\\git.exe"'
const cwd = __dirname
const log = []

function run(cmd) {
  log.push(`> git ${cmd.replace(/ghp_[A-Za-z0-9]+/, 'TOKEN')}`)
  try {
    const out = execSync(`${git} ${cmd}`, { cwd, encoding: 'utf8', stdio: ['pipe','pipe','pipe'] })
    if (out.trim()) log.push(out.trim())
  } catch (e) {
    const msg = ((e.stdout || '') + (e.stderr || '')).trim() || e.message
    log.push('! ' + msg)
  }
}

const token = fs.readFileSync(path.join(__dirname, '.github-token'), 'utf8').trim()

// Stage the clean gitpush.cjs (no token) and amended .gitignore
run('add gitpush.cjs .gitignore')
// Amend the previous commit to remove the token from gitpush.cjs
run('commit --amend --no-edit')
// Set remote with token and push (force needed since we amended)
run(`remote set-url origin https://${token}@github.com/jason10033/hiv-interpretation.git`)
run('push origin main --force')

log.push('\n--- Done. Check https://hiv-interpretation.netlify.app ---')
log.forEach(l => console.log(l))
http.createServer((req, res) => res.end(log.join('\n'))).listen(9998)
