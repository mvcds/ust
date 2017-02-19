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

const ReadFiles = (samplePath, resultPath, injection) => {
  return (files) => {
    const samples = files.map(CreateSample(samplePath, resultPath, injection))

    return Promise.all(samples)
  }
}

const CreateSample = (samplePath, resultPath, injection) => {
  const recursiveDependency = {
    Sample: require('./Sample')
  }
  const { path, Sample } = Object.assign({}, dependencies, recursiveDependency, injection)

  return (file) => {
    const { name, ext } = path.parse(file)
    const fileName = name + ext

    const originalPath = path.join(samplePath, fileName)
    const withTarget = Object.assign({}, injection, { location: resultPath })

    const sample = Sample(fileName, originalPath, withTarget)

    return Promise.resolve(sample)
  }
}

module.exports = (resultFolderName, samplePath, resultFileFolder, injection) => {
  const { path } = Object.assign({}, dependencies, injection)

  const resultPath = path.join(resultFileFolder, resultFolderName)

  return ReadDirectory(samplePath, injection)
    .then(ReadFiles(samplePath, resultPath, injection))
}
