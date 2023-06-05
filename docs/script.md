# 项目脚本 Scripts


> 同构化项目命令


## 启动 Run


```sh
rich run dev
```

![初始化项目](/assets/script1.png)

![初始化项目](/assets/script2.png)

## 打包 Build
```sh
rich run build
```


## 校验 Lint

```sh
# 校验 eslint
rich run lint:es
# 校验 stylelint
rich run lint:style
```

## 格式化 Format

```sh
# 使用 eslint 进行代码格式化
rich run lint:es --fix
# 使用 stylelint 进行代码格式化
rich run lint:style --fix
```