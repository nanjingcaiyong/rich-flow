# 分支操作

## 查看分支（带备注、链接）

```sh
rich branch
```

## 创建分支
rich branch -b \<分支名\>
```sh
rich branch -b f1
```

![分支](/assets/branch1.png)

按照实际需求选择分支类型：
- fix: bug修复
- feat: 新功能开发
- ued: UI页面新建、修改
- ci: 工程框架修改

## 删除分支
rich branch -d [\<分支名\>...]
```sh
rich branch -d feat/f1 feat/f2
```

## 搜索分支
rich branch -s \<keyword\>
```sh
# 查询所有feat开头的分支
rich branch -s feat
```
![分支](/assets/branch2.png)

## 给分支做备注
rich branch -b \<分支名\> -desc \<message\>

```sh
rich branch -b f3 -desc 'hello world'
```

![分支](/assets/branch3.png)

## 设置或修改分支的备注
rich branch -s \<分支名\> -desc \<message\>

```sh
rich branch -s f3 -desc '备注修改'
```

## 给分支做备注并赋链接
rich branch -b \<分支名\> -desc \<message\> -l \<url\>
```sh
rich branch -b f4 -desc 'hello world' -l 'https://nanjingcaiyong.github.io/caiyong.github.io/'
```
![分支](/assets/branch4.png)

图中虚线下划线是可点击的链接

## 分支同步

rich renew [\<分支名\>...]

```sh
# 删除本地及远程的指定分支，然后从master重新创建
rich renew sit pre
```