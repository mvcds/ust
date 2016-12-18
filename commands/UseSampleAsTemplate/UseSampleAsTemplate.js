const dependencies = {
  fs: require('fs'),
  pkg: require('../../package.json'),
  path: require('path')
}

const ReadFile = (injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return (samplePath) => new Promise((resolve) => {
    fs.readFile(samplePath, 'utf8', (err, data) => {
      resolve(data)
    })
  })
}

const WriteFile = (location, name, injection) => {
  const { fs, path } = Object.assign({}, dependencies, injection)
  const pathToWrite = path.join(location, name)

  return (data) => fs.writeFile(pathToWrite, data, 'utf8')
}

const DuplicateFile = (location, name, injection) => {
  return (data) => ReadFile(injection)(data)
    .then(WriteFile(location, name, injection))
}

module.exports = (sample, location, name, injection) => {
  const { pkg } = Object.assign({}, dependencies, injection)

  return Promise.resolve(pkg.sat[sample])
    .then(DuplicateFile(location, name, injection))
}
