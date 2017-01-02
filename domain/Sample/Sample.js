const dependencies = {
  fs: require('fs'),
  SampleFile: require('./SampleFile'),
  SampleDirectory: require('./SampleDirectory'),
  path: require('path')
}

module.exports = (name, original, injection) => {
  const { fs, path, SampleFile, SampleDirectory, location } = Object.assign({}, dependencies, injection)

  const stat = fs.lstatSync(original)
  const target = location || path.parse(original).dir

  const type = stat.isFile() ? SampleFile : SampleDirectory

  return type(name, original, target, injection)
}
