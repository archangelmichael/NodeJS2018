var serverPort = process.env.port || 3003;

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', function (req, res) {
	res.send('Hello World');
});

app.post('/', function(req, res) {
	console.log(req.body.pass);
	res.send('Success');
});

app.listen(serverPort, function() {
	console.log("Server started on port " + serverPort);
});
