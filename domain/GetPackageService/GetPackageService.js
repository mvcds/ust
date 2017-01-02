const dependencies = {
  path: require('path'),
  process,
  require

}
module.exports = (injection) => {
  const { path, process, require } = Object.assign({}, dependencies, injection)

  const pkgPath = path.join(process.env.PWD, 'package.json')

  return require(pkgPath)
}
