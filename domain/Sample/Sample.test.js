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

    const fs = {
      lstatSync: mock().once()
        .withExactArgs(original)
        .returns({
          isFile: () => true
        })
    }
    const SampleFile = mock().once()
      .withExactArgs(name, original, location, match.object)
      .returns(file)

    const sample = Sample(name, original, location, {
      SampleFile,
      fs
    })

    it('Identifies a file', () => fs.lstatSync.verify())
    it('Creates a SampleFile', () => {
      SampleFile.verify()

      expect(sample).to.equal(file)
    })
  })

  describe('Directory', () => {
    const name = commerce.product()
    const original = directory()
    const location = directory()
    const folder = {}

    const SampleFile = mock().never()
    const fs = {
      lstatSync: mock().once()
        .withExactArgs(original)
        .returns({
          isFile: () => false
        })
    }
    const SampleDirectory = mock().once()
      .withExactArgs(name, original, location, match.object)
      .returns(folder)

    const sample = Sample(name, original, location, {
      SampleFile,
      SampleDirectory,
      fs
    })

    it('Identifies a directory', () => fs.lstatSync.verify())
    it('Creates a SampleDirectory', () => {
      SampleDirectory.verify()

      expect(sample).to.equal(folder)
    })
  })
})
