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
    message: 'Format: [major].[minor].[patch]',
    choices: [
      'major',
      'minor',
      'patch'
    ],
    default: 2
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
  }
}