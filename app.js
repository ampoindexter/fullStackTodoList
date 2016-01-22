'use strict';

const PORT = process.env.PORT || 3000;
var DATAFILE = './todos.json';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function(req, res) {
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
});

app.get('/todos', function(req, res) {
  retrieveTodos(function(todos) {
    res.send(todos);
  });
});

app.post('/todos', function(req, res) {
  var newTodo = req.body;
  retrieveTodos(function(todos) {
    todos.push(newTodo);
    writeTodos(todos, function(err) {
      res.send();
    });
  });
});

function writeTodos(todos, cb) {
  fs.writeFile(DATAFILE, JSON.stringify(todos), function(err) {
    cb(err);
  });
}

function retrieveTodos(cb) {
  fs.readFile(DATAFILE, function(err, data) {
    var todos = JSON.parse(data);
    cb(todos);
  });
}

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});