const dependencies = {
  fs: require('fs'),
  SampleFile: require('./SampleFile'),
  SampleDirectory: require('./SampleDirectory'),
  path: require('path')
}

module.exports = (resultName, pathToSample, injection) => {
  const { fs, path, SampleFile, SampleDirectory, location } = Object.assign({}, dependencies, injection)

  const stat = fs.lstatSync(pathToSample)
  const target = location || path.parse(pathToSample).dir

  const type = stat.isFile() ? SampleFile : SampleDirectory

  return type(resultName, pathToSample, target, injection)
}
