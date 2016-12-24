const { join } = require('path')

const { mock, match } = require('sinon')
const { company } = require('faker')

const SecureDirectoryService = require('./SecureDirectoryService')

describe('Secure Directory Service', () => {
  describe('Existent directory', () => {
    const name = js(company.bsNoun())
    const dir = directory()
    const target = join(dir, name)

    const path = {
      parse: mock().once()
        .withExactArgs(target)
        .returns({ dir })
    }
    const fs = {
      accessSync: mock().once()
        .withExactArgs(dir),
      mkdirSync: mock().never()
    }

    const sample = SecureDirectoryService([{ target }], {
      path,
      fs
    })

    it('Parses the target path', () => path.parse.verify())
    it('Accesses the target', () => fs.accessSync.verify())
    it('Does not create a new directory', () => fs.mkdirSync.verify())
  })

  describe('Non-existent directory', () => {
    const name = js(company.bsNoun())
    const dir = directory()
    const target = join(dir, name)

    const path = {
      parse: mock().once()
        .withExactArgs(target)
        .returns({ dir })
    }
    const fs = {
      accessSync: mock().once()
        .throws('No such directory'),
      mkdirSync: mock().once()
        .withExactArgs(dir)
    }

    SecureDirectoryService([{ target }], {
      path,
      fs
    })

    it('Parses the target path', () => path.parse.verify())
    it('Cannot access the target', () => fs.accessSync.verify())
    it('Does not create a new directory', () => fs.mkdirSync.verify())
  })
})
