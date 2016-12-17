const { join } = require('path')

const { mock, match } = require('sinon')
const { commerce, lorem, company, system } = require('faker')

const UseSampleAsTemplate = require('./UseSampleAsTemplate')

describe('Use Sample As Template', () => {
  describe('Duplicates a single file', () => {
    const sample = commerce.product()
    const name = company.bsNoun()
    const location = join(...lorem.words().split(' '))

    const file = join(...lorem.words().split(' '), sample)
    const data = lorem.sentence()
    const pathToWrite = join(location, name)

    const fs = {
      readFile: mock().once()
        .withExactArgs(file, 'utf8', match.func)
        .callsArgWithAsync(2, null, data),
      writeFile: mock().once()
        .withExactArgs(pathToWrite, data, 'utf8')
    }
    const pkg = {
      sat: {
        [sample]: file
      }
    }
    const path = {
      join: mock().once()
        .withExactArgs(location, name)
        .returns(pathToWrite)
    }

    before(() => UseSampleAsTemplate({ sample, location, name }, {
      fs,
      pkg,
      path
    }))

    it('Read the sample file', () => fs.readFile.verify())
    it('Create a new file after the sample', () => fs.writeFile.verify())
  })
})
