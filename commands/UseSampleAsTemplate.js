const dependencies = {
  fs: require('fs'),
  pkg: require('../package.json'),
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

const CreateFile = (location, name, injection) => {
  const { fs, path } = Object.assign({}, dependencies, injection)
  const pathToWrite = path.join(location, name)

  return (data) => fs.writeFile(pathToWrite, data, 'utf8')
}

module.exports = (sample, location, name, injection) => {
  const { pkg } = Object.assign({}, dependencies, injection)

  return Promise.resolve(pkg.sat[sample])
    .then(ReadFile(injection))
    .then(CreateFile(location, name, injection))
}
