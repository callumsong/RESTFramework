'use strict';

var http = require('http'),
    requestRoutes = require('./lib/requestRouter.js');

var server = http.createServer(function (req,res) {
  var routes = {};
  routes['/request'] = requestRoutes[req.method];
  if(typeof(routes[req.url]) === 'function') {
    routes[req.url](req,res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('page is either UNRESTFul or not found, probably latter');
    res.end();
  }
});

server.listen(3000, function() {
  console.log('RESTFully listening');
});