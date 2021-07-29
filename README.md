# 简介

files-preview 是一个基于 [http-server](https://github.com/http-party/http-server) 的优化项目，在保留原有功能的同时添加了一些新功能。

# 为什么而做？

目前设计和开发协作上，主要有以下几种模式：

1. 使用在线协作平台，如蓝湖、摹客、CoDesign 和 Zeplin 等；
2. 导出离线标注文件，例如 Sketch 的 Measure 和 Figma 的 Heron Handoff ；
3. 使用 Figma 或类似的新设计工具（最近国内上线了不少）；

本项目是对第 2 个场景的一个扩展。

## Measure 对项目管理的缺失

使用 Measure 只能对单文件导出标注文档，在涉及多文件及多个版本的文件管理上一直没有一个较好的方式来管理。
在 Measure 论坛上也有人曾经提出过类似的疑问。

## Measure Plus 的小尝试

我曾经和另一位朋友尝试做了一个叫 Measure Plus 的小工具来对原插件进行改善，大致的样子如下：

![](https://gitee.com/Jioho/img/raw/master/knowledge/20210724194101.jpg)

在使用过程中，大量文件的管理和目录的更新上并没有想象中便捷，在没有更好的想法的情况下就暂时搁置了。

## 基于具体场景对 http-server 进行改进

前一段时间，把 http-server 结合 Measure 使用后，觉得这是一个不错的方式，于是产生了在设计交付这个具体场景上来对 http-server 进行优化的想法。

# 新增功能

## 全新的 GUI

对 http-server 的界面进行调整，现在它有了一个全新的图形化界面。

## 增加「项目」类型

文件夹新增「项目」类型，可通过在 assets 文件夹（使用 Measure 插件会自动生成一个，也能手动添加）中增加 cover.png 来使该文件夹成为「项目」。

## 图片及 svg 预览

支持图片以及 svg 文件的预览，方便浏览和查找所需的图片文件。

# 使用方法

## 安装

通过 `npm` 进行全局安装，打开终端后输入以下命令：

```
npm install --global files-preview
```

这样能够全局安装 files-preview，你可以在任何地方使用命令行运行该工具。

> 使用 mac 并且要全局安装的话，请尝试加上 sudo 进行安装 `sudo npm install --global files-preview`

## 使用

在需要开启服务器的文件夹下打开终端，运行以下命令

```
files-preview [path] [options]
```

`[]` 内容均为非必填参数，感兴趣的可以看下 http-server 的参数描述 [Http-server-readme](./Http-server-readme.md)

`[path]` 为要展示的根目录。 默认为 `./public` if the folder exists, and `./` otherwise.

> path 为展示的文件的根目录，默认是展示当前目录下所有的文件和子文件夹的问题
> 如果在当前目录下还有一个名为 `public` 的目录，那么根目录会默认指向到 public 文件夹中

现在可以访问 [http://localhost:8080](http://localhost:8080/) 或终端显示的地址来查看你的服务器。

更多功能可查看 http-server 的说明文档，虽然没有一一进行过测试，但原版的所有功能应该都是支持的。

我们对以上文档进行了简单翻译，可在以下地址查阅：[Http-server-readme](./Http-server-readme.md)

## 更新

通过 `npm` 进行更新，打开终端后输入以下命令：

```
npm install --global files-preview
```

这样能够全局安装/更新 files-preview，你可以在任何地方使用命令行运行该工具。

> 使用 mac 并且要全局更新的话，请尝试加上 sudo 进行安装 `sudo npm install --global files-preview`

# 它有什么优势？

## 方便易用

基本不需要任何代码能力的都能轻松安装和部署，相对于原版，更适合设计文件的管理与交付。

## 作为静态 html 文件的部署工具

基于各种原因，使用 Measure 或 Heron Handoff 这样的工具进行交付的团队依然不在少数。这个项目，就是为你们而做的。
除了以上提到的工具以外，Files-preview 可以对任意的静态 html 文件进行部署，比如 Axure 或 Principle 生成的 html 文件。

# 反馈及联系

- 提交[Issue](https://gitee.com/Jioho/files-preview/issues)

备注：Measure 插件已暂停更新，有其他的开发者为其进行了新版本的适配和功能更新，并更名为 [MeaXure](https://gitee.com/Jioho/sketch-meaxure)，以上提到的 Measure 可等同于 MeaXure 来理解。
