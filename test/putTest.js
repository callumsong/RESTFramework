'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    expect = chai.expect,
    zoodleNumber = 0,
    testData = '{"test":"done"}';

require('../lib/put');
require('../index');
chai.use(chaihttp);

describe('A put request without the specified files', function() {
  before(function() {
    fs.readdir('data', function (err, data) {
      zoodleNumber = data.length + 1;
    });
  });
  it('should tell you it doesn\'t exist', function (done) {
    chai.request('localhost:3000')
      .put('/try-this/zoodle' + zoodleNumber)
      .send(testData)
      .end(function (err, res) {
        expect(res.text).eql('There\'s no file to replace, post it first');
        done();
      });
  });
});

describe('A put request with the specified file', function() {
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
  it('should tell you that it has been replaced', function (done) {
    chai.request('localhost:3000')
      .put('/try-this/zoodle' + zoodleNumber)
      .send(testData)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.text).eql('You have just replaced (put) zoodle' + zoodleNumber + '.json');
        done();
      });
  });
    it('should have replaced the values', function (done) {
    chai.request('localhost:3000')
      .put('/try-this/zoodle' + zoodleNumber)
      .send(testData)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(JSON.stringify(fs.readJsonSync('./data/zoodle' + zoodleNumber + '.json'))).eql(testData);
        done();
      });
  });
  after(function() {
  fs.unlinkSync('data/zoodle' + zoodleNumber + '.json');
  });
});