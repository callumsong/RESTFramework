'use strict';

var http = require('http'),
    requestRoutes = require('./lib/requestRouter.js'),
    url = require('url'),
    validRoutes = [],
    App = function(){};

var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname,
      fileStart = Number(pathname.lastIndexOf('/')) + 1,
      firstSlash = pathname.indexOf('/'),
      lastSlash = pathname.lastIndexOf('/'),
      validPath = pathname.substr(firstSlash, lastSlash),
      fileName = pathname.substr(fileStart, pathname.length) + '.json';
  if(validRoutes.indexOf(validPath)) {
    requestRoutes[req.method](req,res,fileName);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('page is either unRESTful or not found, probably latter');
    res.end();
  }
});

App.prototype.zing = function(address, callback){
  server.listen(address, callback);
};

App.prototype.addRoute = function(route) {
  validRoutes.push(route);
};

module.exports = new App();