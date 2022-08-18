const match = require('minimatch')
const evaluate = require('./eval')

/**
 * 
 * @param {*} files template 中所有的文件路径
 * @param {*} filters 
 * @param {*} data metalsmith.metadata()
 * @param {*} done 
 * @returns 
 */

module.exports = (files, filters, data, done) => {
  // 没有 filters 直接返回
  if (!filters) {
    return done()
  }
  // 获取模板中template文件夹下所有的文件名(即路径, eg: test/**)
  const fileNames = Object.keys(files)
  // 遍历 模版中 meta.js中filters
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      // glob 为模板 meta.js filters的key
      if (match(file, glob, { dot: true })) {
        // 在 filters 中, 可以将某些 key 的 value 定义为一个 js 表达式.
        const condition = filters[glob];
        // 从data中取condition的值
        if (!evaluate(condition, data)) {
          // 删除文件
          delete files[file];
        }
      }
    })
  })
  done()
}