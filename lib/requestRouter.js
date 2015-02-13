'use strict';

var deleteRequest = require('./delete.js'),
    getRequest = require('./get.js'),
    patchRequest = require('./patch.js'),
    postRequest = require('./post.js'),
    putRequest = require('./put.js');

var App = function(){};

App.prototype.DELETE = deleteRequest;
App.prototype.GET = getRequest;
App.prototype.PATCH = patchRequest;
App.prototype.POST = postRequest;
App.prototype.PUT = putRequest;

module.exports = new App();