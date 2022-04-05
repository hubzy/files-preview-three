# 简介

files-preview 是一个基于 [http-server](https://github.com/http-party/http-server) 的优化项目，在保留原有功能的同时添加了一些新功能。



# 为什么而做？

目前设计和开发协作上，主要有以下几种模式：

1. 使用在线协作平台，如蓝湖、摹客、CoDesign 和 Zeplin 等；
2. 导出离线标注文件，例如 Sketch 的 Measure 和 Figma 的 Heron Handoff ；
3. 使用 Figma 或类似的新设计工具（最近国内上线了不少）；
3. 文件预览、模型预览、设计稿预览

本项目是对第 2 个场景的一个扩展。



# 新增功能

## 全新的 GUI

对 http-server 的界面进行调整，现在它有了一个全新的图形化界面。
![（左）http-server（右）files-preview](https://images.gitee.com/uploads/images/2021/0816/000817_6b47ae35_8421994.png 'Frame 11.png')


## 增加「三维模型预览」

支持三维模型 '.glb', .'gltf' 文件的预览及模型下载，方便浏览和查找所需的模型文件。




## 增加「文档模式」
当文件夹内包含 md 格式的文件时，打开该文件夹将会自动进入文档模式。
![](https://gitee.com/Jioho/img/raw/master/tinymce/20211218231040.png)


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

### 终端
在需要开启服务器的文件夹下打开终端，运行以下命令

```
files-preview [path] [options]
```

`[]` 内容均为非必填参数，感兴趣的可以看下 http-server 的参数描述 [Http-server-readme](./Http-server-readme.md)

`[path]` 为要展示的根目录。 默认为 `./public` if the folder exists, and `./` otherwise.

> path 为展示的文件的根目录，默认是展示当前目录下所有的文件和子文件夹的问题
> 如果在当前目录下还有一个名为 `public` 的目录，那么根目录会默认指向到 public 文件夹中

现在可以访问 [http://localhost:8080](http://localhost:8080/) 或终端显示的地址来查看你的服务器。

### macOS 自动操作
在 1.1 版本中，我们为 macOS 用户提供了一个自动操作来开启 Files-preview ，安装完成后，在选中文件夹时，点击右键「 服务 - 快速开启 FP 服务」就可以快速启动服务。

快速操作下载地址：[自动操作 - 快速开启 FP 服务](https://gitee.com/Jioho/files-preview/raw/master/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%90%AF%20FP%20%E6%9C%8D%E5%8A%A1.zip)，解压后双击安装即可。

![](https://gitee.com/Jioho/img/raw/master/tinymce/20211218231103.png)


更多功能可查看 http-server 的说明文档，虽然没有一一进行过测试，但原版的所有功能应该都是支持的。

我们对以上文档进行了简单翻译，可在以下地址查阅：[Http-server-readme](./Http-server-readme.md)

## 更新

下载源代码或使用`git`clone 拉取代码

```bash
git clone https://gitee.com/hubzyy/files-preview-three.git
cd files-preview-three/
npm install
//默认启动文件夹 ./example
npm run server
//可自定义文件夹
nodemon ./bin/files-preview 绝对文件夹路径
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

- 提交[Issue](https://gitee.com/hubzyy/files-preview-three/issues)

备注：MeaXure ，进行了新版本的适配和功能更新 [MeaXure](https://gitee.com/hubzyy/sketch-meaxure)。

# 更新日志

## 1.1.0
- **新增文档模式**
- 支持预览 gif、bmp、webp、tif、svga 格式文件
- 项目封面支持 gif 格式
- 修复了 CentOS 下的运行问题
- 优化图片预览体验
