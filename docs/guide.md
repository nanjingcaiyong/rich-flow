# 介绍

## 安装

```sh
npm i rich-flow -g
```

## 查看项目模板

```sh
rich list
```

![项目模板](/assets/templates.png)

## 初始化模板

进入你想创建项目的目录，使用 `rich init <template>` 命令即可创建项目


## 创建项目目录并初始化模版

rich init \<template\> \<project\>

```sh
rich init mpa hello-world
```

![初始化项目](/assets/init.png)

## 利用缓存的模版初始化项目

为了提高二次使用模板的效率，可以添加 --offline 选项，提高初始化项目速度

```sh
rich init mpa hello-world --offline
```