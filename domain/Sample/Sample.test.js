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
    const file = js('file')
    const original = directory(file)
    const location = directory()

    const SampleFile = mock().once()
      .withExactArgs(name, original, location, match.object)
      .returns(file)

    const sample = Sample(name, original, location, {
      SampleFile
    })

    it('Creates a SampleFile', () => {
      SampleFile.verify()

      expect(sample).to.equal(file)
    })
  })
})
