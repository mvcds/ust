const UseSampleAsTemplate = require('../commands/UseSampleAsTemplate')

module.exports = (program) => {
  program
    .command('use <sample> <location> <name>')
    .alias('u')
    .description('Uses the sample as a template on location')
    .action(UseSampleAsTemplate)
}
