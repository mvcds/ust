const dependencies = {
  fs: require('fs'),
  SampleFile: require('./SampleFile'),
  SampleDirectory: require('./SampleDirectory')
}

module.exports = (name, path, location, injection) => {
  const { SampleFile, fs, SampleDirectory } = Object.assign({}, dependencies, injection)

  const stat = fs.lstatSync(path)

  const type = stat.isFile() ? SampleFile : SampleDirectory

  return type(name, path, location, injection)
}
