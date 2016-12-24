const { mock, match } = require('sinon')

const DuplicationService = require('./DuplicationService')
const { commerce, lorem, company } = require('faker')

describe('Duplication Service', () => {
  describe('Duplicates a file', () => {
    const original = directory(js(commerce.product()))
    const copy = directory(js(company.bsNoun()))
    const data = lorem.sentence()

    const fs = {
      readFile: mock().once()
        .withExactArgs(original, 'utf8', match.func)
        .callsArgWithAsync(2, null, data),
      writeFile: mock().once()
        .withExactArgs(copy, data, 'utf8')
    }

    const service = DuplicationService(original, copy, {
      fs
    })

    it('Read a file', () => service.then(() => fs.readFile.verify()))
    it('Write a file', () => service.then(() => fs.writeFile.verify()))
  })
})
