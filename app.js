'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/todos', require('./routes/todos'));

app.get('/', function(req, res) {
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
});

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});