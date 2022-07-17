var fs = require('fs')
var path = require('path')

let fileTree = {}

var handle = {
  getMdTree(root, parsedFile) {
    console.log(parsedFile)
    let pathname = parsedFile.split("/").slice(-2)[0];
    let files = handle.findMdFile(root, parsedFile,pathname)
    fileTree[root] = files
    return files || {}
    // if (fileTree[root]) {
    //   return fileTree[root]
    // } else {
    // }
  },

  findMdFile(root, baseRoot,pathname) {
    let tree = {
      name: pathname,
      path: baseRoot,
      relative: baseRoot,
      children: [],
      files: []
    }
    fs.readdir(path.join(root, baseRoot), (err, files) => {
      if (files) {
        files = files.filter(filename => filename.slice(0, 1) !== '.')
        files.forEach(function (item, index) {
          if (item.indexOf('.md') != -1) {
            let nameArr = item.split('.')
            nameArr.pop()
            let name = nameArr.join('.')
            tree.files.push({
              name: name,
              path: baseRoot + item,
              relative: baseRoot + item
            })
          }
        })
      }
    })
    // console.log('tree', tree)
    return tree
  }
}

module.exports = handle
