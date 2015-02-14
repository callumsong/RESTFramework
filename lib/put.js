'use strict';
var fs = require('fs-extra');

module.exports = function (req, res, fileName) {
  var input ='';
  req.on('data', function (data) {
    input += data.toString('utf-8');
  });
  req.on('end', function() {
    var parsed = JSON.parse(input),
        stringed = JSON.stringify(parsed);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.writeFile('./data/' + fileName, stringed, function(err, data){
      res.write('You have just replaced (put) ' + fileName);
      res.end();
    });
  });
};