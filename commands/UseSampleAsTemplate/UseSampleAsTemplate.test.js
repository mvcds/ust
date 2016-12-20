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
    const data = lorem.sentence()
    const target = 'new'

    const fs = {
      readFile: mock().once()
        .withExactArgs(file, 'utf8', match.func)
        .callsArgWithAsync(2, null, data),
      writeFile: mock().once()
        .withExactArgs(target, data, 'utf8')
    }
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
      fs,
      pkg,
      Sample
    }))

    it('Creates a sample', () => Sample.verify())
    it('Reads the sample file', () => fs.readFile.verify())
    it('Creates a new file after the sample', () => fs.writeFile.verify())
  })
})
