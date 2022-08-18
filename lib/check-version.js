/**
 * @description 校验node、cli版本
 */

const request = require('request');
const semver = require('semver');
const chalk = require('chalk');
const packageConfig = require('../package.json');

module.exports = done => {
  // 确保当前环境的node版本不得低于package.json中engines设置的node版本
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      `  You must upgrade node to >=' + packageConfig.engines.node + '.x to use ${packageConfig.name}`
    ))
  }

  // 拉取npm 中 rich-cli 的详细信息
  request({
    url: 'https://registry.npmjs.org/' + packageConfig.name,
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags']?.latest
      const localVersion = packageConfig.version
      // 当本地版本 小于 上一个版本
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow(`  A newer version of ${packageConfig.name} is available.`))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }
    done()
  })
}