'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function sortByIsDirectory(dir, paths, cb) {
  // take the listing file names in `dir`
  // returns directory and file array, each entry is
  // of the array a [name, stat] tuple
  let pending = paths.length;
  const errs = [];
  const dirs = [];
  const files = [];

  if (!pending) {
    cb(errs, dirs, files);
    return;
  }

  for (const file of paths) {
    fs.stat(path.join(dir, file), (err, s) => {
      if (err) {
        errs.push([file, err]);
      } else if (s.isDirectory()) {
        ifCover(file).then((i) => {
          dirs.push([file, s, i]);
        })
      } else {
        if (file != '.DS_Store') {
          files.push([file, s]);
        }
      }

      pending -= 1;
      if (pending === 0) {
        cb(errs, dirs, files);
      }
    });
  };

  //传入文件名称，判断路径下是否含后‘assets’文件夹，没有便结束返回空值
  //当有‘assets’时，遍历文件夹寻找含有‘cover.’文件，没有便 ii计数器+1 ，有的话返回路径
  //计数器记录的值，判断不符合条件的次数，不符合次数等于文件数便返回空值

  function ifCover(file) {
    return new Promise(function (resolve, reject) {
      fs.readdir(dir + '/' + file + '/assets', function (err, filesList) {
        if (err) {
          resolve('');
        } else {
          // console.log(file)
          var ii=0;
          filesList.forEach((fileCover) => {
            if (fileCover.indexOf('cover.') != -1) {
              resolve(file + '/assets/' + fileCover);
            } else { 
              ii ++ 
            }
          })
          if (filesList.length == ii) {
            resolve('');
          }
        }
      })
    });
  }
};

