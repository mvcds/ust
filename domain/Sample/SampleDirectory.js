const dependencies = {
  path: require('path'),
  fs: require('fs')
}

const ReadDirectory = (samplePath, injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return new Promise((resolve) => {
    fs.readdir(samplePath, 'utf8', (e, files) => resolve(files))
  })
}

const ReadFiles = (samplePath, resultFileFolder, resultFolderName, injection) => (files) => {
  const samples = files.map(CreateSample(samplePath, resultFileFolder, resultFolderName, injection))

  return Promise.all(samples)
}

const CreateSample = (samplePath, resultFileFolder, resultFolderName, injection) => {
  const recursiveDependency = {
    Sample: require('./Sample')
  }
  const { path, Sample } = Object.assign({}, dependencies, recursiveDependency, injection)
  const location = path.join(resultFileFolder, resultFolderName)

  const { base } = path.parse(samplePath)

  return (file) => {
    const { name, ext } = path.parse(file)
    const sampleName = name + ext
    const resultName = GetResultName(base, sampleName, resultFolderName)

    const originalPath = path.join(samplePath, sampleName)
    const withTarget = Object.assign({}, injection, { location })

    const sample = Sample(resultName, originalPath, withTarget)

    return Promise.resolve(sample)
  }
}

const GetResultName = (base, sampleName, resultFileFolder) => {
  const parts = sampleName.split('.')

  if (parts[0] !== base) return sampleName

  parts[0] = resultFileFolder
  return parts.join('.')
}

module.exports = (resultFolderName, samplePath, resultFileFolder, injection) => {
  const { path } = Object.assign({}, dependencies, injection)

  return ReadDirectory(samplePath, injection)
    .then(ReadFiles(samplePath, resultFileFolder, resultFolderName, injection))
}
