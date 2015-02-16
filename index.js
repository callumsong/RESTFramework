'use strict';

var app = require('./app.js');

app.addRoute('try-this');

app.zing(3000, function (err, data) {
  console.log('ZING ZING');
});