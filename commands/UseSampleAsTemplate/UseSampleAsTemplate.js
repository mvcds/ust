const dependencies = {
  DuplicationService: require('../../domain/DuplicationService'),
  SecureDirectoryService: require('../../domain/SecureDirectoryService'),
  Sample: require('../../domain/Sample'),
  path: require('path'),
  process,
  require
}

const CreateFromSample = (injection) => {
  const { DuplicationService } = Object.assign({}, dependencies, injection)

  return (samples) => samples.forEach(({ original, target }) => DuplicationService(original, target, injection))
}

const AsSampleArray = (result) => result.length ? result : [result]

const getSample = (sample, injection) => {
  const { path, process, require } = Object.assign({}, dependencies, injection)

  const pkgPath = path.join(process.env.PWD, 'package.json')

  const pkg = require(pkgPath)

  return pkg.sat[sample]
}

module.exports = (sample, location, name, injection) => {
  const { Sample, SecureDirectoryService } = Object.assign({}, dependencies, injection)

  const data = getSample(sample, injection)

  return Sample(name, data, location, injection)
    .then(AsSampleArray)
    .then(samples => SecureDirectoryService(samples, injection))
    .then(CreateFromSample(injection))
}
