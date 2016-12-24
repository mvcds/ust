const { expect } = require('chai')
const { commerce } = require('faker')
const { mock, match } = require('sinon')

const SampleFile = require('./SampleFile')

describe('Sample File', () => {
  const name = commerce.product()
  const original = directory(js('original'))
  const location = directory()

  const target = 'new'

  const path = {
    join: mock().once()
      .withExactArgs(location, name)
      .returns(target)
  }

  let sample
  before(() => {
    return SampleFile(name, original, location, {
      path
    }).then(s => sample = s)
  })

  it('Has an original path', () => expect(sample.original).to.equal(original))
  it('Has a target path', () => expect(sample.target).to.equal(target))
})
