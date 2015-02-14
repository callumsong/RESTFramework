'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    expect = chai.expect,
    zoodleNumber = 0;

require('../lib/get');
require('../index');
chai.use(chaihttp);

describe('A get request without the specified files', function() {
  before(function() {
    fs.readdir('data', function (err, data) {
      zoodleNumber = data.length + 1;
    });
  });
  it('should tell you it doesn\'t exist', function (done) {
    chai.request('localhost:3000')
      .get('/try-this/zoodle' + zoodleNumber)
      .end(function (err, res) {
        expect(res.text).eql('Sorry zoodle' + zoodleNumber + '.json doesn\'t exist, you might have to post a new one');
        done();
      });
  });
});

describe('A get request with the specified file', function() {
  var newData = '{"test":"data"}';
  before(function() {
    chai.request('localhost:3000')
      .post('/try-this')
      .send(newData)
      .end(function (err, res){
      fs.readdir('data', function (err, data) {
        zoodleNumber = data.length;
      });
    });
  });
  it('should give you the contents of the file', function (done) {
    chai.request('localhost:3000')
      .get('/try-this/zoodle' + zoodleNumber)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.text).eql(newData);
        done();
      });
  });
  after(function() {
    fs.unlinkSync('data/zoodle' + zoodleNumber + '.json');
  });
});