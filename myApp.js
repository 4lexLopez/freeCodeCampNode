require('dotenv').config();

var express = require('express');
var app = express();
// Item 11: require body parser to parse data coming into POST requests
var bodyParser = require('body-parser');
// Item 11: middleware to handle data encoded into the URL using POST method
var myUrlEncoder = bodyParser.urlencoded({extended: false});
app.use(myUrlEncoder);
app.use(bodyParser.json());

var absolutePath = __dirname + '/views/index.html';
var jsonPath = __dirname + '/json';
var publicPath = __dirname + '/public';
var path = '/name';
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

// item 6: response a GET method using data stored in environment variables  
app.get('/json', function(req, res) {
  var message = '';
  process.env.MESSAGE_STYLE === 'uppercase' ? message = "HELLO JSON" : message = "Hello json";
  res.json({"message": message});
});

// Item 9: echo API that return data written in the URL
app.get('/:word/echo', function(req, res) {
  var echoWord = req.params.word;
  res.json({'echo':echoWord});
}); 

// Item 10: Get Query Parameter Input from the Client
app.get('/name', function(req, res) {
  res.json({'name':req.query.first + ' ' + req.query.last});
  // console.log(req.body);
}); 

// Item 11: using POST method and body-parser middleware as well
app.post('/name', function(req, res) {
  res.json({'name':req.body.first + ' ' + req.body.last});
});

module.exports = app;