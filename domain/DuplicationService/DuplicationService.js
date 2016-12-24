const dependencies = {
  fs: require('fs')
}

const ReadFile = (original, injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return new Promise((resolve) => {
    fs.readFile(original, 'utf8', (err, data) => {
      resolve(data)
    })
  })
}

const WriteFile = (to, injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return (data) => fs.writeFile(to, data, 'utf8')
}

module.exports = (original, to, injection) => {
  return ReadFile(original, injection)
    .then(WriteFile(to, injection))
}
