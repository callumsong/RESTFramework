'use strict';

var fs = require('fs-extra');

module.exports = function (req, res, fileName) {
  if (fileName === 'zoodles.json') {
    fs.remove('./data', function (err, data){
      fs.mkdirs('./data', function (err, data){
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('All zoodles deleted');
        res.end();
      });
    });
  } else {
      res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.unlink('./data/' + fileName, function(err, data) {
      res.write(fileName + ' deleted');
      res.end();
    });
  }
};