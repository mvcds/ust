const { defineSupportCode } = require('cucumber')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

defineSupportCode(function({ After, Then }) {
  Then('she should have {file:stringInDoubleQuotes} in the sample\'s parent folder', function (file, callback) {
    this.filePath = path.join(process.env.PWD, file)

    fs.access(this.filePath, callback)
  })

  After(function() {
    exec(`rm -fr ${this.filePath}`)
  })
})
