const { join } = require('path')

const { expect } = require('chai')
const { commerce, lorem } = require('faker')
const { mock, match } = require('sinon')

const Sample = require('./Sample')

const directory = (paths = '') => join(...lorem.words().split(' '), paths)
const js = (fileName) => `${fileName}.js`

describe('Sample', () => {
  describe('File', () => {
    const name = commerce.product()
    const original = directory(js('original'))
    const location = directory()

    const target = 'new'

    const path = {
      join: mock().once()
        .withExactArgs(location, name)
        .returns(target)
    }

    const sample = Sample(name, original, location, {
      path
    })

    it('Has an original path', () => expect(sample.original).to.equal(original))
    it('Has a target path', () => expect(sample.target).to.equal(target))
  })
})
