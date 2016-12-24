const dependencies = {
  DuplicationService: require('../../domain/DuplicationService'),
  SecureDirectoryService: require('../../domain/SecureDirectoryService'),
  pkg: require('../../package.json'),
  Sample: require('../../domain/Sample')
}

const CreateFromSample = (injection) => {
  const { DuplicationService } = Object.assign({}, dependencies, injection)

  return (samples) => samples.forEach(({ original, target }) => DuplicationService(original, target, injection))
}

const AsSampleArray = (result) => result.length ? result : [result]

module.exports = (sample, location, name, injection) => {
  const { pkg, Sample, SecureDirectoryService } = Object.assign({}, dependencies, injection)

  const data = pkg.sat[sample]

  return Sample(name, data, location, injection)
    .then(AsSampleArray)
    .then(samples => SecureDirectoryService(samples, injection))
    .then(CreateFromSample(injection))
}
