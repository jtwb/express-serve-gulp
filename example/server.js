'use strict';

var path = require('path');
var express = require('express');
var serve_gulp = require('express-serve-gulp');
var morgan = require('morgan');
var app = express();


app.use(morgan('combined'));
app.use(serve_gulp(path.resolve('./assets/')))


app.get('/', function(req, res) {
  res.send({ status: 'ok' });
});


var server = app.listen(9180, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Really fun example app listening at http://%s:%s/', host, port)

});
