
const { hasLocalChanged, askQuestions, command, oraPromise, gitBranchIs, isRemoteBranch } = require('./utils');
const questions = require('./questions');
const Logger = require('./log')
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
 * @description 代码提交
 */
async function commitCode () {
  let { type } = await askQuestions([questions.commitType]);      // 选择提交类型：feat、fix、refactor、style……
  let { scope } = await askQuestions([questions.commitScope]);    // 填写影响范围
  const { message } = await askQuestions([questions.commitMsg]);  // 填写提交信息
  type = type.replace(/:.+/, '');
  scope = scope ? '('+scope+')' : '';
  if (message) {
    await command('git add .')
    await command(`git commit -m '${type}${scope}: ${message}'`)
    const { push } = await askQuestions([questions.commitPush])   // 是否提交远程
    const currentBranch = await gitBranchIs()
    const isRemote = await isRemoteBranch(currentBranch)
    if (push) {
      await command(`git push ${isRemote ? '' : `-u`} origin ${currentBranch}`)
    }
  } else {
    Logger.error('commit 信息不能为空')
    process.exit(0)
  }
}

/**
 * @description 代码撤销
 */
async function revertCode () {
  await oraPromise(command.bind(null, 'git reset --hard & git clean -df'), { text: '撤销' })
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

module.exports = {
  uncommittedCode,
  stashCode,
  commitCode,
  revertCode
}