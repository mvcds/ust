const dependencies = {
  path: require('path'),
}

module.exports = (name, data, location, injection) => {
  const { path } = Object.assign({}, dependencies, injection)

  return {
    original: data,
    target: path.join(location, name)
  }
}
