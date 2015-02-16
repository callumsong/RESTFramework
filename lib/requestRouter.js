'use strict';

var deleteRequest = require('./delete.js'),
    getRequest = require('./get.js'),
    patchRequest = require('./patch.js'),
    postRequest = require('./post.js'),
    putRequest = require('./put.js');

var epicRouter = function(){};

epicRouter.prototype.DELETE = deleteRequest;
epicRouter.prototype.GET = getRequest;
epicRouter.prototype.PATCH = patchRequest;
epicRouter.prototype.POST = postRequest;
epicRouter.prototype.PUT = putRequest;

module.exports = new epicRouter();