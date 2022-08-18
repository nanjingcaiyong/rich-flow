const chalk = require('chalk')

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */

module.exports = function evaluate (exp, data) {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    return fn(data)
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}

/**
// new Function + with
// 我们使用 prop.value 来访问data（with的指定对象）,但是如果我们的data对象嵌套很深，我们就得写为 prop.value.xx.xxx.xxx.***...
// 我们利用with可以简写为如下:

 function evalPropChain(data, propChainStr){
    return new Function('obj', 'with(obj){return ' + propChainStr + ';}')(data);
  }
  var data={
      prop:{
        prop1: {
          prop2: {
            value: 1
          }
        }
      }
  };
  evalPropChain(data, 'prop.prop1.prop2.value'); // 1
 */
