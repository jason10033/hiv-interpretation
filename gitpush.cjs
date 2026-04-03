const { execSync } = require('child_process')

const git = '"C:\\Program Files\\Git\\cmd\\git.exe"'
const cwd = __dirname

function run(cmd, ignoreError = false) {
  console.log(`> git ${cmd}`)
  try {
    const out = execSync(`${git} ${cmd}`, { cwd, encoding: 'utf8' })
    if (out) console.log(out.trim())
  } catch (e) {
    const msg = (e.stderr || e.message || '').trim()
    if (ignoreError) {
      console.log('(skipped:', msg, ')')
    } else {
      console.error('Error:', msg)
      process.exit(1)
    }
  }
}

run('add .')
run('commit -m "Fix Netlify build config"', true) // ignore if nothing to commit
run('push')
console.log('\nDone! Check https://hiv-interpretation.netlify.app in ~1 minute.')
