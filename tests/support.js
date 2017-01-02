const path = require('path')

const { lorem } = require('faker')

Object.assign(global, {
  directory: (paths = '') => path.join(...lorem.words().split(' '), paths),
  js: (fileName) => `${fileName}.js`,
  join: path.join
})
