'use strict';
var fs = require('fs-extra');

module.exports = function (req, res, fileName) {
  var parsedFile = fs.readJSON('./data/' + fileName, function (err, data) {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.write('Sorry '+ fileName + ' doesn\'t exist, you might have to post a new one');
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
    res.write(JSON.stringify(data));
    res.end();
  }
  });
};