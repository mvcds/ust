const dependencies = {
  DuplicationService: require('../../domain/DuplicationService'),
  SecureDirectoryService: require('../../domain/SecureDirectoryService'),
  Sample: require('../../domain/Sample'),
  GetPackageService: require('../../domain/GetPackageService')
}

const CreateFromSample = (injection) => {
  const { DuplicationService } = Object.assign({}, dependencies, injection)

  return (samples) => samples.forEach(({ original, target }) => DuplicationService(original, target, injection))
}

const AsSampleArray = (result) => result.length ? result : [result]

module.exports = (sample, name, injection) => {
  const { Sample, SecureDirectoryService, GetPackageService } = Object.assign({}, dependencies, injection)

  const path = GetPackageService(injection).ust[sample]

  return Sample(name, path, injection)
    .then(AsSampleArray)
    .then(samples => SecureDirectoryService(samples, injection))
    .then(CreateFromSample(injection))
}
