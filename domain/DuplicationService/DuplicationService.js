const dependencies = {
  fs: require('fs')
}

const ReadFile = (from_, injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return new Promise((resolve) => {
    fs.readFile(from_, 'utf8', (err, data) => {
      resolve(data)
    })
  })
}

const WriteFile = (to, injection) => {
  const { fs } = Object.assign({}, dependencies, injection)

  return (data) => fs.writeFile(to, data, 'utf8')
}

module.exports = (from_, to, injection) => {
  return ReadFile(from_, injection)
    .then(WriteFile(to, injection))
}
