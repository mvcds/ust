const package = require('./package.json')
const program = require('commander')

program.version(package.version)
  .command('use [sample] [location] [name]', 'Uses the sample as a template on location')
  .parse(process.argv)
