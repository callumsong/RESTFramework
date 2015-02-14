'use strict';
var fs = require('fs-extra');

module.exports = function (req, res, fileName) {
  var input ='',
      existingFiles;
  req.on('data', function (data) {
    input += data.toString('utf-8');
    existingFiles = fs.readdirSync('data');
  });
  req.on('end', function() {
    var parsed = JSON.parse(input),
        stringed = JSON.stringify(parsed);
    if (existingFiles.indexOf(fileName) > -1) {
      fs.writeFile('./data/' + fileName, stringed, function (err, data){
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('You have just replaced (put) ' + fileName);
        res.end();
      });
    } else {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.write('There\'s no file to replace, post it first');
        res.end();
    }
  });
};