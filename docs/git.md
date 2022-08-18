# git 操作

## 分支操作

创建分支

```sh
rich branch <branch-name>
```

创建并切换新分支
```sh
rich -b branch <branch-name>
```

⚠️注意：功能分支以"feature-"开头, 修复分支以"fix-"开头

## 切换分支
```sh
rich switch <branch-name>
```

## 暂存

暂存所有修改
```sh
rich add .
```

暂存指定文件
```sh
rich add file1.js file2.js
```

## 提交

提交修改
```sh
rich commit -m <message>
```

## 合并

合并分支并删除名为 branch-name 的远程分支
```sh
rich merge <branch-name>
```

## 推送

推送远程
```sh
rich push
```

创建远程分支并推送
```sh
rich push origin
```

## 拉取合并
```sh
rich pull
```

## 拉取更新
```sh
rich fetch
```