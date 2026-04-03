const { execSync } = require('child_process')

const git = '"C:\\Program Files\\Git\\cmd\\git.exe"'
const cwd = __dirname

function run(cmd) {
  console.log(`> git ${cmd}`)
  try {
    const out = execSync(`${git} ${cmd}`, { cwd, encoding: 'utf8', stdio: ['pipe','pipe','pipe'] })
    if (out) console.log(out.trim())
    return true
  } catch (e) {
    const msg = (e.stdout || '') + (e.stderr || '') || e.message
    console.log('Result:', msg.trim())
    return false
  }
}

run('config user.email "jason10033@github.com"')
run('config user.name "Jason"')
run('status')
run('add -A')
run('commit -m "Fix Netlify build config"')
run('push origin main')
