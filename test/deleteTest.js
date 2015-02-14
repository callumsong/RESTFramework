'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    expect = chai.expect;

require('../lib/delete');
require('../index');
chai.use(chaihttp);

describe('A delete request', function() {
  var zoodleNumber = 0;
  before(function() {
    fs.readdir('data', function (err, data){
      zoodleNumber = data.length + 1;
      fs.writeFile('data/zoodle'+ zoodleNumber + '.json', function (err, data) {
        console.log('The test file\'s 15 seconds of fame');
      });
    });
  });
  it('should have deleted a file', function (done) {
    chai.request('localhost:3000')
      .delete('/try-this/zoodle' + zoodleNumber)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(fs.readdirSync('data').length).eql(zoodleNumber - 1);
        done();
      });
  });
});