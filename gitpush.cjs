const { execSync } = require('child_process')

const git = '"C:\\Program Files\\Git\\cmd\\git.exe"'
const cwd = __dirname

function run(cmd) {
  console.log(`> ${cmd}`)
  try {
    const out = execSync(`${git} ${cmd}`, { cwd, encoding: 'utf8' })
    if (out) console.log(out)
  } catch (e) {
    console.error(e.stderr || e.message)
    process.exit(1)
  }
}

run('add .')
run('commit -m "Fix Netlify build config"')
run('push')
console.log('Done! Netlify will redeploy in ~1 minute.')
