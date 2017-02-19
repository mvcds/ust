const { parse } = require('path')

const { expect } = require('chai')
const { commerce } = require('faker')
const { mock, match } = require('sinon')

const SampleDirectory = require('./SampleDirectory')

describe('Sample Directory', () => {
  const resultFolderName = commerce.product()
  const samplePath = directory('original')
  const resultFileFolder = directory('target')
  const files = [
    js('file-1'),
    js('file-2'),
    js('file-2.test')
  ]

  const pathToWrite = join(resultFileFolder, resultFolderName)

  const path = {
    join: mock().exactly(files.length + 1),
    parse: mock().thrice()
  }
  const fs = {
    readdir: mock().once()
      .withExactArgs(samplePath, 'utf8', match.func)
      .callsArgWithAsync(2, null, files)
  }
  const Sample = mock().thrice()
  const samples = files.map((file, i) => ({
    original: join(samplePath, file),
    target: join(resultFileFolder, file)
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

  const sample = SampleDirectory(resultFolderName, samplePath, resultFileFolder, {
    path,
    fs,
    Sample
  })

  it('Reads the original directory', () => fs.readdir.verify())
  it('Creates sample files', () => {
    Sample.verify()
    path.parse.verify()

    files.forEach((file, i) => {
      const args = Sample.args[i]

      expect(args[0]).to.equal(file)
      expect(args[1]).to.equal(join(samplePath, file))
      expect(args[2].location).to.equal(join(resultFileFolder, resultFolderName))
    })

    return sample.then(data => {
      expect(data).to.deep.equal(samples)
    })
  })
  it('Joins paths', () => path.join.verify())
})
