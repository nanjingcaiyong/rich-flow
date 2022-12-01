const util = require('util')
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');

/**
 * @description 获取所有原称分支
 * @returns { string[] } 远程分支名称, eg: origin/xxx
 */
function queryRemoteBranches() {
  return command('git branch -r')
    .then(res => res.split('\n').map(branchName => branchName.replace(/\s+origin\//, '')))
    .catch(() => [])
}

/**
 * @description 如果branchName有值则返回当前分支名是否是branchName，如果为undefined则返回当前分支名称
 * @param { branchName: string }  分支名称
 * @returns { boolean | string }
 */
function gitBranchIs (branchName) {
  return exec('git symbolic-ref --quiet --short HEAD')
    .then(({stdout}) => {
      return typeof branchName === 'string' 
        ? stdout.trim() === branchName 
        : stdout.trim()
    })
}

/**
 * @description 获取当前分支名称
 * @returns { string } 当前分支名
 */
function queryCurrentBranch() {
  return command('git branch --show-current')
}

/**
 * @description 通过分支名判断是否是远程分支
 * @param { string } branchName 分支名
 * @returns { boolean } 
 */
function isRemoteBranch(branchName) {
  return queryRemoteBranches().then(branchNames => {
    return branchNames?.findIndex?.(name => name === branchName) !== -1
  })
}

/**
 * @description 是否有远程仓库
 * @returns Promise<Boolean>
 */
function isRemoteRegistry() {
  return command('git remote -v')
    .then(remotes => remotes.length >= 2)
    .catch(() => false)
}

/**
 * @description 本地是否有修改
 * @returns { boolean }
 */
function hasLocalChanged() {
  return command('git status -s')
    .then(res => res.length > 1 ? true : Boolean(res[0].replace(/[\s|\r|\n]+/, '')))
    .catch(() => false)
}

/**
 * @description 相对路径转项目的绝对路径
 * @param { string } path 相对路径
 * @returns 
 */
function resolve(path) {
  return process.cwd() + '/' + path
}

/**
 * @description 判断文件或文件夹是否存在
 * @param { rootPath: string } 相对项目根目录
 * @returns 
 */
function exists (rootPath) {
  return fs.existsSync(rootPath)
}

/**
 * @description 创建文件夹
 * @param { rootPath: string } 文件夹路径  
 * @returns 
 */
function mkdir (rootPath) {
  return fs.mkdirSync(rootPath)
}

/**
 * @description 创建文件
 * @param {*} filePath 
 * @param {*} content 
 * @returns 
 */
function touch (filePath, content) {
  return fs.promises.writeFile(filePath, content)
}

/**
 * @description 执行命令（shell.exec 执行控制台会有输出）
 * @param { string } cmd 命令
 * @returns { Promise }
 */
function command (cmd) {
  return exec(cmd)
    .then(({stdout}) => {
      const res = stdout.toString().split(/\n/).filter(t => t)
      return res.length === 1 ? res[0] : res
    })
    .catch((err) => {throw new Error(err)})
}

/**
 * @description 判断文件是否存在
 * @param { rootPath: string } 文件路径 
 * @returns 
 */
function stat (rootPath) {
  return fs.promises.stat(rootPath)
    .then(() => true)
    .catch(() => false)
}

/**
 * @description 读取文件内容
 * @param { rootPath: string }  文件内容
 * @returns
 */
function readFile (rootPath) { 
  return fs.promises.readFile(rootPath, {encoding: 'utf-8'})
}

/**
 * @description 写文件
 * @param { rootPath: string } 文件路径
 * @param { content: string }  文件内容
 * @returns 
 */
function writeFile (rootPath, content) { 
  return fs.promises.writeFile(rootPath, content)
}

/**
 * @description 删除文件
 * @param { filePath: string } 文件文件
 * @returns 
 */
function rm (filePath) { 
  return fs.promises.rm(filePath) 
}

/**
 * @description 控制台交互
 * @param { questions: Aarray<Object> }  
 * @returns 
 */
function askQuestions (questions) {
  return inquirer.prompt(questions)
}

/**
 * @description json 格式化
 * @param { obj: Object } 待格式化对象
 * @returns 
 */
function jsonFormat (obj) {
  return JSON.stringify(obj, null, '\t')
}

/**
 * @description 控制台loading
 * @param { action: Promise } promise 回调 
 * @param { text: string } loading展示的文案 
 * @returns 
 */
function oraPromise (action, {text}) {
  return new Promise((resolve, reject) => {
    const spinner = ora(text)
    spinner.start()
    action()
      .then(() => {
        spinner.succeed(`${text}: '${chalk.green('SUCCESS')}'`)
        resolve()
      })
      .catch((err) => {
        spinner.fail(`${text}: ${chalk.red('ERROR')}`)
        reject(err)
      })
  })
}


module.exports = {
  askQuestions,
  oraPromise,
  queryRemoteBranches,
  isRemoteBranch,
  hasLocalChanged,
  queryCurrentBranch,
  command,
  resolve,
  exists,
  mkdir,
  touch,
  readFile,
  writeFile,
  rm,
  jsonFormat,
  stat,
  isRemoteRegistry,
  gitBranchIs,
  exec
}





