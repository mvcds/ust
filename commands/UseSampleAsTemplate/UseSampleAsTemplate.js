const dependencies = {
  DuplicationService: require('../../domain/DuplicationService'),
  pkg: require('../../package.json'),
  Sample: require('../../domain/Sample')
}

module.exports = (sample, location, name, injection) => {
  const { pkg, Sample, DuplicationService } = Object.assign({}, dependencies, injection)

  const data = pkg.sat[sample]

  const parsed = Sample(name, data, location, injection)

  return DuplicationService(parsed.original, parsed.target, injection)
}
