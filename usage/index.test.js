const { mock, match } = require('sinon')
const { lorem, commerce } = require('faker')
const { expect } = require('chai')

const Usage = require('./index')

//TODO: use sinon's onCall, it's not currently working
describe('Usage', () => {
  const location = directory(...lorem.words().split(' '))
  const files = [
    commerce.product(),
    commerce.color(),
    location,
    `${location}.test`
  ]
  const program = {}
  const target = lorem.word()

  const path = {
    dirname: mock().once()
      .withExactArgs(location)
      .returns(target),
    join: mock().twice()
      .returns('target + file'),
    basename: mock().once()
      .withExactArgs(location)
      .returns(js(location))
  }
  const fs = {
    readdirSync: mock().once()
      .withExactArgs(target)
      .returns(files.map(js))
  }
  const command = mock().twice()
    .withExactArgs(program)
  const require = mock().twice()
    .returns(command)

  const commands = Usage(program, {
    fs,
    location,
    path,
    require
  })

  it(`Gets the directory's absolute path`, () => path.dirname.verify())
  it('Returns the basefile', () => path.basename.verify())
  it('Read files on directory', () => fs.readdirSync.verify())
  it(`Gets the file's absolute path`, () => {
    path.join.verify()

    path.join.args.forEach((args, i) => expect(args).to.deep.equal([target, js(files[i])]))
  })
  it('Requires the file', () => {
    require.verify()

    require.args.forEach(args => expect(args[0]).to.equal('target + file'))
  })
  it('Creates the command', () => command.verify())
})
