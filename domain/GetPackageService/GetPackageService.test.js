const { mock } = require('sinon')
const { expect } = require('chai')
const { lorem } = require('faker')

const GetPackageService = require('./GetPackageService')

describe('Get Package Service', () => {
  const pkg = lorem.word()
  const process_ = {
    env: {
      PWD: directory('PWD')
    }
  }

  const path = {
    join: mock().once()
      .withExactArgs(process_.env.PWD, 'package.json')
      .returns(join(process_.env.PWD, 'package.json'))
  }
  const require = mock().once()
    .withExactArgs(join(process_.env.PWD, 'package.json'))
    .returns(pkg)

  const result = GetPackageService({
    path,
    require,
    process: process_
  })

  it(`Gets the package's path`, () => path.join.verify())
  it('Requires the package', () => require.verify())
  it('Returns the package', () => expect(result).to.equal(pkg))
})
