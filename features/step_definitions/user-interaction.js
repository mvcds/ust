const { defineSupportCode } = require('cucumber')
const { exec } = require('child_process')

defineSupportCode(function({ Given, When }) {
  Given('the developer types {command:stringInDoubleQuotes}', function (command, callback) {
    this.command = command

    callback(null)
  })

  When('she enters the command', function (callback) {
    exec(`node ${this.command}`, callback)
  })
})
