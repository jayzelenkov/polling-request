const readFileSync = require('fs').readFileSync
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

const exec = (command) =>
  execSync(command, { stdio: 'inherit' })

// 1) Make sure linter is happy
exec('npm run linter')

// 2) Transpile to common-js
exec('npm run build-cjs')

/*eslint no-console: [{ "allow": ["log"] }] */
console.log(
  '\ngzipped, the build is ' + prettyBytes(
    gzipSize.sync([
      readFileSync('dist/polling-request.js')
    ].join(''))
  )
)
