
# 如何使用 RSS 订阅 Sketch 组件库

## 一、生成组件库订阅地址
1.  设计并制作组件库文件;
>如何创建一个组件库： [Creating a Library](https://www.sketch.com/docs/designing/libraries/creating-a-library/)；
3.  使用 [Http-server](https://github.com/http-party/http-server) 、[Files preview](https://gitee.com/Jioho/files-preview) 或其他工具/平台（如内部OSS）为组件库文件创建一个在线地址；
5.  新建一个 xml 文件，并写入以下内容：

```
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>My Sketch Library</title>
    <description>My Sketch Library</description>
    <image>
      <url></url>
      <title>My Sketch Library</title>
    </image>
    <generator>Sketch</generator>
    <item>
      <title>My Sketch Library</title>
      <pubDate>Wed, 23 Jun 2019 11:19:04 +0000</pubDate>
      <enclosure url="mysketchlibrary.sketch" type="application/octet-stream" sparkle:version="1"/>
    </item>
  </channel>
</rss>
```
部分配置说明：
-   `<title>`  — Sketch 中显示的组件库名称
-   `<image><url>` — 默认预览图会使用 library 里的 [Library Preview](https://www.sketch.com/docs/designing/libraries/create-a-custom-library-thumbnail/) 画板，你也可以在这个地方填入一个在线地址来使用一张在线图片作为封面。
-   `<item>` —  在创建库的新版本时你需要更新这个标签中的信息，本 xml 文件中仅需要一个item标签
item中的部分配置说明：
-   `<pubDate>`  — 以 RFC822 格式发布库更新的日期
-   `<enclosure>` — enclosure 标签里三个属性：url、type 和 sparkle:version。URL 应该直接指向您的库文档的服务器位置（即第2步生成的文件链接地址），类型应该是“application/octet-stream”，最后 sparkle:version 是一个随着每次新更新而增加的数字，如不增加则无法推送新版本到订阅者手上。
5. 完成以上配置后，用和第 2 步同样的方法为 xml 文件生成一个在线链接；
6. 使用 [Meyerweb URL encoder](https://meyerweb.com/eric/tools/dencoder/)或类似编码工具，对链接重新编码；
7. 将编码后的链接地址添加到以下的代码之后，得到最终的完整订阅地址：
```sketch://add-library?url=```

### 备注
- 虽然官方文档上写明必须使用 https 链接，但经测试 http 也是可以的；
- 组件库文件与 XML 文件需要放置在同一层级下；
## 二、添加组件库
复制完整的订阅地址到浏览器的地址栏中后点击跳转，会弹出打开 Sketch 的提示，点击打开后即安装成功。

## 三、更新
1. 组件库文件进行更新后，覆盖原有文件；
2. 更新 XML 文件中的 sparkle:version；
3. 其他成员在 Sketch 内会收到更新提示，有增加内容时，需在 Preference 中的 Libraries 下载更新；

## 四、参考文档

- 官方文档地址：[Sharing a Library](https://www.sketch.com/docs/designing/libraries/sharing-a-library/)

组件库更新记录
### 1109（1.0.0）
- 整理文件
- 增加图标
 - 主页功能图标
 - 撤销、重做
- 颜色样式准备（等洁莹处理）
- Vant 组件库熟悉
- 原有文件（采编/一起剪）整理情况

### 1110（1.0.1~1.0.6）
- [x] POPUP 修改
 - [x] 标题调整到位置，预计左侧增加返回功能
 - [x] 删除分隔线，样式与媒资管理对齐
 - [x] 标题区域高度调整到48
- [x] 颜色样式更新到组件上
- [x] 组件库转移到本地网络地址，使用订阅更新
- [x] 增加元素选中框
 - [x] 调整默认大小为120
- [x] 图标
 - [x] 增加 color
  - [x] 调整为圆形，与Web保持一致
 - [x] 旧版本中的新图标，部分大小未调整
 - [x] 1109新增图标应用颜色样式
- [x] 增加对话框Dialog
 - [x] dialog内容高宽限制：padding 24 ，高度自适应变化
 - [x] dialog默认文本调整
 - [x] 调整默认文本、图层顺序
- [x] 增加单元格Cell
 - [x] 标题+内容
 - [x] 标题+开关
- [x] 开关更换为 Vant 样式
