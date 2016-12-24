const { join, parse } = require('path')

const { expect } = require('chai')
const { commerce } = require('faker')
const { mock, match } = require('sinon')

const SampleDirectory = require('./SampleDirectory')

describe('Sample Directory', () => {
  const name = commerce.product()
  const original = directory()
  const target = directory()
  const files = [
    js('file-1'),
    js('file-2'),
    js('file-2.test')
  ]

  const pathToWrite = join(target, name)

  const path = {
    join: mock().exactly(files.length + 1),
    readdir: mock().once()
      .withExactArgs(original, 'utf8', match.func)
      .callsArgWithAsync(2, null, files),
    parse: mock().thrice()
  }
  const Sample = mock().thrice()
  const samples = files.map((file, i) => ({
    original: join(original, file),
    target: join(target, file)
  }))

  path.join
    .onCall(0)
    .returns(pathToWrite)

  files.forEach((file, i) => {
    path.join
      .onCall(i + 1)
      .returns(samples[i].original)
    path.parse
      .onCall(i)
      .returns(parse(file))

    Sample
      .onCall(i)
      .returns(samples[i])
  })

  const sample = SampleDirectory(name, original, target, {
    path,
    Sample
  })

  it('Reads the original directory', () => path.readdir.verify())
  it('Creates sample files', () => {
    Sample.verify()
    path.parse.verify()

    files.forEach((file, i) => {
      const args = Sample.args[i]

      expect(args[0]).to.equal(file)
      expect(args[1]).to.equal(join(original, file))
      expect(args[2]).to.equal(join(target, name))
    })

    return sample.then(data => {
      expect(data).to.deep.equal(samples)
    })
  })
  it('Joins paths', () => path.join.verify())
})
