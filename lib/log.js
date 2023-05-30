const chalk = require('chalk')
const { OSC, SEP, BEL } = require('./keys')

function error (message) {
  console.log(chalk.red(`[ERROR]: ${message}`))
  process.exit(0)
}

function warn (message) {
  console.log(chalk.yellow(`[WARN]: ${message}`))
}

function success (message) {
  console.log(chalk.green(`[SUCCESS]: ${message}`))
}

function link (message, link) { 
  console.log([OSC, '8', SEP, SEP, link, BEL, message, OSC, '8', SEP, SEP, BEL].join(''))
}

module.exports = {
  error,
  warn,
  success,
  link
}