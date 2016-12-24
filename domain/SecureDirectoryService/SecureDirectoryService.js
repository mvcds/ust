const dependencies = {
  fs: require('fs'),
  path: require('path')
}

function* CreateGenerator(samples, injection){
  for (let index = 0; index < samples.length; index++) {
    const { target } = samples[index]

    yield target
  }
}

const CreateNonExistentDirectory = (target, injection) => {
  const { path, fs } = Object.assign({}, dependencies, injection)

  const { dir } = path.parse(target)

  try {
    fs.accessSync(dir)
  } catch (e) {
    fs.mkdirSync(dir)
  }
}

module.exports = (samples, injection) => {
  for (const target of CreateGenerator(samples, injection)) {
    CreateNonExistentDirectory(target, injection)
  }

  return Promise.resolve(samples)
}
