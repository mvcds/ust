const dependencies = {
  fs: require('fs'),
  pkg: require('../../package.json'),
  Sample: require('../../domain/Sample')
}

const ReadFile = (injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return (samplePath) => new Promise((resolve) => {
    fs.readFile(samplePath, 'utf8', (err, data) => {
      resolve(data)
    })
  })
}

const WriteFile = (target, injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return (data) => fs.writeFile(target, data, 'utf8')
}

const DuplicateFile = (injection) => {
  return ({ original, target }) => ReadFile(injection)(original)
    .then(WriteFile(target, injection))
}

module.exports = (sample, location, name, injection) => {
  const { pkg, Sample } = Object.assign({}, dependencies, injection)

  const data = pkg.sat[sample]

  const parsed = Sample(name, data, location, injection)

  return Promise.resolve(parsed)
    .then(DuplicateFile(injection))
}
