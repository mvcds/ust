const { defineSupportCode } = require('cucumber')
const { exec } = require('child_process')
const { EOL } = require('os')

defineSupportCode(function({ Given, When, Then }) {
  Then('she should see {sample:stringInDoubleQuotes} as sample', function (sample, callback) {
    exec(`node ${this.command}`, (error, stdout) => {
      if(error) return callback(error)

      const isListed = stdout.split(EOL)
        .some(s => s === sample)

      if (!isListed) callback(`Sample "${sample}" does not exist`)

      callback(null)
    })
  })
})
