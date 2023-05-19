# 项目脚本


## 启动项目


```sh
rich run dev
```

![初始化项目](/assets/script1.png)

![初始化项目](/assets/script2.png)

## 项目打包
```sh
rich run build
```


## 代码校验

```sh
# 校验 eslint
rich run lint:es
# 校验 stylelint
rich run lint:style
```

## 项目格式化

```sh
# 使用 eslint 进行代码格式化
rich run lint:es --fix
# 使用 stylelint 进行代码格式化
rich run lint:style --fix
```