const dependencies = {
  require,
  log: console.log,
  colors: require('colors')
}

module.exports = (injection) => {
  const { require, log, colors } = Object.assign({}, dependencies, injection)

  const { sat } = require('../../package.json')

  Object.keys(sat).forEach((key) => {
    log(colors.yellow(key))
  })
}
