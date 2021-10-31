var fs = require('fs')
var path = require('path')

let fileTree = {}

var handle = {
  getMdTree(root) {
    if (fileTree[root]) {
      return fileTree[root]
    } else {
      let files = handle.findMdFile(root, root, '/')
      fileTree[root] = files
      return files || {}
    }
  },

  findMdFile(baseRoot = '/', root = '/', name) {
    let tree = {
      name: name,
      path: root,
      relative: root.replace(baseRoot, '').replace(/\\/g, '/') || '/'
    }
    let files = fs.readdirSync(root)
    let hasFile = false
    // let mdFiles = []
    files.forEach(function (item, index) {
      let fPath = path.join(root, item)
      let stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        let children = handle.findMdFile(baseRoot, fPath, item)
        if (!tree.children) {
          tree.children = []
        }
        if (children) {
          tree.children.push(children)
          hasFile = true
        }
      }
      if (stat.isFile() === true && path.extname(item) === '.md') {
        hasFile = true
        if (!tree.files) {
          tree.files = []
        }

        tree.files.push({
          name: item,
          path: fPath,
          relative: fPath.replace(baseRoot, '').replace(/\\/g, '/') || '/'
        })
      }
    })

    return hasFile ? tree : null
  }
}

module.exports = handle
