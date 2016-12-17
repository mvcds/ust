const UseSampleAsTemplate = require('./UseSampleAsTemplate')

const program = require('commander')
  .parse(process.argv)

UseSampleAsTemplate({
  sample: program.args[0],
  location: program.args[1],
  name: program.args[2]
})
