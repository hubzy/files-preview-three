const url = require('url')
const path = require('path')
var marked = require('marked')
const fs = require('fs')
var readFileSync = fs.readFileSync
const { getMdTree } = require('./md-tree')

module.exports = opts => {
  const baseDir = opts.baseDir
  const root = path.resolve(opts.root)

  let fileTree = getMdTree(root)

  return function middleware(req, res, next) {
    const parsed = url.parse(req.url)
    const pathname = decodeURIComponent(parsed.pathname)
    const dir = path.normalize(path.join(root, path.relative(path.join('/', baseDir), pathname)))

    fs.readFile(path.resolve(__dirname, 'template/index.html'), 'utf8', (err, data) => {
      if (err) {
        return
      }
      let content = marked(readFileSync(dir, { encoding: 'utf8' }))
      data = data.replace(/'{{fileTree}}'/, JSON.stringify(fileTree)).replace(/{{contentHTML}}/, content)
      fs.readFile(path.resolve(__dirname, 'template/index.css'), 'utf8', (cssError, cssData) => {
        if (cssData) {
          data = data.replace(
            '<style src="./index.css"></style>',
            `<style type="text/css">${cssData}</style>`
          )
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    })
  }
}
