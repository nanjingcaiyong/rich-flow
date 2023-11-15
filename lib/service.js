
const { 
  hasLocalChanged, 
  askQuestions, 
  command, 
  oraPromise, 
  gitBranchIs, 
  isRemoteBranch,
  isRemoteRegistry
} = require('./utils');
const questions = require('./questions');
const Logger = require('./log')
const request = require('request')
const GITHUB = {
  url: 'https://api.github.com/users/rich-group/repos',
  agent: 'rich-flow',
  topic: 'templates' // 需要给项目topics添加'templates'
}

/**
 * @description 贮藏代码
 */
async function stashCode () {
  const ans2 = await askQuestions([questions.stashMsg]);
  await oraPromise(async () => {
    await command('rm -rf .git/index.lock')
    await command('git add .')
    await command(`git stash push -m "${ans2.message}"`)
  }, { text: '贮藏' })
}

/**
 * @description 获取提交类型 (feat | fix | refactor | style)
 * @returns { string }
 */
async function getCommitType () {
  let { type } = await askQuestions([questions.commitType]);
  return type.replace(/:.+/, '');
}

/**
 * @description 获取影响范围
 * @returns { string }
 */
async function getCommitScope () {
  let { scope } = await askQuestions([questions.commitScope]);
  return scope ? '('+scope+')' : '';
}

/**
 * @description 获取提交信息
 * @returns { string }
 */
async function getCommitMessage () {
  const { message } = await askQuestions([questions.commitMsg]);  // 填写提交信息
  if (message === '') {
    Logger.error('commit 信息不能为空')
    process.exit(0)
  }
  return message
}

/**yy
 * @description 添加远程仓库
 * @returns 
 */
async function addRemoteRegistry () {
  if (await isRemoteRegistry()) return;
  const { link } = await askQuestions([questions.registryLink]);
  if (link === '') process.exit(0);
  await command(`git remote add origin ${link}`);
}


function excuteCommit (type, scope, message) {
  return oraPromise(async () => {
    await command('git add .')
    await command(`git commit -m '${type}${scope}: ${message}'`)
  }, { text: '代码提交' })
}

/**
 * @description 执行push命令
 * @param { string } branchName 分支名称
 */
async function excutePush (branchName) {
  const isRemote = await isRemoteBranch(branchName);                         // 是否存在远程分支
  const { push } = await askQuestions([questions.commitPush]);                  // 是否提交远程
  if (push) {
    await addRemoteRegistry();                                                  // 如果没有添加远程仓库，提示添加交互
    oraPromise(async () => {
      await command(`git push ${isRemote ? '' : `-u`} origin ${branchName}`)
    }, { text: '代码推送' })
  }
}

/**
 * @description 代码撤销
 */
async function revertCode () {
  await oraPromise(command.bind(null, 'git reset --hard & git clean -df'), { text: '撤销' })
}


/**
 * @description 代码提交
 * 例如：
 * <type>(<scope>): <subject>
 */
async function commitCode () {
  const commitType = await getCommitType();                                     // 提交类型
  const commitScope = await getCommitScope();                                   // 影响范围
  const message = await getCommitMessage();                                     // 提交信息
  const currentBranch = await gitBranchIs();                                    // 获取当前分支名
  await excuteCommit(commitType, commitScope, message);                         // 执行提交
  await excutePush(currentBranch);                                              // 执行push
}

/**
 * @description 有未提交的代码
 */
async function uncommittedCode () {
  if (await hasLocalChanged()) {
    const ans1 = await askQuestions([questions.uncommitted])
    switch (ans1.stash.replace(/:.+/, '')) {
      case 'stash':
        await stashCode()
      break;
      case 'commit':
        await commitCode()
      break;
      case 'revert':
        await revertCode()
      break;
    }
  }
}

/**
 * @description 加载项目模版
 * @returns { Promise }
 */
async function queryTemplates () {
  return new Promise((resolve, reject) => {
    request({
      url: GITHUB.url,
      headers: {
        'User-Agent': GITHUB.agent
      }
    }, (err, res, body) => {
      if (err) return reject(err);
      const requestBody = JSON.parse(body)
        .filter(t => t.topics.includes(GITHUB.topic))
      if (Array.isArray(requestBody)) {
        return resolve(requestBody)
      } else {
        return reject(requestBody.message)
      }
    })
  })
}

module.exports = {
  uncommittedCode,
  stashCode,
  commitCode,
  revertCode,
  queryTemplates
}