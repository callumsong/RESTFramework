'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    expect = chai.expect;

require('../lib/delete');
chai.use(chaihttp);

describe('A delete request', function() {
  it('should have deleted all files', function(done) {
    chai.request('localhost:3000')
      .delete('/request')
      .end(function (err, res) {
        expect(err).eql(null);
        expect(fs.readdirSync('data').length).eql(0);
        done();
      });
  });
});