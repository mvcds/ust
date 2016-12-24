const dependencies = {
  path: require('path'),
}

module.exports = (fileName, original, folder, injection) => {
  const { path } = Object.assign({}, dependencies, injection)

  return Promise.resolve({
    original,
    target: path.join(folder, fileName)
  })
}
