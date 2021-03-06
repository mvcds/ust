const { mock, match } = require('sinon')
const { commerce, company } = require('faker')

const UseSampleAsTemplate = require('./UseSampleAsTemplate')

describe('Use Sample As Template', () => {
  describe('Duplicates a single file', () => {
    const sample = commerce.product()
    const resultName = company.bsNoun()

    const file = directory(js(sample))
    const target = 'new'
    const resultSample = {
      original: file,
      target
    }

    const DuplicationService = mock().once()
      .withExactArgs(file, target, match.object)
      .returns(Promise.resolve())
    const pkg = {
      ust: {
        [sample]: file
      }
    }
    const Sample = mock().once()
      .withExactArgs(resultName, pkg.ust[sample], match.object)
      .returns(Promise.resolve(resultSample))
    const SecureDirectoryService = mock().once()
      .withExactArgs([resultSample], match.object)
      .returns([resultSample])
    const GetPackageService = mock().once()
      .withExactArgs(match.object)
      .returns(pkg)

    before(() => UseSampleAsTemplate(sample, resultName, {
      DuplicationService,
      SecureDirectoryService,
      Sample,
      GetPackageService
    }))

    it('Gets the package', () => GetPackageService.verify())
    it('Reads the sample', () => Sample.verify())
    it('Is directory-safe', () => SecureDirectoryService.verify())
    it('Creates the file', () => DuplicationService.verify())
  })

  describe('Duplicates a whole folder', () => {
    const sample = commerce.product()
    const resultName = company.bsNoun()
    const pkgPath = directory()
    const files = [
      js('file-1'),
      js('file-2'),
      js('file-2.test')
    ]
    const samples = []

    const folder = directory(sample)

    const DuplicationService = mock().thrice()
    const pkg = {
      ust: {
        [sample]: folder
      }
    }
    const Sample = mock().once()
      .withExactArgs(resultName, pkg.ust[sample], match.object)
      .returns(Promise.resolve(samples))
    const SecureDirectoryService = mock().once()
      .withExactArgs(samples, match.object)
      .returns(samples)
    const GetPackageService = mock().once()
      .returns(pkg)

    files.forEach((file, i) => {
      DuplicationService
        .onCall(i)
        .returns(Promise.resolve(file))

      samples.push({
        original: directory(file),
        target: file
      })
    })

    before(() => UseSampleAsTemplate(sample, resultName, {
      DuplicationService,
      SecureDirectoryService,
      Sample,
      GetPackageService
    }))

    it('Gets the package', () => GetPackageService.verify())
    it('Reads the sample', () => Sample.verify())
    it('Is directory-safe', () => SecureDirectoryService.verify())
    it('Creates each file', () => DuplicationService.verify())
  })
})
