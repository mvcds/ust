const dependencies = {
  path: require('path'),
}

module.exports = (resultFileName, samplePath, resultFileFolder, injection) => {
  const { path } = Object.assign({}, dependencies, injection)

  return Promise.resolve({
    original: samplePath,
    target: path.join(resultFileFolder, resultFileName)
  })
}
