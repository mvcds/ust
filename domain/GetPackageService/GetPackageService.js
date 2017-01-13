const dependencies = {
  path: require('path'),
  process,
  require
}

module.exports = (injection) => {
  const { path, process, require } = Object.assign({}, dependencies, injection)

  const { PWD, CMDER_START } = process.env

  const pkgPath = path.join(PWD || CMDER_START, 'package.json')

  return require(pkgPath)
}
