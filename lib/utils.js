const util = require('util')
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const ora = require('ora');
/**
 * @description 获取所有原称分支
 * @returns { string[] } 远程分支名称, eg: origin/xxx
 */
function queryRemoteBranches() {
  return command('git branch -r')
    .then(res => res.split('\n').map(branchName => branchName.replace(/\s+origin\//, '')))
    .catch(() => [])
}

function gitBranchIs (option) {
  return exec('git symbolic-ref --quiet --short HEAD').then(({stdout}) => {
    return typeof option === 'string' 
      ? stdout.trim() === option 
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
 * @param { string } rootPath 相对项目根目录
 * @returns 
 */
const exists = (rootPath) => {
  return fs.existsSync(rootPath)
}

const mkdir = (rootPath) => {
  return fs.mkdirSync(rootPath)
}

const touch = (filePath, content) => {
  return fs.promises.writeFile(filePath, content)
}

/**
 * @description 执行命令（shell.exec 执行控制台会有输出）
 * @param { string } cmd 命令
 * @returns { Promise }
 */
const command = (cmd) => {
  return exec(cmd)
    .then(({stdout}) => stdout.toString().split(/\n/))
    .catch((err) => {throw new Error(err)})
}

const stat = (rootPath) => {
  return fs.promises.stat(rootPath)
    .then(() => true)
    .catch(() => false)
}

const readFile = (rootPath) => fs.promises.readFile(rootPath, {encoding: 'utf-8'})
const writeFile = (rootPath, content) => fs.promises.writeFile(rootPath, content)
const rm = (filePath) => fs.promises.rm(filePath)

const stringFormat = (json, config) => {
  let p = [];
  let indentConfig = {
    tab: { char: '\t', size: 1 },
    space: { char: ' ', size: 4 }
  };
  let configDefault = { type: 'tab' };
  const push = function (m) { return '\\' + p.push(m) + '\\'; };
  const pop = function (m, i) { return p[i - 1] };
  const tabs = function (count, indentType) { return new Array(count + 1).join(indentType) };

  function formatObject(json, indentType) {
    p = [];
    var out = "",
      indent = 0;

    json = json
      .replace(/\\./g, push)
      .replace(/(".*?"|'.*?')/g, push)
      .replace(/\s+/, '');

    for (var i = 0; i < json.length; i++) {
      var c = json.charAt(i);

      switch (c) {
        case '{':
        case '[':
          out += c + "\n" + tabs(++indent, indentType);
          break;
        case '}':
        case ']':
          out += "\n" + tabs(--indent, indentType) + c;
          break;
        case ',':
          out += ",\n" + tabs(indent, indentType);
          break;
        case ':':
          out += ": ";
          break;
        default:
          out += c;
          break;
      }
    }
    out = out
      .replace(/\[[\d,\s]+?\]/g, function (m) { return m.replace(/\s/g, ''); })
      .replace(/\\(\d+)\\/g, pop)
      .replace(/\\(\d+)\\/g, pop);

    return out;
  }

  function formatArray(json) {
    return json.reduce((total, str) => total += `${str}\r\n`, '')
  }

  config = config || configDefault;
  var indent = indentConfig[config.type];

  if (indent == null) {
    throw new Error('Unrecognized indent type: "' + config.type + '"');
  }
  var indentType = new Array((config.size || indent.size) + 1).join(indent.char);
  return Array.isArray(json) ? formatArray(json) : formatObject(JSON.stringify(json), indentType);
}

const jsonFormat = (obj) => {
  return JSON.stringify(obj, null, '\t')
}

const oraPromise = (action, {text}) => {
  return new Promise((resolve, reject) => {
    const spinner = ora(text)
    spinner.start()
    action()
      .then(() => {
        spinner.succeed(text + '成功')
        resolve()
      })
      .catch((err) => {
        spinner.fail(text + '失败')
        reject(err)
      })
  })
}


module.exports = {
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
  stringFormat,
  jsonFormat,
  stat,
  isRemoteRegistry,
  gitBranchIs
}





