'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    expect = chai.expect;

require('../lib/patch');
require('../index');
chai.use(chaihttp);