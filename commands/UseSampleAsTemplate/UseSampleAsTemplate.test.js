const { join } = require('path')

const { mock, match } = require('sinon')
const { commerce, lorem, company, system } = require('faker')

const UseSampleAsTemplate = require('./UseSampleAsTemplate')

const directory = (paths = '') => join(...lorem.words().split(' '), paths)
const js = (fileName) => `${fileName}.js`

describe('Use Sample As Template', () => {
  describe('Duplicates a single file', () => {
    const sample = commerce.product()
    const name = company.bsNoun()
    const location = directory()

    const file = directory(js(sample))
    const target = 'new'

    const DuplicationService = mock().once()
      .withExactArgs(file, target, match.object)
      .returns(Promise.resolve())
    const pkg = {
      sat: {
        [sample]: file
      }
    }
    const Sample = mock().once()
      .withExactArgs(name, pkg.sat[sample], location, match.object)
      .returns({
        original: file,
        target
      })

    before(() => UseSampleAsTemplate(sample, location, name, {
      DuplicationService,
      pkg,
      Sample
    }))

    it('Reads the sample', () => Sample.verify())
    it('Creates the file', () => DuplicationService.verify())
  })
})
