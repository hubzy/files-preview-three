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
  function ifCover(file) {
    return new Promise(function (resolve, reject) {
      fs.readdir(dir + '/' + file + '/assets', function (err, filesList) {
        if (err) {
          resolve('');
        }else{
          filesList.forEach((fileCover) => {
            if (fileCover.indexOf('cover.') != -1) {
              fs.access(dir + '/' + file + '/assets/' + fileCover, fs.constants.F_OK, (err) => {
                if (err) {
                  resolve('');
                }else{
                  resolve(file + '/assets/' + fileCover);
                }
              });
            }
          })
        }
      })
    });
  }
};

