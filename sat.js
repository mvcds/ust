const package = require('./package.json')
const program = require('commander')

require('./usage')(program)

program.version(package.version)
  .usage('<command>')
  .parse(process.argv)
