'use strict';
var chai = require('chai'),
    chaihttp = require('chai-http'),
    fs = require('fs-extra'),
    expect = chai.expect,
    zoodleNumber = 0,
    testData = '{"test":"done"}';

require('../lib/patch');
require('../index');
chai.use(chaihttp);

describe('A patch request for the incorrect file', function() {
  before(function (){
    fs.readdir('data', function (err, data) {
      zoodleNumber = data.length + 1;
    }); 
  });
  it('should tell you there is nothing to replace', function (done) {
    chai.request('localhost:3000')
      .patch('/try-this/zoodle' + zoodleNumber)
      .send(testData)
      .end(function (err, res) {
        expect(res.text).eql('there is nothing to replace');
        done();
      });
  });
});

describe('A patch request with the specified file', function() {
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
  it('should tell you that it has been patched', function (done) {
    chai.request('localhost:3000')
      .patch('/try-this/zoodle' + zoodleNumber)
      .send(testData)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.text).eql('all patched up');
        expect(JSON.stringify(fs.readJsonSync('./data/zoodle' + zoodleNumber + '.json'))).eql(testData);
        done();
      });
  });
  after(function() {
  fs.unlinkSync('data/zoodle' + zoodleNumber + '.json');
  });
});