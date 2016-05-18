const readFileSync = require('fs').readFileSync
const execSync = require('child_process').execSync

const exec = (command) =>
  execSync(command, { stdio: 'inherit' })

// 1) Make sure linter is happy
exec('npm run linter')

// 2) Transpile to common-js
exec('npm run build-cjs')
