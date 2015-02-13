'use strict';
var fs = require('fs-extra');

module.exports = function(req, res) {
  var fileNumber = 0;
  var input = '';
  req.on('data', function(data) {
    input += data.toString('utf-8');
  });
  req.on('end', function() {
    var parsed = JSON.parse(input);
    var stringed = JSON.stringify(parsed);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readdir('./data', function (err, data) {
      fileNumber = data.length;
      fs.writeFile('./data/zoodle' + Number(Number(fileNumber) + 1) + '.json', stringed, 'utf-8', function (err, data) {
          res.write('File has been created');
            res.end();
      });
    });
  });
};