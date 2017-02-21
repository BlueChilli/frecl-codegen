'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var mkdirp = require('mkdirp');

exports.default = function (targetPath, data) {

  var pathOfFile = _path2.default.dirname(targetPath);

  mkdirp(pathOfFile, function (err) {
    if (err) console.error(err);
  });

  fs.writeFile(targetPath, data, function (err) {
    if (err) console.log(err);
  });
};