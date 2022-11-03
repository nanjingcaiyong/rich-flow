# rich-workflow

> rich 工作流. 覆盖项目全链路生命周期，在于统一脚手架、同构化方案、命令，集中维护、管理，更具语义化


## 1、安装工作流 

```sh
npm i rich-workflow -g
```

## 2、脚手架操作 ✅

### 获取模板列表  ✅
```sh
rich list
```

### 创建项目   ✅
```sh
rich init <模板名称> [项目名称]
```

### 运行脚本  ✅

项目启动
```sh
rich run dev
```

项目构建
```sh
rich run build
```

js代码格式化
```sh
rich run lint:es [<文件地址>...] [<路径>...] [--fix]
```

style代码格式化
```sh
rich run lint:style  [<文件地址>...] [<路径>...] [--fix]
```

## 3、Git操作集 ✅

### branch: 分支相关操作 ✅
```sh
# 创建分支
rich branch [-b] <分支名>

# 删除分支
rich branch -d <分支名>

# 关键词匹配所有分支
rich branch -s <关键词>
```
### renew: 更新分支 ✅
```sh
# 删除指定的分支，从master重新创建
rich renew [<分支名>...]
```

### merge: 合并分支 ✅
```sh
# 合并到master后删除该远程分支
rich merge [<分支名>]
```

### push: 推送代码至远程 ✅
```sh
# 推送代码时会同步到远程
rich push
```

### ignore: 删除并忽略指定文件 ✅
```sh
# 删除项目中所有.DS_Store文件，并添加至.gitnore
rich ignore .DS_Store
```

## 4、安装插件

### ESLint ✅

```sh
rich install eslint
```

### StyleLint

```sh
rich install stylelint
```

### CommitLint
```sh
rich install commitlint
```

## Vscode

### 插件：Settings Sync
> 可以一键轻松实现上传下载跨多台机器同步设置、代码片段、主题、文件图标、启动、快捷键配置、工作区、VSCode插件和插件配置

- Guist ID: 2c25224b6d8916672ab2e86dfb37e20a
- Token: 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


## 异常
1、因为没有将钩子 '.husky/commit-msg' 设置为可执行，钩子被忽略
> 这是因为当前的文件没有执行权限，只需要执行chmod +x .husky/pre-commit更改文件为可执行即可。