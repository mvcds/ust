const dependencies = {
  GetPackageService: require('../../domain/GetPackageService'),
  log: console.log,
  colors: require('colors')
}

module.exports = (injection) => {
  const { GetPackageService, log, colors } = Object.assign({}, dependencies, injection)

  const { sat } = GetPackageService(injection)

  Object.keys(sat).forEach((key) => {
    log(colors.yellow(key))
  })
}
