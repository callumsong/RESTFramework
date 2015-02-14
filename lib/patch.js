'use strict';
var fs = require('fs-extra');

module.exports = function (req, res, fileName) {
  var input = '';
  req.on('data', function (data){
    input += data.toString('utf-8');
  });
  req.on('end', function() {
    var parsedInput = JSON.parse(input),
        inputKeys = Object.keys(parsedInput),
        oldFile = fs.readJsonSync('./data/' + fileName),
        oldKeys = Object.keys(oldFile);
    oldKeys.forEach(function (key){
      if(inputKeys.indexOf(key) > -1){
        oldFile[key] = parsedInput[key];
      }
        oldFile[key] = oldFile[key];
    });
    fs.writeFile('./data/' + fileName, JSON.stringify(oldFile), function (err, data){
      if(err) {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.write('there is nothing to replace');
        res.end();
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('all patched up');
      res.end();
    });
  });
};