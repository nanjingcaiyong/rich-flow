# rich-workflow

> rich 工作流. 覆盖项目全链路生命周期，在于统一脚手架、同构化方案、命令，集中维护、管理，更具语义化

安装

```sh
npm i rich-workflow -g
```

## 脚手架

### 创建项目 [✅]
```sh
rich init <template-name> [project-name]
```

### 模板列表 [✅]
```sh
rich list
```

## 构建器

### 
```sh
# 启动项目
rich dev

# 项目打包
rich build
```

### Git[✅]

1. 分支操作
   ```sh
   # 创建分支
   rich branch <branch-name>

   # 创建并切换新分支
   rich -b branch <branch-name>
   ```

   ⚠️注意：功能分支以"feature-"开头, 修复分支以"fix-"开头


2. 切换分支
   ```sh
   rich switch <branch-name>
   ```

3. 暂存
   ```sh
   # 暂存所有修改
   rich add .

   # 暂存指定文件
   rich add file1.js file2.js
   ```

4. 提交
   ```sh
   # 提交修改
   rich commit -m <message>
   ```

5. 合并
   ```sh
   # 合并分支并删除名为 branch-name 的远程分支
   rich merge <branch-name>
   ```

6. 推送
   ```sh
   # 推送远程
   rich push
   # 创建远程分支并推送
   rich push origin
   ```

7. 拉取合并
   ```sh
   rich pull
   ```

8. 拉取更新
   ```sh
   rich fetch
   ```

### 校验 [✅]
```sh
# 检查代码风格问题
rich eslint

# 自动格式化代码
rich eslint --fix

# 检查样式代码风格问题
rich stylelint

# 自动格式化样式代码
rich stylelint --fix
```

## 插件

### Eslint [✅]
```sh
rich install eslint
```
主要流程：
1. git 前置操作  
   1.1 暂存当前文件的变更  
   1.2 切换到 master 分支  
   1.3 拉取最新代码  
2. 开始配置  
   2.1 删除.eslintrc.js外的文件或配置，如下：
      - .eslintrc.yaml
      - .eslintrc.yml
      - .eslintrc.json
      - .eslintrc
      - package.json 中的 eslintConfig 属性  

   2.2 安装 eslint 插件 和 rich-eslint-config 配置包
   
   2.3 判断是否有.eslintrc.js，没有则创建
   
   2.4. 询问用户是否是全量覆盖配置 还是 增量配置
3. 首次代码格式化 
4. 提交本次所有修改

### Stylelint
```sh
rich install stylelint
```

### Commitlint
```sh
rich install commitlint
```

### JsonLint
```sh
rich install jsonlint
```

## Vscode

### 插件：Settings Sync
> 可以一键轻松实现上传下载跨多台机器同步设置、代码片段、主题、文件图标、启动、快捷键配置、工作区、VSCode插件和插件配置

- Guist ID: 2c25224b6d8916672ab2e86dfb37e20a
- Token: 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


## 异常
1、因为没有将钩子 '.husky/commit-msg' 设置为可执行，钩子被忽略
> 这是因为当前的文件没有执行权限，只需要执行chmod +x .husky/pre-commit更改文件为可执行即可。