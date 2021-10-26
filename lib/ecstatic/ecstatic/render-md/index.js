const url = require('url')
const path = require('path')
var marked = require('marked')
var readFileSync = require('fs').readFileSync

module.exports = opts => {
  const baseDir = opts.baseDir
  const root = path.resolve(opts.root)

  return function middleware(req, res, next) {
    const parsed = url.parse(req.url)
    const pathname = decodeURIComponent(parsed.pathname)
    const dir = path.normalize(path.join(root, path.relative(path.join('/', baseDir), pathname)))

    let mdHtml = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>files-preview</title>
        <meta name="referrer" content="never">
      </head>
      <body>
      `
    mdHtml += marked(readFileSync(dir, { encoding: 'utf8' }))
    mdHtml += `</body></html>`
    res.setHeader('content-type', 'text/html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(mdHtml)
  }
}
