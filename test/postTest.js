'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs-extra');
require('../lib/post');

chai.use(chaihttp);

var expect = chai.expect;


describe('A post request', function() {
  var newData = '{"new": "data"}';
  after(function() {
    fs.readdir('data', function (err, data){
      fs.unlink('data/' + data[data.length -1].toString(), function (err, data) {
        console.log('test removed');
      });
    });
  });
  it ('tells the screen the file has been created', function(done) {
    chai.request('localhost:3000')
      .post('/request')
      .send(newData)
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.text).eql('File has been created');
        done();
      });
  });
});