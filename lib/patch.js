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
        oldKeys;
    var oldFile = fs.readJson('./data/' + fileName, function (err, data) {
      if(err) {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.write('there is nothing to replace');
        res.end();
      } else {
        oldKeys = Object.keys(data);
        oldKeys.forEach(function (key){
          if(inputKeys.indexOf(key) > -1){
            data[key] = parsedInput[key];
          }
            data[key] = data[key];
        });
        fs.writeFileSync('./data/' + fileName, JSON.stringify(data));
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('all patched up');
        res.end();
      }
    });
  });
};