const dependencies = {
  fs: require('fs'),
  location: __filename,
  require,
  path: require('path')
}

//TODO: use only one Regex
const isValidFile = (base) => (file) => base !== file && /\.js$/i.test(file) && !/\.test.js$/i.test(file)

const addUsage = (program, target, injection) => {
  const { require, path } = Object.assign({}, dependencies, injection)

  return (file) => {
    const name = file.substr(0, file.lastIndexOf('.'));
    const full = path.join(target, file)

    require(full)(program)
  }
}

module.exports = (program, injection) => {
  const { fs, location, path } = Object.assign({}, dependencies, injection)

  const target = path.dirname(location)
  const base = path.basename(location)

  fs.readdirSync(target)
    .filter(isValidFile(base))
    .forEach(addUsage(program, target, injection), {})
}
