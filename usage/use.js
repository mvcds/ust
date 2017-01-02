const UseSampleAsTemplate = require('../commands/UseSampleAsTemplate')

module.exports = (program) => {
  program
    .command('use <sample> <name>')
    .alias('u')
    .option('-l, --location <location>', 'where to place the files')
    .description('Uses the sample as a template on location')
    .action(UseSampleAsTemplate)
}
