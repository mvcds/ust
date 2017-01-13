const { mock, match } = require('sinon')
const { expect } = require('chai')

const ListPackageSamples = require('./ListPackageSamples')

describe('List Package Samples', () => {
  describe('Read all samples', () => {
    const pkg = {
      sat: {
        key1: 'path\\to\\file.js',
        key2: 'path\\to\\directory'
      }
    }

    const GetPackageService = mock().once()
      .withExactArgs(match.object)
      .returns(pkg)
    const colors = {
      yellow: mock().twice()
    }
    const log = mock().twice()

    ListPackageSamples({
      GetPackageService,
      colors,
      log
    })

    it('Reads the package', () => GetPackageService.verify())
    it('Colours the key', () => {
      const { yellow } = colors

      yellow.verify()

      Object.keys(pkg.sat).forEach((key, i) => {
        expect(yellow.args[i][0]).to.equal(key)
      })
    })
    it('Logs out each key', () => log.verify())
  })
})
