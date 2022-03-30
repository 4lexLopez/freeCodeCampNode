require('dotenv').config();

var express = require('express');
var app = express();
var absolutePath = __dirname + '/views/index.html';
var jsonPath = __dirname + '/json';
var publicPath = __dirname + '/public';
// const mySecret = process.env['MESSAGE_STYLE'];

// item 9: extracting parameters from URL
var echo_path = '/word/:echo';

// Item 6: Middleware added
var myMiddle = function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}
app.use(myMiddle);

app.use('/public', express.static(publicPath));
app.get('/', function(req, res) {
  res.sendFile(absolutePath);
});
console.log("config message: " + process.env.MESSAGE_STYLE);

// Item 8: implementing chaining methods, using middlewares
app.get('/now', function(req, res, next) {
  req.now = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.now});
});

// item 6: HTTP method 
app.get('/json', function(req, res) {
  var message = '';
  process.env.MESSAGE_STYLE === 'uppercase' ? message = "HELLO JSON" : message = "Hello json";
  res.json({"message": message});
});

app.get('/:word/echo', function(req, res) {
  var echoWord = req.params.word;
  res.json({'echo':echoWord});
}); 

module.exports = app;
