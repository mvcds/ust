const { expect } = require('chai')
const { commerce } = require('faker')
const { mock, match } = require('sinon')

const SampleFile = require('./SampleFile')

describe('Sample File', () => {
  const resultFileName = commerce.product()
  const samplePath = directory(js('original'))
  const resultFileFolder = directory()

  const target = 'new'

  const path = {
    join: mock().once()
      .withExactArgs(resultFileFolder, resultFileName)
      .returns(target)
  }

  let sample
  before(() => {
    return SampleFile(resultFileName, samplePath, resultFileFolder, {
      path
    }).then(s => sample = s)
  })

  it('Has an original path', () => expect(sample.original).to.equal(samplePath))
  it('Has a target path', () => expect(sample.target).to.equal(target))
})
