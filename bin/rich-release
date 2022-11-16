#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const { command } = require('../lib/utils')

program
  .name('rich')
  .usage('release [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]')
  .option('--preid')
  .on('--help', () => {
    console.log('  Examples:')
    console.log(chalk.gray('    Pattern: major.minor.patch'))
    console.log('')
    console.log(chalk.gray('    # update the specified version'))
    console.log('    $ rich release 0.0.1')
    console.log('    // v0.0.1')
    console.log()
    console.log(chalk.gray('    # update the patch version'))
    console.log('    $ rich release patch')
    console.log('    // v0.0.2')
    console.log()
    console.log(chalk.gray('    # update the minor version'))
    console.log('    $ rich release minor')
    console.log('    // v0.1.0')
    console.log()
    console.log(chalk.gray('    # update the major version'))
    console.log('    $ rich release major')
    console.log('    // v1.0.0')
    console.log()
    console.log(chalk.gray('    # update the premajor version'))
    console.log('    $ rich release premajor')
    console.log('    // v2.0.0-0')
    console.log()
    console.log(chalk.gray('    # update the preminor version'))
    console.log('    $ rich release preminor')
    console.log('    // v2.1.0-0')
    console.log()
    console.log(chalk.gray('    # update the prepatch version'))
    console.log('    $ rich release prepatch')
    console.log('    // v2.1.1-0')
    console.log()
    console.log(chalk.gray('    # update version from git latest tag')) // 读取git最新标签用作新的npm版本
    console.log('    $ rich release from-git')
    console.log('    // v2.1.1-1')
    console.log()
    console.log(chalk.gray('    # use as a prefix for the prerelease'))
    console.log('    $ rich release prerelease --preid=alpha')
    console.log('    // v2.1.1-alpha.0')
    console.log()
    
  })
  .on('exit', console.log)

const options = process.argv.slice(2).reduce((t, k) => t+= ` ${k}`, '')

function help () {
  if (process.argv.length < 3) return program.help()
}

help()

function main () {
  command(`npm version ${options}`).catch(() => {})
}

main()




