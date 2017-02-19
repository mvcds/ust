const { defineSupportCode } = require('cucumber')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

defineSupportCode(function({ After, Then }) {
  Then('she should have {file:stringInDoubleQuotes} in the sample\'s parent folder', function (file, callback) {
    this.filePath = path.join(process.env.PWD, file)

    fs.access(this.filePath, callback)
  })

  Then('{folder:stringInDoubleQuotes} should have a {file:stringInDoubleQuotes}', function (folder, file, callback) {
    const filePath = path.join(process.env.PWD, folder, file)

    fs.access(filePath, callback)
  });

  After(function() {
    exec(`rm -fr ${this.filePath}`)
  })
})
