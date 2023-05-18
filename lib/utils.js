const util = require('util')
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

/**
 * @description 获取所有远程分支
 * @returns { string[] } 远程分支名称, eg: origin/xxx
 */
function queryRemoteBranches(name) {
  let baseCommand = 'git branch -r'
  const matchCommand = name ? baseCommand + ' | grep -E ' + name : baseCommand
  return command(matchCommand)
    .then(res => [].concat(res).map(branchName => branchName.replace(/\s+origin\//, '')))
    .catch(() => [])
}

/**
 * @description 获取本地所有分支
 * @returns { Promise }
 */
function queryLocalBranches () {
  return command('git branch').then(names => [].concat(names).map(name => name.replace(/[\s|*]/g, '')))
}

/**
 * @description 如果branchName有值则返回当前分支名是否是branchName，如果为undefined则返回当前分支名称
 * @param { branchName: string }  分支名称
 * @returns { boolean | string }
 */
function gitBranchIs (branchName) {
  // git rev-parse --abbrev-ref HEAD
  const restParams = Array.from(arguments).slice(1)
  return exec.apply(null, ['git symbolic-ref --quiet --short HEAD', ...restParams])
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
  return queryRemoteBranches(branchName).then(names => names?.findIndex?.(n => n === branchName) !== -1)
}


/**
 * @description 是否是本地分支
 * @param { string | string[] } 分支名
 * @returns { boolean }
 */
async function isLocalBranch (branchName) {
  const localBranchNames = await queryLocalBranches();          // 获取本地分支列表
  return Array.isArray(branchName) 
    ? localBranchNames.findIndex(local => branchName.includes(local)) !== -1
    : localBranchNames.includes(branchName)
}

/**
 * @description 分支
 * @param {*} branchName 
 * @returns 
 */
function isBranchExist (branchName) {
  let baseCommand = 'git branch -a'
  const matchCommand = branchName ? baseCommand + ' | grep -E ' + branchName : baseCommand
  return command(matchCommand)
    .then(res => {
      return [].concat(res).map(branchName => branchName.replace(/\s+origin\//, '')).includes(branchName)
    })
    .catch(() => false)
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
function command (...args) {
  return exec.apply(null, args)
    .then(({stdout}) => {
      let res = stdout.toString().split(/\n/).filter(t => t);
      res = res.map(t => t.replace(/(^\s*)|(\s*$)/g, ''));      // 删除头尾空格
      return res.length === 1 ? res[0] : res
    })
    .catch((err) => {
      throw new Error(err) 
    })
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
      .then((res) => {
        spinner.succeed(`${text}: '${chalk.green('SUCCESS')}'`)
        resolve(res)
      })
      .catch((err) => {
        spinner.fail(`${text}: ${chalk.red('ERROR')}`)
        reject(err)
      })
  })
}

function readPackagejson () {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'))
}


function terminalLink (message, link) {
  return [OSC, '8', SEP, SEP, link, BEL, message, OSC, '8', SEP, SEP, BEL].join('')
}

module.exports = {
  askQuestions,
  oraPromise,
  queryRemoteBranches,
  isRemoteBranch,
  isLocalBranch,
  isBranchExist,
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
  readPackagejson,
  exec,
  queryLocalBranches,
  terminalLink,
}





