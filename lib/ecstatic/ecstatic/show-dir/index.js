'use strict'

const styles = require('./styles')
const permsToString = require('./perms-to-string')
const sizeToString = require('./size-to-string')
const sortFiles = require('./sort-files')
const fs = require('fs')
const path = require('path')
const he = require('he')
const etag = require('../etag')
const url = require('url')
const status = require('../status-handlers')

const supportedIcons = styles.icons
const css = styles.css

module.exports = opts => {
  // opts are parsed by opts.js, defaults already applied
  const cache = opts.cache
  const root = path.resolve(opts.root)
  const baseDir = opts.baseDir
  const humanReadable = opts.humanReadable
  const hidePermissions = opts.hidePermissions
  const handleError = opts.handleError
  const showDotfiles = opts.showDotfiles
  const si = opts.si
  const weakEtags = opts.weakEtags

  return function middleware(req, res, next) {
    // Figure out the path for the file from the given url
    const parsed = url.parse(req.url)
    const pathname = decodeURIComponent(parsed.pathname)
    const dir = path.normalize(path.join(root, path.relative(path.join('/', baseDir), pathname)))

    fs.stat(dir, (statErr, stat) => {
      if (statErr) {
        if (handleError) {
          status[500](res, next, { error: statErr })
        } else {
          next()
        }
        return
      }

      // files are the listing of dir
      fs.readdir(dir, (readErr, _files) => {
        let files = _files

        if (readErr) {
          if (handleError) {
            status[500](res, next, { error: readErr })
          } else {
            next()
          }
          return
        }

        // Optionally exclude dotfiles from directory listing.
        if (!showDotfiles) {
          files = files.filter(filename => filename.slice(0, 1) !== '.')
        }

        // 关闭目录下有MD自动打开文档模式
        // // feature - 目录下有MD自动打开文档模式
        // let hasMdFile = files.some(item => {
        //   var nameArr = item.split('.')
        //   var ext = nameArr.pop().toLowerCase()
        //   if (ext === 'md' && item.indexOf('.md') !== -1) {
        //     status[301](res, next, { url: req.url + encodeURI(item) })
        //     return true
        //   }
        // })
        // if (hasMdFile) return

        res.setHeader('content-type', 'text/html')
        res.setHeader('etag', etag(stat, weakEtags))
        res.setHeader('last-modified', new Date(stat.mtime).toUTCString())
        res.setHeader('cache-control', cache)

        function render(dirs, renderFiles, lolwuts) {
          let datas = { dirs, renderFiles, lolwuts, current: pathname }

          fs.readFile(path.resolve(__dirname, 'template/index.html'), 'utf8', (err, data) => {
            if (err) {
              return
            }

            data = data.replace(/'{{treeData}}'/, JSON.stringify(datas))
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(data)
          })
        }

        sortFiles(dir, files, (lolwuts, dirs, sortedFiles) => {
          // It's possible to get stat errors for all sorts of reasons here.
          // Unfortunately, our two choices are to either bail completely,
          // or just truck along as though everything's cool. In this case,
          // I decided to just tack them on as "??!?" items along with dirs
          // and files.
          //
          // Whatever.

          // if it makes sense to, add a .. link
          if (path.resolve(dir, '..').slice(0, root.length) === root) {
            fs.stat(path.join(dir, '..'), (err, s) => {
              if (err) {
                if (handleError) {
                  status[500](res, next, { error: err })
                } else {
                  next()
                }
                return
              }
              dirs.unshift(['..', s])
              render(dirs, sortedFiles, lolwuts)
            })
          } else {
            render(dirs, sortedFiles, lolwuts)
          }
        })
      })
    })
  }
}
