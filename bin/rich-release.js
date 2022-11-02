#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
// const path = require('path')
const { command } = require('../lib/utils')

program
  .name('rich')
  .usage('release [version]')
  .option('--first-release')
  .option('--release-as')
  .option('--no-verify')
  .option('--dry-run')
  .option('--prerelease')
  .on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # install rich\'s plugin'))
    console.log('    $ rich release 1.2.3')
    console.log()
  })
  .on('exit', console.log)
  .parse(process.argv)

const options = process.argv.slice(2).reduce((t, k) => t+= ` ${k}`, '')

function main () {
  command(`npx standard-version ${options}`).catch(() => {})
}

main()




