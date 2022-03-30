require('dotenv').config();

var express = require('express');
var app = express();
var absolutePath = __dirname + '/views/index.html';
var jsonPath = __dirname + '/json';
var publicPath = __dirname + '/public';
// const mySecret = process.env['MESSAGE_STYLE'];

app.use('/public', express.static(publicPath));
app.get('/', function(req, res) {
  res.sendFile(absolutePath);
});
console.log("config message: " + process.env.MESSAGE_STYLE);
app.get('/log', function(req, res) {
  var message = '';
  process.env.MESSAGE_STYLE === 'uppercase' ? message = "HELLO JSON" : message = "Hello json";
  res.json({"message": message});
});




































 module.exports = app;
