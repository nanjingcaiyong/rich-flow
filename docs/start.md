# 项目脚本


## 启动项目

rich run dev:\<env\>

```sh
// 启动测试环境
rich run dev:sit
```

## 项目打包

rich run build:\<env\>
```sh
// 启动测试环境
rich run build:sit
```


## 代码校验

```sh
// 校验 eslint 规则
rich lint:es
// 校验 stylelint 规则
rich lint:style
```

## 项目格式化

```sh
rich lint:es --fix
rich lint:style --fix
```