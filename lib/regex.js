module.exports = {
  prefixReg: (prefix) => new RegExp(`(?<=${prefix}).+`)
}