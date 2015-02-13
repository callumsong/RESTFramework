'use strict';

var fs = require('fs-extra');

module.exports = function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.remove('data', function (err, data) {
    fs.mkdirs('data', function (err, data) {
      res.write('All data deleted');
      res.end();
    });
  });
};