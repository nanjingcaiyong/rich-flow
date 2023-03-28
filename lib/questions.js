module.exports = {
  'liscense': {
    name: 'option',
    type: 'list',
    message: 'please select a license type',
    choices: [
      'ISC',
      'MIT'
    ],
    default: 0
  },
  'version': {
    name: 'option',
    type: 'list',
    message: '请选择版本类型: [major].[minor].[patch]',
    choices: [
      'patch: 修订版本，做了 向下兼容 的问题修复',
      'minor: 次版本，做了 向下兼容 的功能新增',
      'major: 主版本，做了 不向下兼容 的修改'
    ],
    default: 0
  },
  'needTag': {
    name: 'isTag',
    type: 'confirm',
    message: 'Need to tag?'
  },
  'needPush': {
    name: 'isPush',
    type: 'confirm',
    message: 'Need to push?'
  },
  'branchType': {
    type: 'list',
    choices: ['fix', 'feat', 'ued', 'ci'],
    message: 'please select the branch type to be created',
    name: 'type'
  },
  'packageType': {
    name: 'packtool',
    type: 'list',
    message: '请选择包管理器',
    choices: ['npm', 'yarn', 'pnpm'],
    default: 0
  },
  'commitType': {
    name: 'type',
    type: 'list',
    message: '请输入本次提交的更改类型',
    choices: [
      'feat: 新增功能',
      'fix: bug修复',
      'refactor: 代码重构，无新增功能 或 bug修复',
      'style: 代码格式修改，包含且不限于空格、缩进、逗号、分号等',
      'docs: 文档修改，包含且不限于 README, CHANGELOG等',
      'pref: 优化相关，比如提升性能、体验',
      'test: 测试用例，包含单元测试、集成测试等'
    ],
    default: 0
  },
  'commitScope': {
    name: 'scope',
    type: 'input',
    message: '请输入本次修改影响的范围（scope）,可选'
  },
  'commitMsg': {
    name: 'message',
    type: 'input',
    message: '请输入 git commit 的信息'
  },
  'commitPush': {
    name: 'push',
    type: 'confirm',
    message: '是否需要推送远程仓库？'
  },
  'delLocalBranch': {
    name: 'local',
    type: 'confirm',
    message: '是否删除特性分支'
  },
  'delRomoteBranch': {
    name: 'remote',
    type: 'confirm',
    message: '是否删除远程特性分支'
  },
  'stashMsg': {
    name: 'message',
    type: 'input',
    message: '请输入 git stash 的信息'
  },
  'uncommitted': {
    name: 'stash',
    type: 'list',
    message: '本地有未提交的修改，请选择本次操作',
    default: 0,
    choices: [
      'stash: 暂存到本地',
      'commit: 提交本地修改',
      'revert: 丢弃本地修改（不可逆）'
    ],
  }
}