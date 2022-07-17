const url = require('url')
const path = require('path')
var marked = require('marked')
const fs = require('fs')
var readFileSync = fs.readFileSync
const { getMdTree } = require('./md-tree')

module.exports = opts => {
  const baseDir = opts.baseDir
  const root = path.resolve(opts.root)
  var fileTree = null

  return function middleware(req, res, next) {
    const parsed = url.parse(req.url)
    const pathname = decodeURIComponent(parsed.pathname)
    const dir = path.normalize(path.join(root, path.relative(path.join('/', baseDir), pathname)))
    const Take = pathname.lastIndexOf("/") + 1;
    const parsedFile =pathname.substring(0,Take);
    const mdPath = root + parsedFile;
    console.log(pathname)
    fileTree = getMdTree(root,parsedFile)
    

    fs.readFile(path.resolve(__dirname, 'template/index.html'), 'utf8', (err, data) => {
      if (err) {
        return
      }
      let content = marked(readFileSync(dir, { encoding: 'utf8' }))
      data = data.replace(/'{{fileTree}}'/, JSON.stringify(fileTree)).replace(/{{contentHTML}}/, content)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
  }
}
