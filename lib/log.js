const chalk = require('chalk')

function error (message) {
  console.log(chalk.red(`ERROR: ${message}`))
}

function warn (message) {
  console.log(chalk.yellow(`WARN: ${message}`))
}

function success (message) {
  console.log(chalk.green(`SUCCESS: ${message}`))
}

module.exports = {
  error,
  warn,
  success
}