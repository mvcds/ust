const { join } = require('path')

const { mock, match } = require('sinon')
const { commerce, company } = require('faker')

const UseSampleAsTemplate = require('./UseSampleAsTemplate')

describe('Use Sample As Template', () => {
  describe('Duplicates a single file', () => {
    const sample = commerce.product()
    const name = company.bsNoun()
    const location = directory()
    const pkgPath = directory()
    const process_ = {
      env: {
        PWD: directory('PWD')
      }
    }

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
      sat: {
        [sample]: file
      }
    }
    const require = mock().once()
      .withExactArgs(join(process_.env.PWD, 'package.json'))
      .returns(pkg)
    const Sample = mock().once()
      .withExactArgs(name, pkg.sat[sample], location, match.object)
      .returns(Promise.resolve(resultSample))
    const path = {
      join: mock().once()
        .withExactArgs(process_.env.PWD, 'package.json')
        .returns(join(process_.env.PWD, 'package.json'))
    }
    const SecureDirectoryService = mock().once()
      .withExactArgs([resultSample], match.object)
      .returns([resultSample])

    before(() => UseSampleAsTemplate(sample, location, name, {
      DuplicationService,
      SecureDirectoryService,
      Sample,
      path,
      require,
      process: process_
    }))

    it('Gets the package absolute path', () => path.join.verify())
    it('Requires the current package', () => require.verify())
    it('Reads the sample', () => Sample.verify())
    it('Is directory-safe', () => SecureDirectoryService.verify())
    it('Creates the file', () => DuplicationService.verify())
  })

  describe('Duplicates a whole folder', () => {
    const sample = commerce.product()
    const name = company.bsNoun()
    const location = directory()
    const pkgPath = directory()
    const process_ = {
      env: {
        PWD: directory('PWD')
      }
    }
    const files = [
      js('file-1'),
      js('file-2'),
      js('file-2.test')
    ]
    const samples = []

    const folder = directory(sample)

    const DuplicationService = mock().thrice()
    const pkg = {
      sat: {
        [sample]: folder
      }
    }
    const require = mock().once()
      .withExactArgs(join(process_.env.PWD, 'package.json'))
      .returns(pkg)
    const Sample = mock().once()
      .withExactArgs(name, pkg.sat[sample], location, match.object)
      .returns(Promise.resolve(samples))
    const path = {
      join: mock().once()
        .withExactArgs(process_.env.PWD, 'package.json')
        .returns(join(process_.env.PWD, 'package.json'))
    }
    const SecureDirectoryService = mock().once()
      .withExactArgs(samples, match.object)
      .returns(samples)


    files.forEach((file, i) => {
      DuplicationService
        .onCall(i)
        .returns(Promise.resolve(file))

      samples.push({
        original: directory(file),
        target: file
      })
    })

    before(() => UseSampleAsTemplate(sample, location, name, {
      DuplicationService,
      SecureDirectoryService,
      Sample,
      path,
      require,
      process: process_
    }))

    it('Gets the package absolute path', () => path.join.verify())
    it('Requires the current package', () => require.verify())
    it('Reads the sample', () => Sample.verify())
    it('Is directory-safe', () => SecureDirectoryService.verify())
    it('Creates each file', () => DuplicationService.verify())
  })
})
