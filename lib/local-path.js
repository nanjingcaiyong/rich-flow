const path = require('path')

module.exports = {
  isLocalPath (templatePath) {
    return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
  },

  getTemplatePath (templatePath) {
    return path.isAbsolute(templatePath)
      ? templatePath
      //  path.normalize 处理 路径分隔符在不同终端上差异 (mac: POSIX 和 windows)
      : path.normalize(path.join(process.cwd(), templatePath))
  }
}