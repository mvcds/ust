const package = require('./package.json')
const program = require('commander')
const colors = require('colors')

require('./usage')(program)

program.version(package.version)
  .usage('<command>')
  .on('*', () => {
    const help = `Cannot run '${colors.red('sat', program.args[0])}' try '${colors.green('sat --help')}' to get the following help`

    console.log(help)
    program.help()
  })
  .parse(process.argv)
