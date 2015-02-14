'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    newData = '{"test":"data"}',
    zoodleNumber = 0;

require('../lib/post');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;


describe('A post request', function() {
  before(function() {
    fs.readdir('data', function (err, data) {
      zoodleNumber = data.length + 1;
    });
  });
  it('tells the screen the file has been created', function (done) {
    chai.request('localhost:3000')
      .post('/try-this')
      .send(newData)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.text).eql('File has been created');
        done();
      });
  });
  after(function() {
    fs.unlinkSync('data/zoodle' + zoodleNumber + '.json');
  });
});