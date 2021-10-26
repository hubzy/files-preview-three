const url = require('url')
const path = require('path')
var marked = require('marked')
const fs = require('fs')
var readFileSync = fs.readFileSync

module.exports = opts => {
  const baseDir = opts.baseDir
  const root = path.resolve(opts.root)

  return function middleware(req, res, next) {
    const parsed = url.parse(req.url)
    const pathname = decodeURIComponent(parsed.pathname)
    const dir = path.normalize(path.join(root, path.relative(path.join('/', baseDir), pathname)))

    fs.readFile(path.resolve(__dirname, 'theme/index.css'), 'utf8', (cssError, cssData) => {
      let mdHtml = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>files-preview</title>
          <meta name="referrer" content="never">
          <style type="text/css">${cssData}</style>
        </head>
        <body>


        <header class="navbar"><div class="sidebar-button"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg></div></header>

      
        <div class="theme-container ">
          <div class="page">
          <div class="content">
        `
      
        // sidebar-open
      mdHtml += marked(readFileSync(dir, { encoding: 'utf8' }))
      mdHtml += `</div>
          </div>

          <div class="sidebar">
            <ul class="sidebar-links">
            <li><div class="sidebar-group first"><p class="sidebar-heading open"><span>默认主题配置(default theme config)</span><!----></p><ul class="sidebar-group-items"><li><a href="/vuepress/default-theme-config/#主页-homepage" class="sidebar-link">主页(Homepage)</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#导航链接-navbar-links" class="sidebar-link">导航链接(navbar links)</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#侧边栏-sidebar" class="sidebar-link">侧边栏(sidebar)</a><ul class="sidebar-sub-headers"><li class="sidebar-sub-header"><a href="/vuepress/default-theme-config/#嵌套标题链接-nested-header-links" class="sidebar-link">嵌套标题链接(nested header links)</a></li><li class="sidebar-sub-header"><a href="/vuepress/default-theme-config/#侧边栏组-sidebar-groups" class="sidebar-link">侧边栏组(sidebar groups)</a></li><li class="sidebar-sub-header"><a href="/vuepress/default-theme-config/#多个侧边栏-multiple-sidebars" class="sidebar-link">多个侧边栏(multiple sidebars)</a></li><li class="sidebar-sub-header"><a href="/vuepress/default-theme-config/#单页自动补充工具栏-auto-sidebar-for-single-pages" class="sidebar-link">单页自动补充工具栏(auto sidebar for single pages)</a></li><li class="sidebar-sub-header"><a href="/vuepress/default-theme-config/#禁用侧边栏-disabling-the-sidebar" class="sidebar-link">禁用侧边栏(disabling the sidebar)</a></li></ul></li><li><a href="/vuepress/default-theme-config/#上一页-下一页链接-prev-next-links" class="sidebar-link">上一页/下一页链接(prev / next links)</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#github-仓库和编辑链接" class="sidebar-link">GitHub 仓库和编辑链接</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#简单的-css-覆盖" class="sidebar-link">简单的 CSS 覆盖</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#custom-page-class" class="active sidebar-link">custom page class</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#特定页面的自定义布局-custom-layout-for-specific-pages" class="sidebar-link">特定页面的自定义布局(custom layout for specific pages)</a><ul class="sidebar-sub-headers"></ul></li><li><a href="/vuepress/default-theme-config/#ejecting" class="sidebar-link">Ejecting</a><ul class="sidebar-sub-headers"></ul></li></ul></div></li></ul>
          </div>
        </div>
        </body>

      </html>`
      res.setHeader('content-type', 'text/html')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(mdHtml)

      // if (cssData) {
      //   data = data.replace('<style src="./index.css"></style>', `<style type="text/css">${cssData}</style>`)
      // }

      // res.writeHead(200, { 'Content-Type': 'text/html' })
      // res.end(data)
    })
  }
}
