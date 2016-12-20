const dependencies = {
  SampleFile: require('./SampleFile')
}

module.exports = (name, path, location, injection) => {
  const { SampleFile } = Object.assign({}, dependencies, injection)

  return SampleFile(name, path, location, injection)
}
