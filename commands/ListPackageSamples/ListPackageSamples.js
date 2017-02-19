const dependencies = {
  require,
  log: console.log,
  colors: require('colors')
}

module.exports = (injection) => {
  const { require, log, colors } = Object.assign({}, dependencies, injection)

  const { ust } = require('../../package.json')

  Object.keys(ust).forEach((key) => {
    log(colors.yellow(key))
  })
}
