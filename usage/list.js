const ListPackageSamples = require('../commands/ListPackageSamples')

module.exports = (program) => {
  program
    .command('list')
    .alias('ls')
    .description(`List all project's samples`)
    .action(ListPackageSamples)
}
